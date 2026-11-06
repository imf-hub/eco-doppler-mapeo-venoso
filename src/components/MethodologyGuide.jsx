import {useEffect,useRef,useState} from 'react';
import {Play,Pause,SkipBack,SkipForward,TriangleAlert,CheckCircle2,BookOpen,ArrowRight} from 'lucide-react';
import {methodologyByStep} from '../data/methodology';
import {mappingSources} from '../data/mapping';
import {interpolateVisual} from '../simulation/methodologyMotion';
import VisualExplainer from './visual/VisualExplainer';
import {methodologyVisualMap} from '../data/visualCurriculum';
import Quiz from './Quiz';
import './MethodologyGuide.css';

export default function MethodologyGuide({stepId,completed=[],onComplete,navigate,showQuickGuide=true}){
 const guide=methodologyByStep[stepId],root=useRef(null),visible=useRef(true);
 const [index,setIndex]=useState(0),[phase,setPhase]=useState(1),[variant,setVariant]=useState('correct'),[playing,setPlaying]=useState(false),[playKind,setPlayKind]=useState('sequence');
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{setReduced(media.matches);if(media.matches){setPlaying(false);setPhase(1);setVariant('correct');}};media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>visible.current=entry.isIntersecting);if(root.current)observer.observe(root.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{setIndex(0);setPhase(1);setPlaying(false);setVariant('correct');},[stepId]);
 useEffect(()=>{
  if(!playing||reduced||!guide)return;let raf,last=0,paint=0,elapsed=phase*6000,stopped=false;
  function tick(now){if(stopped)return;raf=requestAnimationFrame(tick);const delta=last?Math.min(now-last,150):0;last=now;if(document.hidden||!visible.current)return;elapsed+=delta;if(now-paint<25)return;paint=now;const p=Math.min(1,elapsed/6000);setPhase(p);
   if(p>=1){stopped=true;cancelAnimationFrame(raf);if(playKind==='sequence'&&index<guide.frames.length-1){setIndex(i=>i+1);setPhase(0);}else{setPlaying(false);setVariant('correct');}}
  }raf=requestAnimationFrame(tick);return()=>{stopped=true;cancelAnimationFrame(raf);};
 },[playing,index,playKind,stepId,reduced]);
 if(!guide)return null;
 const frame=guide.frames[Math.min(index,guide.frames.length-1)],correcting=variant==='transition'&&phase<1,isError=variant==='error'||(variant==='transition'&&phase<.5);
 const visual=variant==='transition'?interpolateVisual(frame.errorVisual,frame.visual,phase):variant==='error'?frame.errorVisual:frame.visual;
 const kind=frame.visual.kind;
 const conceptId=frame.errorCode==='missing-context'?'documentation':frame.errorCode==='pressure'?'pressure':['giro-sobre-el-vaso','giro-centrado'].includes(frame.id)?'orientation':frame.id==='cruce-fascial'?'perforator':kind==='position'?'position':kind==='compression'?'deep':kind==='orient'?'angle':kind==='reflux'?'reflux':kind==='measure'?'measurement':kind==='map'?'cartography':kind==='report'?'documentation':kind==='setup'?'transducer':(methodologyVisualMap[stepId]||'continuity');
 const count=guide.frames.filter(f=>completed.includes(`method-${stepId}-${f.id}`)).length;
 function select(i){setIndex(i);setPlaying(false);setVariant('correct');setPhase(1);}
 function sequence(){setIndex(0);setPhase(0);setVariant('transition');setPlayKind('sequence');setPlaying(true);}
 function correct(){setPhase(reduced?1:0);setVariant(reduced?'correct':'transition');setPlayKind('correction');setPlaying(!reduced);}
 return <section ref={root} className="methodology-guide" aria-label="Demostración de metodología"><div className="mg-heading"><div><span className="eyebrow">Observa · compara · decide</span><h3>La acción, paso a paso.</h3><p>Relaciona lo que haces con lo que debes comprobar. Cada ejemplo contrasta un error con su corrección.</p></div><span className="mg-count">{count}/{guide.frames.length} comprobaciones</span></div>
 <div className="mg-frame-list" role="group" aria-label="Momentos de la demostración">{guide.frames.map((f,i)=><button key={f.id} type="button" aria-pressed={index===i} onClick={()=>select(i)}><b>{completed.includes(`method-${stepId}-${f.id}`)?<CheckCircle2 size={17}/>:String(i+1).padStart(2,'0')}</b><span>{f.title}</span></button>)}</div>
 <div className="mg-current"><span>Momento {index+1} de {guide.frames.length}</span><h4>{frame.title}</h4><p>{frame.action}</p></div>
 <div className="mg-toolbar"><button className="btn small" type="button" disabled={reduced} onClick={()=>playing?setPlaying(false):sequence()}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'Pausar':'Reproducir secuencia'}</button><button type="button" className="icon-btn" aria-label="Momento anterior" disabled={index===0} onClick={()=>select(index-1)}><SkipBack size={17}/></button><button type="button" className="icon-btn" aria-label="Momento siguiente" disabled={index===guide.frames.length-1} onClick={()=>select(index+1)}><SkipForward size={17}/></button></div>
 {reduced&&<p className="mg-motion-note">Movimiento reducido: recorre los momentos con Anterior/Siguiente. La corrección se muestra sin transición.</p>}
 <VisualExplainer key={conceptId} conceptId={conceptId} guidedState={visual} phase={phase} playing={playing} isError={isError} correcting={correcting} initialView="volume" compact/>
 <label className="mg-timeline">Recorre la corrección a tu ritmo <output>{Math.round(phase*100)}%</output><input type="range" min="0" max="100" step="1" value={Math.round(phase*100)} aria-label="Momento de la corrección" onChange={e=>{setPlaying(false);setVariant('transition');setPhase(+e.target.value/100);}}/></label>
 <div className="mg-comparison-controls"><button type="button" aria-pressed={variant==='error'} onClick={()=>{setPlaying(false);setVariant('error');setPhase(0);}}><TriangleAlert size={16}/>Ver el error frecuente</button><button type="button" onClick={correct}><Play size={16}/>{reduced?'Mostrar corrección':'Corregir con animación'}</button></div>
 <div className="mg-feedback-grid"><div className={isError&&!correcting?'active-error':''}><span>Error que debes reconocer</span><p>{frame.error}</p></div><div className={!isError&&!correcting?'active-correct':''}><span>Cómo lo corriges</span><p>{frame.correction}</p></div></div><div className="mg-screen-check"><CheckCircle2 size={19}/><p><strong>Qué debes comprobar</strong>{frame.screen}</p></div>
 {frame.visual.kind==='reflux'&&<p className="mg-motion-note">La traza ilustra aumento distal y liberación con una respuesta inventada. No representa Valsalva ni la hemodinámica de un paciente. La respuesta de Valsalva se observa durante el esfuerzo según el protocolo.</p>}
 <div className="mg-frame-quiz" onFocusCapture={()=>setPlaying(false)}><Quiz key={stepId+'-'+frame.id} compact quiz={frame.quiz} onPass={()=>onComplete?.(`method-${stepId}-${frame.id}`)}/>{completed.includes(`method-${stepId}-${frame.id}`)&&<p className="mg-recorded"><CheckCircle2 size={15}/>Comprobación de este momento registrada.</p>}</div>
 {showQuickGuide&&<aside className="mg-quick"><h4><BookOpen size={18}/>Guía rápida de esta etapa</h4><ol>{guide.quickGuide.map(item=><li key={item}>{item}</li>)}</ol><div className="mg-stop"><TriangleAlert size={18}/><p><strong>Cuándo detenerte y corregir</strong>{guide.stopRule}</p></div>{navigate&&<button type="button" className="text-btn" onClick={()=>navigate('guias',stepId)}>Abrir todas las guías rápidas <ArrowRight size={15}/></button>}</aside>}
 <div className="mg-sources">{guide.sourceIds.map(id=><a key={id} href={mappingSources[id].url} target="_blank" rel="noreferrer">{mappingSources[id].title}</a>)}</div>
 </section>;
}
