import {wavelengthMM,periodUS,echoTimeUS,reflectionIntensity,refractedAngleDegrees,dopplerShiftHz,correctedVelocityCMs,nyquistHz,aliasHz,mechanicalIndex} from './glossaryPhysics.js';
import {cameraPose} from './cameraMotion.js';

export const clampFilm=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const smoothFilm=v=>{const t=clampFilm(v);return t*t*(3-2*t);};
export const seedFilm=(i,seed=17)=>{const v=Math.sin(i*127.1+seed*311.7)*43758.5453123;return v-Math.floor(v);};
export function cueAt(cues,time){let index=0;for(let i=1;i<cues.length;i++)if(time>=cues[i].start)index=i;return index;}

export function sampleConceptFilm(film,time,audio,{reducedMotion=false}={}){
 const duration=audio?.duration||30,cues=audio?.cues||[{start:0,end:10},{start:10,end:20},{start:20,end:30}],t=clampFilm(time,0,duration),scene=cueAt(cues,t),cue=cues[scene],u=clampFilm((t-cue.start)/Math.max(.1,cue.end-cue.start));
 const change=scene===0?0:scene===1?smoothFilm((u-.12)/.72):1,value=film.before+(film.after-film.before)*change,kind=film.animation;
 const s={time:t,duration,scene,cueProgress:u,change,value,kind,family:film.family,seed:[...film.id].reduce((v,c)=>v+c.charCodeAt(0),0),frequency:5,soundSpeed:1540,amplitude:.6,angle:55,velocity:15,prf:2,baseline:0,gain:50,tgc:50,range:60,focus:3,depth:5,gate:3,output:.6,compression:0,valveClosure:0,scan:(t*.18)%1,phase:(t*.25)%1};
 if(['sound','ultrasound','frequency','attenuation'].includes(kind))s.frequency=value;
 if(kind==='period')s.frequency=1/value;
 if(kind==='wavelength')s.frequency=1.54/value;
 if(kind==='propagation')s.soundSpeed=value;
 if(kind==='amplitude')s.amplitude=value;
 if(['gain','bmode'].includes(kind))s.gain=value;
 if(kind==='tgc')s.tgc=value;
 if(kind==='dynamic-range')s.range=value;
 if(['focus','beamforming'].includes(kind))s.focus=value;
 if(['depth','echo'].includes(kind))s.depth=value;
 if(kind==='doppler')s.velocity=value;
 if(['doppler-angle','flow-direction'].includes(kind))s.angle=value;
 if(kind==='angle-correction')s.angle=60;
 if(kind==='steering')s.angle=90-value;
 if(['scale','nyquist'].includes(kind))s.prf=value;
 if(kind==='prf')s.prf=value;
 if(kind==='prp')s.prf=1/value;
 if(kind==='baseline')s.baseline=value;
 if(kind==='gate')s.gate=value;
 if(kind==='cw')s.velocity=value;
 if(kind==='color')s.velocity=value;
 if(kind==='compression')s.compression=value/100;
 if(kind==='valve')s.valveClosure=change;
 if(kind==='output-power')s.output=value;
 s.wavelength=wavelengthMM(s.frequency,s.soundSpeed);s.period=periodUS(s.frequency);s.echoTime=echoTimeUS(s.depth,s.soundSpeed);s.doppler=dopplerShiftHz(s.velocity,s.angle,s.frequency,s.soundSpeed);
 if(kind==='aliasing')s.doppler=value*1000;
 if(kind==='angle-correction')s.correctedVelocity=correctedVelocityCMs(s.velocity,60,value);
 s.nyquist=nyquistHz(s.prf);s.aliased=aliasHz(s.doppler,s.prf*1000);
 s.reflection=reflectionIntensity(1.5,['impedance','reflection'].includes(kind)?value:3);
 s.refraction=refractedAngleDegrees(kind==='refraction'?value:20);
 s.mechanicalIndex=mechanicalIndex(value,2);
 // Continuous displacement, including a labelled, slowed retrograde example.
 const mechanics=t*.55;
 s.flowDistance=mechanics;
 if(['reflux','reflux-duration'].includes(kind)){
  const start=cues[1].start+1,window=film.after*5,q=clampFilm(t-start,0,window);
  s.clinicalTime=(t-start)/5+2;
  s.flowDistance=(t-q)*.25-.35*window/Math.PI*(1-Math.cos(Math.PI*q/window));s.reversed=t>start&&t<start+window;
 }
 if(kind==='augmentation'){const q=Math.max(0,t-cues[1].start);s.flowDistance=t*.25+value*(1-Math.exp(-q))*2;}
 const a=cues[1].start+(cues[1].end-cues[1].start)*.12,b=(cues[1].end-cues[1].start)*.72,q=clampFilm((t-a)/b),integral=b*(q**3-.5*q**4)+Math.max(0,t-a-b),integratedControl=film.before*t+(film.after-film.before)*integral;
 if(kind==='phasicity')s.flowDistance=t*.45+.1*Math.sin(integratedControl/60*2*Math.PI);
 if(kind==='pulsatility')s.flowDistance=t*.45+.025*Math.sin(integratedControl/60*2*Math.PI);
 if(kind==='valve')s.flowDistance=Math.min(t,cues[1].start)*.35;
 if(['color-map','invert','baseline','color-gain','wall-filter','power','gate','pw'].includes(kind))s.flowDistance=t*.55;
 if(['doppler','color','cw'].includes(kind)){
  s.flowDistance=integratedControl*.035;
 }
 const profiles={
  wave:[{position:[7,3.8,8],target:[0,0,0]},{position:[2.3,1.8,5.1],target:[0,0,0]},{position:[3.5,2.2,6.2],target:[.2,0,0]}],
  interface:[{position:[7,4,8],target:[0,0,0]},{position:[3.5,2.2,5.3],target:[0,0,0]},{position:[5,2.6,7.2],target:[.4,0,0]}],
  resolution:[{position:[6,4,8],target:[.4,0,0]},{position:kind==='elevation'||kind==='slice-thickness'?[5,2.4,5]:[2.5,1.6,6],target:[0,0,0]},{position:[6,2.5,6.5],target:[2,.3,0]}],
  default:[{position:[8,4.5,10],target:[1,.4,0]},{position:[4.6,2.6,7],target:[0,.4,0]},{position:[6.6,1.8,6.5],target:[2.6,.3,.3]}]
 };
 const poses=profiles[film.family]||profiles.default,pose=reducedMotion?poses[0]:cameraPose(poses[Math.max(0,scene-1)],poses[scene],smoothFilm((t-cue.start)/1.5));
 s.camera=pose;
 return s;
}

export function activeFilmCaption(captions,time){return captions?.find(c=>time>=c.start&&time<c.end)?.text||'';}
