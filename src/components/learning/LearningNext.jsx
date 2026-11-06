import {useReducedMotion,motion} from 'motion/react';
import {ArrowRight} from 'lucide-react';
export default function LearningNext({href,onClick,kicker='Continúa aprendiendo',title,description,compact=false}){
 const reduce=useReducedMotion(),Tag=href?'a':'button';
 return <Tag className={'learning-next '+(compact?'learning-next-compact':'')} href={href} onClick={onClick}><span><small>{kicker}</small><strong>{title}</strong>{description&&<em>{description}</em>}</span><motion.span aria-hidden="true" whileInView={reduce?{}:{x:[0,5,0]}} viewport={{once:true,amount:.6}} transition={{duration:1.2,repeat:2,ease:'easeInOut'}}><ArrowRight size={25}/></motion.span></Tag>;
}
