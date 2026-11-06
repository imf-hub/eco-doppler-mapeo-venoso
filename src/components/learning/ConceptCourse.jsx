import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {useAnimationFrame,useInView,useReducedMotion} from 'motion/react';
import {Play,Pause,ArrowLeft} from 'lucide-react';
import ConceptIndex from './ConceptIndex';
import LearningNext from './LearningNext';
import {visualTermAliases,courseTerms} from '../../data/conceptCourse';
import {conceptById} from '../../data/visualCurriculum';
import {VISUAL_DEFAULTS} from '../../simulation/visualScience';
import {glossaryHref} from '../../methodologyRoutes';
import './learning.css';
const GlossaryWebsite=lazy(()=>import('../glossary/GlossaryWebsite'));
const Volume=lazy(()=>import('../visual/ConceptVolumeScene'));
const AcousticEffects=lazy(()=>import('../visual/AcousticEffects'));
const ClinicalSafety=lazy(()=>import('../visual/ClinicalSafety'));
const VisualPlayer=lazy(()=>import('../visual/VisualPlayer'));

// Preserve older links to spatial/anatomical scenes without bringing back the dashboard first.
function SpatialLesson({concept}){
 const reduce=useReducedMotion(),ref=useRef(null),visible=useInView(ref),[phase,setPhase]=useState(0),[playing,setPlaying]=useState(false),[advanced,setAdvanced]=useState(false),target=useRef(null);
 useAnimationFrame((_,delta)=>{if(playing&&visible&&!reduce&&!document.hidden)setPhase(p=>{const next=Math.min(1,p+Math.min(delta,64)/6000);if(next===1)setPlaying(false);return next;});});
 useEffect(()=>{document.title=concept.title+' · Conceptos visuales | IMF';},[concept]);
 const parameters={...VISUAL_DEFAULTS,[concept.primaryParameter.key]:concept.primaryParameter.initial};
 return <article className="learn-spatial learn-index"><a href={glossaryHref()}><ArrowLeft size={16}/> Índice de conceptos</a><header><h1>{concept.title}</h1><p>{concept.summary||concept.mechanism}</p></header><section className="learn-section" ref={ref}><h2>1. Observa la relación espacial</h2><div className="learn-volume"><Suspense fallback={<p role="status">Preparando escena…</p>}><Volume concept={concept} parameters={parameters} phase={phase}/></Suspense></div><button className="learn-basic-play" disabled={!!reduce} onClick={()=>{if(phase===1)setPhase(0);setPlaying(!playing);}}>{playing?<Pause size={17}/>:<Play size={17}/>} {playing?'Pausar':'Reproducir'}</button><p>{concept.pitfall}</p><LearningNext compact onClick={()=>{target.current?.scrollIntoView({block:'start'});target.current?.focus({preventScroll:true});}} title="Explora la misma idea con otras vistas"/></section><section className="learn-section"><h2 ref={target} tabIndex={-1}>2. Relaciona escena, corte y gráfica</h2><p>{concept.mechanism}</p><details onToggle={e=>setAdvanced(e.currentTarget.open)}><summary>Abrir el laboratorio de este concepto</summary>{advanced&&<Suspense fallback={<p role="status">Preparando laboratorio…</p>}><VisualPlayer conceptId={concept.id}/></Suspense>}</details></section><LearningNext href={glossaryHref()} title="Elegir otro concepto"/></article>;
}
export default function ConceptCourse({conceptId,navigate}){
 if(['__effects','__safety'].includes(conceptId))return <article className="learn-index"><a href={glossaryHref()}>← Índice de conceptos</a><header><h1>{conceptId==='__effects'?'Interacciones del haz':'Uso prudente y ergonomía'}</h1><p>{conceptId==='__effects'?'El sonido puede reflejarse, desviarse, dispersarse y perder energía al atravesar tejidos. Cada interacción modifica los ecos que regresan a la sonda.':'Utiliza la emisión y el tiempo de exploración necesarios para obtener información útil, con una posición de trabajo estable y cómoda.'}</p></header><nav className="learn-quick" aria-label="Conceptos previos">{(conceptId==='__effects'?['reflexion','refraccion','dispersion','atenuacion']:['alara','potencia-acustica','indice-termico','indice-mecanico']).map(id=><a key={id} href={glossaryHref(id)}>{courseTerms[id].title}</a>)}</nav><Suspense fallback={<p role="status">Preparando demostración…</p>}>{conceptId==='__effects'?<AcousticEffects/>:<ClinicalSafety navigate={navigate}/>}</Suspense><LearningNext href={glossaryHref()} title="Volver a los conceptos individuales"/></article>;
 const termId=visualTermAliases[conceptId]||(courseTerms[conceptId]?conceptId:null),concept=conceptById[conceptId];
 if(termId)return <Suspense fallback={<p role="status">Preparando concepto…</p>}><GlossaryWebsite termId={termId}/></Suspense>;
 return concept?<SpatialLesson key={conceptId} concept={concept}/>:<ConceptIndex/>;
}
