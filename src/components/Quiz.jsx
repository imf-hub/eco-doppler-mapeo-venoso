import {useState} from 'react';
import {CheckCircle2,ArrowRight,RotateCcw} from 'lucide-react';
export default function Quiz({quiz,onPass,compact=false}){
 const [choice,setChoice]=useState(null),[checked,setChecked]=useState(false);
 const correct=choice===quiz.answer;
 return <section className={'quiz '+(compact?'compact':'')}><span className="eyebrow">Pausa y comprueba</span><h3>{quiz.question}</h3><div className="quiz-options">{quiz.options.map((o,i)=><button key={o} className={(choice===i?'chosen ':'')+(checked&&i===quiz.answer?'correct':'')} onClick={()=>{setChoice(i);setChecked(false);}} aria-pressed={choice===i}><span>{String.fromCharCode(65+i)}</span>{o}{checked&&i===quiz.answer&&<CheckCircle2 size={18}/>}</button>)}</div>{checked?<div className={'feedback '+(correct?'success':'retry')} role="status"><strong>{correct?'Así es.':'Revisa la explicación e inténtalo de nuevo.'}</strong><p>{quiz.explanation||quiz.feedback}</p>{!correct&&<button className="text-btn" onClick={()=>{setChoice(null);setChecked(false);}}><RotateCcw size={15}/>Volver a intentar</button>}</div>:<button className="btn small" disabled={choice===null} onClick={()=>{setChecked(true);if(correct)onPass?.();}}>Comprobar <ArrowRight size={16}/></button>}</section>
}
