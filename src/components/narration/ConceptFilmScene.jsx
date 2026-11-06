import {useEffect,useRef,useState} from 'react';
import {sampleConceptFilm} from '../../simulation/conceptFilm';
import {buildConceptFilmScene} from './buildConceptFilmScene';

export default function ConceptFilmScene({film,audio,getTime,playing,reducedMotion}){
 const host=useRef(null),latest=useRef({}),[status,setStatus]=useState('loading');latest.current={getTime,playing,reducedMotion};
 useEffect(()=>{
  let gone=false,dispose=()=>{};setStatus('loading');
  (async()=>{try{
   const [T,{OrbitControls}]=await Promise.all([import('three'),import('three/addons/controls/OrbitControls.js')]);if(gone||!host.current)return;
   const mount=host.current,renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setClearColor(0xf2f7fa);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','Escena tridimensional educativa: '+film.title);mount.appendChild(renderer.domElement);
   const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.05,100),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=3.5;controls.maxDistance=22;controls.target.set(0,0,0);const model=buildConceptFilmScene(T,scene,film);let visible=true,lastScreen=-1,manual=false,lastTime=-1;
   const resize=new ResizeObserver(([entry])=>{const {width,height}=entry.contentRect;if(width&&height){renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();}});resize.observe(mount);
   const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});visibility.observe(mount);
   controls.addEventListener('start',()=>{if(!latest.current.playing)manual=true;});
   const initial=sampleConceptFilm(film,0,audio,{reducedMotion:latest.current.reducedMotion});camera.position.set(...initial.camera.position);controls.target.set(...initial.camera.target);camera.lookAt(controls.target);
   renderer.setAnimationLoop(()=>{
    if(gone||document.hidden||!visible)return;const state=latest.current,time=state.getTime(),s=sampleConceptFilm(film,time,audio,{reducedMotion:state.reducedMotion});
    controls.enabled=!state.playing;
    if(state.playing||Math.abs(time-lastTime)>.15){manual=false;camera.position.set(...s.camera.position);controls.target.set(...s.camera.target);camera.lookAt(controls.target);}
    if(!manual&&!state.playing){camera.position.set(...s.camera.position);controls.target.set(...s.camera.target);}
    // Geometry samples the audio clock. No accumulated phase survives a seek.
    if(time!==lastTime)model.sample(s);controls.update();renderer.render(scene,camera);lastTime=time;
    if(Math.abs(time-lastScreen)>.1){mount.dataset.filmTime=time.toFixed(3);mount.dataset.filmScene=String(s.scene);mount.dataset.drawCalls=String(renderer.info.render.calls);lastScreen=time;}
   });
   dispose=()=>{resize.disconnect();visibility.disconnect();renderer.setAnimationLoop(null);controls.dispose();model.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};setStatus('ready');
  }catch(error){if(!gone){setStatus('error');console.error('Escena narrada '+film.id+':',error.message);}}})();
  return()=>{gone=true;dispose();};
 },[film.id,audio]);
 return <div className="concept-film-viewport" ref={host}>{status!=='ready'&&<div className="concept-film-status" role="status">{status==='error'?(audio?'No se pudo abrir el 3D. Puedes escuchar la narración y seguir los subtítulos.':'No se pudo abrir el 3D. La lámina animada de abajo sigue disponible.'):'Preparando la escena 3D…'}</div>}</div>;
}
