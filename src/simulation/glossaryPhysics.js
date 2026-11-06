// Textbook relationships for declared ideal models. These do not calculate a
// patient's findings, acoustic output or biological effects.
export const SOUND_SPEED=1540;
export const radians=degrees=>degrees*Math.PI/180;
export const wavelengthMM=(frequencyMHz,speed=SOUND_SPEED)=>speed/(frequencyMHz*1000);
export const periodUS=frequencyMHz=>1/frequencyMHz;
export const pulseDurationUS=(cycles,frequencyMHz)=>cycles/frequencyMHz;
export const spatialPulseLengthMM=(cycles,frequencyMHz,speed=SOUND_SPEED)=>cycles*wavelengthMM(frequencyMHz,speed);
export const echoTimeUS=(depthCM,speed=SOUND_SPEED)=>2*(depthCM/100)/speed*1e6;
export const axialResolutionMM=spatialPulseLength=>spatialPulseLength/2;
export const prpMS=prfKHz=>1/prfKHz;
export const dutyPercent=(durationUS,prfKHz)=>durationUS*prfKHz/10;
export const maximumSinglePulsePRFKHz=(depthCM,speed=SOUND_SPEED)=>speed/(20*depthCM);
export const circularPistonNearfieldMM=(diameterMM,frequencyMHz)=>diameterMM**2/(4*wavelengthMM(frequencyMHz));
export const reflectionIntensity=(z1,z2)=>((z2-z1)/(z2+z1))**2;
export const reflectionPressure=(z1,z2)=>(z2-z1)/(z2+z1);
export const transmissionPressure=(z1,z2)=>2*z2/(z1+z2);
export const attenuationAmplitude=(depthCM,frequencyMHz,alpha=.5,twoWay=false)=>10**(-alpha*frequencyMHz*depthCM*(twoWay?2:1)/20);
export function refractedAngleDegrees(incidentDegrees,speedRatio=1.2){const s=speedRatio*Math.sin(radians(incidentDegrees));return Math.abs(s)>1?null:Math.asin(s)*180/Math.PI;}
export const dopplerShiftHz=(speedCMs,angleDegrees,frequencyMHz=5,speed=SOUND_SPEED)=>2*frequencyMHz*1e6*(speedCMs/100)*Math.cos(radians(angleDegrees))/speed;
export const correctedVelocityCMs=(actualVelocity,actualAngle,declaredAngle)=>actualVelocity*Math.cos(radians(actualAngle))/Math.cos(radians(declaredAngle));
export const nyquistHz=prfKHz=>prfKHz*1000/2;
export const aliasHz=(frequency,prfHz)=>((frequency+prfHz/2)%prfHz+prfHz)%prfHz-prfHz/2;
export const mechanicalIndex=(deratedRarefactionalMPa,frequencyMHz)=>deratedRarefactionalMPa/Math.sqrt(frequencyMHz);
export const baselineRangeHz=(prfKHz,offsetPercent)=>{const width=prfKHz*1000,shift=offsetPercent/100*width/2;return {min:-width/2+shift,max:width/2+shift,width};};
