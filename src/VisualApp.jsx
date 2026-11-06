import {lazy,Suspense,useEffect,useState} from 'react';
import {Activity,Waves,ScanLine,Layers,Map,Images,BookOpen,ArrowUpRight,Menu,X,FlaskConical,FileText as FileTextIcon} from 'lucide-react';
import {lessons,sources} from './data/lessons';
import {visualConcepts,lessonVisualMap} from './data/visualCurriculum';
import {mappingSteps} from './data/mapping';
import VisualPlayer from './components/visual/VisualPlayer';
import MediaLibrary from './components/visual/MediaLibrary';
import './visualAcademy.css';
import './laboratory.css';
import {appRoot,methodologyHref,glossaryHref,consensusHref,readAcademyRoute} from './methodologyRoutes';
const LaboratoryHome=lazy(()=>import('./components/visual/LaboratoryHome'));
const ConsensusWebsite=lazy(()=>import('./components/consensus/ConsensusWebsite'));
const GlossaryWebsite=lazy(()=>import('./components/glossary/GlossaryWebsite'));
const MethodologyWebsite=lazy(()=>import('./components/methodology/MethodologyWebsite'));
const ClinicalSafety=lazy(()=>import('./components/visual/ClinicalSafety'));
const AcousticEffects=lazy(()=>import('./components/visual/AcousticEffects'));
const Simulator=lazy(()=>import('./components/Simulator'));
const Cartography=lazy(()=>import('./components/Cartography'));
const ScanTrainer=lazy(()=>import('./components/ScanTrainer'));
const labels={preparar:'Preparación',equipo:'Equipo y sonda',posicion:'Posición del paciente',profundo:'Sistema profundo',ingle:'Unión safenofemoral',gsv:'Safena mayor',ssv:'Safena menor',tributarias:'Conexiones y perforantes',reflujo:'Maniobras y reflujo',diametros:'Medidas',cartografia:'Cartografía',informe:'Informe'};
const navigation=[['inicio','Laboratorio',FlaskConical],['mapeo','Mapeo paso a paso',Map],['consenso','El mapa del consenso',FileTextIcon],['fundamentos','Conceptos visuales',Waves],['glosario','Glosario animado',BookOpen],['laboratorio','Controles del equipo',ScanLine],['anatomia','Anatomía y adquisición',Layers],['cartografia','Construir el mapa',Map],['biblioteca','Imágenes y fuentes',Images]];
const readRoute=readAcademyRoute;
export default function VisualApp(){
 const [route,setRoute]=useState(readRoute),[menu,setMenu]=useState(false),[lesson,setLesson]=useState('sonido'),[topic,setTopic]=useState('sound'),[anatomyTab,setAnatomyTab]=useState(()=>readRoute().detail.startsWith('sonda')?'sonda':'atlas');
 useEffect(()=>{const onRoute=()=>{setRoute(readRoute());setMenu(false);window.scrollTo(0,0);};window.addEventListener('hashchange',onRoute);return()=>window.removeEventListener('hashchange',onRoute);},[]);
 useEffect(()=>{const opened=[];const before=()=>document.querySelectorAll('.va-laboratory details:not([open])').forEach(el=>{el.open=true;opened.push(el);});const after=()=>{opened.splice(0).forEach(el=>{el.open=false;});};window.addEventListener('beforeprint',before);window.addEventListener('afterprint',after);return()=>{window.removeEventListener('beforeprint',before);window.removeEventListener('afterprint',after);after();};},[]);
 useEffect(()=>{if(route.page==='anatomia')setAnatomyTab(route.detail.startsWith('sonda')?'sonda':'atlas');},[route]);
 const page=route.page==='guias'?'mapeo':route.page==='casos'?'laboratorio':['visuales','efectos'].includes(route.page)?'fundamentos':route.page;
 const method=mappingSteps.find(s=>s.id===route.detail)?.id||'preparar',associatedLesson=route.page==='efectos'?'interacciones':route.page==='visuales'?Object.keys(lessonVisualMap).find(k=>lessonVisualMap[k].includes(route.detail)):lessons.some(l=>l.id===route.detail)?route.detail:lesson,lessonTopics=lessonVisualMap[associatedLesson||lesson]||['sound'];
 const concept=route.page==='visuales'&&visualConcepts.some(c=>c.id===route.detail)?route.detail:lessonTopics.includes(topic)?topic:lessonTopics[0];
 function navigate(id,detail=''){
  if(id==='mapeo'){window.location.assign(methodologyHref(detail));return;}
  if(id==='consenso'){window.location.assign(consensusHref(detail));return;}
  if(id==='glosario'){window.location.assign(glossaryHref(detail));return;}
  const hash=id+(detail?'/'+encodeURIComponent(detail):'');
  if(window.location.pathname!==appRoot().pathname){window.location.assign(new URL('#'+hash,appRoot()).href);return;}
  if(window.location.hash==='#'+hash){setRoute(readRoute());setMenu(false);}else window.location.hash=hash;
 }
 function chooseVisualConcept(value){if(value==='__safety'){setLesson('seguridad');navigate('fundamentos');}else if(value==='__effects'){setLesson('interacciones');navigate('efectos');}else navigate('visuales',value);}
 return <div className="visual-academy va-laboratory"><a className="skip-link" href="#visual-main" onClick={e=>{e.preventDefault();document.getElementById('visual-main')?.focus();document.getElementById('visual-main')?.scrollIntoView();}}>Saltar al contenido</a><header className="va-header"><button className="va-brand" onClick={()=>navigate('inicio')} aria-label="IMF, abrir laboratorio visual"><span><Activity size={24}/></span><strong>IMF<small>LABORATORIO VENOSO</small></strong></button><div className="va-course-name">Eco-Doppler <span>/</span> mapeo venoso</div><a className="va-consensus" href={consensusHref()}>Consenso <ArrowUpRight size={15}/></a><button className="va-menu" aria-label="Abrir navegación" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <nav className={'va-nav '+(menu?'va-nav-open':'')} aria-label="Navegación principal">{navigation.map(([id,label,Icon])=><button key={id} onClick={()=>navigate(id)} title={label} aria-current={page===id?'page':undefined}><Icon size={18}/><span>{label}</span></button>)}</nav>
 <main id="visual-main" tabIndex={-1} className="va-main">
 {page==='inicio'&&<Suspense fallback={<Loading/>}><LaboratoryHome navigate={navigate}/></Suspense>}
 {page==='consenso'&&<Suspense fallback={<Loading/>}><ConsensusWebsite chapterId={route.detail} navigate={navigate}/></Suspense>}
 {page==='glosario'&&<Suspense fallback={<Loading/>}><GlossaryWebsite termId={route.detail} navigate={navigate}/></Suspense>}
 {page==='mapeo'&&<Suspense fallback={<Loading/>}><MethodologyWebsite stepId={route.detail} momentId={route.moment} navigate={navigate}/></Suspense>}
 {page==='fundamentos'&&<div className="va-workspace"><aside className="va-index"><span className="va-eyebrow">VER CÓMO FUNCIONA</span><h1>Del sonido a la imagen.</h1><a className="va-glossary-entry" href={glossaryHref()}>Explorar 80 conceptos animados <ArrowUpRight size={14}/></a><nav aria-label="Conceptos de fundamentos">{lessons.map((l,i)=><button key={l.id} aria-current={associatedLesson===l.id?'step':undefined} onClick={()=>{setLesson(l.id);setTopic(lessonVisualMap[l.id][0]);navigate(l.id==='interacciones'?'efectos':'fundamentos');}}><b>{String(i+1).padStart(2,'0')}</b><span>{l.tag}</span></button>)}</nav><label className="va-all-concepts">Todos los conceptos<select aria-label="Elegir concepto visual" value={route.page==='efectos'?'__effects':associatedLesson==='seguridad'&&route.page!=='visuales'?'__safety':concept} onChange={e=>chooseVisualConcept(e.target.value)}><option value="__effects">Interacciones y artefactos</option><option value="__safety">Seguridad y ergonomía</option>{visualConcepts.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select></label></aside><div className="va-lesson"><label className="va-mobile-concepts">Concepto<select aria-label="Todos los conceptos visuales" value={route.page==='efectos'?'__effects':associatedLesson==='seguridad'&&route.page!=='visuales'?'__safety':concept} onChange={e=>chooseVisualConcept(e.target.value)}><option value="__effects">Interacciones y artefactos</option><option value="__safety">Seguridad y ergonomía</option>{visualConcepts.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select></label>{associatedLesson&&<div className="va-topic-tabs" aria-label="Conceptos de la lección">{associatedLesson==='seguridad'&&<button aria-pressed={route.page!=='visuales'} onClick={()=>navigate('fundamentos')}>Uso prudente</button>}{associatedLesson==='interacciones'&&<button aria-pressed={route.page==='efectos'} onClick={()=>navigate('efectos')}>Efectos del haz</button>}{lessonTopics.map(id=><button key={id} aria-pressed={route.page!=='efectos'&&!(associatedLesson==='seguridad'&&route.page!=='visuales')&&concept===id} onClick={()=>{setTopic(id);navigate(associatedLesson==='seguridad'?'visuales':'fundamentos',associatedLesson==='seguridad'?id:'');}}>{visualConcepts.find(c=>c.id===id)?.title}</button>)}</div>}{associatedLesson==='seguridad'&&route.page!=='visuales'?<Suspense fallback={<Loading/>}><ClinicalSafety navigate={navigate}/></Suspense>:route.page==='efectos'?<Suspense fallback={<Loading/>}><AcousticEffects/></Suspense>:<VisualPlayer key={concept} conceptId={concept} lessonContent={lessons.find(l=>l.id===associatedLesson)}/>}</div></div>}
 {page==='anatomia'&&<><div className="va-page-toolbar"><h1>Anatomía, mano y pantalla.</h1><div><button aria-pressed={anatomyTab==='atlas'} onClick={()=>setAnatomyTab('atlas')}>Atlas por capas</button><button aria-pressed={anatomyTab==='sonda'} onClick={()=>setAnatomyTab('sonda')}>Mover la sonda</button></div></div>{anatomyTab==='atlas'?<VisualPlayer key={route.detail||'atlas'} conceptId="anatomy" initialView={route.detail==='imagen'?'real':undefined} initialLinked={route.detail==='imagen'}/>:<Suspense fallback={<Loading/>}><div className="va-tools"><ScanTrainer initialRegion={route.detail==='sonda-ssv'?'ssv':route.detail==='sonda-sfj'?'sfj':'gsv'} onOpenMethodology={()=>navigate('mapeo','posicion')} onOpenDoppler={()=>navigate('laboratorio')}/></div></Suspense>}</>}
 {page==='laboratorio'&&<><div className="va-page-toolbar"><h1>Mueve el control. Mira el efecto.</h1><button onClick={()=>navigate('visuales','gain')}>Ver el mecanismo <ArrowUpRight size={16}/></button></div><Suspense fallback={<Loading/>}><div className="va-tools"><Simulator/></div></Suspense></>}
 {page==='cartografia'&&<><div className="va-page-toolbar"><h1>De lo observado al mapa.</h1><button onClick={()=>navigate('mapeo','cartografia')}>Ver la demostración <ArrowUpRight size={16}/></button></div><Suspense fallback={<Loading/>}><div className="va-tools va-map"><Cartography/></div></Suspense></>}
 {page==='biblioteca'&&<MediaLibrary/>}
 </main><footer className="va-footer"><span>IMF · Educación con práctica supervisada</span><button onClick={()=>navigate('biblioteca')}>Imágenes, fuentes y créditos <BookOpen size={13}/></button></footer></div>;
}
function Loading(){return <div className="va-loading" role="status">Preparando la demostración…</div>;}
