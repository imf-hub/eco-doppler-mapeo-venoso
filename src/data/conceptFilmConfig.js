import {glossarySpecs} from './glossarySpecs.js';
import {glossaryContent} from './glossaryContent.js';

export const FILM_VOICE={id:'84854979e66846989bc6c5855f53268f',name:'Rocío - Calm & Trustworthy',language:'es',engine:'saved default',playbackRate:1};
export const FILM_FAMILIES={
 wave:['sound','ultrasound','frequency','period','wavelength','amplitude','propagation'],
 interface:['impedance','reflection','refraction','scattering','absorption','attenuation','coupling'],
 transducer:['piezo','linear-array','beamforming','nearfield','focus'],
 resolution:['axial','lateral','elevation','slice-thickness'],
 pulse:['pulse','pulse-duration','spl','prf','prp','duty-cycle'],
 receiver:['echo','depth','frame-rate','line-density','bmode','mmode','gain','tgc','dynamic-range','zoom'],
 flow:['doppler','doppler-angle','angle-correction','baseline','color','color-map','flow-direction','color-gain','scale','nyquist','aliasing','invert','wall-filter','clutter','persistence','color-box','steering','pw','gate','spectral-broadening','cw','power','duplex'],
 artifact:['flash','shadow','enhancement','reverberation','mirror','sidelobes','anisotropy'],
 venous:['compression','augmentation','phasicity','pulsatility','valve','reflux','reflux-duration'],
 safety:['alara','ti','mi','output-power']
};
const ranges={
 sound:[4,4],ultrasound:[3,10],frequency:[2,9],period:[.8,.15],wavelength:[1.2,.25],amplitude:[.2,.9],propagation:[1400,1650],
 impedance:[1.5,6],reflection:[1.5,6],refraction:[10,40],scattering:[3,12],absorption:[.1,.9],attenuation:[2,10],coupling:[.8,0],
 piezo:[.25,.85],'linear-array':[8,32],beamforming:[1,4],nearfield:[2,10],focus:[1,4],axial:[1.8,.4],lateral:[2.8,.6],elevation:[5,1],'slice-thickness':[5,1],
 pulse:[2,7],'pulse-duration':[.4,1.6],spl:[2,7],prf:[.5,6],prp:[2,.2],'duty-cycle':[.1,1.5],
 echo:[2,8],depth:[2,10],'frame-rate':[10,60],'line-density':[32,160],bmode:[50,50],mmode:[1,7],gain:[25,85],tgc:[10,85],'dynamic-range':[35,85],zoom:[1,3],
 doppler:[3,30],'doppler-angle':[0,90],'angle-correction':[30,60],baseline:[0,60],color:[12,-12],'color-map':[0,1],'flow-direction':[55,125],'color-gain':[25,90],scale:[.5,5],nyquist:[.5,5],aliasing:[.4,2.5],invert:[0,1],'wall-filter':[0,300],clutter:[.1,3],persistence:[1,6],'color-box':[20,100],steering:[0,30],pw:[1,3],gate:[1,8],'spectral-broadening':[0,100],cw:[20,100],power:[.2,1],duplex:[1,3],
 flash:[0,4],shadow:[.2,1],enhancement:[.2,1],reverberation:[.5,3],mirror:[1,6],sidelobes:[.2,1],anisotropy:[0,60],
 compression:[0,85],augmentation:[.2,1],phasicity:[8,24],pulsatility:[40,120],valve:[0,1],reflux:[.2,1.2],'reflux-duration':[.2,1.2],alara:[0,60],ti:[.1,2],mi:[.1,2],'output-power':[.2,1]
};
const firstSentence=s=>s.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ])/u)[0];
export const speechText=s=>s.replace(/MHz/g,'megahercios').replace(/kHz/g,'kilohercios').replace(/\bHz\b/g,'hercios').replace(/µs/g,'microsegundos').replace(/\bmm\b/g,'milímetros').replace(/\bcm\b/g,'centímetros').replace(/\bPRF\b/g,'frecuencia de repetición de pulsos').replace(/\bPRP\b/g,'período de repetición de pulsos').replace(/\bTGC\b/g,'compensación de ganancia en el tiempo').replace(/\bTI\b/g,'índice térmico').replace(/\bMI\b/g,'índice mecánico').replace(/\bPW\b/g,'Doppler pulsado').replace(/\bCW\b/g,'Doppler continuo').replace(/≥/g,'mayor o igual que ').replace(/≤/g,'menor o igual que ').replace(/×/g,' por ').replace(/θ/g,'theta').replace(/λ/g,'lambda').replace(/°/g,' grados');
export const conceptFilms=Object.fromEntries(glossarySpecs.map(term=>{
 const content=glossaryContent[term.id],family=Object.keys(FILM_FAMILIES).find(f=>FILM_FAMILIES[f].includes(term.animation));
 if(!family||!ranges[term.animation])throw Error('Falta el storyboard 3D de '+term.id);
 const [before,after]=ranges[term.animation];
 const scenes=[
  {id:'idea',title:'La idea central',text:speechText(firstSentence(content.definition)),caption:content.observe[0],camera:'context'},
  {id:'mechanism',title:'Cómo ocurre',text:speechText(firstSentence(content.mechanism)),caption:content.observe[1],camera:'focus'},
  {id:'meaning',title:'Qué debes recordar',text:speechText(firstSentence(content.pitfall)),caption:content.observe[2],camera:'consequence'}
 ];
 return [term.id,{id:term.id,title:term.title,animation:term.animation,family,control:term.control,before,after,scenes,sources:content.sources,objective:content.definition,simplification:'Geometría y tiempos ilustrativos, ampliados para enseñanza. No representa una adquisición ni predice hallazgos de un paciente.'}];
}));
