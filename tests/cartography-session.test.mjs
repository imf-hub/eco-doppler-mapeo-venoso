import test from 'node:test';
import assert from 'node:assert/strict';
import {blankCartography,startCartographySession,changeMarkCondition,changeMarkPlane} from '../src/data/cartographySession.js';
import {EXAMPLE_MAP,serializeMap} from '../src/data/cartographyModel.js';

test('abrir el editor con un ejercicio guardado muestra una plantilla vacía y ofrece recuperación explícita',()=>{
 const saved=JSON.stringify(EXAMPLE_MAP),session=startCartographySession(JSON.parse(saved));
 assert.equal(session.model.entries.length,0);
 assert.equal(session.recovery.entries.length,EXAMPLE_MAP.entries.length);
 assert.equal(session.error,'');
 assert.equal(JSON.stringify(EXAMPLE_MAP),saved);
 session.model.entries.push({id:'nuevo'});
 assert.equal(session.recovery.entries.length,EXAMPLE_MAP.entries.length);
});
test('una copia JSON del esquema anterior sigue recuperable sin convertirse en un dibujo inicial',()=>{
 const session=startCartographySession(serializeMap(EXAMPLE_MAP.entries,EXAMPLE_MAP.meta));
 assert.deepEqual(session.model,blankCartography());
 assert.ok(session.recovery.entries.some(e=>e.type==='perforator'));
 assert.equal(session.recovery.meta.side,'derecho');
});
test('una copia dañada no impide abrir en blanco ni se modifica al leerla',()=>{
 const saved={entries:'dañado',meta:{side:'derecho'}},before=JSON.stringify(saved),session=startCartographySession(saved);
 assert.equal(session.model.entries.length,0);assert.equal(session.recovery,null);assert.ok(session.error);
 assert.equal(JSON.stringify(saved),before);
});
test('cada mapa en blanco tiene sus propios arrays y no recupera un borrador o ejemplo implícito',()=>{
 const a=blankCartography(),b=blankCartography();a.meta.views.push(4);a.entries.push({id:'prueba'});
 assert.deepEqual(b.meta.views,[0,1,2]);assert.equal(b.entries.length,0);
 assert.equal(startCartographySession(null).recovery,null);
 assert.equal(startCartographySession(b).recovery,null);
});
test('seleccionar punteado no diagnostica aplasia y pide distinguirla de ablación',()=>{
 const mark={type:'vessel',condition:'competent',plane:'subfascial'};
 assert.equal(changeMarkPlane(mark,'aplasia').condition,'');
 assert.equal(mark.condition,'competent');
 const ablated=changeMarkCondition(mark,'ablated');assert.equal(ablated.plane,'aplasia');
 assert.equal(changeMarkPlane(ablated,'epifascial').condition,'');
});
test('cambiar una condición explícita mantiene coherencia gráfica sin recolorear otras estructuras',()=>{
 const mark={type:'vessel',condition:'ablated',plane:'aplasia'};
 assert.equal(changeMarkCondition(mark,'competent').plane,'subfascial');
 assert.equal(changeMarkCondition({...mark,condition:''},'competent').plane,'subfascial');
 assert.equal(changeMarkCondition(mark,'aplastic').plane,'aplasia');
 const pv={type:'perforator',condition:'competent',plane:''};
 assert.equal(changeMarkCondition(pv,'reflux').plane,'');
});
