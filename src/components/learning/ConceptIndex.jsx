import {useRef,useState} from 'react';
import {Search,ArrowRight,BookOpen} from 'lucide-react';
import {conceptChapters,courseTerms,courseLocation,findCourseTerms} from '../../data/conceptCourse';
import {appRoot,glossaryHref,consensusHref} from '../../methodologyRoutes';
export default function ConceptIndex(){
 const [query,setQuery]=useState(()=>new URL(window.location.href).searchParams.get('q')||''),refs=useRef({});
 const matches=new Set(findCourseTerms(query));
 function search(value){setQuery(value);const url=new URL(window.location.href);value?url.searchParams.set('q',value):url.searchParams.delete('q');window.history.replaceState(null,'',url);}
 return <article className="learn-index"><header><span className="learn-eyebrow">Índice de aprendizaje</span><h1>Conceptos de Eco-Doppler</h1><p>Elige un concepto. Primero comprenderás qué significa; después explorarás sus ajustes y sus otras representaciones.</p></header>
 <label className="learn-search"><Search size={20}/><span className="sr-only">Buscar un concepto</span><input type="search" aria-label="Buscar un concepto" value={query} onChange={e=>search(e.target.value)} placeholder="Efecto Doppler, ganancias, PRF…"/>{query&&<button aria-label="Borrar búsqueda de conceptos" onClick={()=>search('')}>×</button>}</label>
 <a className="learn-start" href={glossaryHref('sonido')}>Comenzar desde lo básico: Sonido <ArrowRight size={17}/></a>
 <nav className="learn-quick" aria-label="Conceptos frecuentes"><span>Acceso directo</span>{[['efecto-doppler','Efecto Doppler'],['ganancia','Ganancia de modo B'],['ganancia-color','Ganancia de color'],['tgc','TGC']].map(([id,title])=><a key={id} href={glossaryHref(id)}>{title}<ArrowRight size={14}/></a>)}</nav>
 {!query&&<nav className="learn-chapter-jumps" aria-label="Capítulos de conceptos">{conceptChapters.map((c,i)=><button key={c.id} onClick={()=>refs.current[c.id]?.scrollIntoView({block:'start'})}><b>{i+1}</b>{c.title}</button>)}</nav>}
 <p className="learn-results" role="status">{query?`${matches.size} conceptos encontrados`:'80 conceptos, ordenados de lo básico a su aplicación venosa.'}</p>
 {conceptChapters.map((c,ci)=>{const groups=c.groups.filter(g=>g.terms.some(id=>matches.has(id)));if(!groups.length)return null;return <section key={c.id} ref={el=>{refs.current[c.id]=el;}} className="learn-chapter"><h2><span>{ci+1}</span>{c.title}</h2>{groups.map(g=><section key={g.title} className="learn-subchapter"><h3>{ci+1}.{c.groups.indexOf(g)+1} · {g.title}</h3><ol>{g.terms.filter(id=>matches.has(id)).map(id=><li key={id}><a href={glossaryHref(id)}><span className="learn-index-number">{courseLocation[id].number}</span><div><h4>{courseTerms[id].title}</h4>{courseTerms[id].aliases.length>0&&<small>{courseTerms[id].aliases.slice(0,3).join(' · ')}</small>}</div><ArrowRight size={17}/></a></li>)}</ol></section>)}</section>;})}
 {!matches.size&&<p className="learn-empty">No encontramos ese término. Prueba otra palabra o abre uno de los accesos directos.</p>}
 <details className="learn-extra-resources"><summary>Otras demostraciones y uso prudente</summary><p>Después de los conceptos individuales, recorre las interacciones juntas o revisa ergonomía y seguridad.</p><a href={new URL('#efectos',appRoot()).href}>Explorar interacciones del haz</a><a href={new URL('#fundamentos/seguridad',appRoot()).href}>Seguridad y ergonomía</a></details>
 <a className="learn-course-link" href={consensusHref('plantillas')}><BookOpen size={22}/><span><strong>Después, aprende a representar el estudio.</strong><small>Recorre las plantillas y el código original del consenso, paso a paso.</small></span><ArrowRight size={21}/></a>
 </article>;
}
