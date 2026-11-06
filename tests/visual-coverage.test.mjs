import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {visualConcepts,conceptById,lessonVisualMap,methodologyVisualMap,controlVisualMap} from '../src/data/visualCurriculum.js';
import {lessons} from '../src/data/lessons.js';
import {mappingSteps} from '../src/data/mapping.js';

test('every lesson, mapping stage and instrument control leads to an evidenced visual explanation',()=>{
 for(const lesson of lessons){assert.ok(lessonVisualMap[lesson.id]?.length>=3,lesson.id);for(const id of lessonVisualMap[lesson.id])assert.ok(conceptById[id],id);}
 for(const step of mappingSteps)assert.ok(conceptById[methodologyVisualMap[step.id]],step.id);
 for(const key of ['gain','colorGain','depth','frequency','focus','tgc','dynamic','prf','filter','angle','pressure','gate','persistence'])assert.ok(conceptById[controlVisualMap[key]],key);
 for(const c of visualConcepts){assert.equal(new Set(c.views.map(v=>v.id)).size,4,c.id);assert.ok(c.referenceLinks.length>=2,c.id);assert.ok(c.primaryParameter.initial>=c.primaryParameter.min&&c.primaryParameter.initial<=c.primaryParameter.max,c.id);for(const ref of c.referenceLinks)assert.equal(new URL(ref.url).protocol,'https:');}
});

test('distributed anatomy files retain the reviewed bytes and attributable license',()=>{
 const manifest=JSON.parse(fs.readFileSync('public/media/anatomy-v2/anatomy-assets.json','utf8'));
 for(const file of manifest.files){const data=fs.readFileSync('public/'+file.url.replace(/^\.\//,''));assert.equal(data.length,file.bytes,file.id);assert.equal(crypto.createHash('sha256').update(data).digest('hex'),file.sha256,file.id);assert.equal(data.toString('ascii',0,4),'glTF');assert.equal(file.license,'CC BY-SA 4.0');}
});

test('probe paths are ordered, finite and follow a complete proximal-distal teaching route',()=>{
 const paths=JSON.parse(fs.readFileSync('public/media/anatomy-v2/probe-paths.json','utf8'));
 for(const id of ['gsv','ssv']){const p=paths[id];assert.equal(p[0].level,0);assert.equal(p.at(-1).level,100);for(let i=0;i<p.length;i++){assert.ok([p[i].x,p[i].y,p[i].z,...p[i].normal].every(Number.isFinite));if(i)assert.ok(p[i].level>p[i-1].level);assert.ok(Math.abs(Math.hypot(...p[i].normal)-1)<.01);}}
});
