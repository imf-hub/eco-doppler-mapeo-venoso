import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {motion,useAnimationFrame,useInView,useReducedMotion} from 'motion/react';
import {ArrowUpRight,ArrowRight,Play,Pause,RotateCcw,Move3D,ScanLine,Waves,Layers,Hand,BookOpen} from 'lucide-react';
import {conceptById} from '../../data/visualCurriculum';
import {VISUAL_DEFAULTS} from '../../simulation/visualScience';
import {methodologyHref,glossaryHref,consensusHref} from '../../methodologyRoutes';
import ScientificDiagram from './ScientificDiagram';
const Volume=lazy(()=>import('./ConceptVolumeScene'));
const stations=[
 {id:'valves',name:'Válvulas',icon:Waves,cue:'Sigue las valvas y el flujo durante la maniobra ilustrada.',action:'Modifica la rapidez del flujo.',link:'valvula-venosa',detail:'Apertura, coaptación y flujo son parte de un mismo mecanismo.'},
 {id:'pressure',name:'Compresión',icon:Hand,cue:'Comprime el modelo y observa la aproximación de las paredes.',action:'Aumenta y libera la compresión.',link:'compresibilidad',detail:'La presión es ilustrativa. Comprueba la luz en el corte; no equivale a fuerza medida.'},
 {id:'angle',name:'Ángulo Doppler',icon:ScanLine,cue:'Cambia el ángulo entre haz y flujo; el flujo sigue presente a 90°.',action:'Compara un haz oblicuo con uno perpendicular.',link:'angulo-doppler',detail:'El ángulo relaciona el haz con el flujo. No es lo mismo que girar de transversal a longitudinal.'},
 {id:'anatomy',name:'Anatomía',icon:Layers,cue:'Gira el miembro derecho y relaciona vena, fascia y plano de imagen.',action:'Explora las capas y recupera el contexto.',link:null,detail:'Anatomía de referencia Z-Anatomy / BodyParts3D. No representa todas las variantes.'}
];
export default function LaboratoryHome({navigate}){
 const [id,setId]=useState('valves'),[value,setValue]=useState(null),[phase,setPhase]=useState(.12),[playing,setPlaying]=useState(false);
 const root=useRef(null),visible=useInView(root),reduce=useReducedMotion();
 const station=stations.find(s=>s.id===id),concept=conceptById[id],control=concept.primaryParameter,current=value??control.initial;
 const parameters={...VISUAL_DEFAULTS,[control.key]:current,maneuver:true};
 useEffect(()=>{document.title='Laboratorio de Eco-Doppler y mapeo venoso · IMF';setPlaying(!reduce);},[]);
 useEffect(()=>{if(reduce)setPlaying(false);},[reduce]);
 useAnimationFrame((time,delta)=>{if(playing&&!reduce&&visible&&!document.hidden)setPhase(p=>{const next=p+Math.min(delta,80)/10000;if(next>=1){setPlaying(false);return 1;}return next;});});
 function choose(next){setId(next);setValue(null);setPhase(.12);setPlaying(false);}
 return <div className="lab-home" ref={root}>
  <div className="lab-intro"><div><span className="lab-kicker"><span/> LABORATORIO DE ECO-DOPPLER</span><h1>Compréndelo.<br/><em>Hazlo visible.</em></h1><p>Explora el mecanismo. Aprende el rastreo. Construye el mapa.</p></div><a className="lab-primary" href={methodologyHref('preparar')}>Comenzar el mapeo <ArrowUpRight size={19}/></a></div>
  <div className="lab-stations" role="group" aria-label="Experimentos del laboratorio">{stations.map((s,i)=>{const Icon=s.icon;return <button key={s.id} aria-pressed={id===s.id} onClick={()=>choose(s.id)}>{id===s.id&&<motion.span className="lab-station-active" layoutId="lab-station" transition={{duration:reduce?0:.2}}/>}<span className="lab-station-number">0{i+1}</span><Icon size={20}/><span>{s.name}</span><ArrowUpRight size={16}/></button>;})}</div>
  <div className="lab-workbench">
   <section className="lab-object" aria-label="Escenario interactivo del laboratorio">
    <div className="lab-object-top"><span><Move3D size={15}/>Exploración 3D</span><span>Arrastra para girar · acerca para explorar</span></div>
    <div className="lab-object-canvas"><Suspense fallback={<div className="lab-preparing" role="status">Preparando el modelo interactivo…</div>}><Volume key={id} concept={concept} parameters={parameters} phase={phase}/></Suspense></div>
    <div className="lab-object-bottom"><span>Modelo educativo · escalas ilustrativas</span><button onClick={()=>navigate('visuales',id)}>Abrir laboratorio completo <ArrowUpRight size={15}/></button></div>
   </section>
   <aside className="lab-console" aria-label="Controles del experimento">
    <div className="lab-console-title"><span>EXPERIMENTA</span><h2>{station.name}</h2><p>{station.action}</p></div>
    <label className="lab-adjustment"><span>{control.label}</span><output>{current}<small>{control.unit}</small></output><input aria-label={'Laboratorio: '+control.label} type="range" min={control.min} max={control.max} step={control.step} value={current} onChange={e=>{setValue(+e.target.value);setPlaying(false);}}/></label>
    <div className="lab-scope"><div><ScanLine size={14}/><span>{id==='anatomy'?'Corte anatómico de referencia':'Mismo ajuste · otra representación'}</span></div><ScientificDiagram concept={concept} view="section" parameters={parameters} phase={phase} minimal/></div>
    <div className="lab-time"><button disabled={!!reduce} aria-label={playing?'Pausar experimento':'Reproducir experimento'} onClick={()=>{if(phase>=1)setPhase(0);setPlaying(!playing);}}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><input aria-label="Instante del experimento" type="range" min="0" max="100" value={Math.round(phase*100)} onChange={e=>{setPhase(+e.target.value/100);setPlaying(false);}}/><button aria-label="Reiniciar experimento" onClick={()=>{setPhase(.12);setValue(null);setPlaying(false);}}><RotateCcw size={16}/></button></div>
    <p className="lab-cue" role="status">{station.cue}</p>
    <details className="lab-explanation"><summary><BookOpen size={14}/> Qué estás observando</summary><p>{station.detail}</p>{station.link?<a href={glossaryHref(station.link)}>Consultar concepto y fuentes <ArrowUpRight size={13}/></a>:<><button className="text-btn" onClick={()=>navigate('anatomia')}>Abrir anatomía y adquisición <ArrowUpRight size={13}/></button><a href={new URL('media/anatomy-v2/ATTRIBUTION.txt',document.baseURI).href} target="_blank" rel="noreferrer">Procedencia y licencia · CC BY-SA 4.0</a></>}</details>
   </aside>
  </div>

  <nav className="lab-route" aria-label="Continúa tu aprendizaje"><div><span>DEL MECANISMO AL MAPEO</span><h2>Tu siguiente movimiento.</h2></div><a href={methodologyHref()}><MapIcon/><span><strong>Recorrer la metodología</strong><small>Paciente, sonda, rastreo y registro</small></span><ArrowRight size={19}/></a><a href={glossaryHref()}><Waves size={23}/><span><strong>Explorar conceptos</strong><small>80 mecanismos con controles</small></span><ArrowRight size={19}/></a><a href={consensusHref()}><Layers size={23}/><span><strong>Aplicar el consenso</strong><small>Plantilla, símbolos y nomenclatura</small></span><ArrowRight size={19}/></a></nav>
 </div>;
}
function MapIcon(){return <Move3D size={23}/>;}
