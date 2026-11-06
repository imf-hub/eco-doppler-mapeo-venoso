import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {motion,useAnimationFrame,useInView,useReducedMotion} from 'motion/react';
import {Play,Pause,RotateCcw,Box,ScanLine,ChartNoAxesCombined,Columns2,Maximize2,Minimize2,BookOpen,ArrowUpRight,SlidersHorizontal} from 'lucide-react';
import {conceptById} from '../../data/visualCurriculum';
import {computeVisualMetrics,VISUAL_DEFAULTS} from '../../simulation/visualScience';
import ScientificDiagram from './ScientificDiagram';
import './VisualExplainer.css';
const Volume=lazy(()=>import('./ConceptVolumeScene'));
const icons={volume:Box,section:ScanLine,graph:ChartNoAxesCombined,compare:Columns2};
function parametersFor(concept,value,external,guided){
 const p={...VISUAL_DEFAULTS,...(['filter','power'].includes(concept.id)?{speed:3}:{}),[concept.primaryParameter.key]:value,...external};
 if(guided){Object.assign(p,{level:guided.level,pressure:guided.pressure,rotation:guided.rotation,inverted:guided.marker,mode:guided.mode,region:guided.region,maneuver:guided.maneuver,position:guided.position,support:guided.support,unloaded:guided.unloaded});
  const beamAngle=Math.acos(Math.min(1,Math.abs(Math.sin(guided.rotation*Math.PI/180)*Math.sin(guided.tilt*Math.PI/180))))*180/Math.PI;
  p.angle=['orientation','perforator'].includes(concept.id)?guided.rotation:concept.id==='position'?(guided.position==='standing'?90:guided.position==='reverse'?45:0):beamAngle;
 }
 if(['reflux','valves','spectral'].includes(concept.id)&&!guided&&external.maneuver===undefined)p.maneuver=true;
 return p;
}
function readouts(concept,p){
 const m=computeVisualMetrics(p),key=concept.id;
 if(['sound','frequency','resolution','transducer'].includes(key))return [['Frecuencia',p.frequency.toFixed(1),'MHz'],['Longitud de onda',m.wavelengthMM.toFixed(3),'mm'],['Medio asumido','1540','m/s']];
 if(['echo','attenuation','depth'].includes(key))return [['Profundidad',p.depth.toFixed(1),'cm'],['Ida y vuelta',m.echoTimeUS.toFixed(1),'μs'],['Frecuencia',p.frequency.toFixed(1),'MHz']];
 if(key==='power')return [['Visualiza','Amplitud',''],['Dirección','No codificada',''],['Señal','Depende de ajustes','']];
 if(key==='filter')return [['Filtro',p.filter,'Hz'],['Desplazamiento físico',Math.round(m.dopplerHz),'Hz'],['Señal del modelo',m.signalAboveFilter?'Conservada':'Filtrada','']];
 if(['doppler','angle','nyquist','color','spectral','reflux'].includes(key))return [['Desplazamiento',Math.round(m.dopplerHz),'Hz'],['Nyquist ±',Math.round(m.nyquistHz),'Hz'],['Muestreo',p.prf.toFixed(1),'kHz']];
 if(['anatomy','cartography'].includes(key))return [['Referencia','Derecho',''],['Capas','4','disponibles'],['Representación','3D + cortes','']];
 if(key==='position')return [['Apoyo inclinado',p.angle,'° ilustrativos'],['Objetivo','Reflujo',''],['Prioridad','Tolerancia','']];
 if(key==='orientation')return [['Giro de sonda',p.rotation??p.angle,'°'],['Operaciones','Giro ≠ inclinación',''],['Identidad','Continuidad','']];
 const primary=concept.primaryParameter;return [[primary.label,p[primary.key],primary.unit],['Interpretación','Depende del contexto',''],['Escena','Didáctica','']];
}

