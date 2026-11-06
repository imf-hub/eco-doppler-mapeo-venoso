import {aliasFrequency,clamp,dopplerHz,echoMicroseconds,wavelengthMM} from '../lib.js';
import {flowVelocity} from './ultrasoundModel.js';
export const VISUAL_DEFAULTS={frequency:8,angle:55,gain:50,pressure:0,depth:5,prf:4.6,filter:60,focus:2.2,speed:12,tgc:50,dynamic:65,persistence:2,gate:2,colorGain:54};
export function visualParameters(value={}){const p={...VISUAL_DEFAULTS};for(const key of Object.keys(p))if(Number.isFinite(value[key]))p[key]=value[key];p.frequency=clamp(p.frequency,.5,25);p.angle=clamp(p.angle,0,180);p.depth=clamp(p.depth,.5,12);p.prf=clamp(p.prf,.1,20);p.pressure=clamp(p.pressure,0,100);p.rotationProvided=Number.isFinite(value.rotation);p.mode=['B','Color','PW','Power'].includes(value.mode)?value.mode:null;p.region=['gsv','sfj','ssv'].includes(value.region)?value.region:'gsv';p.inverted=!!value.inverted;p.maneuverProvided=value.maneuverProvided??Object.prototype.hasOwnProperty.call(value,'maneuver');p.maneuver=!!value.maneuver;p.rotation=Number.isFinite(value.rotation)?clamp(value.rotation,0,90):0;p.position=value.position||'standing';p.support=value.support!==false;p.unloaded=value.unloaded!==false;p.incompetent=!!value.incompetent;return p;}
export function computeVisualMetrics(parameters={}){const p=visualParameters(parameters),shift=dopplerHz(p.frequency,p.speed,p.angle),sampleRate=p.prf*1000;return {parameters:p,wavelengthMM:wavelengthMM(p.frequency),echoTimeUS:echoMicroseconds(p.depth),dopplerHz:shift,nyquistHz:sampleRate/2,aliasHz:aliasFrequency(shift,sampleRate),aliased:Math.abs(shift)>sampleRate/2,signalAboveFilter:Math.abs(shift)>p.filter&&Math.abs(p.angle-90)>.01,areaRatio:idealAreaRatio(p.pressure),sampleRate};}
export function idealAreaRatio(pressure){return Math.max(.01,1-clamp(pressure,0,100)/100);}
export function attenuationAmplitude(depthCM,frequencyMHz,alpha=.5){return Math.pow(10,-alpha*frequencyMHz*Math.max(0,depthCM)/20);}
export function normalizedBeamWidth(depthCM,focusCM){return Math.sqrt(1+Math.pow((depthCM-focusCM)/1.15,2));}
export function transferBrightness(input,gain=50,dynamic=65){const amplified=input*gain/50;const contrast=65/Math.max(15,dynamic);return clamp((amplified-.45)*contrast+.45,0,1);}
export function delayedPersistence(t,persistence=2){const tau=.055+Math.max(0,persistence)*.14;if(t<2)return 0;if(t<=4)return 1-Math.exp(-(t-2)/tau);return (1-Math.exp(-2/tau))*Math.exp(-(t-4)/tau);}
export function samplingValue(frequencyHz,sampleRateHz,index,phase=0){return Math.sin(2*Math.PI*frequencyHz*index/sampleRateHz+phase);}
// Idealized distributions describe teaching examples; they are not a device calibration.
export function retainedPowerFraction(parameters={}){const p=visualParameters(parameters),center=Math.abs(dopplerHz(p.frequency,p.speed,p.angle));if(center<.01||p.pressure>=92)return 0;const spread=Math.max(12,center*.16),limit=center+spread*5;let total=0,kept=0;for(let i=0;i<400;i++){const hz=(i+.5)/400*limit,w=Math.exp(-.5*Math.pow((hz-center)/spread,2));total+=w;if(hz>p.filter)kept+=w;}return total?kept/total:0;}
export function measurementWallCoordinates(pressure=0){const ratio=Math.max(.025,idealAreaRatio(pressure));return {left:.5-.19*ratio,right:.5+.19*ratio,ratio};}
export function illustrativeFlowVelocity(t,scenario='normal',provoked=true,speed=12){return flowVelocity(t,scenario,provoked)*Math.max(0,speed)/12;}
export function illustrativeFlowDisplacement(time,scenario='normal',provoked=true,speed=12){
 const t=Math.max(0,time),cuts=[0,...(provoked?[1,2,2.06,2.85].filter(x=>x<t):[]),t];let total=0;
 for(let i=1;i<cuts.length;i++){const a=cuts[i-1],b=cuts[i],mid=(a+b)/2;
  if(provoked&&mid>=1&&mid<2)total+=28*(b-a)+2/13*(Math.cos(13*a)-Math.cos(13*b));
  else if(provoked&&mid>=2&&mid<2.85&&scenario==='reflux')total+=-13*(b-a);
  else if(provoked&&mid>=2&&mid<2.06)total+=-2*(b-a);
  else {const base=scenario==='slow'?2:provoked?9:11,mod=provoked?.16:.2;total+=base*(b-a)+base*mod/1.5*(Math.cos(1.5*a)-Math.cos(1.5*b));}
 }
 return total*Math.max(0,speed)/12;
}

export function contextualVisualParameters(concept,raw={}){
 const id=typeof concept==='string'?concept:concept?.id,p=visualParameters(raw);
 p.scanLevel=clamp(Number.isFinite(raw.level)?raw.level:Number.isFinite(raw.depth)?raw.depth:25,0,100);
 p.cameraAngle=clamp(Number.isFinite(raw.angle)?raw.angle:45,0,180);
 p.bedAngle=clamp(Number.isFinite(raw.angle)?raw.angle:45,0,90);
 p.probeRotation=clamp((id==='orientation'||id==='perforator')?(Number.isFinite(raw.angle)?raw.angle:Number.isFinite(raw.rotation)?raw.rotation:0):(Number.isFinite(raw.rotation)?raw.rotation:Number.isFinite(raw.angle)?raw.angle:0),0,90);
 p.completeness=clamp(Number.isFinite(raw.gain)?raw.gain:60,0,100);
 if(id==='continuity')p.depth=VISUAL_DEFAULTS.depth;
 if(id==='orientation'||id==='perforator'){p.rotation=p.probeRotation;p.rotationProvided=true;}
 return p;
}
