import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {CONSENSUS_PALETTE,CONSENSUS_SYMBOLS,CONSENSUS_NOMENCLATURE,consensusSymbolEntry,ULCER_SAMPLE} from '../src/data/consensusStandard.js';
import {perpendicularMarks,contourHatch,validContour} from '../src/simulation/cartographicGeometry.js';
import {markSVG,parseMap,serializeMap,DEFAULT_META} from '../src/data/cartographyModel.js';
import {validateEducationalMap} from '../src/data/mapValidation.js';

test('código compartido: seis colores, seis trazos, cinco figuras y 17 siglas históricas',()=>{
 assert.deepEqual(Object.values(CONSENSUS_PALETTE),['#0000ff','#ff0000','#999999','#000000','#6aa84f','#ffff00']);
 for(const [type,count] of [['color',6],['stroke',6],['shape',5]])assert.equal(CONSENSUS_SYMBOLS.filter(s=>s.type===type).length,count);
 assert.equal(CONSENSUS_NOMENCLATURE.length,17);assert.ok(CONSENSUS_NOMENCLATURE.every(t=>t.english&&t.spanish&&t.portuguese));
 assert.ok(CONSENSUS_NOMENCLATURE.some(t=>t.term==='AAGSV'));assert.ok(!CONSENSUS_NOMENCLATURE.some(t=>t.term==='ASV'));
 const surgery=consensusSymbolEntry(CONSENSUS_SYMBOLS.find(s=>s.id==='surgery'));
 assert.equal(surgery.type,'surgery');assert.equal(surgery.condition,'');assert.match(markSVG(surgery,false,{annotations:false}),/stroke="#000000"/);
 const aplasia=consensusSymbolEntry(CONSENSUS_SYMBOLS.find(s=>s.id==='aplasia'));assert.equal(aplasia.condition,'aplastic');assert.match(markSVG(aplasia),/stroke-dasharray="0 6"/);
});
test('las marcas perpendiculares y X siguen la tangente incluso en líneas oblicuas y verticales',()=>{
 for(const points of [[[0,0],[100,0]],[[0,0],[0,100]],[[10,20],[90,90]]]){
  const [a,b]=points,t=[b[0]-a[0],b[1]-a[1]];
  const ticks=perpendicularMarks(points);assert.ok(ticks.length>0);
  for(const [c,d] of ticks)assert.ok(Math.abs((d[0]-c[0])*t[0]+(d[1]-c[1])*t[1])<1e-8);
  const [u,v]=perpendicularMarks(points,{crosses:true});
  const d1=[u[1][0]-u[0][0],u[1][1]-u[0][1]],d2=[v[1][0]-v[0][0],v[1][1]-v[0][1]];
  assert.ok(Math.abs(d1[0]*d2[1]-d1[1]*d2[0])>1);
 }
});
test('la cuadrícula queda recortada al contorno cóncavo, que sobrevive al guardado y al SVG',()=>{
 const polygon=[[10,10],[90,10],[90,35],[35,35],[35,90],[10,90]],grid=contourHatch(polygon);assert.ok(grid.length>10);
 assert.ok(validContour(polygon));assert.ok(validContour(ULCER_SAMPLE));
 assert.ok(!validContour([[0,0],[20,20],[0,20],[20,0]]));assert.ok(!validContour([[0,0],[0,0],[20,20]]));assert.ok(!validContour([[0,0],[10,10],[20,20]]));
 for(const [a,b] of grid){const x=(a[0]+b[0])/2,y=(a[1]+b[1])/2;assert.ok(x>=10-1e-8&&x<=90+1e-8&&y>=10-1e-8&&y<=90+1e-8&&(x<=35+1e-8||y<=35+1e-8));}
 const ulcer={id:'ulcer',type:'ulcer',view:1,points:ULCER_SAMPLE,label:'Úlcera venosa',length:'3',ulcerWidth:'2'};
 const round=parseMap(serializeMap([ulcer],DEFAULT_META)).entries[0];assert.deepEqual(round.points,ULCER_SAMPLE);assert.equal(round.ulcerWidth,'2');assert.match(markSVG(round),/3 × 2 cm/);assert.match(markSVG(round),/Z" fill="white"/);
 assert.ok(!validateEducationalMap([round],DEFAULT_META).some(i=>i.id==='ulcer-contour-ulcer'));
 assert.ok(validateEducationalMap([{...round,points:[[10,10]]}],DEFAULT_META).some(i=>i.id==='ulcer-contour-ulcer'&&i.severity==='error'));
});
test('se rechazan contradicciones explícitas de aplasia sin inferir un diagnóstico',()=>{
 const entry={id:'a',type:'vessel',view:1,points:[[30,30],[30,100]],label:'GSV',plane:'aplasia',condition:'competent'};
 assert.ok(validateEducationalMap([entry],DEFAULT_META).some(i=>i.id==='aplasia-condition-a'));
 assert.ok(!validateEducationalMap([{...entry,condition:'aplastic'}],DEFAULT_META).some(i=>i.severity==='error'));
 assert.ok(validateEducationalMap([{...entry,condition:'aplastic',diameter:'4'}],DEFAULT_META).some(i=>i.id==='aplasia-data-a'));
});
test('cada fragmento apunta a un archivo fuente íntegro con procedencia y hash verificado',()=>{
 const crops=JSON.parse(fs.readFileSync('src/data/consensusGlyphCrops.json','utf8'));
 const provenance=JSON.parse(fs.readFileSync('public/media/consenso/provenance.json','utf8'));
 for(const s of CONSENSUS_SYMBOLS){const c=crops[s.id];assert.ok(c);assert.ok(c.viewBox[0]>=0&&c.viewBox[1]>=0&&c.viewBox[0]+c.viewBox[2]<=c.width&&c.viewBox[1]+c.viewBox[3]<=c.height);assert.ok(provenance.files.some(f=>f.file===c.file));}
 for(const f of provenance.files){const bytes=fs.readFileSync('public/media/consenso/'+f.file);assert.equal(bytes.length,f.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),f.sha256);}
});
