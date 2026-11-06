import { useEffect, useId, useRef, useState } from 'react';
import './AnatomyViewer.css';

// Original procedural teaching model. Coordinates are illustrative, not a reconstruction.
const VESSELS = [
  { id: 'gsv', label: 'Safena magna', short: 'VSM', international: 'GSV · great saphenous vein', system: 'superficial', color: '#50c5ff', radius: .065,
    points: [[-.39,-3.7,.36],[-.51,-2.7,.43],[-.62,-1.6,.38],[-.64,-.35,.26],[-.8,.8,.25],[-.91,2,.3],[-.65,3.05,.32],[-.1,3.42,.07]],
    location: 'Recorre la cara medial del miembro, dentro del compartimento safeno. Se continúa con la unión safenofemoral en la ingle.',
    ultrasound: 'En transversal, identifica la vena entre la fascia superficial y la fascia muscular: el «ojo safeno». Confirma continuidad con un barrido, no con una imagen aislada.',
    task: 'Sigue la VSM desde la región maleolar medial hacia la ingle. Gira a la vista medial para localizar su trayecto.', target: [-.65,1,.27] },
  { id: 'ssv', label: 'Safena parva', short: 'VSP', international: 'SSV · small saphenous vein', system: 'superficial', color: '#50c5ff', radius: .055,
    points: [[.22,-3.7,-.29],[.1,-2.85,-.51],[.02,-1.9,-.64],[.0,-.95,-.62],[.07,-.38,-.42],[.02,-.17,-.28]],
    location: 'Asciende en la región posterior de la pierna. Su terminación es variable; aquí se representa una unión safenopoplítea convencional.',
    ultrasound: 'Busca el compartimento safeno posterior. Rastrea su terminación real y sus posibles prolongaciones; no presupongas que siempre desemboca en la poplítea.',
    task: 'Selecciona la vista posterior. Localiza la VSP y comprueba dónde alcanza la vena poplítea en este modelo.', target: [0,-1.8,-.6] },
  { id: 'cfv', label: 'Vena femoral común', short: 'VFC', system: 'profundo', color: '#385df2', radius: .12,
    points: [[-.1,3.95,.08],[-.1,3.42,.07],[-.07,2.7,.04]],
    location: 'Segmento profundo proximal que recibe la unión safenofemoral. Usa la confluencia y las relaciones anatómicas para orientarte.',
    ultrasound: 'En transversal, revisa la relación vena-arteria y la compresibilidad con el protocolo indicado. El color por sí solo no establece permeabilidad ni competencia.',
    task: 'Encuentra la confluencia de la VSM con la VFC. Después identifica el eje profundo que continúa distalmente.', target: [-.1,3.4,.07] },
  { id: 'fv', label: 'Vena femoral', short: 'VF', system: 'profundo', color: '#385df2', radius: .105,
    points: [[-.07,2.7,.04],[0,1.7,0],[.09,.8,-.14],[.08,.12,-.28],[.02,-.17,-.28]],
    location: 'Vena del sistema profundo del muslo. La denominación «vena femoral superficial» se evita porque puede inducir errores clínicos.',
    ultrasound: 'Recórrela por segmentos en transversal y longitudinal. Ajusta profundidad y foco para mantener la pared posterior y los tejidos de referencia visibles.',
    task: 'Oculta el sistema superficial para seguir con claridad el eje femoral hacia la región poplítea.', target: [.05,1.3,-.05] },
  { id: 'dfv', label: 'Vena femoral profunda', short: 'VFP', system: 'profundo', color: '#385df2', radius: .075,
    points: [[-.07,2.7,.04],[.37,2.37,-.17],[.6,1.75,-.25],[.61,1.05,-.26]],
    location: 'Afluente profundo de la región del muslo. El modelo muestra únicamente su segmento principal y su confluencia.',
    ultrasound: 'Distingue las confluencias antes de asignar un nombre al vaso. Una bifurcación visual no sustituye el rastreo continuo.',
    task: 'Selecciona la VFC y vuelve a la VFP para reconocer la confluencia proximal.', target: [.45,2,-.2] },
  { id: 'pop', label: 'Vena poplítea', short: 'VP', system: 'profundo', color: '#385df2', radius: .1,
    points: [[.02,-.17,-.28],[.02,-.58,-.31],[.04,-1.05,-.3],[.09,-1.65,-.24]],
    location: 'Eje profundo de la región posterior de la rodilla. Se representa la unión con la VSP como una de sus configuraciones posibles.',
    ultrasound: 'Orienta el transductor en la fosa poplítea. Identifica las relaciones con la arteria y sigue los vasos antes de documentar la unión safenopoplítea.',
    task: 'Cambia a la vista posterior y localiza la VSP llegando a la VP. Recuerda que esta anatomía puede variar.', target: [.04,-.6,-.3] },
  { id: 'perforators', label: 'Venas perforantes', short: 'P', system: 'perforantes', color: '#d69b51', radius: .044,
    paths: [[[-.55,-2.25,.42],[-.35,-2.17,.26],[.06,-2.1,-.06]], [[-.76,.68,.25],[-.35,.74,.12],[.09,.8,-.14]]],
    location: 'Comunican los sistemas superficial y profundo atravesando la fascia muscular. Se representan dos conexiones didácticas, sin epónimos ni niveles clínicos fijos.',
    ultrasound: 'Demuestra el cruce fascial y la conexión. Registra localización, diámetro y dirección del flujo con la maniobra indicada; ver una perforante no implica incompetencia.',
    task: 'Activa solo «Perforantes» y observa cómo las conexiones atraviesan desde la superficie hacia el eje profundo.', target: [-.25,-2.2,.17] },
];

