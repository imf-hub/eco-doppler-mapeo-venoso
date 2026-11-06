/**
 * Original postural context, not a clinical whole-body anatomy model.
 *
 * buildPatientContext(THREE, body, { surfaceScene, center, scale })
 *   - `body` is the already-normalized patient Group, not its raw GLB child.
 *   - `surfaceScene` is the unscaled objects.surface / gltf.scene in the source
 *     Z-Anatomy coordinates. Only skin meshes are borrowed and then cloned.
 *   - Existing examined/right-leg geometry and materials are never mutated.
 *   - The other leg is a mirrored RIGHT skin reference, not a left anatomy atlas.
 *   - +Y is proximal/up; +Z is anterior; body midline x=1.1 by default.
 *   - Returns {group, anchors, materials, resources, dispose}. Anchors are local
 *     to `body`; use body.localToWorld(anchor.clone()) for world coordinates.
 *   - `group.visible` can restrict context to posture. Rotate body for recumbent
 *     views. Match a separate rail to anchors.railCenter / railEnds; no rail,
 *     bed, loading arrows, clinical labels or camera are created here.
 *   - For a solid positional patient, the caller may give existing examined
 *     skin the returned materials.skin; this function does not change it.
 *
 * createProbeHand(THREE, { color?, handedness? }) returns the same contract.
 * Add result.group to the probe Group with no additional rotation or offset:
 * probe housing centered at origin, handle .4 wide x .65 high, centered y=.43;
 * local +Y points away from the acoustic face toward the operator. The fingers
 * curve around this handle, staying above the acoustic face. handedness='left'
 * mirrors the contextual grip; it does not prescribe a clinical hand technique.
 *
 * Cleanup: either call dispose() (idempotent; removes the group and disposes only
 * owned resources), OR let the parent's Set-based scene traversal dispose them.
 * Do not do both. Geometry/material sharing is limited to one returned context.
 * Mesh resources are also available as resources.geometries / materials Sets.
 *
 * Licenses: procedural upper body/hands are original project illustrations.
 * Mirrored leg skin remains Z-Anatomy / BodyParts3D, CC BY-SA 4.0; attribution:
 * public/media/anatomy-v2/ATTRIBUTION.txt. The reflection is explicitly recorded
 * in userData and is only a postural visual reference, not contralateral data.
 */

