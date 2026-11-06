import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {conceptSequences,methodSequences} from '../src/data/visualSequences.js';
import {conceptById} from '../src/data/visualCurriculum.js';
import {methodologyByStep} from '../src/data/methodology.js';
import {clinicalMedia as originalMedia} from '../src/data/clinicalMedia.js';
import {clinicalMediaExtra} from '../src/data/clinicalMediaExtra.js';
const clinicalMedia=[...originalMedia,...clinicalMediaExtra];

test('every visual concept has an ordered explanation through objects, sections, relationships and comparison',()=>{
 for(const id of Object.keys(conceptById)){const scenes=conceptSequences[id];assert.ok(scenes.length>=4,id);assert.deepEqual(new Set(scenes.map(s=>s.view)),new Set(['volume','section','graph','compare']),id);assert.equal(scenes[0].phaseStart,0);assert.equal(scenes.at(-1).phaseEnd,1);for(let i=0;i<scenes.length;i++){assert.ok(scenes[i].action.split(/\s+/).length<=18,id);assert.ok(scenes[i].sourceIds.length);if(i)assert.equal(scenes[i-1].phaseEnd,scenes[i].phaseStart);for(const n of Object.values(scenes[i].parameters))if(typeof n==='number')assert.ok(Number.isFinite(n),id);}}
});
test('method demonstrations preserve reviewed acquisition states without assessment descriptors',()=>{
 const forbidden=new Set(['quiz','question','answer','questions','score','options','checkpoint']);
 function inspect(v){if(v&&typeof v==='object')for(const [key,value] of Object.entries(v)){assert.ok(!forbidden.has(key),key);inspect(value);}}
 inspect(methodSequences);inspect(conceptSequences);
 for(const [id,guide] of Object.entries(methodologyByStep)){const scenes=methodSequences[id];assert.equal(scenes.length,guide.frames.length,id);for(let i=0;i<scenes.length;i++){assert.deepEqual(scenes[i].visual,guide.frames[i].visual);assert.deepEqual(scenes[i].errorVisual,guide.frames[i].errorVisual);assert.ok(conceptById[scenes[i].conceptId]);}}
});
test('real references retain the reviewed local bytes, explicit license and anatomical region',()=>{
 for(const m of clinicalMedia){const bytes=fs.readFileSync('public/'+m.src.replace(/^\.\//,''));assert.equal(bytes.length,m.bytes,m.id);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),m.sha256,m.id);assert.ok(fs.existsSync('public/'+m.thumbnail.replace(/^\.\//,'')),m.id);assert.ok(m.region&&m.author&&m.license&&m.licenseUrl&&m.sourceUrl,m.id);assert.ok(m.teachingConcepts.every(id=>conceptById[id]),m.id);if(m.pathological)assert.ok(m.pathologyNote,m.id);}
});
