import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {TEMPLATE_REGIONS,consensusFigures,consensusChapters,consensusTermIds,WORK_VIEWS,viewHeight,buildingStageEntries} from '../src/data/consensusAtlas.js';
import {officialMapMarkup,createMapSVG,parseMap,serializeMap,EXAMPLE_MAP,diagramBackground} from '../src/data/cartographyModel.js';
import {validateEducationalMap} from '../src/data/mapValidation.js';

test('la plantilla izquierda conserva identidad de caras y cambia su orden impreso',()=>{
 const right=TEMPLATE_REGIONS.derecho,left=TEMPLATE_REGIONS.izquierdo;
 assert.ok(right[0].x<right[1].x&&right[1].x<right[2].x);
 assert.ok(left[2].x<left[1].x&&left[1].x<left[0].x);
 assert.equal(WORK_VIEWS.length,5);
 for(const regions of [right,left])for(const r of regions){assert.ok(r.x>=0&&r.y>=0&&r.x+r.w<=566&&r.y+r.h<=800);}
 for(const side of ['derecho','izquierdo'])for(let v=0;v<5;v++)assert.ok(diagramBackground(v,side).includes(side==='derecho'?'plantilla-derecha.png':'plantilla-izquierda.png'));
});
test('las ampliaciones y sus etiquetas sobreviven a guardar y exportar con la base incorporada',()=>{
 const model=structuredClone(EXAMPLE_MAP);model.entries.push({id:'sfj',view:3,type:'vessel',points:[[40,40],[40,120],[100,150]],condition:'competent',plane:'subfascial',label:'SFJ',diameter:'7',lineWidth:6,labelX:115,labelY:100});
 const round=parseMap(serializeMap(model.entries,model.meta));const e=round.entries.at(-1);
 assert.equal(e.view,3);assert.equal(e.lineWidth,6);assert.equal(e.labelX,115);assert.equal(e.labelY,100);
 const svg=createMapSVG(round.entries,round.meta,{imageHref:'data:image/png;base64,example'});
 assert.ok(svg.includes('data:image/png;base64,example'));assert.ok(!svg.includes('href="media/'));assert.ok(svg.includes('data-map-view="4"'));assert.ok(svg.includes('SFJ'));assert.ok(svg.includes('Maniobra:'));
 assert.equal(validateEducationalMap(round.entries,round.meta).filter(x=>x.severity==='error').length,0);
 model.entries.at(-1).points[0][1]=220;assert.throws(()=>parseMap(model));assert.ok(validateEducationalMap(model.entries,model.meta).some(x=>x.id==='point-bounds-sfj'));
 assert.equal(viewHeight(3),200);assert.equal(viewHeight(0),470);
});
test('las referencias originales y las dos plantillas están disponibles como activos locales',()=>{
 assert.equal(consensusChapters.length,7);assert.equal(consensusTermIds.length,17);
 for(const f of Object.values(consensusFigures)){assert.ok(fs.statSync('public/media/consenso/'+f.file).size>1000);assert.ok(f.locator&&f.es&&f.alt);}
 for(const side of ['derecha','izquierda']){const bytes=fs.readFileSync('public/media/consenso/plantilla-'+side+'.pdf');assert.equal(bytes.subarray(0,5).toString(),'%PDF-');}
 const markup=officialMapMarkup(EXAMPLE_MAP.entries,EXAMPLE_MAP.meta);assert.ok(markup.includes('width="566" height="800"'));assert.equal((markup.match(/data-map-view=/g)||[]).length,5);
});
test('la secuencia de medidas conserva todas las referencias del mapa entregable',()=>{
 const before=JSON.stringify(EXAMPLE_MAP.entries);
 for(const stage of [4,5])assert.deepEqual(buildingStageEntries(EXAMPLE_MAP.entries,stage),EXAMPLE_MAP.entries);
 const measures=buildingStageEntries(EXAMPLE_MAP.entries,4),start=measures.find(e=>e.id==='gsv-ref'),end=measures.find(e=>e.id==='gsv-end-note');
 assert.equal(Number(start.height)-Number(end.height),Number(start.length));
 assert.match(start.reference,/rodilla/);assert.match(end.reference,/rodilla/);
 assert.equal(JSON.stringify(EXAMPLE_MAP.entries),before);
});
