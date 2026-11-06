import test from 'node:test';
import assert from 'node:assert/strict';
import {courseTermOrder,courseTerms,courseLocation,findCourseTerms,visualTermAliases} from '../src/data/conceptCourse.js';
import {appendDraft,draftProblem,pickMark,translatePoints} from '../src/simulation/mapInteraction.js';
import {EXAMPLE_MAP,parseMap,serializeMap} from '../src/data/cartographyModel.js';

test('el índice incluye los 80 conceptos una sola vez y permite localizar ganancias y Doppler',()=>{
 assert.equal(courseTermOrder.length,80);assert.equal(new Set(courseTermOrder).size,80);
 assert.deepEqual([...courseTermOrder].sort(),Object.keys(courseTerms).sort());
 for(const id of courseTermOrder)assert.match(courseLocation[id].number,/^\d+\.\d+\.\d+$/);
 assert.deepEqual(findCourseTerms('ganancias'),['ganancia','tgc','ganancia-color']);
 assert.ok(findCourseTerms('efecto doppler').includes('efecto-doppler'));
 assert.equal(visualTermAliases.gain,'ganancia');assert.equal(visualTermAliases.doppler,'efecto-doppler');
});
test('una perforante se coloca, se recoloca y se confirma con un punto y condición explícita',()=>{
 let points=appendDraft('perforator',[],[70,200]);
 assert.ok(draftProblem('perforator',points,''));
 assert.equal(draftProblem('perforator',points,'competent'),'');
 points=appendDraft('perforator',points,[85,230]);assert.deepEqual(points,[[85,230]]);
 assert.ok(draftProblem('perforator',[],'competent'));
});
test('los trayectos requieren puntos diferentes y la úlcera un contorno sin cruces',()=>{
 let p=appendDraft('vessel',[],[80,50]);assert.ok(draftProblem('vessel',p,'competent'));
 p=appendDraft('vessel',p,[80,50]);assert.equal(p.length,1);
 p=appendDraft('vessel',p,[80,180]);assert.equal(draftProblem('vessel',p,'competent'),'');
 assert.ok(draftProblem('vessel',p,''));
 assert.ok(draftProblem('ulcer',[[0,0],[10,10],[0,10],[10,0]],''));
 assert.equal(draftProblem('ulcer',[[0,0],[10,0],[10,10],[0,10]],''),'');
 assert.equal(draftProblem('surgery',[[10,10],[20,10]],''),'');
});
test('seleccionar una perforante admite el centro hueco y proximidad, respetando cara y vecino',()=>{
 const a={id:'a',type:'perforator',view:1,points:[[70,200]]},b={...a,id:'b',points:[[110,200]]};
 assert.equal(pickMark([a,b],1,[70,200],10)?.id,'a');
 assert.equal(pickMark([a,b],1,[83,200],10)?.id,'a');
 assert.equal(pickMark([a,b],1,[108,200],10)?.id,'b');
 assert.equal(pickMark([a,b],0,[70,200],10),null);
 assert.equal(pickMark([a,b],1,[70,250],10),null);
 const ulcer={id:'u',type:'ulcer',view:1,points:[[10,10],[40,10],[40,40],[10,40]]};
 assert.equal(pickMark([ulcer],1,[25,25],1)?.id,'u');
});
test('recolocar conserva la geometría y limita el conjunto a la cara, también en ampliaciones',()=>{
 assert.deepEqual(translatePoints([[10,20],[80,450]],250,100,470),[[130,40],[200,470]]);
 assert.deepEqual(translatePoints([[10,20],[80,150]],-100,-100,200),[[0,0],[70,130]]);
 const parsed=parseMap(serializeMap(EXAMPLE_MAP.entries,EXAMPLE_MAP.meta));
 assert.equal(parsed.entries.length,EXAMPLE_MAP.entries.length);assert.equal(parsed.meta.side,'derecho');
 assert.ok(parsed.entries.some(e=>e.type==='perforator'));
});
