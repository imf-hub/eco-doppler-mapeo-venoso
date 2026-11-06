import test from 'node:test';
import assert from 'node:assert/strict';
import {mappingSteps,mappingSources} from '../src/data/mapping.js';
import {methodologyByStep} from '../src/data/methodology.js';
import {METHOD_TRACE,beamFlowAngle,interpolateVisual,preparedForReflux,scanCoverage,reviewedMethodology} from '../src/simulation/methodologyMotion.js';

test('las 12 etapas tienen guía, detención y demostraciones con error y corrección',()=>{
 assert.deepEqual(Object.keys(methodologyByStep),mappingSteps.map(s=>s.id));
 let frames=0;for(const step of mappingSteps){const g=methodologyByStep[step.id];assert.equal(g.quickGuide.length,4);assert.ok(g.stopRule.length>60);assert.ok(g.sourceIds.every(id=>mappingSources[id]));assert.equal(g.frames.length,step.id==='equipo'?4:3);assert.equal(new Set(g.frames.map(f=>f.id)).size,g.frames.length);
 for(const f of g.frames){frames++;for(const key of ['action','screen','error','correction','errorCode'])assert.ok(f[key]?.length>3,step.id+' '+f.id+' '+key);assert.equal(f.quiz.options.length,3);assert.ok(Number.isInteger(f.quiz.answer)&&f.quiz.answer>=0&&f.quiz.answer<3);for(const v of [f.visual,f.errorVisual]){for(const [key,max] of [['level',100],['rotation',90],['pressure',100],['tilt',60]])assert.ok(Number.isFinite(v[key])&&v[key]>=0&&v[key]<=max);assert.ok(['standing','reverse','supine'].includes(v.position));assert.ok(['gsv','sfj','ssv'].includes(v.region));}}}assert.equal(frames,37);
});
test('los extremos de la animación conservan los estados y la pose interpola sin saltos',()=>{
 const frame=methodologyByStep.posicion.frames[1],a=interpolateVisual(frame.errorVisual,frame.visual,0),b=interpolateVisual(frame.errorVisual,frame.visual,1),m=interpolateVisual(frame.errorVisual,frame.visual,.5);
 assert.equal(a.position,'supine');assert.equal(b.position,'reverse');assert.ok(Math.abs(a.poseAngle+Math.PI/2)<1e-12);assert.ok(Math.abs(b.poseAngle+Math.PI/4)<1e-12);assert.ok(m.poseAngle>a.poseAngle&&m.poseAngle<b.poseAngle);
 assert.equal(interpolateVisual(frame.errorVisual,frame.visual,-2).poseAngle,a.poseAngle);assert.equal(interpolateVisual(frame.errorVisual,frame.visual,8).poseAngle,b.poseAngle);
});
test('preparar reflujo exige apoyo y descarga también en la alternativa inclinada',()=>{
 assert.equal(preparedForReflux({position:'reverse',support:true,unloaded:false}),false);assert.equal(preparedForReflux({position:'standing',support:false,unloaded:true}),false);assert.equal(preparedForReflux({position:'supine',support:true,unloaded:true}),false);for(const position of ['standing','reverse'])assert.equal(preparedForReflux({position,support:true,unloaded:true}),true);
});
test('saltar entre dos extremos no acredita barrido continuo del esquema',()=>{
 assert.equal(scanCoverage([0,100]).complete,false);assert.equal(scanCoverage(Array(25).fill(30)).complete,false);assert.equal(scanCoverage([0,12,25,38,50,63,75,88,100]).complete,true);assert.equal(scanCoverage([NaN,Infinity]).complete,false);
});
test('ver una animación no equivale a responder sus comprobaciones',()=>{
 const g=methodologyByStep.equipo;assert.equal(reviewedMethodology(g,[],'equipo'),false);const responses=g.frames.map(f=>'method-equipo-'+f.id);assert.equal(reviewedMethodology(g,responses.slice(0,2),'equipo'),false);assert.equal(reviewedMethodology(g,responses,'equipo'),true);assert.equal(reviewedMethodology(g,responses,'posicion'),false);
});
test('el ángulo relaciona rotación e inclinación y no confunde eje largo con señal útil',()=>{
 assert.equal(beamFlowAngle(0,35),90);assert.equal(beamFlowAngle(90,0),90);assert.ok(Math.abs(beamFlowAngle(90,35)-55)<1e-10);
});

test('los cursores de reflujo coinciden con los cruces basales del ejemplo de 0.85 s',()=>{
 const t=METHOD_TRACE;assert.ok(Math.abs((t.releaseX-t.startX)/t.pixelsPerSecond-2)<1e-12);assert.ok(Math.abs((t.reverseEndX-t.startX)/t.pixelsPerSecond-2.85)<1e-12);assert.ok(Math.abs((t.reverseEndX-t.releaseX)/t.pixelsPerSecond-.85)<1e-12);
 const f=methodologyByStep.reflujo.frames.find(f=>f.id==='tiempo-observado');assert.equal(f.visual.maneuver,true);assert.equal(f.errorVisual.maneuver,true,'Para comparar cursores, ambas escenas conservan la provocación');
});
