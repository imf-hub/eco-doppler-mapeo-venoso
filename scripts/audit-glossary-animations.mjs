import fs from 'node:fs';
import path from 'node:path';
import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
const root=process.cwd(),out=path.resolve('output/quality');fs.mkdirSync(out,{recursive:true});
const entry=`
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {glossarySpecs} from './src/data/glossarySpecs.js';
import Acoustic,{ACOUSTIC_ANIMATIONS} from './src/components/glossary/AcousticGlossaryAnimation.jsx';
import Doppler,{DOPPLER_ANIMATIONS} from './src/components/glossary/DopplerGlossaryAnimation.jsx';
const directory='output/quality/glossary-svg';fs.mkdirSync(directory,{recursive:true});
const strip=s=>s.replace(/<(text|title|desc)\\b[\\s\\S]*?<\\/\\1>/g,'').replace(/(?:data-[a-zA-Z0-9_-]+|aria-labelledby|id)="[^"]*"/g,'');
const digest=s=>crypto.createHash('sha256').update(strip(s)).digest('hex');
const result=[];let states=0;
for(const term of glossarySpecs){
 const Renderer=term.engine==='acoustic'?Acoustic:Doppler,supported=term.engine==='acoustic'?ACOUSTIC_ANIMATIONS:DOPPLER_ANIMATIONS;
 assert.ok(supported.includes(term.animation),'No mechanism: '+term.id);
 const render=(value,phase)=>renderToStaticMarkup(React.createElement(Renderer,{term,value,phase}));
 for(const value of [term.control.min,term.control.initial,term.control.max])for(const phase of [0,.5,1]){
  const svg=render(value,phase);assert.ok(svg.includes('<svg')&&svg.includes('<title'),term.id);
  assert.ok(!/(NaN|Infinity|undefined)/.test(svg),term.id+' has nonfinite output');states++;
 }
 const controlChanges=[.13,.37,.63,.87].some(p=>digest(render(term.control.min,p))!==digest(render(term.control.max,p)));
 const timeChanges=digest(render(term.control.initial,.13))!==digest(render(term.control.initial,.63));
 result.push({id:term.id,animation:term.animation,controlChanges,timeChanges});
 const svg=render(term.control.initial,.55);fs.writeFileSync(directory+'/'+term.id+'.svg',svg.includes('xmlns=')?svg:svg.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"'));
}
const failures=result.filter(r=>!r.controlChanges||!r.timeChanges);
fs.writeFileSync('output/quality/glossary-animation-audit.json',JSON.stringify({concepts:result.length,states,failures,results:result},null,2));
console.log(JSON.stringify({concepts:result.length,states,failures},null,2));
if(failures.length)process.exitCode=1;
`;
await build({stdin:{contents:entry,loader:'jsx',sourcefile:'glossary-audit-entry.jsx',resolveDir:root},bundle:true,platform:'node',format:'esm',jsx:'automatic',packages:'external',outfile:path.join(out,'glossary-audit.mjs'),logLevel:'silent'});
execFileSync(process.execPath,[path.join(out,'glossary-audit.mjs')],{stdio:'inherit'});
