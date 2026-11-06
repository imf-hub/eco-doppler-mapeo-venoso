import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {methodologyPages} from '../src/data/methodologyPages.js';
import {methodologyByStep} from '../src/data/methodology.js';
import {methodologyMedia} from '../src/data/methodologyMedia.js';
import {animateAcquisitionGesture} from '../src/simulation/methodologyMotion.js';

test('independent procedure pages retain every reviewed acquisition and no learner assessment',()=>{
 assert.equal(methodologyPages.length,12);
 assert.equal(methodologyPages.reduce((sum,page)=>sum+page.steps.length,0),37);
 const paths=new Set();
 for(const page of methodologyPages){
  assert.deepEqual(page.steps.map(s=>s.id),methodologyByStep[page.id].frames.map(f=>f.id));
  assert.ok(page.sources.length);
  for(const action of page.steps){
   const route=page.id+'/'+action.id;assert.ok(!paths.has(route));paths.add(route);
   for(const key of ['action','lookFor','save','error','correction'])assert.ok(action[key]?.trim());
   assert.equal(Object.hasOwn(action,'quiz'),false);
  }
 }
});
test('new published reference figures preserve bytes, licenses and contextual distinctions',()=>{
 assert.equal(methodologyMedia.length,4);
 for(const media of methodologyMedia){
  const bytes=fs.readFileSync(new URL('../public/'+media.src.replace(/^\.\//,''),import.meta.url));
  assert.equal(bytes.length,media.bytes);
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),media.sha256);
  assert.equal(media.license,'CC BY 4.0');assert.ok(media.sourceUrl.startsWith('https://'));
  assert.ok(media.clinicalContext&&media.limitation&&media.stepIds.length);
 }
 assert.match(methodologyMedia.find(m=>m.id==='giacomini-profundidad-real').limitation,/profundidad, no diámetro/);
 assert.equal(methodologyMedia.find(m=>m.id==='giacomini-conexiones-publicado').mediaKind,'schematic');
 assert.match(methodologyMedia.find(m=>m.id==='vsm-diametro-calibradores-real').limitation,/supino|reflujo/i);
});
test('centering precedes compression, and releasing is a separate reviewed action',()=>{
 const [center,compress,release]=methodologyByStep.profundo.frames;
 assert.deepEqual([0,.5,1].map(p=>animateAcquisitionGesture(center.visual,center.id,p).pressure),[0,0,0]);
 assert.deepEqual([0,.5,1].map(p=>animateAcquisitionGesture(compress.visual,compress.id,p).pressure),[0,47.5,95]);
 assert.deepEqual([0,.5,1].map(p=>animateAcquisitionGesture(release.visual,release.id,p).pressure),[90,45,0]);
});