const DEFAULT_CENTER = [2.978957, 53.367455, 2.865167];
const DEFAULT_SCALE = .085;
const TAU = Math.PI * 2;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function toolkit(T) {
  const geometries = new Set(), materials = new Set();
  const ownGeometry = geometry => (geometries.add(geometry), geometry);
  const material = (color, extra = {}) => {
    const m = new T.MeshStandardMaterial({ color, roughness: .8, metalness: 0, ...extra });
    materials.add(m);
    return m;
  };
  const add = (group, geometry, mat, name, position) => {
    const object = new T.Mesh(ownGeometry(geometry), mat);
    object.name = name;
    object.userData.contextual = true;
    if (position) object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    group.add(object);
    return object;
  };

  // A continuous surface of elliptical horizontal sections, rather than stacked
  // spheres/capsules. Catmull-Rom interpolation rounds the silhouette and shoulders.
  function loft(profiles, { rings = 56, sides = 56, sculpt, sectionPower = 2 } = {}) {
    const curve = new T.CatmullRomCurve3(profiles.map(p => new T.Vector3(p[1], p[0], p[2])), false, 'centripetal');
    const samples = curve.getPoints(rings), pos = [], uv = [], indices = [];
    for (let r = 0; r <= rings; r++) {
      const sample = samples[r], rx = Math.max(.004, sample.x), rz = Math.max(.004, sample.z);
      for (let j = 0; j <= sides; j++) {
        const angle = j / sides * TAU, power = typeof sectionPower === 'function' ? sectionPower(sample.y) : sectionPower;
        const c = Math.cos(angle), s = Math.sin(angle), exponent = 2 / power;
        const x = Math.sign(c) * Math.pow(Math.abs(c), exponent) * rx;
        let y = sample.y, z = Math.sign(s) * Math.pow(Math.abs(s), exponent) * rz;
        if (sculpt) [y, z] = sculpt(x, y, z, angle);
        pos.push(x, y, z);
        uv.push(j / sides, r / rings);
      }
    }
    for (let r = 0; r < rings; r++) for (let j = 0; j < sides; j++) {
      const a = r * (sides + 1) + j, c = a + sides + 1;
      indices.push(a, c, a + 1, a + 1, c, c + 1);
    }
    for (const top of [false, true]) {
      const r = top ? rings : 0, start = r * (sides + 1), c = pos.length / 3;
      pos.push(0, samples[r].y, 0); uv.push(.5, top ? 1 : 0);
      for (let j = 0; j < sides; j++) {
        if (top) indices.push(c, start + j + 1, start + j);
        else indices.push(c, start + j, start + j + 1);
      }
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    g.setIndex(indices); g.computeVertexNormals();
    const n = g.attributes.normal;
    // Smooth the UV seam so the continuous garment has no artificial ridge.
    for (let r = 0; r <= rings; r++) {
      const a = r * (sides + 1), b = a + sides;
      const v = new T.Vector3().fromBufferAttribute(n, a).add(new T.Vector3().fromBufferAttribute(n, b)).normalize();
      n.setXYZ(a, v.x, v.y, v.z); n.setXYZ(b, v.x, v.y, v.z);
    }
    g.computeBoundingBox(); g.computeBoundingSphere();
    return g;
  }

  // Variable-radius curved sweep. Fingers, wrist and forearm have tapered,
  // continuous surfaces; there are no rigid cylindrical phalanges or elbow balls.
  function sweep(points, radii, segments = 32, sides = 14) {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)), false, 'centripetal');
    const frames = curve.computeFrenetFrames(segments, false), pos = [], uv = [], indices = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments, point = curve.getPointAt(t), q = t * (radii.length - 1);
      const a = Math.floor(q), b = Math.min(radii.length - 1, a + 1), radius = radii[a] + (radii[b] - radii[a]) * (q - a);
      for (let j = 0; j <= sides; j++) {
        const angle = j / sides * TAU;
        const v = point.clone().addScaledVector(frames.normals[i], Math.cos(angle) * radius).addScaledVector(frames.binormals[i], Math.sin(angle) * radius);
        pos.push(v.x, v.y, v.z); uv.push(j / sides, t);
      }
    }
    for (let i = 0; i < segments; i++) for (let j = 0; j < sides; j++) {
      const a = i * (sides + 1) + j, b = a + sides + 1;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
    // Rounded endpoints are made by tapered profiles, with tiny end caps hidden
    // inside the palm/sleeve or terminating a curved fingertip.
    for (const end of [0, segments]) {
      const p = curve.getPointAt(end / segments), center = pos.length / 3, start = end * (sides + 1);
      pos.push(p.x, p.y, p.z); uv.push(.5, end / segments);
      for (let j = 0; j < sides; j++) indices.push(center, start + (end ? j : j + 1), start + (end ? j + 1 : j));
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    g.setIndex(indices); g.computeVertexNormals(); g.computeBoundingBox(); g.computeBoundingSphere();
    return g;
  }

  const sphere = ownGeometry(new T.SphereGeometry(1, 28, 20));
  const ellipsoid = (group, mat, name, position, scale) => {
    const m = add(group, sphere, mat, name, position); m.scale.set(...scale); return m;
  };
  const curveMesh = (group, mat, name, points, radii, segments, sides) => add(group, sweep(points, radii, segments, sides), mat, name);
  const result = (group, anchors, mats) => {
    let disposed = false;
    return {
      group, anchors, materials: mats, resources: { geometries, materials },
      dispose() {
        if (disposed) return; disposed = true;
        group.removeFromParent();
        geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
        geometries.clear(); materials.clear();
      },
    };
  };
  return { add, material, loft, sweep, ellipsoid, curveMesh, result };
}

