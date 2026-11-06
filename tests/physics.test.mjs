import test from 'node:test';
import assert from 'node:assert/strict';
import {wavelengthMM,echoMicroseconds,dopplerHz,aliasFrequency,escapeXML} from '../src/lib.js';
import {mappingSteps,glossary,symbols} from '../src/data/mapping.js';
import {lessons} from '../src/data/lessons.js';
import {cases} from '../src/data/cases.js';
test('unidades físicas: λ y tiempo de ida y vuelta',()=>{
 assert.ok(Math.abs(wavelengthMM(10)-.154)<1e-10);
 assert.ok(Math.abs(echoMicroseconds(3)-38.96103896)<1e-7);
 assert.equal(echoMicroseconds(6),2*echoMicroseconds(3));
});
test('Doppler angular y límite de Nyquist',()=>{
 assert.ok(Math.abs(dopplerHz(10,12,90))<1e-9);
 assert.ok(Math.abs(dopplerHz(10,12,60)-dopplerHz(10,12,0)/2)<1e-8);
 assert.equal(aliasFrequency(600,1000),-400);
 assert.equal(aliasFrequency(-600,1000),400);
 assert.equal(aliasFrequency(100,1000),100);
});
test('mapa exportable: texto clínico no se convierte en SVG ejecutable',()=>{
 assert.equal(escapeXML('<script>"&\''),'&lt;script&gt;&quot;&amp;&apos;');
});
test('currículo íntegro: pasos, preguntas y fuentes trazables',()=>{
 assert.equal(mappingSteps.length,12);assert.equal(cases.length,6);
 for(const list of [mappingSteps,lessons,cases])assert.equal(new Set(list.map(x=>x.id)).size,list.length);
 for(const q of [...lessons.map(x=>x.quiz),...mappingSteps.map(x=>x.checkpoint),...cases.flatMap(x=>x.questions)]){assert.ok(q.answer>=0&&q.answer<q.options.length);assert.ok(q.explanation?.length>15);}
 assert.ok(mappingSteps.every(x=>x.actions.length>=3&&x.source.url.startsWith('https://')));
 assert.ok(glossary.some(x=>x.term==='ASV'));assert.ok(symbols.some(x=>x.id==='perforator'));
});
