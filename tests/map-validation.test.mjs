import test from 'node:test';
import assert from 'node:assert/strict';
import {validateEducationalMap} from '../src/data/mapValidation.js';
const meta={code:'SIM-QA',side:'derecho',position:'Bipedestación',maneuver:'Aumento distal y liberación',indication:'Localizar extensión de reflujo ficticio',notes:'Ejercicio ficticio. Profundo revisado; limitaciones documentadas.',views:[0,1,2]};
const veins=[{id:'a',view:1,type:'vessel',label:'GSV',condition:'competent',plane:'subfascial',region:'muslo',points:[[90,70],[90,190]],diameter:'4.2'},{id:'b',view:1,type:'vessel',label:'GSV',condition:'competent',plane:'subfascial',region:'pierna',points:[[90,240],[75,420]],diameter:'3.2'},{id:'c',view:2,type:'vessel',label:'SSV',condition:'competent',plane:'subfascial',region:'pierna',points:[[90,250],[80,420]],diameter:'2.8'}];
test('un mapa normal no requiere duplicar venas en la cara anteroexterna',()=>{
 const issues=validateEducationalMap(veins,meta);assert.equal(issues.filter(i=>i.severity==='error'||i.severity==='warning').length,0);
});
test('lateralidad ausente y medida inválida se señalan sin interpretar diagnóstico',()=>{
 const issues=validateEducationalMap([{...veins[0],diameter:'-3',condition:'reflux'}],{...meta,side:''});
 assert.ok(issues.some(i=>i.id==='side-missing'&&i.severity==='error'));assert.ok(issues.some(i=>i.id==='diameter-a'));assert.ok(issues.some(i=>i.id==='reflux-evidence-a'));
});
test('perforante necesita localización y dimensión; no se clasifica por diámetro',()=>{
 const issues=validateEducationalMap([...veins,{id:'pv',type:'perforator',view:1,label:'PV',condition:'competent',points:[[77,320]],diameter:'4.0',height:'22',reference:''}],meta);
 assert.ok(issues.some(i=>i.id==='pv-reference-pv'));assert.ok(issues.some(i=>i.id==='pv-role-pv'));assert.ok(!issues.some(i=>/incompetente/.test(i.message)));
});
test('tolerancia a datos importados dañados y textos no evaluables',()=>{
 assert.equal(validateEducationalMap(null,meta)[0].severity,'error');
 const issues=validateEducationalMap([{...veins[0],points:[[NaN,1]]},{id:'limited',view:2,type:'annotation',label:'SSV no evaluada',points:[[20,30]]}],meta);
 assert.ok(issues.some(i=>i.id==='points-a'));assert.ok(issues.some(i=>i.id==='ssv-limited'));assert.ok(!issues.some(i=>i.id==='ssv-missing'));
});