export function buildPatientContext(T, body, options = {}) {
  if (!body?.add) throw new TypeError('buildPatientContext requires a normalized patient Group.');
  const {
    surfaceScene, center = DEFAULT_CENTER, scale = DEFAULT_SCALE,
    midlineX = 1.1, supportHeight = 5.55, supportZ = 1.28,
  } = options;
  const k = toolkit(T), group = new T.Group();
  group.name = 'Paciente postural conceptual';
  group.userData.contextual = true;
  group.userData.description = 'Upper-body illustration and mirrored right-leg skin for posture; not validated whole-body anatomy.';
  body.add(group);
  const skin = k.material(0xbca68f, { roughness: .84 });
  const garment = k.material(0x788b9d, { roughness: .94 });
  const trim = k.material(0x596d80, { roughness: .97 });
  const features = k.material(0x7b6256, { roughness: .94, transparent: true, opacity: .48 });

  // A source skin reference is essential: never silently replace an absent GLB
  // with an unrelated procedural leg. The examined leg remains the caller's.
  let mirroredSkin = null;
  if (surfaceScene) {
    mirroredSkin = new T.Group(); mirroredSkin.name = 'Pierna contralateral contextual · espejo de referencia derecha';
    mirroredSkin.scale.set(-scale, scale, scale);
    mirroredSkin.position.set(2 * midlineX + center[0] * scale, -center[1] * scale, -center[2] * scale);
    mirroredSkin.userData = { contextual: true, reflectedRightSkin: true, license: 'CC BY-SA 4.0', source: 'Z-Anatomy / BodyParts3D', attribution: './media/anatomy-v2/ATTRIBUTION.txt' };
    surfaceScene.updateMatrixWorld(true);
    const inverseSource = surfaceScene.matrixWorld.clone().invert();
    surfaceScene.traverse(source => {
      if (!source.isMesh || source.userData.kind !== 'skin') return;
      const copy = k.add(mirroredSkin, source.geometry.clone(), skin, source.name + ' · reflected contextual skin');
      // Preserve transforms inside the source scene, but not its normalization
      // parent or any animated patient transform already above that scene.
      copy.matrix.copy(inverseSource.clone().multiply(source.matrixWorld));
      copy.matrixAutoUpdate = false;
      copy.userData = { ...source.userData, contextual: true, reflectedRightSkin: true, license: 'CC BY-SA 4.0' };
    });
    group.add(mirroredSkin);
  }

  const torso = k.add(group, k.loft([
    [2.0, 2.18, 1.38], [2.15, 2.19, 1.39], [3.1, 2.18, 1.41],
    [3.75, 2.12, 1.36], [4.35, 2.01, 1.21], [4.8, 1.76, 1.0],
    [5.2, 1.5, .86], [5.7, 1.4, .82],
    [6.5, 1.5, .86], [7.4, 1.7, .91], [8.25, 1.88, .91],
    [8.75, 1.91, .83], [9.05, 1.53, .68], [9.32, .63, .45],
    [9.38, .45, .37],
  ], {
    // A soft rectangular drape accommodates two hips beneath one garment.
    // A simple ellipse would intersect their outer anterior skin patches.
    sectionPower: y => 2 + 1.4 * clamp((5 - y) / 2, 0, 1),
    sculpt(x, y, z, angle) {
      const front = Math.max(0, Math.sin(angle));
      // Small cloth relief, strongest at the hem; deliberately no skin detail.
      const folds = Math.sin(angle * 9 + .25) * .018 * Math.pow(clamp((5.7 - y) / 2.6, 0, 1), 2);
      const lowerDrape = -.22 * clamp((5.2 - y) / 2, 0, 1);
      return [y, z + lowerDrape + folds + front * .035 * Math.exp(-((y - 7.8) ** 2) / 1.7)];
    },
  }), garment, 'Bata clínica · superficie continua', [midlineX, 0, -.035]);
  torso.userData.originalIllustration = true;

  // An understated stitched hem and neckline follow the garment's silhouette.
  for (const [y, rx, rz, offsetZ, name] of [[2.07, 2.19, 1.395, -.22, 'Dobladillo'], [9.32, .59, .444, 0, 'Cuello de bata']]) {
    const exponent = name === 'Dobladillo' ? 2 / 3.4 : 1;
    const points = Array.from({ length: 65 }, (_, i) => {
      const a = i / 64 * TAU, c = Math.cos(a), s = Math.sin(a);
      return [midlineX + rx * Math.sign(c) * Math.pow(Math.abs(c), exponent), y, -.035 + offsetZ + rz * Math.sign(s) * Math.pow(Math.abs(s), exponent)];
    });
    k.curveMesh(group, trim, name, points, [.018, .018], 80, 8);
  }
  k.curveMesh(group, trim, 'Costura lateral de bata', [[midlineX + 2.19, 2.15, -.25], [midlineX + 2.12, 3.75, -.19], [midlineX + 1.85, 4.6, -.12], [midlineX + 1.37, 5.8, -.12], [midlineX + 1.7, 7.6, -.12]], [.012, .012], 40, 8);

  k.add(group, k.loft([[9.12, .39, .34], [9.45, .39, .36], [9.85, .42, .39], [10.27, .5, .44]], { rings: 24, sides: 40 }), skin, 'Cuello continuo', [midlineX, 0, -.01]);
  k.add(group, k.loft([
    [10.02, .22, .31], [10.16, .47, .43], [10.42, .62, .54],
    [10.78, .73, .64], [11.18, .79, .68], [11.58, .77, .64],
    [11.91, .63, .54], [12.12, .35, .32], [12.19, .025, .025],
  ], {
    rings: 52, sides: 64,
    sculpt(x, y, z, angle) {
      const front = Math.pow(Math.max(0, Math.sin(angle)), 8);
      const ridge = .23 * Math.exp(-((x / .145) ** 2) - (((y - 10.99) / .25) ** 2));
      const brow = .035 * Math.exp(-(((y - 11.27) / .12) ** 2));
      const mouthPlane = .025 * Math.exp(-(((y - 10.52) / .16) ** 2));
      return [y, z + front * (ridge + brow + mouthPlane)];
    },
  }), skin, 'Cabeza facial conceptual suavizada', [midlineX, 0, -.015]);
  for (const sign of [-1, 1]) {
    k.ellipsoid(group, skin, 'Oreja conceptual', [midlineX + sign * .775, 11.03, -.005], [.105, .245, .16]);
    const x = midlineX + sign * .29;
    k.curveMesh(group, features, 'Párpado discreto', [[x - .12, 11.17, .652], [x, 11.19, .681], [x + .12, 11.17, .652]], [.009, .013, .008], 16, 8);
  }
  k.curveMesh(group, features, 'Línea labial discreta', [[midlineX - .16, 10.53, .589], [midlineX, 10.51, .626], [midlineX + .16, 10.53, .589]], [.006, .009, .006], 20, 8);

  const handCenters = [], h = clamp(supportHeight, 5.1, 6.5);
  for (const sign of [-1, 1]) {
    const shoulder = [midlineX + sign * 1.68, 8.48, -.025];
    const elbow = [midlineX + sign * 2.03, 7.2, .33];
    const handX = midlineX + sign * 1.72;
    const wrist = [handX, h + .6, supportZ + .035];
    const armPoints = [shoulder, [midlineX + sign * 2.0, 8.12, .03], elbow, [midlineX + sign * 1.92, h + 1.02, .91], wrist];
    k.curveMesh(group, skin, 'Brazo y antebrazo continuos', armPoints, [.37, .36, .285, .245, .185], 52, 20);
    k.curveMesh(group, garment, 'Manga con caída suave', [[midlineX + sign * 1.27, 8.69, -.025], [midlineX + sign * 1.83, 8.46, .005], [midlineX + sign * 2.055, 7.85, .13]], [.31, .45, .37], 32, 24);
    const hand = new T.Group(); hand.name = 'Mano de apoyo · agarre curvo'; hand.position.set(handX, h, supportZ); group.add(hand);
    k.ellipsoid(hand, skin, 'Palma de apoyo', [0, .34, .09], [.325, .36, .17]);
    k.curveMesh(hand, skin, 'Transición muñeca y palma', [[0, .65, .035], [0, .46, .065], [0, .25, .1]], [.18, .21, .24], 20, 16);
    [-.235, -.08, .08, .225].forEach((dx, i) => {
      k.curveMesh(hand, skin, `Dedo de apoyo ${i + 1}`, [[dx, .25, .19], [dx, .09, .275], [dx, -.095, .22], [dx, -.17, .055], [dx, -.075, -.102]], [.076, .074, .064, .05, .012], 26, 12);
    });
    k.curveMesh(hand, skin, 'Pulgar de apoyo', [[sign * .28, .38, .11], [sign * .38, .22, .12], [sign * .3, .06, -.025], [sign * .12, .015, -.12]], [.09, .088, .066, .015], 24, 12);
    handCenters.push(new T.Vector3(handX, h, supportZ));
  }
  const anchors = {
    midline: new T.Vector3(midlineX, 5.5, 0),
    head: new T.Vector3(midlineX, 11.3, 0),
    examinedFoot: new T.Vector3(0, -4.53, .25),
    supportingFoot: new T.Vector3(2 * midlineX, -4.53, .25),
    rightHand: handCenters[0], leftHand: handCenters[1],
    railCenter: new T.Vector3(midlineX, h, supportZ),
    railEnds: [new T.Vector3(midlineX - 2.35, h, supportZ), new T.Vector3(midlineX + 2.35, h, supportZ)],
    railRadius: .105,
  };
  group.userData.hasReferenceSkin = Boolean(mirroredSkin);
  // matrixAutoUpdate is deliberately disabled on copied source meshes. Resolve
  // their new hierarchy immediately so callers can frame a Box3 before a render.
  group.updateWorldMatrix(true, true);
  return k.result(group, anchors, { skin, garment, trim, features });
}

