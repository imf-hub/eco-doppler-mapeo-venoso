import {lazy,Suspense,useEffect,useId,useRef,useState} from 'react';
import {useAnimationFrame,useInView,useReducedMotion} from 'motion/react';
import {ArrowLeft,ArrowRight,Play,Pause,RotateCcw,Maximize2,BookOpen,Box,ExternalLink,ChevronLeft,ChevronRight} from 'lucide-react';
import {glossarySpecs} from '../../data/glossarySpecs';
import {glossaryContent,glossarySources} from '../../data/glossaryContent';
import {glossaryHref,methodologyHref} from '../../methodologyRoutes';
import {ClinicalImage,clinicalMedia} from '../visual/MediaLibrary';
import {conceptById} from '../../data/visualCurriculum';
import './GlossaryWebsite.css';
import ConceptIndex from '../learning/ConceptIndex';
import LearningNext from '../learning/LearningNext';
import {courseTermOrder,courseLocation} from '../../data/conceptCourse';
import '../learning/learning.css';
const VisualPlayer=lazy(()=>import('../visual/VisualPlayer'));
const Acoustic=lazy(()=>import('./AcousticGlossaryAnimation'));
const Doppler=lazy(()=>import('./DopplerGlossaryAnimation'));
const AcousticVolume=lazy(()=>import('../visual/AcousticBench3D'));
const Volume=lazy(()=>import('../visual/ConceptVolumeScene'));
export const glossaryTerms=glossarySpecs.map(spec=>{
 if(!glossaryContent[spec.id])throw Error('Falta el contenido de '+spec.id);
 return {...spec,...glossaryContent[spec.id]};
}).sort((a,b)=>a.title.localeCompare(b.title,'es',{sensitivity:'base'}));
const byId=Object.fromEntries(glossaryTerms.map(t=>[t.id,t]));
const format=n=>new Intl.NumberFormat('es-MX',{maximumFractionDigits:3}).format(n);
function AnimatedPlate({term,value,phase,compact=false}){
 const Renderer=term.engine==='acoustic'?Acoustic:Doppler;
 return <Suspense fallback={<div className="g5-loading" role="status">Preparando la demostración de {term.title}…</div>}><Renderer term={term} value={value} phase={phase} compact={compact}/></Suspense>;
}
function ConceptStage({term,preview=false,simple=false,interactive=true}){
 const ref=useRef(null),visible=useInView(ref),reduce=useReducedMotion(),clock=useRef(0),modal=useRef(null),parameterId=useId();
 const [value,setValue]=useState(term.control.initial),[phase,setPhase]=useState(0),[playing,setPlaying]=useState(true),[speed,setSpeed]=useState(.5),[expanded,setExpanded]=useState(false);
 useEffect(()=>{setValue(term.control.initial);setPhase(0);setPlaying(!reduce&&(!simple||!interactive));},[term.id,reduce,simple,interactive]);
 useAnimationFrame((time,delta)=>{
  if(!playing||reduce||(!visible&&!expanded)||document.hidden){clock.current=0;return;}
  clock.current+=Math.min(delta,100);if(clock.current<32)return;const elapsed=clock.current;clock.current=0;
  setPhase(p=>{const next=p+elapsed/6500*speed;if(next>=1){setPlaying(false);return 1;}return next;});
 });
 useEffect(()=>{const stop=()=>setPlaying(false);window.addEventListener('beforeprint',stop);return()=>window.removeEventListener('beforeprint',stop);},[]);
 useEffect(()=>{
  if(!expanded)return;const previous=document.activeElement,old=document.body.style.overflow,dialog=modal.current;
  document.body.style.overflow='hidden';dialog.showModal();
  return()=>{dialog.close();document.body.style.overflow=old;previous?.focus();};
 },[expanded]);
 function play(){if(phase>=1)setPhase(0);setPlaying(!playing);}
 function move(next){setPhase(Math.max(0,Math.min(1,next)));setPlaying(false);}
 function parameter(next){setValue(+next);setPlaying(false);}
 const step=Math.min(2,Math.floor(phase*3));
 const guided=simple&&!interactive&&['ganancia','ganancia-color','tgc'].includes(term.id),demoValues=[25,50,85];
 const shownValue=guided?demoValues[step]:value;

 const playback=(large=false)=><div className={'g5-playback '+(simple?'learn-playback':'')}><button className="g5-play" disabled={!!reduce} onClick={play} aria-label={(playing?'Pausar':'Reproducir')+(large?' animación ampliada':' animación')}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{playing?'Pausar':'Reproducir'}</span></button><button aria-label={large?'Reiniciar lámina ampliada':'Reiniciar animación del concepto'} onClick={()=>move(0)}><RotateCcw size={16}/></button>{!simple&&<><input aria-label={large?'Instante de la lámina ampliada':'Instante de la animación'} type="range" min="0" max="100" step="0.1" value={Math.round(phase*1000)/10} onChange={e=>move(+e.target.value/100)}/><label><span>Velocidad</span><select aria-label={large?'Velocidad ampliada':'Velocidad de la animación del concepto'} value={speed} onChange={e=>setSpeed(+e.target.value)}><option value="0.25">0,25×</option><option value="0.5">0,5×</option><option value="1">1×</option></select></label><button aria-label="Retroceder instante" onClick={()=>move(phase-1/40)}><ChevronLeft size={17}/></button><button aria-label="Avanzar instante" onClick={()=>move(phase+1/40)}><ChevronRight size={17}/></button></>}</div>;
 const adjustment=(large=false)=><label className="g5-adjustment" htmlFor={parameterId+(large?'-large':'')}><span>{term.control.label}</span><input id={parameterId+(large?'-large':'')} aria-label={term.control.label+(large?' · ampliada':'')} type="range" min={term.control.min} max={term.control.max} step={term.control.step} value={value} onChange={e=>parameter(e.target.value)}/><output>{format(value)} <small>{term.control.unit}</small></output></label>;
 return <section className={'g5-animation '+(preview?'g5-animation-preview':'')+(simple?' learn-simple':'')} ref={ref} aria-label={(simple?(interactive?'Práctica de ':'Idea central de '):'Animación de ')+term.title} data-term-animation={term.id}>
  <div className="g5-animation-top"><span>MECANISMO ANIMADO · {term.title}</span><button onClick={()=>setExpanded(true)} aria-label={'Ampliar animación de '+term.title}><Maximize2 size={16}/> Ampliar</button></div>
  <div className="g5-stage">{expanded?<div className="g5-loading">Lámina abierta a mayor tamaño.</div>:<AnimatedPlate term={term} value={shownValue} phase={phase} compact={preview}/>}</div>
  <p className="g5-action-cue"><span>{String(step+1).padStart(2,'0')}</span>{term.observe[step]}</p>
  {guided&&<p className="learn-demo-label">Demostración guiada: ganancia baja → media → alta. Emisión fija.</p>}
  {playback()}{interactive&&<>{adjustment()}<button className="learn-reset-adjustment" onClick={()=>{setValue(term.control.initial);move(0);}}>Restablecer ajuste inicial</button></>}
  {simple&&<details className="learn-timeline"><summary>Recorrer la animación lentamente</summary><input aria-label="Instante de la animación" type="range" min="0" max="100" value={Math.round(phase*100)} onChange={e=>move(+e.target.value/100)}/></details>}
  {!preview&&!simple&&<div className="g5-observe" aria-label="Secuencia para observar">{term.observe.map((line,i)=><button key={line} aria-pressed={i===step} onClick={()=>move([0,.5,1][i])}><b>{i+1}</b><span>{line}</span></button>)}</div>}
  <small className="g5-scale-note">Esquema original. Escalas y tiempos ampliados; los controles no son preajustes clínicos.</small>
  {expanded&&<dialog ref={modal} className="g5-zoom-dialog" aria-label={'Animación ampliada: '+term.title} onCancel={()=>setExpanded(false)}><header><strong>{term.title}</strong><button onClick={()=>setExpanded(false)} aria-label="Cerrar animación ampliada">Cerrar ×</button></header><div className="g5-zoom-scroll" tabIndex={0} aria-label="Lámina ampliada; desplázate para recorrerla"><AnimatedPlate term={term} value={shownValue} phase={phase}/></div><div className="g5-zoom-controls">{playback(true)}{interactive&&adjustment(true)}</div></dialog>}
 </section>;
}
const VOLUME={
 frecuencia:{id:'frequency',parameter:'frequency'},'longitud-de-onda':{id:'frequency',parameter:'wavelength'},eco:{id:'echo',parameter:'depth'},foco:{id:'focus',parameter:'focus'},'formacion-haz':{id:'transducer',parameter:'focus'},'angulo-doppler':{id:'doppler',parameter:'angle'},compresibilidad:{id:'pressure',parameter:'pressure'}
};
function SpatialReference({term}){
 const spec=VOLUME[term.id];
 // The 3D is a separate spatial reference, with its own explicit physical value.
 const [value,setValue]=useState(term.control.initial),[phase,setPhase]=useState(.35);
 if(!spec)return null;
 const acoustic=['frequency','echo','focus','transducer'].includes(spec.id),params={frequency:5,speed:15,...(spec.parameter==='wavelength'?{frequency:1.54/value}:{[spec.parameter]:value})};
 return <section className="g5-secondary"><div className="g5-section-heading"><span><Box size={18}/> OTRA REPRESENTACIÓN</span><h2>Relaciona el mecanismo con el volumen.</h2><p>Gira la escena y modifica su referencia espacial. Este modelo se controla por separado de la animación anterior.</p></div><div className="g5-spatial"><Suspense fallback={<div className="g5-loading" role="status">Preparando volumen…</div>}>{acoustic?<AcousticVolume conceptId={spec.id} parameters={params} phase={phase}/>:<Volume concept={conceptById[spec.id]} parameters={params} phase={phase}/>}</Suspense></div><div className="g5-spatial-controls"><label>{term.control.label}<input aria-label={'Referencia 3D: '+term.control.label} type="range" min={term.control.min} max={term.control.max} step={term.control.step} value={value} onChange={e=>setValue(+e.target.value)}/><output>{format(value)} {term.control.unit}</output></label><label>Instante del modelo<input aria-label="Instante del modelo tridimensional" type="range" min="0" max="100" value={Math.round(phase*100)} onChange={e=>setPhase(+e.target.value/100)}/></label></div></section>;
}
const MEDIA={
 'arreglo-lineal':'transductor-lineal-real',piezoelectricidad:'transductor-lineal-real','modo-b':'vsm-compartimento-real','doppler-color':'femoral-color-normal-real','mapa-color':'femoral-color-normal-real','power-doppler':'femoral-power-real',compresibilidad:'femoral-coaptacion-normal-real','fasicidad-respiratoria':'femoral-pw-normal-real','valvula-venosa':'valvula-poplitea-real','reflujo-venoso':'giacomini-reflujo-pw-real','duracion-reflujo':'giacomini-reflujo-pw-real','doppler-pulsado':'giacomini-reflujo-pw-real','volumen-muestra':'giacomini-reflujo-pw-real'
};
function PublishedReference({term}){
 const media=clinicalMedia.find(m=>m.id===MEDIA[term.id]);if(!media)return null;
 return <section className="g5-secondary g5-published"><div className="g5-section-heading"><span>REFERENCIA PUBLICADA</span><h2>Reconoce el modo y conserva el contexto.</h2><p>El control de la animación modifica el modelo. Esta adquisición o fotografía publicada se conserva como referencia independiente.</p></div><div className="g5-clinical-layout"><ClinicalImage media={media} playbackRate={.5}/><div><h3>{media.title}</h3><p>{media.description}</p><p>{media.limitation}</p>{['piezoelectricidad','arreglo-lineal'].includes(term.id)&&<p>La fotografía muestra el exterior de la sonda. Los elementos internos se explican con el esquema original.</p>}</div></div></section>;
}
function SourceList({term}){return <section className="g5-secondary g5-sources"><div className="g5-section-heading"><span><BookOpen size={17}/> REFERENCIAS</span><h2>Consulta la explicación de origen.</h2></div><ol>{term.sources.map((reference,i)=>{const source=glossarySources[reference.id];return <li key={reference.id+'-'+i}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={13}/></a><p>{reference.section}</p></li>;})}</ol><small>El glosario es una adaptación educativa original. Las relaciones ideales y señales inventadas no sustituyen la adquisición ni validan hallazgos de un paciente.</small></section>;}
function ApplicationLink({term}){
 const clinical=['compresibilidad','aumento-distal','reflujo-venoso','duracion-reflujo','valvula-venosa','fasicidad-respiratoria'];
 const step=term.id==='compresibilidad'?'profundo':clinical.includes(term.id)?'reflujo':'equipo';
 return <a className="g5-application" href={methodologyHref(step)}><div><span>DEL CONCEPTO A LA EXPLORACIÓN</span><strong>{step==='profundo'?'Conservar el segmento durante la compresión':step==='reflujo'?'Registrar la maniobra y la respuesta':'Relacionar el ajuste con la imagen venosa'}</strong></div><ArrowRight size={22}/></a>;
}
function TermPage({term}){
 const index=courseTermOrder.indexOf(term.id),after=byId[courseTermOrder[index+1]],location=courseLocation[term.id],practice=useRef(null),application=useRef(null),[advanced,setAdvanced]=useState(false);
 function continueTo(ref){ref.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});ref.current?.focus({preventScroll:true});}
 return <article className="glossary-site learn-lesson" data-glossary-term={term.id}><div className="g5-content">
  <div className="g5-breadcrumb"><a href={glossaryHref()}><ArrowLeft size={15}/> Índice de conceptos</a><span>{location?.chapter.title}</span></div>
  <header className="g5-term-header learn-header"><span className="g5-eyebrow">{location?.number} · {location?.group.title}</span><h1>{term.title}</h1><p>{term.definition}</p>{term.aliases.length>0&&<small>{term.aliases.join(' · ')}</small>}</header>
  <section className="learn-section" aria-labelledby="idea-title"><h2 id="idea-title"><span>1</span> Mira la idea central</h2><p className="learn-instruction">Observa la demostración. Puedes pausarla o volver a verla antes de continuar.</p><ConceptStage term={term} simple interactive={false}/><LearningNext onClick={()=>continueTo(practice)} kicker="Después de observar" title="Ahora cambia un ajuste" description="Prueba qué cambia y comprende por qué." compact/></section>
  <section className="learn-section" aria-labelledby="practice-title"><h2 id="practice-title" ref={practice} tabIndex={-1}><span>2</span> Cambia un ajuste</h2><p>{term.mechanism}</p><p className="learn-instruction">Mueve únicamente «{term.control.label}» y compara el resultado. Usa «Restablecer ajuste inicial» para volver al punto de partida.</p><ConceptStage term={term} simple/><aside className="learn-pitfall"><strong>Evita esta confusión</strong><p>{term.pitfall}</p></aside><LearningNext onClick={()=>continueTo(application)} kicker="Conecta lo que viste" title="Llévalo a la exploración" compact/></section>
  <section className="learn-section" aria-labelledby="application-title"><h2 id="application-title" ref={application} tabIndex={-1}><span>3</span> Relaciónalo con la exploración</h2><PublishedReference term={term}/><ApplicationLink term={term}/></section>
  <section className="learn-section learn-advanced" aria-labelledby="advanced-title"><h2 id="advanced-title"><span>4</span> Profundiza cuando estés listo</h2><p>Aquí están las representaciones adicionales. Empieza por una vista y después compara las demás.</p><details onToggle={e=>setAdvanced(e.currentTarget.open)}><summary>Abrir laboratorio: 3D, cortes y gráficas</summary>{advanced&&<><SpatialReference term={term}/>{term.legacyConcept?<Suspense fallback={<div role="status">Preparando laboratorio…</div>}><VisualPlayer conceptId={term.legacyConcept}/></Suspense>:<ConceptStage term={term}/>}</>}</details></section>
  <section className="g5-related"><h2>Conceptos que se conectan</h2><div>{term.related.filter(id=>id!==term.id&&byId[id]).map(id=><a key={id} href={glossaryHref(id)}>{byId[id].title}<ArrowRight size={15}/></a>)}</div></section>
  <details className="g5-reading-drawer"><summary><BookOpen size={15}/> Fuentes de este concepto</summary><SourceList term={term}/></details>
  <LearningNext href={after?glossaryHref(after.id):methodologyHref('preparar')} kicker={after?'Siguiente concepto en la ruta':'Continúa con la metodología'} title={after?'Sigue con '+after.title:'Preparar el estudio venoso'} description={after?after.definition:'Aplica los conceptos en una exploración sistematizada.'}/><a className="learn-back-index" href={glossaryHref()}>Volver al índice de conceptos</a>
 </div></article>;
}
export default function GlossaryWebsite({termId}){
 const term=byId[termId];useEffect(()=>{document.title=(term?term.title+' · Conceptos visuales':'Índice de conceptos de Eco-Doppler')+' | IMF';},[term]);
 return term?<TermPage key={term.id} term={term}/>:<ConceptIndex/>;
}
