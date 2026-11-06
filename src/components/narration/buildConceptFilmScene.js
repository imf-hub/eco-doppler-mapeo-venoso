import {clampFilm,seedFilm} from '../../simulation/conceptFilm.js';
import {aliasHz,baselineRangeHz,attenuationAmplitude} from '../../simulation/glossaryPhysics.js';

const COLORS={ink:0x234351,teal:0x118b9c,rose:0xb82b52,gold:0xdfab45,tissue:0xd2b6a0,vein:0x8db6c6};
export function buildConceptFilmScene(T,scene,film){
 const root=new T.Group();scene.add(root);const resources=new Set(),textures=new Set();
 const material=(color,props={})=>{const m=new T.MeshStandardMaterial({color,roughness:.43,metalness:.035,...props});resources.add(m);return m;};
 const mesh=(g,m,p=[0,0,0],parent=root)=>{resources.add(g);const o=new T.Mesh(g,m);o.position.set(...p);parent.add(o);return o;};
 const line=(points,color=COLORS.teal,parent=root)=>{const g=new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p))),m=new T.LineBasicMaterial({color,transparent:true,opacity:.8});resources.add(g);resources.add(m);const o=new T.Line(g,m);parent.add(o);return o;};
 const setLine=(o,points)=>{const a=o.geometry.attributes.position;points.forEach((p,i)=>a.setXYZ(i,...p));a.needsUpdate=true;o.geometry.computeBoundingSphere();};
 const sphere=(r,color,p,parent=root)=>mesh(new T.SphereGeometry(r,14,10),material(color),p,parent);
 const box=(size,color,p,props={},parent=root)=>mesh(new T.BoxGeometry(...size),material(color,props),p,parent);
 function label(text,position,width=2.8){const canvas=document.createElement('canvas');canvas.width=640;canvas.height=100;const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffffed';ctx.fillRect(0,0,640,100);ctx.font='46px Arial';ctx.fillStyle='#315b6d';ctx.textAlign='center';ctx.fillText(text,320,63);const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.add(texture);const mat=new T.SpriteMaterial({map:texture,depthTest:false});resources.add(mat);const sprite=new T.Sprite(mat);sprite.position.set(...position);sprite.scale.set(width,width/6.4,1);root.add(sprite);return sprite;}
 const floor=mesh(new T.CircleGeometry(7.5,64),material(0xe9f0f4,{roughness:1}),[0,-2.35,0]);floor.rotation.x=-Math.PI/2;
 const ambient=new T.HemisphereLight(0xe2f4ff,0xb4a394,2.2);scene.add(ambient);const key=new T.DirectionalLight(0xfff0dc,2.7);key.position.set(4,8,7);scene.add(key);const rim=new T.DirectionalLight(0x9bd8ea,1.5);rim.position.set(-5,3,-5);scene.add(rim);
 function probe(parent=root){const group=new T.Group();parent.add(group);box([1.2,.35,.55],0xe8ecec,[0,0,0],{},group);box([.43,.7,.38],0xb9c4ca,[0,.5,0],{},group);box([1.12,.04,.48],0x3e5662,[0,-.2,0],{},group);sphere(.05,COLORS.rose,[-.45,.12,.28],group);return group;}
 function monitor(){
  const group=new T.Group();root.add(group);group.position.set(3.7,.3,.6);
  const canvas=document.createElement('canvas');canvas.width=640;canvas.height=460;const ctx=canvas.getContext('2d'),texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.add(texture);
  box([3.3,2.5,.22],0x546e7c,[0,0,-.14],{},group);mesh(new T.PlaneGeometry(3.08,2.22),new T.MeshBasicMaterial({map:texture,toneMapped:false}),[0,0,.005],group);box([.17,.65,.2],0x778d98,[0,-1.5,-.1],{},group);box([1.3,.1,.65],0x9dadb5,[0,-1.82,0],{},group);
  let last=-1;return {group,draw(s){if(Math.abs(s.time-last)<1/12)return;drawFilmScreen(ctx,s,film);texture.needsUpdate=true;last=s.time;}};
 }
 function tissue(parent=root){const group=new T.Group();parent.add(group);box([5.9,.15,2.6],0xddc4ad,[0,1.4,0],{transparent:true,opacity:.27,depthWrite:false},group);box([5.9,2.35,2.6],0xd6c7b2,[0,.15,0],{transparent:true,opacity:.12,depthWrite:false},group);return group;}
 function beam(){const g=new T.Group();root.add(g);const ray=mesh(new T.CylinderGeometry(.07,.4,3.2,22,1,true),material(0x47b7c9,{transparent:true,opacity:.13,depthWrite:false}),[0,1.6,0],g);const tip=sphere(.12,COLORS.gold,[0,0,0],g);return {group:g,ray,tip};}
 function flowTube(){
  const curve=new T.CatmullRomCurve3([new T.Vector3(-3,0,0),new T.Vector3(-1,.08,0),new T.Vector3(1,-.03,0),new T.Vector3(3,0,0)]),geometry=new T.TubeGeometry(curve,64,.56,28,false),original=geometry.attributes.position.array.slice();
  const tube=mesh(geometry,material(COLORS.vein,{transparent:true,opacity:.29,side:T.DoubleSide,depthWrite:false}));
  const inner=mesh(new T.TubeGeometry(curve,64,.49,28,false),material(0xe8f3f6,{transparent:true,opacity:.1,side:T.DoubleSide,depthWrite:false}));
  const count=170,profile=[new T.Vector2(0,-.025),new T.Vector2(.04,-.045),new T.Vector2(.085,-.025),new T.Vector2(.095,0),new T.Vector2(.085,.025),new T.Vector2(.04,.045),new T.Vector2(0,.025)],cellGeometry=new T.LatheGeometry(profile,12),cells=new T.InstancedMesh(cellGeometry,material(0xb95668,{roughness:.65}),count);root.add(cells);resources.add(cellGeometry);resources.add(cells.material);cells.instanceMatrix.setUsage(T.DynamicDrawUsage);
  const dummy=new T.Object3D(),point=new T.Vector3(),tangent=new T.Vector3(),up=new T.Vector3(0,1,0);
  let lastFlatten=-1;
  function draw(s){
   const flatten=s.kind==='compression'?Math.max(.025,1-s.compression/.85*.975):1;
   if(Math.abs(flatten-lastFlatten)>.0001){const pos=geometry.attributes.position;for(let i=0;i<pos.count;i++)pos.setY(i,original[i*3+1]*flatten);pos.needsUpdate=true;geometry.computeVertexNormals();geometry.computeBoundingSphere();inner.scale.y=flatten;lastFlatten=flatten;}
   for(let i=0;i<count;i++){
    let u=(seedFilm(i,s.seed)+s.flowDistance*.11)%1;if(u<0)u+=1;
    curve.getPointAt(u,point);curve.getTangentAt(u,tangent);const a=seedFilm(i+300,s.seed)*Math.PI*2,r=Math.sqrt(seedFilm(i+600,s.seed))*.36;
    if(s.kind==='valve'&&Math.abs(point.x-.1)<.6)point.x+=Math.sign(point.x-.1)*(.6-Math.abs(point.x-.1))*s.valveClosure;point.y=(point.y+Math.cos(a)*r)*flatten;point.z+=Math.sin(a)*r;
    dummy.position.copy(point);dummy.quaternion.setFromUnitVectors(up,tangent);dummy.rotateY(seedFilm(i+900,s.seed)*Math.PI);
    const fade=Math.min(1,u/.04,(1-u)/.04),size=fade*(s.kind==='compression'?Math.max(0,1-s.compression/.72):1);
    dummy.scale.set(size,size,Math.max(.03,flatten)*size);dummy.updateMatrix();cells.setMatrixAt(i,dummy.matrix);
   }cells.instanceMatrix.needsUpdate=true;
  }
  return {tube,inner,cells,curve,draw};
 }
 let draw=()=>{};
 if(film.family==='wave'){
  const group=new T.Group();root.add(group);box([6.6,1.8,2.4],0xcde6ed,[0,0,0],{transparent:true,opacity:.12,depthWrite:false},group);
  const positions=[];for(let x=0;x<30;x++)for(let y=0;y<4;y++)for(let z=0;z<4;z++)positions.push([-3.1+x*.214,-.62+y*.42,-.72+z*.48]);
  const geometry=new T.SphereGeometry(.045,8,7),mat=material(COLORS.teal),particles=new T.InstancedMesh(geometry,mat,positions.length);root.add(particles);resources.add(geometry);resources.add(mat);particles.instanceMatrix.setUsage(T.DynamicDrawUsage);const dummy=new T.Object3D(),color=new T.Color();
  const marker=sphere(.12,COLORS.rose,[0,0,0]),anchor=sphere(.15,COLORS.rose,[0,0,0]);anchor.material.transparent=true;anchor.material.opacity=.14;const p0=positions[Math.floor(positions.length/2)];anchor.position.set(...p0);
  const localLabel=label('Partícula: oscilación local',[p0[0],1.12,p0[2]],4.2),directionLabel=label('Compresiones →',[0,-1.1,1.35],3.3);
  const localArrow=new T.ArrowHelper(new T.Vector3(1,0,0),new T.Vector3(p0[0]-.24,p0[1]+.3,p0[2]),.48,COLORS.rose,.09,.06);root.add(localArrow);
  const front=mesh(new T.PlaneGeometry(1.85,2.4),material(COLORS.gold,{transparent:true,opacity:.15,side:T.DoubleSide,depthWrite:false}));front.rotation.y=Math.PI/2;
  draw=s=>{const lambda=3/s.frequency*(s.soundSpeed/1540),k=2*Math.PI/lambda,omega=k*.7*(s.soundSpeed/1540),amp=Math.min(.24*s.amplitude,lambda*.2);positions.forEach((p,i)=>{const phase=k*p[0]-omega*s.time,pressure=Math.cos(phase);dummy.position.set(p[0]+amp*Math.sin(phase),p[1],p[2]);dummy.scale.setScalar(.75+.32*(pressure+1)/2);dummy.updateMatrix();particles.setMatrixAt(i,dummy.matrix);color.setRGB(.08+.28*(1-pressure)/2,.35+.36*(1+pressure)/2,.48+.22*(1+pressure)/2);particles.setColorAt(i,color);});particles.instanceMatrix.needsUpdate=true;particles.instanceColor.needsUpdate=true;marker.position.set(p0[0]+amp*Math.sin(k*p0[0]-omega*s.time),p0[1],p0[2]);front.position.x=-3.2+((s.time*.7*(s.soundSpeed/1540))%6.4);};
 }else if(film.family==='interface'){
  box([3.1,2.4,2.5],0xd7c8b1,[-1.65,0,0],{transparent:true,opacity:.18,depthWrite:false});box([3.1,2.4,2.5],0xa8c9d5,[1.65,0,0],{transparent:true,opacity:.2,depthWrite:false});
  const boundary=box([.035,2.7,2.7],0x728fa0,[0,0,0],{transparent:true,opacity:.25}),incident=line([[-3,1,0],[0,0,0]],COLORS.teal),reflected=line([[0,0,0],[-3,-1,0]],COLORS.rose),transmitted=line([[0,0,0],[3,-1,0]],COLORS.gold),packets=[sphere(.12,COLORS.teal,[-3,1,0]),sphere(.11,COLORS.rose,[0,0,0]),sphere(.11,COLORS.gold,[0,0,0])];
  const scatterers=Array.from({length:14},(_,i)=>sphere(.055,0x879eaa,[.5+seedFilm(i)*2,-.8+seedFilm(i+20)*1.6,-.8+seedFilm(i+40)*1.6]));
  const rays=scatterers.map((m,i)=>line([m.position.toArray(),[-2+seedFilm(i+200)*5,-1+seedFilm(i+300)*2,-1+seedFilm(i+400)*2]],i%3===0?COLORS.rose:COLORS.gold));
  draw=s=>{const a=(s.kind==='refraction'?s.value:0)*Math.PI/180,b=(s.kind==='refraction'?(s.refraction??0):0)*Math.PI/180,start=[-3,3*Math.tan(a),0],back=[-3,-3*Math.tan(a),0],end=[3,-3*Math.tan(b),0];setLine(incident,[start,[0,0,0]]);setLine(reflected,[[0,0,0],back]);setLine(transmitted,[[0,0,0],end]);const q=(s.time*.24)%1;packets[0].position.set(start[0]*(1-q),start[1]*(1-q),0);packets[1].position.set(back[0]*q,back[1]*q,0);packets[2].position.set(end[0]*q,end[1]*q,0);let reflection=Math.sqrt(s.reflection),transmission=Math.sqrt(1-s.reflection);if(s.kind==='coupling'){reflection=s.value>.05?.96:.08;transmission=s.value>.05?.08:.96;boundary.scale.x=1+s.value*14;}if(['absorption','attenuation'].includes(s.kind)){reflection=.12;transmission=attenuationAmplitude(q*8,s.frequency,s.kind==='absorption'?s.value:.5);boundary.material.opacity=.05;}
   packets[1].scale.setScalar(.2+reflection);reflected.material.opacity=.1+reflection*.8;packets[2].scale.setScalar(.15+transmission);transmitted.material.opacity=.08+transmission*.8;
   scatterers.forEach((m,i)=>{m.visible=s.kind==='scattering'&&i<Math.round(s.value);rays[i].visible=m.visible;});if(s.kind==='scattering'){reflected.visible=false;transmitted.visible=false;packets[1].visible=false;packets[2].visible=false;}else{reflected.visible=true;transmitted.visible=true;packets[1].visible=true;packets[2].visible=true;}
  };
 }else if(film.family==='transducer'){
  tissue();const device=probe();device.position.y=2.2;
  const elements=new T.InstancedMesh(new T.BoxGeometry(.15,.28,.45),material(0xdfb96b),32);root.add(elements);resources.add(elements.geometry);resources.add(elements.material);const dummy=new T.Object3D(),rayGeometry=new T.BufferGeometry(),rayPositions=new Float32Array(32*4*3);rayGeometry.setAttribute('position',new T.BufferAttribute(rayPositions,3));resources.add(rayGeometry);const rayMat=new T.LineBasicMaterial({color:COLORS.teal,transparent:true,opacity:.42});resources.add(rayMat);const rays=new T.LineSegments(rayGeometry,rayMat);root.add(rays);const focal=sphere(.12,COLORS.rose,[0,0,0]),wave=sphere(.09,COLORS.gold,[0,0,0]);
  draw=s=>{const n=s.kind==='linear-array'?Math.round(s.value):24,focus=s.kind==='nearfield'?2.05-s.value**2*.032:2.15-s.focus*.75,omega=s.time*5,aperture=s.kind==='nearfield'?s.value/6:1;elements.count=n;const attr=rayGeometry.attributes.position;for(let i=0;i<32;i++){const x=(-2.4+i/Math.max(1,n-1)*4.8)*aperture,d=Math.hypot(x,2.05-focus),delay=(d-Math.abs(2.05-focus))*.9;dummy.position.set(x,2.05,0);dummy.scale.set(1,s.kind==='piezo'?1+.22*s.value*Math.sin(omega):1+.1*Math.sin(omega-delay),1);dummy.updateMatrix();elements.setMatrixAt(i,dummy.matrix);const base=i*4,visible=i<n;attr.setXYZ(base,x,2.02,0);attr.setXYZ(base+1,visible?0:x,visible?focus:2.02,0);attr.setXYZ(base+2,visible?0:x,visible?focus:2.02,0);attr.setXYZ(base+3,visible?-x*.35:x,visible?-1.9:2.02,0);}elements.instanceMatrix.needsUpdate=true;attr.needsUpdate=true;rayGeometry.computeBoundingSphere();focal.position.set(0,focus,0);focal.scale.setScalar(1+.18*Math.sin(omega));wave.position.set(0,2.05-((s.time*.8)%4),0);device.scale.x=4.2*(s.kind==='nearfield'?Math.max(.6,aperture):1);};
 }else if(film.family==='resolution'){
  tissue();const device=probe();device.position.y=2.25;const targetA=sphere(.15,COLORS.rose,[0,-.3,0]),targetB=sphere(.15,COLORS.gold,[0,.3,0]);
  const slab=box([1.3,3.8,1.1],0x44b3c5,[0,.2,0],{transparent:true,opacity:.12,depthWrite:false}),packet=box([1,.6,1],0x3cbed0,[0,1.5,0],{transparent:true,opacity:.2,depthWrite:false}),screen=monitor();
  draw=s=>{if(s.kind==='axial'){targetA.position.set(0,-.38,0);targetB.position.set(0,.38,0);packet.scale.y=s.value;slab.scale.set(1,1,1);}else if(s.kind==='lateral'){targetA.position.set(-.55,0,0);targetB.position.set(.55,0,0);slab.scale.set(s.value/1.3,1,1);packet.scale.set(s.value,1,1);}else{targetA.position.set(0,0,-.6);targetB.position.set(0,0,.6);slab.scale.set(1,1,s.value/1.1);packet.scale.set(1,1,s.value);}
   packet.position.y=2.1-(s.time*.7%4);screen.draw(s);
  };
 }else if(film.family==='pulse'){
  const device=probe();device.position.set(-3.3,.2,0);device.rotation.z=Math.PI/2;const track=box([6.4,.9,1.2],0xcee1e8,[0,0,0],{transparent:true,opacity:.15,depthWrite:false});
  const waves=Array.from({length:96},()=>{const r=mesh(new T.TorusGeometry(.42,.025,7,32),material(COLORS.teal));r.rotation.y=Math.PI/2;return r;});const screen=monitor();
  draw=s=>{const cycles=s.kind==='duty-cycle'?s.value*25:['pulse','spl'].includes(s.kind)?s.value:s.kind==='pulse-duration'?s.value*5:3,prf=s.kind==='prf'?s.value:s.kind==='prp'?1/s.value:2,packets=['prf','prp','duty-cycle'].includes(s.kind)?Math.max(1,Math.round(prf)):1;waves.forEach((w,i)=>{const stride=s.kind==='duty-cycle'?48:8,packet=Math.floor(i/stride),cycle=i%stride;w.visible=packet<packets&&cycle<Math.ceil(cycles);const x=-3.1+((s.time*1.1+packet*6.2/packets)%6.2)-cycle*(s.kind==='duty-cycle'?.025:s.kind==='spl'?.14:.11);w.position.set(x,0,0);w.scale.setScalar(1);});screen.draw(s);};
 }else if(film.family==='receiver'||film.family==='flow'||film.family==='venous'||film.family==='safety'){
  tissue();const flow=flowTube(),device=probe(),ray=beam(),screen=monitor();const gate=mesh(new T.TorusGeometry(.5,.035,8,36),material(COLORS.gold));gate.rotation.y=Math.PI/2;const gateB=gate.clone();root.add(gateB);
  const correction=line([[-1,0,.7],[1,0,.7]],COLORS.gold),tissueMarker=box([.7,.12,.7],0x927b6c,[-1.7,1.25,0]);
  // Stable buffer topology, with both leaflets attached to the vessel wall.
  const centerline=Array.from({length:17},(_,i)=>flow.curve.getPointAt((-.55+i/16*.95+3)/6).y);
  function leaflet(sign){const nx=16,ny=10,positions=new Float32Array((nx+1)*(ny+1)*3),indices=[];for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){const a=i*(ny+1)+j,b=a+ny+1;indices.push(a,b,a+1,b,b+1,a+1);}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();const m=mesh(g,material(0xd7a79b,{side:T.DoubleSide}));return {mesh:m,draw(closure){const a=g.attributes.position;for(let i=0;i<=nx;i++)for(let j=0;j<=ny;j++){const u=i/nx,v=j/ny,theta=(v-.5)*Math.PI;const x=-.55+u*.95,y=centerline[i]+sign*.49*Math.cos(theta)*(1-u*(.2+.79*closure)),z=.49*Math.sin(theta)*(1-.15*u*closure);a.setXYZ(i*(ny+1)+j,x,y,z);}a.needsUpdate=true;g.computeVertexNormals();g.computeBoundingSphere();}};}
  const leaves=[leaflet(-1),leaflet(1)],echoDot=sphere(.09,COLORS.gold,[0,0,0]);
  draw=s=>{flow.draw(s);const theta=s.angle*Math.PI/180,axis=new T.Vector3(Math.cos(theta),Math.sin(theta),0),isFlow=film.family==='flow'||film.family==='venous';device.position.copy(axis).multiplyScalar(isFlow?3.35:3.1);device.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),axis);if(!isFlow){device.position.set(0,2.15,0);device.quaternion.identity();}if(s.kind==='compression')device.position.y=2.15-s.compression*.9;if(s.kind==='bmode')device.position.x=-2.2+s.scan*4.4;
   ray.group.position.set(s.kind==='bmode'?device.position.x:0,0,0);ray.group.quaternion.copy(device.quaternion);ray.tip.position.y=(s.time*.9)%3.1;
   const q=(s.time*.22)%1;echoDot.position.copy(device.position).multiplyScalar(q);echoDot.scale.setScalar(.7+.3*Math.sin(s.time*3));
   const gateSize=s.kind==='gate'?s.value*.07:.12,gateOffset=s.kind==='pw'?3-s.value:0;gate.position.copy(axis).multiplyScalar(gateOffset-gateSize/2);gateB.position.copy(axis).multiplyScalar(gateOffset+gateSize/2);gate.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),axis);gateB.quaternion.copy(gate.quaternion);gate.visible=gateB.visible=isFlow&&!['cw','power','color','color-map','color-gain','duplex'].includes(s.kind);
   correction.visible=s.kind==='angle-correction';if(correction.visible){const a=s.value*Math.PI/180;setLine(correction,[[-Math.cos(a),-Math.sin(a),.65],[Math.cos(a),Math.sin(a),.65]]);}
   tissueMarker.position.y=1.25+(s.kind==='clutter'?Math.sin(s.time*2)*s.value*.06:0);if(s.kind==='frame-rate')tissueMarker.position.x=Math.sin(s.time*1.5)*1.6; if(s.kind==='mmode'){const size=1+s.value*.025*Math.sin(s.time*2);flow.tube.scale.y=size;flow.inner.scale.y=size;}const showValves=['valve','reflux','reflux-duration'].includes(s.kind);leaves.forEach(l=>{l.mesh.visible=showValves;if(showValves)l.draw(s.kind==='valve'?s.change:.12);});
   if(s.kind==='echo'){flow.tube.position.y=flow.inner.position.y=-(s.value-3)*.18;flow.cells.position.y=flow.tube.position.y;}
   ray.ray.material.opacity=s.kind==='output-power'?.05+Math.sqrt(s.output)*.2:.13;
   if(s.kind==='alara')ray.group.visible=s.cueProgress<.8||s.scene===0;else ray.group.visible=true;
   screen.draw(s);
  };
 }else if(film.family==='artifact'){
  tissue();const device=probe();device.position.set(-.7,2.4,0);const target=sphere(.3,0x9b7b61,[0,.15,0]),virtual=sphere(.26,0x9cbdcd,[0,-1.25,0]);virtual.material.transparent=true;virtual.material.opacity=.27;virtual.material.wireframe=true;
  const reflector=box([5,.045,2.3],0x829aa6,[0,-.5,0],{transparent:true,opacity:.4,depthWrite:false}),second=reflector.clone();root.add(second);const path=line([[-.7,2.1,0],[0,-.5,0],[1.3,1,0]],COLORS.gold),packet=sphere(.09,COLORS.rose,[0,0,0]),shadow=box([.7,1.8,1],0x203d4a,[0,-.8,0],{transparent:true,opacity:.3,depthWrite:false}),screen=monitor();
  draw=s=>{virtual.visible=s.kind==='mirror';second.visible=s.kind==='reverberation';reflector.visible=['mirror','reverberation','anisotropy'].includes(s.kind);target.visible=!['reverberation','anisotropy','flash'].includes(s.kind);shadow.visible=['shadow','enhancement'].includes(s.kind);shadow.material.color.set(s.kind==='enhancement'?0xffe9ac:0x203d4a);shadow.material.opacity=s.value*.4;
   if(s.kind==='mirror'){const plane=-.5,y=plane+s.value*.3,ghost=2*plane-y,source=[-.7,2.1,0],targetPoint=[1.3,y,0],q=(plane-source[1])/(ghost-source[1]),hit=[source[0]+(targetPoint[0]-source[0])*q,plane,0];target.position.set(...targetPoint);virtual.position.set(1.3,ghost,0);setLine(path,[source,hit,targetPoint]);const p=(s.time*.22)%1;packet.position.fromArray(p<.5?source.map((v,i)=>v+(hit[i]-v)*p*2):hit.map((v,i)=>v+(targetPoint[i]-v)*(p-.5)*2));}
   else if(s.kind==='reverberation'){second.position.y=-.5+s.value*.4;const p=(s.time*.6)%2,progress=p<1?p:2-p;packet.position.set(0,-.5+progress*s.value*.4,0);setLine(path,[[0,2.1,0],[0,-.5,0],[0,second.position.y,0]]);}
   else if(s.kind==='anisotropy'){reflector.rotation.z=s.value*Math.PI/180;packet.scale.setScalar(Math.max(.05,Math.cos(s.value*Math.PI/180)**4));packet.position.set(0,(s.time*.7)%3-.5,0);}
   else{path.visible=s.kind==='sidelobes';if(path.visible){target.position.set(1.5,0,0);setLine(path,[[-.7,2.1,0],[1.5,0,0],[0,.2,0]]);}packet.position.set(0,2.1-(s.time*.8)%3.7,0);}
   device.position.x=-.7+(s.kind==='flash'?Math.sin(s.time*7)*s.value*.05:0);screen.draw(s);
  };
 }
 return {sample(state){draw(state);},dispose(){scene.remove(root,ambient,key,rim);root.traverse(o=>{if(o.geometry)resources.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>resources.add(m));});resources.forEach(r=>r.dispose());textures.forEach(t=>t.dispose());}};
}