export function createProbeHand(T, { color = 0x9fb8bf, handedness = 'right' } = {}) {
  const k = toolkit(T), group = new T.Group();
  group.name = 'Mano operadora conceptual · agarre de transductor';
  group.userData.contextual = true;
  group.userData.description = 'Original procedural hand illustration, not a clinical grip validation.';
  const glove = k.material(color, { roughness: .83 });
  k.ellipsoid(group, glove, 'Palma moldeada', [.415, .48, .005], [.24, .355, .20]);
  k.curveMesh(group, glove, 'Muñeca y comienzo del antebrazo', [[.43, .66, -.005], [.56, .86, -.015], [.8, 1.05, -.005], [1.01, 1.17, .025]], [.185, .19, .22, .235], 32, 18);
  [.22, .365, .51, .65].forEach((y, i) => {
    const reach = [0, .012, .01, -.018][i];
    k.curveMesh(group, glove, `Dedo curvo alrededor del mango ${i + 1}`, [[.435, y + .02, .105], [.22, y + .005, .255], [-.105 - reach, y - .01, .25], [-.267 - reach, y, .105], [-.23, y + .02, -.145], [-.06, y + .035, -.23]], [.063, .067, .064, .055, .044, .012], 34, 12);
  });
  k.curveMesh(group, glove, 'Pulgar opuesto y curvado', [[.49, .77, .065], [.31, .80, .255], [.085, .72, .325], [-.09, .57, .28]], [.085, .084, .066, .017], 30, 14);
  if (handedness === 'left') group.scale.x = -1;
  return k.result(group, {
    handleCenter: new T.Vector3(0, .43, 0),
    wrist: new T.Vector3(handedness === 'left' ? -.8 : .8, 1.05, -.005),
    outward: new T.Vector3(0, 1, 0),
  }, { glove });
}
