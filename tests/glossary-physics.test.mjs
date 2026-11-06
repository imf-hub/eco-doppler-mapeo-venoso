import test from 'node:test';
import assert from 'node:assert/strict';
import * as p from '../src/simulation/glossaryPhysics.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
test('carrier, pulse and repetition retain distinct time and distance units',()=>{
 close(p.wavelengthMM(5),.308);close(p.periodUS(5),.2);
 close(p.pulseDurationUS(3,5),.6);close(p.spatialPulseLengthMM(3,5),.924);
 close(p.axialResolutionMM(.924),.462);close(p.prpMS(2),.5);
 close(p.dutyPercent(.6,5),.3);close(p.echoTimeUS(5),64.93506493506494);
 close(p.maximumSinglePulsePRFKHz(5),15.4);
});
test('normal-incidence reflection and attenuation distinguish amplitude from intensity',()=>{
 close(p.reflectionIntensity(1.5,1.5),0);
 close(p.reflectionIntensity(1.5,3),1/9);close(p.reflectionPressure(1.5,3),1/3);
 close(p.transmissionPressure(1.5,3),4/3);
 close(p.transmissionPressure(1.5,3)**2*1.5/3,1-p.reflectionIntensity(1.5,3));
 assert.ok(p.attenuationAmplitude(4,10)<p.attenuationAmplitude(4,5));
 close(p.attenuationAmplitude(4,5,.5,true),p.attenuationAmplitude(4,5)**2);
 assert.ok(p.refractedAngleDegrees(30)>30);assert.equal(p.refractedAngleDegrees(70),null);
});
test('sampled Doppler wraps rather than clips and a baseline shift preserves the total range',()=>{
 close(p.dopplerShiftHz(15,60),487.0129870129872);close(p.dopplerShiftHz(15,90),0);
 close(p.dopplerShiftHz(15,120),-p.dopplerShiftHz(15,60));
 close(p.nyquistHz(2),1000);close(p.aliasHz(1400,2000),-600);
 for(const shift of [-70,0,70]){const r=p.baselineRangeHz(2,shift);close(r.max-r.min,2000);}
 close(p.correctedVelocityCMs(20,60,60),20);assert.ok(p.correctedVelocityCMs(20,60,80)>20);
 close(p.mechanicalIndex(.8,2),.8/Math.sqrt(2));
});