const FILTERS = [['all','Todos'],['superficial','Superficial'],['profundo','Profundo'],['perforantes','Perforantes']];

function EchoCorrelation({ vessel, plane, setPlane }) {
  const patternId = useId().replaceAll(':','');
  const superficial = vessel.system === 'superficial';
  const y = superficial ? 69 : 111;
  return <section className="av-echo" aria-label="Correlación ecográfica ilustrada">
    <div className="av-echo-head"><strong>Del volumen a la imagen</strong><div className="av-plane-tabs" role="group" aria-label="Plano ecográfico">
      <button type="button" aria-pressed={plane==='transverse'} onClick={()=>setPlane('transverse')}>Transversal</button>
      <button type="button" aria-pressed={plane==='longitudinal'} onClick={()=>setPlane('longitudinal')}>Longitudinal</button>
    </div></div>
    <svg viewBox="0 0 360 158" role="img" aria-label={`Esquema de ${vessel.label} en plano ${plane==='transverse'?'transversal':'longitudinal'}`}>
      <defs><pattern id={patternId} width="13" height="11" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r=".7" fill="#596373"/><circle cx="10" cy="8" r=".5" fill="#596373"/></pattern></defs>
      <rect width="360" height="158" rx="10" fill="#0b1320"/>
      <rect x="10" y="19" width="340" height="128" fill={`url(#${patternId})`} opacity=".7"/>
      <path d="M10 28 Q180 21 350 28" stroke="#d9e0e8" fill="none" strokeWidth="3"/>
      <path d="M10 94 Q180 107 350 94" stroke="#8592a3" fill="none" strokeWidth="2"/>
      {plane==='transverse'?<>
        {superficial&&<><path d="M106 68 Q180 31 254 68 Q180 107 106 68" fill="none" stroke="#c2cbd8" strokeWidth="2"/><text x="263" y="65" fill="#a8b4c5" fontSize="9">Fascia</text></>}
        <ellipse cx="180" cy={y} rx={superficial?19:26} ry={superficial?13:18} fill="#060b12" stroke="#cdd5de" strokeWidth="2.5"/>
        <path d={`M209 ${y} H270`} stroke={vessel.color}/><text x="277" y={y+3} fill="#e4eaf1" fontSize="11">{vessel.short}</text>
      </>:<>
        <path d={`M35 ${y-12} Q180 ${y-19} 315 ${y-12} L315 ${y+12} Q180 ${y+4} 35 ${y+12}Z`} fill="#060b12" stroke="#d1dae4" strokeWidth="2"/>
        <text x="278" y={y-22} fill="#e4eaf1" fontSize="11">{vessel.short}</text>
      </>}
      <text x="18" y="143" fill="#98a8bc" fontSize="9">ESQUEMA · NO ES UNA ECOGRAFÍA CLÍNICA</text>
    </svg>
    <p>{plane==='transverse'?'El haz corta el vaso: aparece una sección redonda u oval. La forma depende del plano y de la presión.':'El haz sigue el vaso: permite observar sus paredes a lo largo del trayecto. Un corte oblicuo puede falsear su tamaño.'}</p>
  </section>;
}

