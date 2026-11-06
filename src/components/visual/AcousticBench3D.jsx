import {useEffect,useRef,useState} from 'react';
import {RotateCcw} from 'lucide-react';

const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export default function AcousticBench3D({conceptId='sound',parameters={},phase=0}){
 const host=useRef(null),latest=useRef({}),api=useRef(null),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[camera,setCamera]=useState('space');
 latest.current={id:conceptId,p:{frequency:8,depth:5,focus:2.1,tgc:50,...parameters},phase,camera};
 useEffect(()=>{let gone=false,dispose=()=>{};setReady(false);setFailed(false);
  (async()=>{try{
   const [T,{OrbitControls},{RoundedBoxGeometry},{CSS2DRenderer,CSS2DObject}]=await Promise.all([import('three'),import('three/addons/controls/OrbitControls.js'),import('three/addons/geometries/RoundedBoxGeometry.js'),import('three/addons/renderers/CSS2DRenderer.js')]);if(gone||!host.current)return;
   const mount=host.current,renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setClearColor(0xf4f7fa);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','Laboratorio tridimensional de propagación, transductor, tejidos y recepción de ecos.');mount.appendChild(renderer.domElement);
   const textRenderer=new CSS2DRenderer();textRenderer.domElement.className='ab-labels';mount.appendChild(textRenderer.domElement);
   const scene=new T.Scene(),cam=new T.PerspectiveCamera(36,1,.1,100),controls=new OrbitControls(cam,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=5;controls.maxDistance=21;
   scene.add(new T.HemisphereLight(0xc4eaff,0x1e2732,2.3));const key=new T.DirectionalLight(0xffe5cf,3);key.position.set(3,8,6);scene.add(key);const rim=new T.DirectionalLight(0x72bcf5,2.4);rim.position.set(-6,2,-5);scene.add(rim);
   const materials=[],geometries=[],textures=[],labels=[];let resizeObserver,intersectionObserver;
   const mat=(color,extra={})=>{const m=new T.MeshStandardMaterial({color,roughness:.55,metalness:.08,...extra});materials.push(m);return m;};
   const mesh=(g,m,position=[0,0,0],parent=scene)=>{geometries.push(g);const o=new T.Mesh(g,m);o.position.set(...position);parent.add(o);return o;};
   const line=(pts,color=0x74d4ea,parent=scene)=>{const g=new T.BufferGeometry().setFromPoints(pts.map(p=>new T.Vector3(...p))),m=new T.LineBasicMaterial({color,transparent:true,opacity:.8});geometries.push(g);materials.push(m);const l=new T.Line(g,m);parent.add(l);return l;};
   const label=(text,position,parent=scene)=>{const div=document.createElement('div');div.className='ab-label';div.textContent=text;const o=new CSS2DObject(div);o.position.set(...position);parent.add(o);labels.push(o);return o;};
   const apparatus=new T.Group(),waveLab=new T.Group();scene.add(apparatus,waveLab);
   const pedestal=mesh(new T.CylinderGeometry(4.9,5.1,.16,80),mat(0x102335,{roughness:1}),[0,-2.6,0],apparatus);
   const tissueGroup=new T.Group();apparatus.add(tissueGroup);
   const tissueLayers=[];for(const [y,h,color,name] of [[1.5,.18,0xc9a48b,'Piel'],[.91,1.0,0xb6a27e,'Tejido'],[-.12,1.0,0x907e86,'Interfaces'],[-1.32,1.35,0x6c8294,'Profundidad']]){
    const layer=mesh(new RoundedBoxGeometry(5.6,h,2.9,3,.055),mat(color,{transparent:true,opacity:.23,depthWrite:false}),[0,y,-.3],tissueGroup);tissueLayers.push(layer);
    line([[-2.8,y+h/2,1.16],[2.8,y+h/2,1.16]],color,tissueGroup);
   }
   const gel=mesh(new RoundedBoxGeometry(2.65,.18,.85,3,.04),mat(0x9bd5db,{transparent:true,opacity:.25,depthWrite:false}),[0,1.68,0],apparatus);
   const probe=new T.Group();probe.position.y=2.2;apparatus.add(probe);
   const caseMesh=mesh(new RoundedBoxGeometry(2.8,.48,.94,5,.11),mat(0xe1e8ed,{roughness:.3}),[0,0,0],probe);
   const handle=mesh(new RoundedBoxGeometry(.68,1.12,.6,5,.12),mat(0xa8bac9),[0,.74,0],probe);
   const lens=mesh(new RoundedBoxGeometry(2.62,.08,.82,3,.035),mat(0x2f4150),[0,-.27,0],probe);
   const back=mesh(new RoundedBoxGeometry(2.55,.1,.78,3,.035),mat(0x755b7f),[0,.06,0],probe);
   const cableCurve=new T.CatmullRomCurve3([[0,1.3,0],[.5,1.9,-.1],[1.5,2.3,-.5],[2.2,1.85,-.8]].map(p=>new T.Vector3(...p)));mesh(new T.TubeGeometry(cableCurve,30,.035,10,false),mat(0x738da2),[0,0,0],probe);
   const piezoGeometry=new T.BoxGeometry(.043,.14,.65),piezoMaterial=mat(0xd8b86f,{metalness:.45}),piezo=new T.InstancedMesh(piezoGeometry,piezoMaterial,48),dummy=new T.Object3D();geometries.push(piezoGeometry);probe.add(piezo);
   const marker=mesh(new T.SphereGeometry(.055,16,12),mat(0xffbd73),[-1.2,.11,.49],probe);
   const crystalLabel=label('Cristales',[-2.0,2.25,.4],apparatus),gelLabel=label('Gel',[2.2,1.72,.5],apparatus),probeLabel=label('Emisor / receptor',[-.5,3.5,.2],apparatus);
   const target=mesh(new T.SphereGeometry(.14,28,20),mat(0xffc77e,{emissive:0x6d3613,emissiveIntensity:.3}),[0,-.3,0],apparatus),targetLabel=label('Reflector',[.6,-.5,1.0],apparatus);
   const focusMarker=mesh(new T.TorusGeometry(.28,.02,10,70),mat(0xffc77e,{emissive:0x543314,emissiveIntensity:.3}),[0,-.2,0],apparatus);focusMarker.rotation.x=Math.PI/2;const focusLabel=label('Foco',[.8,-.2,.6],apparatus);
   const beamGeometry=new T.BufferGeometry(),beamPosition=new Float32Array(48*6*3);beamGeometry.setAttribute('position',new T.BufferAttribute(beamPosition,3));const beam=mesh(beamGeometry,mat(0x55bedc,{transparent:true,opacity:.11,side:T.DoubleSide,depthWrite:false}),[0,0,0],apparatus);
   const fronts=[];for(let n=0;n<12;n++){const front=mesh(new T.TorusGeometry(1,.012,6,72),new T.MeshBasicMaterial({color:0x73e4ee,transparent:true,opacity:.8}),[0,0,0],apparatus);materials.push(front.material);front.rotation.x=Math.PI/2;fronts.push(front);}
   const echoFronts=[];for(let n=0;n<5;n++){const front=mesh(new T.TorusGeometry(.65,.018,8,60),new T.MeshBasicMaterial({color:0xffbf76,transparent:true,opacity:.8}),[0,0,0],apparatus);materials.push(front.material);front.rotation.x=Math.PI/2;echoFronts.push(front);}
   const pulseLabel=label('Pulso',[-1.7,.45,1.2],apparatus),echoLabel=label('Eco',[1.5,.4,1.2],apparatus);
   const resolution=new T.Group();apparatus.add(resolution);const blur=[];for(const pos of [[-1.35,-.45,0],[-1.35,-.8,0],[1.1,-.65,0],[1.5,-.65,0]]){mesh(new T.SphereGeometry(.055,20,14),mat(0xffda8c),pos,resolution);blur.push(mesh(new T.SphereGeometry(1,24,18),mat(0x78cfe7,{transparent:true,opacity:.16,depthWrite:false}),pos,resolution));}label('Axial',[-1.4,-1.45,.2],resolution);label('Lateral',[1.3,-1.45,.2],resolution);
   // Reception is a separate physical object: its trace changes without altering emission.
   const receiver=new T.Group();receiver.position.set(4.0,.2,-.5);receiver.rotation.y=-.15;apparatus.add(receiver);
   const screenCanvas=document.createElement('canvas');screenCanvas.width=800;screenCanvas.height=470;const ctx=screenCanvas.getContext('2d'),texture=new T.CanvasTexture(screenCanvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
   mesh(new RoundedBoxGeometry(2.65,1.67,.12,3,.06),mat(0x35586f),[0,0,-.05],receiver);mesh(new T.PlaneGeometry(2.52,1.51),new T.MeshBasicMaterial({map:texture}),[0,0,.02],receiver);const receiverLabel=label('Recepción',[4,1.22,-.4],apparatus);
   const waveGeom=new T.SphereGeometry(.038,12,8),waveMat=mat(0x84cee8,{emissive:0x1a6682,emissiveIntensity:.3}),particles=new T.InstancedMesh(waveGeom,waveMat,640);geometries.push(waveGeom);waveLab.add(particles);
   const piston=mesh(new RoundedBoxGeometry(.24,2.4,2.5,4,.06),mat(0x9bbed2,{roughness:.3}),[-4.25,0,0],waveLab);const pistonRim=mesh(new RoundedBoxGeometry(.4,2.65,2.8,4,.07),mat(0x3c5e78),[-4.5,0,0],waveLab);
   const wavePlate=mesh(new RoundedBoxGeometry(9,.1,4,4,.04),mat(0x112c40,{roughness:1}),[0,-1.55,0],waveLab);
   label('Vibración',[-4.2,1.65,.1],waveLab);label('Compresión',[-1.0,1.25,.1],waveLab);label('Rarefacción',[1.7,1.25,.1],waveLab);
   const dimension=line([[-2.7,-1.1,1.5],[-2.7,-.9,1.5],[-1.7,-.9,1.5],[-1.7,-1.1,1.5]],0xffc77e,waveLab),lambda=label('λ',[-2.2,-.7,1.5],waveLab);
   const direction=new T.ArrowHelper(new T.Vector3(1,0,0),new T.Vector3(-1.5,1.85,0),3.2,0x76d6e6,.22,.15);waveLab.add(direction);label('Propagación',[.1,2.15,0],waveLab);
   const setCamera=type=>{cam.position.set(...(type==='front'?[0,2.4,12.7]:type==='probe'?[4.3,5.3,5.2]:['sound','frequency'].includes(latest.current.id)?[5.5,3.2,7.2]:[7.5,4.8,9.5]));controls.target.set(type==='probe'?0:.5,.45,0);controls.update();};api.current={reset:()=>setCamera('space')};let previousCamera='';
   const resize=()=>{const w=mount.clientWidth||600,h=mount.clientHeight||480;renderer.setSize(w,h);textRenderer.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();};resizeObserver=new ResizeObserver(resize);resizeObserver.observe(mount);resize();let visible=true;intersectionObserver=new IntersectionObserver(([entry])=>visible=entry.isIntersecting);intersectionObserver.observe(mount);
   let last=0,lastTrace='';renderer.setAnimationLoop(now=>{if(gone||document.hidden||!visible||now-last<30)return;last=now;const {id,p,phase,camera}=latest.current;if(previousCamera!==camera){setCamera(camera);previousCamera=camera;}const waveOnly=['sound','frequency'].includes(id),frequency=p.frequency,depth=clamp(p.depth,1,8),focal=clamp(p.focus,.5,5),focusY=1.6-focal*.65;
    waveLab.visible=waveOnly;apparatus.visible=!waveOnly;
    for(let n=0;n<640;n++){const col=n%40,row=Math.floor(n/40),base=-3.85+col*.192,z=-1.05+(row%4)*.7,y=-.75+Math.floor(row/4)*.5,signal=frequency*.55*base-phase*Math.PI*8;dummy.position.set(base+.11*Math.sin(signal),y,z);dummy.scale.setScalar(.75+.7*Math.max(0,Math.cos(signal)));dummy.updateMatrix();particles.setMatrixAt(n,dummy.matrix);particles.setColorAt(n,new T.Color().setHSL(.55,.6,.37+.23*(.5+.5*Math.cos(signal))));}particles.instanceMatrix.needsUpdate=true;if(particles.instanceColor)particles.instanceColor.needsUpdate=true;piston.position.x=-4.25+.12*Math.sin(phase*frequency*Math.PI*4);
    const wavelength=clamp(2*Math.PI/(frequency*.55),.55,2.3);dimension.scale.x=wavelength;dimension.position.x=2.7*(wavelength-1);lambda.position.x=-2.7+wavelength*.5;
    const exploded=id==='transducer'?.35+.5*Math.sin(Math.PI*phase):0;caseMesh.material.transparent=id==='transducer';caseMesh.material.opacity=id==='transducer'?.22:1;back.position.y=.06+exploded;handle.position.y=.74+exploded;crystalLabel.visible=id==='transducer';gelLabel.visible=id==='transducer';probeLabel.visible=id!=='resolution';
    for(let n=0;n<48;n++){dummy.position.set(-1.2+n*.051,-.15+.035*Math.sin(phase*frequency*Math.PI*4+n*.09),0);dummy.scale.set(1,1,1);dummy.rotation.set(0,0,0);dummy.updateMatrix();piezo.setMatrixAt(n,dummy.matrix);}piezo.instanceMatrix.needsUpdate=true;
    const reflectorY=id==='echo'?1.5-depth*.45:-.55;target.position.y=reflectorY;targetLabel.position.y=reflectorY-.2;target.visible=targetLabel.visible=id!=='resolution';resolution.visible=id==='resolution';blur.forEach((o,i)=>o.scale.set(i<2?.12:.32*10/frequency,i<2?.31*10/frequency:.12,.13));
    focusMarker.position.y=focusY;focusMarker.visible=focusLabel.visible=['focus','resolution'].includes(id);focusLabel.position.y=focusY;
    const extent=id==='depth'?depth*.52:3.6;const width=y=>.2+Math.abs(y-focusY)*.45;
    let k=0;for(let n=0;n<48;n++){const a=n/48,b=(n+1)/48,y1=1.8-a*extent,y2=1.8-b*extent,w1=width(y1),w2=width(y2);for(const v of [[-w1,y1,0],[w1,y1,0],[-w2,y2,0],[w1,y1,0],[w2,y2,0],[-w2,y2,0]]){beamPosition[k++]=v[0];beamPosition[k++]=v[1];beamPosition[k++]=v[2];}}beamGeometry.attributes.position.needsUpdate=true;beamGeometry.computeVertexNormals();
    fronts.forEach((o,n)=>{const d=((phase*2+n/fronts.length)%1),y=1.8-d*extent;o.position.set(0,y,0);o.scale.set(width(y),.6,1);o.material.opacity=(id==='attenuation'?Math.pow(10,-.5*frequency*d*5/20):.75)*(.2+.5*Math.sin(d*Math.PI));});
    echoFronts.forEach((o,n)=>{const d=(phase*1.8+n*.12)%1;o.position.set(0,reflectorY+(1.8-reflectorY)*d,0);o.scale.setScalar(.7+.4*d);o.material.opacity=['echo','attenuation','tgc'].includes(id)?Math.pow(10,-.5*frequency*depth/20)*(.3+.7*d):0;});
    pulseLabel.visible=!['resolution','transducer'].includes(id);echoLabel.visible=['echo','attenuation','tgc'].includes(id);receiver.visible=['echo','attenuation','tgc'].includes(id);receiverLabel.visible=receiver.visible;
    const stamp=[id,frequency,depth,p.tgc,Math.round(phase*30)].join('|');if(receiver.visible&&stamp!==lastTrace){lastTrace=stamp;ctx.fillStyle='#0a2134';ctx.fillRect(0,0,800,470);ctx.strokeStyle='#254a66';for(let x=35;x<780;x+=65){ctx.beginPath();ctx.moveTo(x,90);ctx.lineTo(x,385);ctx.stroke();}for(let y=90;y<400;y+=50){ctx.beginPath();ctx.moveTo(35,y);ctx.lineTo(775,y);ctx.stroke();}ctx.fillStyle='#bbd8e7';ctx.font='30px Arial';ctx.fillText(id==='tgc'?'Recepción / TGC':'Tiempo de regreso',35,48);const amplitude=Math.pow(10,-.5*frequency*depth/20),receive=id==='tgc'?amplitude*Math.pow(10,p.tgc/100*.5*frequency*depth/20):amplitude,x0=70+depth/8*630;for(const [amp,color] of [[amplitude,'#6b91ab'],[Math.min(1,receive),'#ffc980']]){ctx.strokeStyle=color;ctx.lineWidth=4;ctx.beginPath();for(let i=0;i<700;i++){const x=45+i,y=350-Math.exp(-Math.pow((x-x0)/24,2))*240*amp;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.strokeStyle='#74dbe6';ctx.beginPath();ctx.moveTo(45+phase*700,90);ctx.lineTo(45+phase*700,385);ctx.stroke();ctx.fillStyle='#8eb3cb';ctx.font='23px Arial';ctx.fillText(id==='tgc'?'Amplificación de recepción':'Eco recibido',35,440);texture.needsUpdate=true;}
    controls.update();renderer.render(scene,cam);textRenderer.render(scene,cam);renderer.domElement.dataset.drawCalls=String(renderer.info.render.calls);
   });setReady(true);
   dispose=()=>{resizeObserver.disconnect();intersectionObserver.disconnect();renderer.setAnimationLoop(null);controls.dispose();const gs=new Set(geometries),ms=new Set(materials);scene.traverse(o=>{if(o.geometry)gs.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>ms.add(m));});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();textRenderer.domElement.remove();};
  }catch(e){if(!gone){setFailed(true);console.error('Laboratorio acústico 3D:',e.message);}}})();return()=>{gone=true;dispose();};
 },[]);
 return <div className="acoustic-bench"><div className="ab-stage" ref={host}/>{!ready&&<div className="ab-status" role="status">{failed?'Usa la vista Corte para continuar.':'Preparando los objetos 3D…'}</div>}<span className="ab-scale-note">Escalas y tiempos ampliados</span><div className="ab-camera" aria-label="Cámaras del laboratorio">{[['space','Volumen'],['front','Frontal'],['probe','Acercar']].map(([id,label])=><button key={id} aria-pressed={camera===id} onClick={()=>setCamera(id)}>{label}</button>)}<button aria-label="Restablecer cámara acústica" onClick={()=>{setCamera('space');api.current?.reset();}}><RotateCcw size={14}/></button></div></div>;
}