export default function VisualExplainer({conceptId='sound',initialView='volume',guidedState=null,phase:externalPhase,playing:externalPlaying=false,isError=false,correcting=false,parameters:externalParameters={},compact=false}){
 const concept=conceptById[conceptId]||conceptById.sound,root=useRef(null),visible=useInView(root,{margin:'100px'}),reduce=useReducedMotion();
 const controlled=Number.isFinite(externalPhase),[view,setView]=useState(()=>window.innerWidth<850&&initialView==='volume'&&!['anatomy','position','orientation'].includes(conceptId)?'section':initialView),[value,setValue]=useState(concept.primaryParameter.initial),[phase,setPhase]=useState(.18),[playing,setPlaying]=useState(false),[speed,setSpeed]=useState(1),[expanded,setExpanded]=useState(false),[linked,setLinked]=useState(false);const tick=useRef(0);
 useEffect(()=>{setValue(concept.primaryParameter.initial);setPhase(.18);setPlaying(false);},[conceptId]);
 useEffect(()=>{if(reduce)setPlaying(false);},[reduce]);
 useAnimationFrame((time,delta)=>{if(controlled||!playing||reduce||!visible||document.hidden){tick.current=0;return;}tick.current+=Math.min(delta,120);if(tick.current<30)return;const elapsed=tick.current;tick.current=0;setPhase(p=>(p+elapsed/8000*speed)%1);});
 useEffect(()=>{if(!expanded)return;const previous=document.activeElement,old=document.body.style.overflow;document.body.style.overflow='hidden';root.current?.querySelector('[data-vs-expand]')?.focus();const keys=e=>{if(e.key==='Escape')setExpanded(false);if(e.key==='Tab'){const all=[...root.current.querySelectorAll('button:not(:disabled),a,input,select,[tabindex="0"]')].filter(el=>el.getClientRects().length);if(!all.length)return;const first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};document.addEventListener('keydown',keys);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',keys);if(previous?.isConnected)previous.focus();};},[expanded]);
 const currentPhase=controlled?externalPhase:phase,p=parametersFor(concept,value,externalParameters,guidedState),primary=concept.primaryParameter;
 if(guidedState&&conceptId==='documentation')p.gain=correcting?30+currentPhase*70:isError?30:100;
 const reading=readouts(concept,p);
 const before={...p,[primary.key]:concept.comparison.before},after={...p,[primary.key]:concept.comparison.after};
 if(conceptId==='continuity'){before.level=concept.comparison.before;after.level=concept.comparison.after;}
 const draw=(kind,params=p,small=false)=>kind==='volume'?<Suspense fallback={<div className="vs-loading" role="status">Preparando el volumen 3D…</div>}><Volume concept={concept} parameters={params} phase={currentPhase} guidedState={guidedState} isError={isError}/></Suspense>:<ScientificDiagram concept={concept} view={kind} parameters={params} phase={currentPhase} isError={isError} correcting={correcting} comparison={small}/>;
 return <section ref={root} className={'visual-explainer '+(compact?'vs-compact ':'')+(expanded?'vs-expanded':'')} role={expanded?'dialog':undefined} aria-modal={expanded||undefined} aria-label={'Explorador visual: '+concept.title}>
 <div className="vs-topline"><span><span className="vs-edition-dot"/> ESTUDIO VISUAL · {concept.group.toUpperCase()}</span><button data-vs-expand type="button" aria-label={expanded?'Cerrar vista ampliada':'Ampliar estudio visual'} onClick={()=>setExpanded(!expanded)}>{expanded?<Minimize2 size={16}/>:<Maximize2 size={16}/>}</button></div>
 <div className="vs-title"><div><span className="vs-question">{concept.question}</span><h3>{concept.title}</h3><p>{concept.summary}</p></div><span className="vs-view-count">4 representaciones<br/><b>Un mismo mecanismo</b></span></div>
 <div className="vs-view-tabs" role="group" aria-label="Representaciones del concepto">{concept.views.map(tab=>{const Icon=icons[tab.id];return <button key={tab.id} aria-pressed={view===tab.id} onClick={()=>setView(tab.id)}><Icon size={18}/><span>{tab.label}</span></button>;})}</div>
 <div className="vs-view-purpose"><span>{view==='volume'?'01':view==='section'?'02':view==='graph'?'03':'04'}</span><p>{concept.views.find(v=>v.id===view)?.what}</p><strong className={isError?'vs-error':''}>{correcting?'CORRECCIÓN EN CURSO':isError?'EJEMPLO DE ERROR':'OBSERVA LA RELACIÓN'}</strong></div>
 <div className="vs-stage-shell">{view==='compare'?<div className="vs-comparison">{[[concept.comparison.beforeLabel,before],[concept.comparison.afterLabel,after]].map(([label,params],i)=><article key={i}><div className="vs-comparison-label"><b>{i?'B':'A'}</b><span>{label}</span><output>{params[primary.key]} {primary.unit}</output></div>{draw('section',params,true)}</article>)}</div>:draw(view)}</div>
 {view!=='compare'&&<div className="vs-readouts">{reading.map(([name,value,unit])=><div key={name}><span>{name}</span><strong>{value} <small>{unit}</small></strong></div>)}</div>}
 {!controlled&&<div className="vs-playback"><div className="vs-playback-actions"><button className="vs-play-button" onClick={()=>{tick.current=0;setPlaying(!playing);}} disabled={!!reduce}>{playing?<Pause size={17}/>:<Play size={17}/>} {playing?'Pausar movimiento':'Reproducir movimiento'}</button><button className="vs-small-button" aria-label="Reiniciar demostración visual" onClick={()=>{setPlaying(false);setPhase(0);}}><RotateCcw size={16}/></button><label>Velocidad<select aria-label="Velocidad de demostración" value={speed} onChange={e=>setSpeed(+e.target.value)}><option value=".5">0.5× · lenta</option><option value="1">1×</option><option value="1.5">1.5×</option></select></label></div><label className="vs-timeline">Recorre la animación <output>{Math.round(currentPhase*100)}%</output><input type="range" min="0" max="100" step="1" value={Math.round(currentPhase*100)} aria-label="Recorrido de la animación visual" onChange={e=>{setPlaying(false);setPhase(+e.target.value/100);}}/></label>{reduce&&<p className="vs-access-note">Movimiento reducido: usa el recorrido manual para observar cada fase.</p>}</div>}
 {!guidedState&&view!=='compare'&&<div className="vs-variable"><div><SlidersHorizontal size={20}/><label htmlFor={'visual-param-'+concept.id}>{primary.label}<small>Modifica una variable y observa sus consecuencias en las vistas.</small></label><output>{value} {primary.unit}</output></div><input id={'visual-param-'+concept.id} aria-label={primary.label} type="range" min={primary.min} max={primary.max} step={primary.step} value={value} onChange={e=>setValue(+e.target.value)}/><div className="vs-range-labels"><span>{primary.min} {primary.unit}</span><span>{primary.max} {primary.unit}</span></div></div>}
 <div className="vs-explanation"><div><span className="vs-small-heading">Por qué sucede</span><p>{concept.mechanism}</p></div><div><span className="vs-small-heading">Qué debes seguir con la mirada</span><ol>{concept.observe.map(s=><li key={s}>{s}</li>)}</ol></div></div><div className="vs-pitfall"><strong>Evita esta confusión</strong><p>{concept.pitfall}</p></div>
 {!compact&&<><button type="button" className="vs-linked-toggle" aria-expanded={linked} onClick={()=>setLinked(!linked)}><Columns2 size={17}/>{linked?'Ocultar representaciones vinculadas':'Ver juntas el corte y su gráfico'}</button>{linked&&<div className="vs-linked">{['section','graph'].map(kind=><article key={kind}><h4>{kind==='section'?'Qué ocurre en el corte':'Cómo se expresa en el gráfico'}</h4>{draw(kind,p,true)}</article>)}</div>}</>}
 <div className="vs-references"><span><BookOpen size={16}/>Referencias gráficas para ampliar</span><div>{concept.referenceLinks.map(r=><a key={r.url} href={r.url} target="_blank" rel="noreferrer"><small>{r.kind}</small><strong>{r.title}</strong><ArrowUpRight size={16}/></a>)}</div></div><p className="vs-model-note">Exploraciones visuales educativas: los gráficos y movimientos son originales y simplificados; las mallas anatómicas identifican su procedencia. Los valores de controles no son presets clínicos universales.</p>
 </section>;
}