export default function AnatomyViewer({ onSelect }) {
  const host = useRef(null);
  const runtime = useRef(null);
  const selectedRef = useRef('gsv');
  const filterRef = useRef('all');
  const tissueRef = useRef(true);
  const viewRef = useRef('medial');
  const planeRef = useRef('transverse');
  const onSelectRef = useRef(onSelect);
  const [selected,setSelected] = useState('gsv');
  const [filter,setFilter] = useState('all');
  const [tissue,setTissue] = useState(true);
  const [plane,setPlane] = useState('transverse');
  const [view,setView] = useState('medial');
  const [status,setStatus] = useState('loading');
  const helpId = useId();
  const vessel = VESSELS.find(v=>v.id===selected) || VESSELS[0];
  onSelectRef.current = onSelect;
  planeRef.current = plane;

  useEffect(()=>{runtime.current?.setPlane(plane);},[plane]);

  function choose(id) {
    const next = VESSELS.find(v=>v.id===id);
    if (!next) return;
    setSelected(id); selectedRef.current=id;
    runtime.current?.highlight(id);
    onSelectRef.current?.(next);
  }

  useEffect(()=>{
    let cancelled=false, cleanup=()=>{};
    async function initialize() {
      try {
        const [THREE,{OrbitControls}] = await Promise.all([import('three'),import('three/addons/controls/OrbitControls.js')]);
        if(cancelled || !host.current) return;
        const mount=host.current;
        let renderer;
        try { renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'}); }
        catch { setStatus('fallback');return; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
        renderer.setClearColor(0x0a1828,0);
        renderer.toneMapping=THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure=1.3;
        renderer.domElement.setAttribute('aria-label','Modelo venoso 3D. Usa la lista de estructuras y los botones de vista para navegar.');
        renderer.domElement.setAttribute('role','img');
        mount.appendChild(renderer.domElement);
        const scene=new THREE.Scene();
        const camera=new THREE.PerspectiveCamera(35,1,.1,80);
        camera.position.set(-8,1.3,11.5);
        const controls=new OrbitControls(camera,renderer.domElement);
        controls.target.set(0,.1,0); controls.enableDamping=true; controls.dampingFactor=.08;
        controls.enablePan=false; controls.minDistance=7.5; controls.maxDistance=20;
        controls.minPolarAngle=.35;controls.maxPolarAngle=Math.PI-.35;
        controls.rotateSpeed=.65;
        const group=new THREE.Group(); scene.add(group);
        scene.add(new THREE.HemisphereLight(0xd9f1ff,0x23436d,2.2));
        const key=new THREE.DirectionalLight(0xffffff,3.5); key.position.set(-4,6,8);scene.add(key);
        const rim=new THREE.DirectionalLight(0x6b90ff,3);rim.position.set(4,1,-6);scene.add(rim);
        const meshes=[];
        const point=arr=>new THREE.Vector3(...arr);
        for(const item of VESSELS){
          for(const path of (item.paths||[item.points])){
            const curve=new THREE.CatmullRomCurve3(path.map(point));
            const geometry=new THREE.TubeGeometry(curve,80,item.radius,10,false);
            const material=new THREE.MeshStandardMaterial({color:item.color,roughness:.31,metalness:.18,emissive:item.color,emissiveIntensity:.07});
            const mesh=new THREE.Mesh(geometry,material);
            mesh.userData={id:item.id,system:item.system,color:item.color};
            group.add(mesh);meshes.push(mesh);
          }
        }
        // A softly translucent silhouette supplies spatial context without patient-derived assets.
        const silhouettePoints=[
          [0,-4.05],[.3,-4.02],[.35,-3.7],[.4,-3.2],[.57,-2.6],[.68,-1.95],
          [.65,-1.3],[.52,-.5],[.55,.0],[.66,.6],[.85,1.5],[1.02,2.5],[1.05,3.5],[.95,4.05],[0,4.12],
        ].map(([r,y])=>new THREE.Vector2(r,y));
        const skin=new THREE.Mesh(new THREE.LatheGeometry(silhouettePoints,48),new THREE.MeshPhysicalMaterial({color:0x9cbdce,transparent:true,opacity:.13,roughness:.7,side:THREE.DoubleSide,depthWrite:false}));
        skin.scale.z=.76;skin.renderOrder=2;group.add(skin);
        const skinEdges=new THREE.LineSegments(new THREE.EdgesGeometry(skin.geometry,37),new THREE.LineBasicMaterial({color:0x6e94b0,transparent:true,opacity:.10,depthWrite:false}));skinEdges.scale.z=.76;group.add(skinEdges);
        const boneMaterial=new THREE.MeshStandardMaterial({color:0xe0deca,transparent:true,opacity:.12,roughness:.8,depthWrite:false});
        const bones=new THREE.Group();
        const upper=new THREE.Mesh(new THREE.CapsuleGeometry(.12,3.7,4,12),boneMaterial);upper.position.set(.15,2.07,-.09);bones.add(upper);
        const lower=new THREE.Mesh(new THREE.CapsuleGeometry(.1,3.25,4,12),boneMaterial);lower.position.set(.13,-2.04,.04);bones.add(lower);
        const patella=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),boneMaterial);patella.scale.set(.75,1,.4);patella.position.set(.1,-.12,.36);bones.add(patella);group.add(bones);
        const ringGeometry=new THREE.TorusGeometry(.35,.008,4,64);
        const ring=new THREE.Mesh(ringGeometry,new THREE.MeshBasicMaterial({color:0x87b4cf,transparent:true,opacity:.32}));
        ring.rotation.x=Math.PI/2;ring.position.y=-4.05;ring.scale.set(3.2,2.4,1);group.add(ring);

        const sliceGeometry=new THREE.PlaneGeometry(2.3,1.5);
        const slice=new THREE.Mesh(sliceGeometry,new THREE.MeshBasicMaterial({color:0x85d4ed,transparent:true,opacity:.07,side:THREE.DoubleSide,depthWrite:false}));
        const sliceBorder=new THREE.LineSegments(new THREE.EdgesGeometry(sliceGeometry),new THREE.LineBasicMaterial({color:0x87d8ed,transparent:true,opacity:.55,depthWrite:false}));
        const sliceGroup=new THREE.Group();sliceGroup.add(slice,sliceBorder);group.add(sliceGroup);
        const positionSlice=(id)=>{const item=VESSELS.find(v=>v.id===id);if(item)sliceGroup.position.set(...item.target);};
        const setPlane=(kind)=>{sliceGroup.rotation.x=kind==='transverse'?Math.PI/2:0;sliceGroup.scale.y=kind==='transverse'?1:1.8;};

        const highlight=(id)=>{
          meshes.forEach(mesh=>{
            const active=mesh.userData.id===id;
            mesh.material.emissiveIntensity=active ? .55 : .055;
            mesh.material.color.set(active?'#b9eeff':mesh.userData.color);
          });
          positionSlice(id);
        };
        const setSystem=(id)=>meshes.forEach(mesh=>{mesh.visible=id==='all'||mesh.userData.system===id;});
        const setTissue=(show)=>{skin.visible=show;skinEdges.visible=show;bones.visible=show;};
        const views={anterior:[0,.9,14],medial:[-10,.9,9],posterior:[0,.9,-14]};
        const setView=(name)=>{camera.position.set(...(views[name]||views.medial));controls.target.set(0,.1,0);controls.update();};
        const reset=()=>{setView('medial');};
        runtime.current={highlight,setSystem,setTissue,setView,setPlane,reset};
        highlight(selectedRef.current);setSystem(filterRef.current);setTissue(tissueRef.current);setView(viewRef.current);setPlane(planeRef.current);

        const pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster();
        let down=null;
        const onDown=e=>{down={x:e.clientX,y:e.clientY};};
        const onUp=e=>{
          if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)return;
          const bounds=renderer.domElement.getBoundingClientRect();
          pointer.set((e.clientX-bounds.left)/bounds.width*2-1,-(e.clientY-bounds.top)/bounds.height*2+1);
          raycaster.setFromCamera(pointer,camera);
          const hit=raycaster.intersectObjects(meshes.filter(m=>m.visible),false)[0];
          if(hit){const id=hit.object.userData.id;setSelected(id);selectedRef.current=id;highlight(id);onSelectRef.current?.(VESSELS.find(v=>v.id===id));}
          down=null;
        };
        renderer.domElement.addEventListener('pointerdown',onDown);
        renderer.domElement.addEventListener('pointerup',onUp);
        const resize=()=>{
          const width=mount.clientWidth||500,height=mount.clientHeight||520;
          renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();
        };
        const observer=new ResizeObserver(resize);observer.observe(mount);resize();
        let visible=true;
        const intersection=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;});intersection.observe(mount);
        const timer=typeof THREE.Timer==='function'?new THREE.Timer():null;
        timer?.connect(document);
        renderer.setAnimationLoop(()=>{
          if(!visible||document.hidden)return;
          timer?.update();controls.update(timer?.getDelta()||.016);renderer.render(scene,camera);
        });
        setStatus('ready');
        cleanup=()=>{
          runtime.current=null;observer.disconnect();intersection.disconnect();controls.dispose();timer?.dispose();
          renderer.setAnimationLoop(null);
          renderer.domElement.removeEventListener('pointerdown',onDown);renderer.domElement.removeEventListener('pointerup',onUp);
          const geometries=new Set(),materials=new Set();
          scene.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material){(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}});
          geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
        };
      }catch(error){if(!cancelled)setStatus('fallback');}
    }
    initialize();
    return()=>{cancelled=true;cleanup();};
  },[]);

  function changeFilter(id){
    setFilter(id);filterRef.current=id;runtime.current?.setSystem(id);
    const visible=VESSELS.filter(v=>id==='all'||v.system===id);
    if(!visible.some(v=>v.id===selected))choose(visible[0].id);
  }
  function changeView(id){setView(id);viewRef.current=id;runtime.current?.setView(id);}

  return <div className="av-root">
    <div className="av-toolbar" role="group" aria-label="Sistemas venosos">
      {FILTERS.map(([id,label])=><button key={id} type="button" onClick={()=>changeFilter(id)} aria-pressed={filter===id}>{label}</button>)}
    </div>
    <div className="av-layout">
      <div className="av-stage">
        <div className="av-stage-caption"><span>ANATOMÍA ESPACIAL</span><strong>Miembro inferior derecho</strong></div>
        <div ref={host} className="av-canvas" aria-describedby={helpId}/>
        {status==='loading'&&<div className="av-loading" role="status">Preparando el modelo 3D…</div>}
        {status==='fallback'&&<div className="av-fallback"><svg viewBox="0 0 180 400" role="img" aria-label="Esquema alternativo del sistema venoso"><path d="M40 15 Q20 75 48 170 Q35 210 60 370 L105 370 Q130 230 110 170 Q138 70 115 15Z" fill="#d5e4ef" fillOpacity=".1" stroke="#6d91ae"/><path d="M77 28 L76 160 L83 340" fill="none" stroke="#385df2" strokeWidth="9"/><path d="M64 345 Q33 180 45 70 Q48 30 77 38 M95 345 Q112 240 77 165" fill="none" stroke="#50c5ff" strokeWidth="5"/><path d="M51 230 L80 220 M48 115 L77 111" stroke="#d69b51" strokeWidth="4"/></svg><p>Vista esquemática. El modelo 3D no está disponible en este dispositivo; puedes explorar todas las estructuras con la lista.</p></div>}
        <div className="av-orientation"><span>PROXIMAL ↑</span><span>DISTAL ↓</span></div>
        <div className="av-view-controls" role="group" aria-label="Orientación de la cámara">
          {[['anterior','Anterior'],['medial','Medial'],['posterior','Posterior']].map(([id,label])=><button key={id} type="button" aria-pressed={view===id} onClick={()=>changeView(id)}>{label}</button>)}
        </div>
        <div className="av-stage-footer"><label><input type="checkbox" checked={tissue} onChange={e=>{setTissue(e.target.checked);tissueRef.current=e.target.checked;runtime.current?.setTissue(e.target.checked);}}/> Tejido transparente</label><button type="button" onClick={()=>{changeView('medial');runtime.current?.reset();}}>Restablecer vista</button></div>
        <p id={helpId} className="av-gesture">Arrastra para girar · Rueda para acercar · Rectángulo: plano {plane==='transverse'?'transversal':'longitudinal'} ilustrativo</p>
      </div>
      <div className="av-detail">
        <div className="av-vessel-list" role="group" aria-label="Estructuras venosas">
          {VESSELS.filter(v=>filter==='all'||v.system===filter).map(v=><button type="button" key={v.id} aria-pressed={selected===v.id} onClick={()=>choose(v.id)}><span className="av-swatch" style={{background:v.color}}/><span>{v.label}</span><small>{v.short}</small></button>)}
        </div>
        <section className="av-description" aria-live="polite">
          <span className="av-system-tag">Sistema {vessel.system}</span><h3>{vessel.label}</h3>{vessel.international&&<p className="av-international">{vessel.international}</p>}<p>{vessel.location}</p>
          <h4>Cómo reconocerla en ultrasonido</h4><p>{vessel.ultrasound}</p>
          <div className="av-task"><strong>Explora una relación</strong><p>{vessel.task}</p></div>
        </section>
      </div>
    </div>
    <EchoCorrelation vessel={vessel} plane={plane} setPlane={setPlane}/>
    <p className="av-note">Modelo original y simplificado para orientación espacial. Calibres, trayectos y conexiones no están a escala; se omiten vasos y variantes. El azul identifica venas en esta ilustración, sin codificar competencia ni dirección Doppler. La anatomía real debe confirmarse por rastreo.</p>
  </div>;
}
