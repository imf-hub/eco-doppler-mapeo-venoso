import {aliasFrequency,clamp,dopplerHz} from '../lib.js';

export const DEFAULT_SETTINGS={gain:48,colorGain:54,depth:4,frequency:10,focus:2.1,tgc:50,dynamic:65,prf:4.6,filter:60,angle:55,pressure:0,gate:2,persistence:2};
export const TARGET_DEPTH_CM=2.1;
export function flowVelocity(t,scenario='normal',provoked=false){
  if(!provoked)return (scenario==='slow'?2:11)*(1+.2*Math.sin(t*1.5));
  if(t>=1&&t<2)return 28+2*Math.sin(t*13);
  if(t>=2&&t<2.85&&scenario==='reflux')return -13;
  if(t>=2&&t<2.06)return -2; // Brief valve closure transient in this teaching model.
  return (scenario==='slow'?2:9)*(1+.16*Math.sin(t*1.5));
}
export function signalAt(settings,velocity,mode='Color',inverted=false){
  const hz=dopplerHz(settings.frequency,velocity,settings.angle),nyquist=settings.prf*500;
  const compressed=settings.pressure>=92;
  const detectable=Math.abs(hz)>settings.filter&&settings.angle<89.5&&!compressed;
  const received=mode==='PW'?settings.gain>8:settings.colorGain>15;
  return {hz,nyquist,detected:detectable&&received,aliased:mode!=='Power'&&Math.abs(hz)>nyquist,
    displayHz:aliasFrequency(hz,settings.prf*1000)*(inverted?-1:1),
    power:clamp((settings.colorGain-15)/70,0,1)};
}
export function measurementResult(start,end,settings,scenario,provoked){
  const interval=end-start;
  const reverse=signalAt(settings,-13,'PW');
  const visible=reverse.detected&&!reverse.aliased;
  const correct=provoked&&scenario==='reflux'&&visible&&start<end&&Math.abs(start-2)<=.08&&Math.abs(end-2.85)<=.08;
  return {interval,correct,visible,reason:!visible?'La señal retrógrada no es evaluable sin ambigüedad: revisa señal, escala y ángulo.':start>=end?'El cursor final debe ir después del inicial.':correct?'Cursores alineados con inicio y final del tramo retrógrado simulado.':'Ubica el inicio y el final del flujo retrógrado, sin incluir el aumento distal.'};
}
export const EXPERIMENTS=[
 {id:'gain',title:'Recupera la luz y las paredes',mode:'B',scenario:'normal',settings:{gain:92},prompt:'La luz está llena de ecos. Ajusta la recepción sin cambiar la potencia acústica.',success:s=>s.gain>=38&&s.gain<=60&&s.depth>=2.5&&Math.abs(s.focus-TARGET_DEPTH_CM)<=.7,
 question:{question:'¿Qué cambiaste al corregir la ganancia B?',options:['La amplificación de los ecos recibidos','La velocidad del flujo','La potencia acústica emitida'],answer:0,explanation:'La ganancia modifica la recepción. La luz y las paredes deben ser distinguibles; estos valores solo pertenecen al modelo.'}},
 {id:'slow',title:'Recupera una señal de flujo lento',mode:'Color',scenario:'slow',settings:{angle:90,filter:250,prf:4},prompt:'No ves color. Revisa ángulo, escala, filtro y ganancia antes de concluir que no hay flujo.',success:s=>s.angle<=65&&s.angle>=20&&s.filter<Math.abs(dopplerHz(s.frequency,2,s.angle))&&s.prf<=1.8&&s.colorGain>=35&&s.colorGain<=72&&s.pressure<50,
 question:{question:'Si aparece color después de optimizar la técnica, ¿qué puedes concluir?',options:['Que excluiste toda trombosis del miembro','Que la falta inicial de color tenía un componente técnico'],answer:1,explanation:'Has recuperado sensibilidad para este flujo. La permeabilidad y la trombosis requieren una exploración completa según la indicación.'}},
 {id:'alias',title:'Corrige el aliasing sin cambiar el flujo',mode:'PW',scenario:'normal',settings:{prf:.5},prompt:'La señal supera Nyquist y reaparece en el extremo opuesto. Aumenta PRF manteniendo frecuencia y ángulo del modelo.',success:s=>s.prf>=2.1&&s.frequency===10&&s.angle===55,
 question:{question:'¿El envolvimiento del espectro a escala baja demuestra reflujo?',options:['Sí, siempre','No: debes distinguir aliasing de una inversión real del flujo'],answer:1,explanation:'Nyquist limita el muestreo pulsado. Una señal que cruza el límite se envuelve; esto no demuestra incompetencia valvular.'}},
 {id:'pressure',title:'Deja de colapsar la vena',mode:'Color',scenario:'normal',settings:{pressure:98},prompt:'La sonda comprime una vena permeable. Disminuye la presión para recuperar su luz y evaluar el flujo.',success:s=>s.pressure<35&&signalAt(s,11).detected,
 question:{question:'¿La presión de la sonda es lo mismo que la provocación distal?',options:['Sí','No: una puede colapsar el objetivo; la otra provoca una respuesta hemodinámica'],answer:1,explanation:'No mantengas el vaso colapsado mientras intentas interrogar su flujo. La maniobra distal se realiza lejos del punto de muestreo.'}}
];