function drawFilmScreen(ctx,s,film){
 const w=640,h=460,k=s.kind;ctx.fillStyle='#102c3c';ctx.fillRect(0,0,w,h);ctx.fillStyle='#d7e9ee';ctx.font='24px Arial';ctx.fillText(film.title.slice(0,38),25,34);ctx.fillStyle='#8bb5c6';ctx.font='16px Arial';ctx.fillText('SEÑAL SINTÉTICA · MODELO EDUCATIVO',25,59);
 if(film.family==='safety'){
  const label=k==='ti'?'TI · índice':k==='mi'?'MI · índice':k==='alara'?'Tiempo ilustrativo':'Emisión relativa',value=k==='mi'?s.mechanicalIndex:s.value;
  ctx.fillStyle='#8bcbd4';ctx.font='30px Arial';ctx.fillText(label,35,122);ctx.fillStyle='#fff';ctx.font='92px Arial';ctx.fillText(value.toFixed(k==='alara'?0:1),35,245);ctx.fillStyle='#7493a3';ctx.fillRect(35,288,570,16);ctx.fillStyle='#e4b86a';ctx.fillRect(35,288,Math.min(570,value/(k==='alara'?60:k==='output-power'?1:2)*570),16);ctx.font='22px Arial';ctx.fillStyle='#c5dce5';ctx.fillText(k==='ti'?'No es temperatura en grados.':k==='mi'?'No predice una lesión individual.':k==='alara'?'Información útil con exposición prudente.':'La ganancia de recepción es otro ajuste.',35,365);return;
 }
 if(k==='echo'){
  ctx.strokeStyle='#527a8e';ctx.beginPath();ctx.moveTo(35,340);ctx.lineTo(610,340);ctx.stroke();ctx.strokeStyle='#80d5dd';ctx.lineWidth=4;ctx.beginPath();const peak=40+s.depth/12*540;for(let x=35;x<610;x++){const a=Math.exp(-(((x-peak)/16)**2))*Math.sin((x-peak)*.6),y=245-a*95;x===35?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();ctx.fillStyle='#e4bc77';ctx.font='30px Arial';ctx.fillText(`Ida y vuelta: ${s.echoTime.toFixed(1)} µs`,35,405);ctx.fillStyle='#bfdce6';ctx.font='22px Arial';ctx.fillText(`Reflector: ${s.depth.toFixed(1)} cm`,35,115);return;
 }
 if(k==='mmode'){
  for(let x=0;x<580;x++){const t=s.time-(580-x)/100,y=215+Math.sin(t*2)*s.value*5;ctx.fillStyle='#d1e5eb';ctx.fillRect(30+x,y,1,8);ctx.fillStyle='#7597a7';ctx.fillRect(30+x,y+80,1,6);}ctx.fillStyle='#e4bc77';ctx.font='25px Arial';ctx.fillText('Una línea · profundidad a través del tiempo',30,415);return;
 }
 if(k==='persistence'){
  const samples=Math.round(s.value),xAt=t=>320+Math.sin(t*1.7)*210;ctx.strokeStyle='#4a7085';ctx.strokeRect(30,165,580,140);for(let n=samples-1;n>=0;n--){ctx.fillStyle=`rgba(225,105,123,${1/samples})`;ctx.fillRect(xAt(s.time-n*.18)-35,185,70,100);}ctx.strokeStyle='#f0cb82';ctx.lineWidth=3;ctx.strokeRect(xAt(s.time)-35,178,70,114);ctx.font='23px Arial';ctx.fillStyle='#c8dfe8';ctx.fillText(`${samples} cuadros promediados · contorno = actual`,30,390);return;
 }
 if(k==='frame-rate'){
  const rate=s.value/10,t=Math.floor(s.time*rate)/rate,trueX=320+Math.sin(s.time*1.5)*190,sampledX=320+Math.sin(t*1.5)*190;ctx.strokeStyle='#80d5dd';ctx.lineWidth=4;ctx.beginPath();ctx.arc(trueX,240,32,0,2*Math.PI);ctx.stroke();ctx.fillStyle='#e4bc77';ctx.fillRect(sampledX-23,217,46,46);ctx.fillStyle='#c8dfe8';ctx.font='24px Arial';ctx.fillText(`Tasa ${s.value.toFixed(0)} cuadros/s · ritmo ralentizado`,30,395);return;
 }
 const receiver=film.family==='receiver',artifact=film.family==='artifact',flow=film.family==='flow'||film.family==='venous';
 if(receiver||artifact||['color','color-map','color-gain','power','color-box','duplex','flash'].includes(k)||k==='compression'){
  const nx=k==='line-density'?Math.round(s.value):56,ny=36,top=80,height=k==='duplex'&&s.value>=2.6?195:295,zoom=k==='zoom'?s.value:1,deep=k==='depth'?5/s.depth:1;
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
   const x=(i+.5)/nx,y=(j+.5)/ny,px=(x-.5)/zoom+.5,py=(y-.5)/zoom+.5,lumen=((px-.5)/(.25*deep))**2+((py-.54)/(.16*deep*(k==='compression'?Math.max(.025,1-s.compression/.85*.975):1)))**2,wall=Math.abs(lumen-1)<.3;
   let db=lumen<.82?-79+seedFilm(i+j*nx,s.seed)*15:wall?-16:-62+seedFilm(i+j*nx,s.seed)*32;db+=(s.gain-50)*.6+(s.tgc-50)*.45*y;
   if(k==='shadow'&&Math.abs(x-.5)<.12&&y>.35)db-=s.value*45;if(k==='enhancement'&&Math.abs(x-.5)<.13&&y>.55)db+=s.value*28;
   if(k==='anisotropy'&&wall)db-=s.value*.75;
   let shade=Math.round(clampFilm((db+s.range)/s.range)*255);ctx.fillStyle=`rgb(${shade},${shade},${shade})`;
   const qx=25+i/nx*590,qy=top+j/ny*height,cw=590/nx+1,ch=height/ny+1;ctx.globalAlpha=k==='bmode'&&x>s.scan?.17:1;ctx.fillRect(qx,qy,cw,ch);ctx.globalAlpha=1;
   const colorMode=['color','color-map','color-gain','power','color-box','duplex','flash'].includes(k)&&!(k==='duplex'&&s.value<1.5),bloom=k==='color-gain'?Math.max(0,(s.value-65)/50):0;
   if(colorMode&&(lumen<.8+bloom||k==='flash'&&s.value>1&&Math.sin(s.time*7)>.35)){
    const polarity=(k==='color-map'&&s.value>.5?-1:1)*(s.velocity*Math.cos(s.angle*Math.PI/180)>=0?1:-1),power=k==='power';ctx.fillStyle=power?`rgba(242,157,51,${.15+s.value*.75})`:polarity>0?'#e36e75':'#5ca8df';if(k!=='color-box'||Math.abs(x-.5)<s.value/200)ctx.fillRect(qx,qy,cw,ch);
   }
  }
  if(k==='reverberation'){for(let i=1;i<=4;i++){ctx.fillStyle=`rgba(195,218,226,${.7/i})`;ctx.fillRect(180,90+i*s.value*27,280,6);}}
  if(k==='mirror'){ctx.strokeStyle='#b2d3df';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(330,150,65,28,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=.4;ctx.beginPath();ctx.ellipse(330,300,65,28,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;ctx.strokeStyle='#e4bc77';ctx.beginPath();ctx.moveTo(60,225);ctx.lineTo(580,225);ctx.stroke();}
  if(k==='sidelobes'){ctx.fillStyle=`rgba(222,237,243,${s.value})`;ctx.beginPath();ctx.arc(320,230,8+s.value*8,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='#d6e9ef';ctx.font='21px Arial';ctx.fillText(k==='gain'?`Ganancia: ${s.value.toFixed(0)} · emisión fija`:k==='tgc'?`TGC profunda: ${s.value.toFixed(0)} · recepción`:k==='dynamic-range'?`Rango mostrado: ${s.value.toFixed(0)} dB`:k==='depth'?`Campo: ${s.value.toFixed(1)} cm · anatomía fija`:k==='power'?'Intensidad sin dirección':k==='zoom'?`Ampliación ${s.value.toFixed(1)}×`:k==='compression'?'Misma vena · deformación ilustrativa':'Mismo territorio · señales ilustrativas',25,420);
  if(k!=='duplex'||s.value<2.6)return;
 }
 const top=k==='duplex'?285:90,bottom=k==='duplex'?395:350,height=bottom-top,mid=(top+bottom)/2;ctx.strokeStyle='#537c90';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(30,top);ctx.lineTo(30,bottom);ctx.lineTo(610,bottom);ctx.stroke();
 if(film.family==='pulse'){
  const prf=k==='prf'?s.value:k==='prp'?1/s.value:2,count=Math.max(2,Math.round(prf*3)),cycles=k==='duty-cycle'?s.value*25:['pulse','spl'].includes(k)?s.value:k==='pulse-duration'?s.value*5:3;ctx.strokeStyle='#85d2dc';ctx.lineWidth=3;ctx.beginPath();for(let x=0;x<560;x++){const q=(x/560*count)%1,fraction=k==='duty-cycle'?s.value*.2:.2,v=q<fraction?Math.sin(q/fraction*cycles*Math.PI*2):0;x?ctx.lineTo(35+x,mid-v*55):ctx.moveTo(35+x,mid-v*55);}ctx.stroke();ctx.fillStyle='#e4bd79';ctx.font='22px Arial';ctx.fillText(k==='prf'||k==='prp'?`PRF ${prf.toFixed(2)} kHz · PRP ${(1/prf).toFixed(2)} ms`:k==='duty-cycle'?`Fracción de emisión ${s.value.toFixed(2)} %`:`${cycles.toFixed(1)} ciclos por pulso`,35,415);return;
 }
 if(film.family==='resolution'){
  const width=s.value*22;ctx.strokeStyle='#83d1dc';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<560;i++){const v=Math.exp(-(((i-220)/width)**2))+Math.exp(-(((i-320)/width)**2)),y=bottom-v*130;i?ctx.lineTo(35+i,y):ctx.moveTo(35+i,y);}ctx.stroke();ctx.fillStyle='#e4bd79';ctx.font='22px Arial';ctx.fillText(k==='axial'?'Pulso más corto: ecos más separables.':k==='lateral'?'Haz más estrecho: blancos laterales.':'Espesor y separación fuera del plano.',35,415);return;
 }
 // CW is not subject to the pulsed Nyquist limit. Expand its display window.
 let max=k==='cw'?Math.max(s.nyquist,Math.abs(s.doppler)*1.25):s.nyquist,min=-max,baseline=mid;
 if(k==='baseline'){const range=baselineRangeHz(s.prf,s.value);min=range.min;max=range.max;baseline=top+max/(max-min)*height;}
 ctx.strokeStyle='#8ca9b9';ctx.beginPath();ctx.moveTo(30,baseline);ctx.lineTo(610,baseline);ctx.stroke();
 ctx.save();ctx.beginPath();ctx.rect(30,top,580,height);ctx.clip();ctx.strokeStyle='#9bdce2';ctx.lineWidth=k==='spectral-broadening'?3+s.value/15:k==='gate'?3+s.value:3;ctx.beginPath();
 for(let i=0;i<580;i++){
  const q=i/580,resp=1+.16*Math.sin(q*7+s.time*.7);if(['reflux','reflux-duration'].includes(k)&&q*4.5>s.clinicalTime)continue;let f=s.doppler*resp;
  if(['reflux','reflux-duration','augmentation','phasicity','pulsatility','valve'].includes(k)){const clinical=q*4.5;const v=k==='reflux'||k==='reflux-duration'?(clinical>2&&clinical<2+film.after?-700*Math.sin((clinical-2)/film.after*Math.PI):clinical>1&&clinical<2?800*Math.sin((clinical-1)*Math.PI):80):k==='augmentation'?(q>.25&&q<.6?1100:250):k==='phasicity'?400+300*Math.sin(q*8+s.time*.5):k==='pulsatility'?400+300*Math.sin(q*23+s.time*2):s.change>.9?0:500;f=v;}
  if(k==='pw'&&Math.abs(3-s.value)>.45)f=0;
  if(k==='wall-filter'&&Math.abs(f)<s.value)f=0;
  if(k!=='cw')f=aliasHz(f,s.prf*1000);
  if(k==='invert'&&s.value>.5)f=-f;
  const y=top+(max-f)/(max-min)*height;i?ctx.lineTo(30+i,y):ctx.moveTo(30+i,y);
 }ctx.stroke();if(['clutter','wall-filter'].includes(k)){const tissueHz=k==='clutter'?s.value*50:50;if(k!=='wall-filter'||s.value<tissueHz){ctx.strokeStyle='#bd9b76';ctx.lineWidth=9;ctx.beginPath();for(let i=0;i<580;i++){const f=tissueHz*(1+.15*Math.sin(i/70+s.time)),y=top+(max-f)/(max-min)*height;i?ctx.lineTo(30+i,y):ctx.moveTo(30+i,y);}ctx.stroke();}}ctx.restore();ctx.fillStyle='#e6bd79';ctx.font='22px Arial';
 const label=k==='angle-correction'?`Corregida ${s.correctedVelocity.toFixed(1)} cm/s · real 60°`:k==='reflux-duration'||k==='reflux'?(s.clinicalTime<2+film.after?'Liberación: observa el flujo retrógrado':`Intervalo ficticio ${film.after.toFixed(2)} s · tiempo ×5`):k==='doppler-angle'||k==='flow-direction'?`Ángulo ${s.angle.toFixed(0)}° · proyección ${s.doppler.toFixed(0)} Hz`:k==='baseline'?`Ventana total ${(max-min).toFixed(0)} Hz`:k==='cw'?'Continuo: sin selección de profundidad':`Δf ${s.doppler.toFixed(0)} Hz · Nyquist ±${s.nyquist.toFixed(0)} Hz`;
 if(k!=='duplex')ctx.fillText(label,25,420);
}
