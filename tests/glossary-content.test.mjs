import test from 'node:test';
import assert from 'node:assert/strict';
import {glossarySpecs,glossaryCategories} from '../src/data/glossarySpecs.js';
import {glossaryContent,glossarySources} from '../src/data/glossaryContent.js';
import {conceptById} from '../src/data/visualCurriculum.js';
test('eighty distinct concepts have a mechanism, observations and a specific traceable reference',()=>{
 assert.equal(glossarySpecs.length,80);assert.equal(new Set(glossarySpecs.map(t=>t.id)).size,80);
 assert.equal(Object.keys(glossaryContent).length,80);
 for(const spec of glossarySpecs){
  const c=glossaryContent[spec.id];assert.ok(c,spec.id);assert.ok(glossaryCategories.includes(spec.category));
  assert.ok(['acoustic','doppler'].includes(spec.engine));assert.ok(spec.animation);
  assert.ok(c.definition.length>40);assert.ok(c.mechanism.length>40);assert.ok(c.pitfall.length>20);
  assert.equal(c.observe.length,3);assert.ok(c.observe.every(s=>s.length>5));
  assert.ok(c.sources.length>0);for(const ref of c.sources){assert.ok(glossarySources[ref.id]?.url.startsWith('https://'));assert.ok(ref.section.length>5);}
  for(const related of c.related)assert.ok(glossaryContent[related],spec.id+' → '+related);
  if(c.legacyConcept)assert.ok(conceptById[c.legacyConcept]);
  assert.equal(Object.hasOwn(c,'quiz'),false);assert.equal(Object.hasOwn(c,'question'),false);
  const p=spec.control;assert.ok(p.min<p.max&&p.step>0&&p.initial>=p.min&&p.initial<=p.max);
 }
});
