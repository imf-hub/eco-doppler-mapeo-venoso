import {lazy,Suspense,useEffect,useState} from 'react';
import {Activity,Waves,ScanLine,Layers,Map,Images,BookOpen,ArrowUpRight,Menu,X,FlaskConical,FileText as FileTextIcon} from 'lucide-react';
import VisualPlayer from './components/visual/VisualPlayer';
import MediaLibrary from './components/visual/MediaLibrary';
import './visualAcademy.css';
import './laboratory.css';
import './components/learning/learning.css';
import {appRoot,methodologyHref,glossaryHref,consensusHref,readAcademyRoute} from './methodologyRoutes';
const LaboratoryHome=lazy(()=>import('./components/visual/LaboratoryHome'));
const ConsensusWebsite=lazy(()=>import('./components/consensus/ConsensusWebsite'));
const ConceptCourse=lazy(()=>import('./components/learning/ConceptCourse'));
const GlossaryWebsite=lazy(()=>import('./components/glossary/GlossaryWebsite'));
const MethodologyWebsite=lazy(()=>import('./components/methodology/MethodologyWebsite'));
const Simulator=lazy(()=>import('./components/Simulator'));
const Cartography=lazy(()=>import('./components/Cartography'));
const ScanTrainer=lazy(()=>import('./components/ScanTrainer'));
const navigation=[['inicio','Laboratorio',FlaskConical],['mapeo','Mapeo paso a paso',Map],['consenso','El mapa del consenso',FileTextIcon],['fundamentos','Conceptos visuales',Waves],['glosario','Glosario animado',BookOpen],['laboratorio','Controles del equipo',ScanLine],['anatomia','Anatomía y adquisición',Layers],['cartografia','Construir el mapa',Map],['biblioteca','Imágenes y fuentes',Images]];
const readRoute=readAcademyRoute;
export default function VisualApp(){
 const [route,setRoute]=useState(readRoute),[menu,setMenu]=useState(false),[anatomyTab,setAnatomyTab]=useState(()=>readRoute().detail.startsWith('sonda')?'sonda':'atlas');
 useEffect(()=>{const onRoute=()=>{setRoute(readRoute());setMenu(false);window.scrollTo(0,0);};window.addEventListener('hashchange',onRoute);return()=>window.removeEventListener('hashchange',onRoute);},[]);
 useEffect(()=>{const opened=[];const before=()=>document.querySelectorAll('.va-laboratory details:not([open])').forEach(el=>{el.open=true;opened.push(el);});const after=()=>{opened.splice(0).forEach(el=>{el.open=false;});};window.addEventListener('beforeprint',before);window.addEventListener('afterprint',after);return()=>{window.removeEventListener('beforeprint',before);window.removeEventListener('afterprint',after);after();};},[]);
 useEffect(()=>{if(route.page==='anatomia')setAnatomyTab(route.detail.startsWith('sonda')?'sonda':'atlas');},[route]);
 const page=route.page==='guias'?'mapeo':route.page==='casos'?'laboratorio':['visuales','efectos'].includes(route.page)?'fundamentos':route.page;
 const focused=['fundamentos','glosario','consenso','cartografia'].includes(page);
 function navigate(id,detail=''){
  if(id==='mapeo'){window.location.assign(methodologyHref(detail));return;}
  if(id==='consenso'){window.location.assign(consensusHref(detail));return;}
  if(id==='glosario'){window.location.assign(glossaryHref(detail));return;}
  const hash=id+(detail?'/'+encodeURIComponent(detail):'');
  if(window.location.pathname!==appRoot().pathname){window.location.assign(new URL('#'+hash,appRoot()).href);return;}
  if(window.location.hash==='#'+hash){setRoute(readRoute());setMenu(false);}else window.location.hash=hash;
 }
 return <div className={"visual-academy va-laboratory "+(focused?"va-focused":"")}><a className="skip-link" href="#visual-main" onClick={e=>{e.preventDefault();document.getElementById('visual-main')?.focus();document.getElementById('visual-main')?.scrollIntoView();}}>Saltar al contenido</a><header className="va-header"><button className="va-brand" onClick={()=>navigate('inicio')} aria-label="IMF, abrir laboratorio visual"><span><Activity size={24}/></span><strong>IMF<small>LABORATORIO VENOSO</small></strong></button><div className="va-course-name">Eco-Doppler <span>/</span> mapeo venoso</div><a className="va-consensus" href={page==='fundamentos'||page==='glosario'?glossaryHref():consensusHref()}>{page==='fundamentos'||page==='glosario'?'Índice de conceptos':'Consenso'} <ArrowUpRight size={15}/></a><button className="va-menu" aria-label={menu?'Cerrar navegación':'Abrir navegación'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <nav className={'va-nav '+(menu?'va-nav-open':'')} aria-label="Navegación principal">{navigation.map(([id,label,Icon])=><button key={id} onClick={()=>navigate(id)} title={label} aria-current={page===id?'page':undefined}><Icon size={18}/><span>{label}</span></button>)}</nav>
 <main id="visual-main" tabIndex={-1} className="va-main">
 {page==='inicio'&&<Suspense fallback={<Loading/>}><LaboratoryHome navigate={navigate}/></Suspense>}
 {page==='consenso'&&<Suspense fallback={<Loading/>}><ConsensusWebsite chapterId={route.detail} navigate={navigate}/></Suspense>}
 {page==='glosario'&&<Suspense fallback={<Loading/>}><GlossaryWebsite termId={route.detail} navigate={navigate}/></Suspense>}
 {page==='mapeo'&&<Suspense fallback={<Loading/>}><MethodologyWebsite stepId={route.detail} momentId={route.moment} navigate={navigate}/></Suspense>}
 {page==='fundamentos'&&<Suspense fallback={<Loading/>}><ConceptCourse conceptId={route.page==='efectos'?'__effects':route.detail==='seguridad'?'__safety':route.detail} navigate={navigate}/></Suspense>}
 {page==='anatomia'&&<><div className="va-page-toolbar"><h1>Anatomía, mano y pantalla.</h1><div><button aria-pressed={anatomyTab==='atlas'} onClick={()=>setAnatomyTab('atlas')}>Atlas por capas</button><button aria-pressed={anatomyTab==='sonda'} onClick={()=>setAnatomyTab('sonda')}>Mover la sonda</button></div></div>{anatomyTab==='atlas'?<VisualPlayer key={route.detail||'atlas'} conceptId="anatomy" initialView={route.detail==='imagen'?'real':undefined} initialLinked={route.detail==='imagen'}/>:<Suspense fallback={<Loading/>}><div className="va-tools"><ScanTrainer initialRegion={route.detail==='sonda-ssv'?'ssv':route.detail==='sonda-sfj'?'sfj':'gsv'} onOpenMethodology={()=>navigate('mapeo','posicion')} onOpenDoppler={()=>navigate('laboratorio')}/></div></Suspense>}</>}
 {page==='laboratorio'&&<><div className="va-page-toolbar"><h1>Mueve el control. Mira el efecto.</h1><button onClick={()=>navigate('visuales','gain')}>Ver el mecanismo <ArrowUpRight size={16}/></button></div><Suspense fallback={<Loading/>}><div className="va-tools"><Simulator/></div></Suspense></>}
 {page==='cartografia'&&<><div className="va-page-toolbar"><h1>De lo observado al mapa.</h1><button onClick={()=>navigate('mapeo','cartografia')}>Ver la demostración <ArrowUpRight size={16}/></button></div><Suspense fallback={<Loading/>}><div className="va-tools va-map"><Cartography/></div></Suspense></>}
 {page==='biblioteca'&&<MediaLibrary/>}
 </main><footer className="va-footer"><span>IMF · Educación con práctica supervisada</span><button onClick={()=>navigate('biblioteca')}>Imágenes, fuentes y créditos <BookOpen size={13}/></button></footer></div>;
}
function Loading(){return <div className="va-loading" role="status">Preparando la demostración…</div>;}
