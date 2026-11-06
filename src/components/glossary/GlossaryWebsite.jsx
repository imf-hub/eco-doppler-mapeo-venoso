import {lazy,Suspense,useEffect,useId,useRef,useState} from 'react';
import {useAnimationFrame,useInView,useReducedMotion} from 'motion/react';
import {ArrowLeft,ArrowRight,Play,Pause,RotateCcw,Search,Maximize2,BookOpen,Box,ExternalLink,ChevronLeft,ChevronRight} from 'lucide-react';
import {glossarySpecs,glossaryCategories} from '../../data/glossarySpecs';
import {glossaryContent,glossarySources} from '../../data/glossaryContent';
import {appRoot,glossaryHref,methodologyHref} from '../../methodologyRoutes';
import {ClinicalImage,clinicalMedia} from '../visual/MediaLibrary';
import {conceptById} from '../../data/visualCurriculum';
import './GlossaryWebsite.css';
const Acoustic=lazy(()=>import('./AcousticGlossaryAnimation'));
const Doppler=lazy(()=>import('./DopplerGlossaryAnimation'));
const AcousticVolume=lazy(()=>import('../visual/AcousticBench3D'));
const Volume=lazy(()=>import('../visual/ConceptVolumeScene'));
export const glossaryTerms=glossarySpecs.map(spec=>{
 if(!glossaryContent[spec.id])throw Error('Falta el contenido de '+spec.id);
 return {...spec,...glossaryContent[spec.id]};
}).sort((a,b)=>a.title.localeCompare(b.title,'es',{sensitivity:'base'}));
const byId=Object.fromEntries(glossaryTerms.map(t=>[t.id,t]));
const normal=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const format=n=>new Intl.NumberFormat('es-MX',{maximumFractionDigits:3}).format(n);
function AnimatedPlate({term,value,phase,compact=false}){
 const Renderer=term.engine==='acoustic'?Acoustic:Doppler;
 return <Suspense fallback={<div className="g5-loading" role="status">Preparando la demostración de {term.title}…</div>}><Renderer term={term} value={value} phase={phase} compact={compact}/></Suspense>;
}
function ConceptStage({term,preview=false}){
 const ref=useRef(null),visible=useInView(ref),reduce=useReducedMotion(),clock=useRef(0),modal=useRef(null),parameterId=useId();
 const [value,setValue]=useState(term.control.initial),[phase,setPhase]=useState(0),[playing,setPlaying]=useState(true),[speed,setSpeed]=useState(.5),[expanded,setExpanded]=useState(false);
 useEffect(()=>{setValue(term.control.initial);setPhase(0);setPlaying(!reduce);},[term.id,reduce]);
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
 const playback=(large=false)=><div className="g5-playback"><button className="g5-play" disabled={!!reduce} onClick={play} aria-label={(playing?'Pausar':'Reproducir')+(large?' animación ampliada':' animación')}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{playing?'Pausar':'Reproducir'}</span></button><button aria-label={large?'Reiniciar lámina ampliada':'Reiniciar animación del concepto'} onClick={()=>move(0)}><RotateCcw size={16}/></button><input aria-label={large?'Instante de la lámina ampliada':'Instante de la animación'} type="range" min="0" max="100" step="0.1" value={Math.round(phase*1000)/10} onChange={e=>move(+e.target.value/100)}/><label><span>Velocidad</span><select aria-label={large?'Velocidad ampliada':'Velocidad de la animación del concepto'} value={speed} onChange={e=>setSpeed(+e.target.value)}><option value="0.25">0,25×</option><option value="0.5">0,5×</option><option value="1">1×</option></select></label><button aria-label="Retroceder instante" onClick={()=>move(phase-1/40)}><ChevronLeft size={17}/></button><button aria-label="Avanzar instante" onClick={()=>move(phase+1/40)}><ChevronRight size={17}/></button></div>;
 const adjustment=(large=false)=><label className="g5-adjustment" htmlFor={parameterId+(large?'-large':'')}><span>{term.control.label}</span><input id={parameterId+(large?'-large':'')} aria-label={term.control.label+(large?' · ampliada':'')} type="range" min={term.control.min} max={term.control.max} step={term.control.step} value={value} onChange={e=>parameter(e.target.value)}/><output>{format(value)} <small>{term.control.unit}</small></output></label>;
 return <section className={'g5-animation '+(preview?'g5-animation-preview':'')} ref={ref} aria-label={'Animación de '+term.title} data-term-animation={term.id}>
  <div className="g5-animation-top"><span>MECANISMO ANIMADO · {term.title}</span><button onClick={()=>setExpanded(true)} aria-label={'Ampliar animación de '+term.title}><Maximize2 size={16}/> Ampliar</button></div>
  <div className="g5-stage">{expanded?<div className="g5-loading">Lámina abierta a mayor tamaño.</div>:<AnimatedPlate term={term} value={value} phase={phase} compact={preview}/>}</div>
  <p className="g5-action-cue"><span>{String(step+1).padStart(2,'0')}</span>{term.observe[step]}</p>
  {playback()}{adjustment()}
  {!preview&&<div className="g5-observe" aria-label="Secuencia para observar">{term.observe.map((line,i)=><button key={line} aria-pressed={i===step} onClick={()=>move([0,.5,1][i])}><b>{i+1}</b><span>{line}</span></button>)}</div>}
  <small className="g5-scale-note">Esquema original. Escalas y tiempos ampliados; los controles no son preajustes clínicos.</small>
  {expanded&&<dialog ref={modal} className="g5-zoom-dialog" aria-label={'Animación ampliada: '+term.title} onCancel={()=>setExpanded(false)}><header><strong>{term.title}</strong><button onClick={()=>setExpanded(false)} aria-label="Cerrar animación ampliada">Cerrar ×</button></header><div className="g5-zoom-scroll" tabIndex={0} aria-label="Lámina ampliada; desplázate para recorrerla"><AnimatedPlate term={term} value={value} phase={phase}/></div><div className="g5-zoom-controls">{playback(true)}{adjustment(true)}</div></dialog>}
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
function TermPage({term,navigate}){
 const index=glossaryTerms.indexOf(term),before=glossaryTerms[index-1],after=glossaryTerms[index+1];
 return <article className="glossary-site" data-glossary-term={term.id}><div className="g5-content"><div className="g5-breadcrumb"><a href={glossaryHref()}><ArrowLeft size={15}/> Glosario animado</a><span>{term.category}</span></div><header className="g5-term-header"><div><span className="g5-eyebrow">CONCEPTO {String(index+1).padStart(2,'0')} / {glossaryTerms.length}</span><h1>{term.title}</h1></div><div><p>{term.definition}</p>{term.aliases.length>0&&<small>{term.aliases.join(' · ')}</small>}</div></header><ConceptStage key={term.id} term={term}/><section className="g5-understand"><div><span className="g5-eyebrow">POR QUÉ SUCEDE</span><p>{term.mechanism}</p></div><div><span className="g5-eyebrow">EVITA ESTA CONFUSIÓN</span><p>{term.pitfall}</p></div></section><SpatialReference term={term}/><PublishedReference term={term}/><ApplicationLink term={term}/>{term.legacyConcept&&<button className="g5-other-views" onClick={()=>navigate('visuales',term.legacyConcept)}>Explorar cortes, gráficas y otras demostraciones <ArrowRight size={16}/></button>}<section className="g5-related"><span className="g5-eyebrow">CONCEPTOS QUE SE CONECTAN</span><div>{term.related.filter(id=>id!==term.id&&byId[id]).map(id=><a key={id} href={glossaryHref(id)}>{byId[id].title}<ArrowRight size={15}/></a>)}</div></section><SourceList term={term}/><nav className="g5-pager" aria-label="Recorrer el glosario">{before?<a href={glossaryHref(before.id)}><ArrowLeft size={18}/><span><small>ANTERIOR</small>{before.title}</span></a>:<a href={glossaryHref()}>Todos los términos</a>}{after?<a href={glossaryHref(after.id)}><span><small>SIGUIENTE</small>{after.title}</span><ArrowRight size={18}/></a>:<a href={glossaryHref()}>Todos los términos</a>}</nav></div></article>;
}
function GlossaryIndex(){
 const [query,setQuery]=useState(()=>new URL(window.location.href).searchParams.get('q')||''),[category,setCategory]=useState('Todas'),[letter,setLetter]=useState('Todas');
 const tokens=normal(query).split(/\s+/).filter(Boolean),filtered=glossaryTerms.filter(t=>(category==='Todas'||category===t.category)&&(letter==='Todas'||normal(t.title).startsWith(normal(letter)))&&tokens.every(token=>normal([t.title,...t.aliases,t.definition,t.category].join(' ')).includes(token)));
 const letters=[...new Set(glossaryTerms.map(t=>normal(t.title)[0].toUpperCase()))].sort();
 function search(value){setQuery(value);setLetter('Todas');const url=new URL(window.location.href);value?url.searchParams.set('q',value):url.searchParams.delete('q');window.history.replaceState(null,'',url);}
 return <div className="glossary-site g5-index"><div className="g5-content"><header className="g5-index-hero"><div><span className="g5-eyebrow">FÍSICA · IMAGEN · DOPPLER · FLUJO VENOSO</span><h1>Un concepto.<br/>Un mecanismo que puedes ver.</h1><p>{glossaryTerms.length} conceptos con animación propia, controles y referencias para comprender qué hace el ecógrafo.</p><a href={glossaryHref('efecto-doppler')}>Abrir la explicación del efecto Doppler <ArrowRight size={17}/></a></div><ConceptStage term={byId['efecto-doppler']} preview/></header><section className="g5-search-section" aria-label="Buscar conceptos"><label className="g5-search"><Search size={20}/><input aria-label="Buscar en el glosario" placeholder="Busca PRF, ganancia, aliasing, reflujo…" value={query} onChange={e=>search(e.target.value)}/>{query&&<button onClick={()=>search('')} aria-label="Borrar búsqueda">×</button>}</label><label className="g5-category">Área<select aria-label="Filtrar conceptos por área" value={category} onChange={e=>{setCategory(e.target.value);setLetter('Todas');}}><option>Todas</option>{glossaryCategories.map(c=><option key={c}>{c}</option>)}</select></label></section><nav className="g5-alphabet" aria-label="Índice alfabético"><button aria-pressed={letter==='Todas'} onClick={()=>setLetter('Todas')}>Todas</button>{letters.map(l=><button key={l} aria-pressed={letter===l} onClick={()=>setLetter(l)}>{l}</button>)}</nav><div className="g5-results-heading"><h2>Glosario de Eco-Doppler</h2><span role="status">{filtered.length} conceptos</span></div><div className="g5-term-list">{filtered.map(term=><a key={term.id} href={glossaryHref(term.id)}><div><small>{term.category}</small><h3>{term.title}</h3>{term.aliases.length>0&&<span>{term.aliases.join(' · ')}</span>}</div><p>{term.definition}</p><span className="g5-term-link"><Play size={15}/> Ver mecanismo <ArrowRight size={17}/></span></a>)}{!filtered.length&&<p className="g5-empty">No hay coincidencias. Prueba una sigla, otro nombre o cambia el área.</p>}</div><footer className="g5-index-sources"><BookOpen size={20}/><p>Fuentes de física y uso clínico identificadas en cada concepto. Animaciones originales: muestran relaciones, no estudios reales ni preajustes universales.</p></footer></div></div>;
}
export default function GlossaryWebsite({termId,navigate}){
 const term=byId[termId];useEffect(()=>{document.title=(term?term.title+' · Glosario animado':'Glosario animado de Eco-Doppler')+' | IMF';},[term]);
 return term?<TermPage key={term.id} term={term} navigate={navigate}/>:<GlossaryIndex/>;
}
