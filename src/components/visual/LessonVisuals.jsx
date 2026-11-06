import {useEffect,useState} from 'react';
import {lessonVisualMap,conceptById} from '../../data/visualCurriculum';
import VisualExplainer from './VisualExplainer';
export default function LessonVisuals({lessonId}){
 const ids=lessonVisualMap[lessonId]||['sound'],[selected,setSelected]=useState(ids[0]);useEffect(()=>setSelected(ids[0]),[lessonId]);const active=ids.includes(selected)?selected:ids[0];
 return <section className="lesson-visuals"><h3 className="lesson-visual-heading">Relaciona las representaciones.</h3><p className="caption">Explora varios conceptos de esta lección. Cada uno tiene volumen, corte, gráfico y comparación.</p><div className="lesson-visual-topics" role="group" aria-label="Conceptos visuales de la lección">{ids.map(id=><button key={id} aria-pressed={active===id} onClick={()=>setSelected(id)}>{conceptById[id].title}</button>)}</div><VisualExplainer key={active} conceptId={active} initialView="section"/></section>;
}
