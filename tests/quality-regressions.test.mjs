import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_SETTINGS as defaults,signalAt,flowVelocity,measurementResult,EXPERIMENTS} from '../src/simulation/ultrasoundModel.js';
import {EXAMPLE_MAP,parseMap,serializeMap,createMapSVG,markSVG,mapPath} from '../src/data/cartographyModel.js';
import {validateEducationalMap} from '../src/data/mapValidation.js';
import {mappingSteps} from '../src/data/mapping.js';
import {lessons,sources} from '../src/data/lessons.js';

test('el espectro PW envuelve señales sobre Nyquist: no las recorta',()=>{
 const s={...defaults,prf:.5};const raw=signalAt(s,12,'PW');
 assert.ok(raw.aliased);assert.ok(Math.abs(raw.displayHz)<=s.prf*500);assert.notEqual(Math.abs(raw.displayHz),s.prf*500);
 assert.ok(signalAt(defaults,-13,'PW').displayHz<0,'El reflujo del ejercicio no debe envolverse por defecto');
 assert.ok(signalAt(defaults,30,'PW').displayHz>0,'El aumento distal del ejercicio debe conservar dirección');
});
test('Power no presenta aliasing direccional y las limitaciones técnicas suprimen señal',()=>{
 assert.equal(signalAt({...defaults,prf:.3},30,'Power').aliased,false);
 assert.equal(signalAt({...defaults,angle:90},12).detected,false);
 assert.equal(signalAt({...defaults,filter:400},2).detected,false);
 assert.equal(signalAt({...defaults,pressure:99},12).detected,false);
});
test('los cursores no registran una medición invertida, sin señal o con aliasing',()=>{
 assert.equal(measurementResult(2,2.85,defaults,'reflux',true).correct,true);
 assert.equal(measurementResult(2.85,2,defaults,'reflux',true).correct,false);
 assert.equal(measurementResult(2,2.85,{...defaults,angle:90},'reflux',true).correct,false);
 assert.equal(measurementResult(2,2.85,{...defaults,prf:.3},'reflux',true).correct,false);
 assert.equal(measurementResult(2,2.85,defaults,'normal',true).correct,false);
 assert.equal(measurementResult(2,2.85,defaults,'reflux',false).correct,false);
});
test('la maniobra distal distingue aumento, liberación y reflujo sostenido',()=>{
 assert.ok(flowVelocity(1.5,'reflux',true)>20);assert.ok(flowVelocity(2.5,'reflux',true)<0);assert.ok(flowVelocity(2.5,'normal',true)>0);
});
test('los experimentos fallan con su preset deficiente y comprueban recuperación',()=>{
 for(const e of EXPERIMENTS)assert.equal(e.success({...defaults,...e.settings}),false,e.id);
 assert.equal(EXPERIMENTS.find(e=>e.id==='gain').success(defaults),true);
 assert.equal(EXPERIMENTS.find(e=>e.id==='slow').success({...defaults,prf:1.4,filter:40}),true);
 assert.equal(EXPERIMENTS.find(e=>e.id==='alias').success(defaults),true);
});
test('cartografía recuperable sin perder contexto ni permitir coordenadas inválidas',()=>{
 const round=parseMap(serializeMap(EXAMPLE_MAP.entries,EXAMPLE_MAP.meta));assert.equal(round.entries.length,EXAMPLE_MAP.entries.length);assert.equal(round.meta.maneuver,EXAMPLE_MAP.meta.maneuver);
 const bad=structuredClone(EXAMPLE_MAP);bad.entries[0].points[0][0]=Infinity;assert.throws(()=>parseMap(bad));
 assert.throws(()=>parseMap({meta:{},entries:[{type:'script'}]}));
 const issues=validateEducationalMap(round.entries,round.meta);assert.equal(issues.filter(x=>x.severity==='error'||x.severity==='warning').length,0,JSON.stringify(issues));
});
test('SVG incluye contexto, informe, tres caras y neutraliza etiquetas HTML',()=>{
 const meta={...EXAMPLE_MAP.meta,code:'<script>alert(1)</script>',notes:'Informe & evidencia'};const svg=createMapSVG(EXAMPLE_MAP.entries,meta);
 assert.ok(!svg.includes('<script>'));assert.ok(svg.includes('&lt;script&gt;'));assert.ok(svg.includes('Informe &amp; evidencia'));
 for(const label of ['ANTEROEXTERNA','ANTEROINTERNA','POSTERIOR','Maniobra:','Limitaciones:'])assert.ok(svg.includes(label),label);
 assert.ok(markSVG({...EXAMPLE_MAP.entries[0],surgery:true}).includes('stroke-width="1"'));
 assert.notEqual(mapPath([[10,10],[10,100]],'epifascial'),mapPath([[10,10],[10,100]],'subfascial'));
});
test('las 12 etapas enseñan captura y calidad; las 10 lecciones tienen fuente específica',()=>{
 for(const s of mappingSteps){assert.ok(s.acquisition?.patient&&s.acquisition.probe&&s.acquisition.screen,s.id);assert.ok(s.acquisition.capture.length&&s.acquisition.quality.length&&s.acquisition.nextDecision,s.id);}
 const ids=new Set(sources.map(s=>s.id));for(const l of lessons){assert.ok(l.sourceIds?.length,l.id);assert.ok(l.sourceIds.every(id=>ids.has(id)),l.id);}
});
