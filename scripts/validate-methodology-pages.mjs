import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {mappingSteps} from '../src/data/mapping.js';
import {methodologyByStep} from '../src/data/methodology.js';
const paths=['mapeo',...mappingSteps.flatMap(s=>['mapeo/'+s.id,...methodologyByStep[s.id].frames.map(f=>'mapeo/'+s.id+'/'+f.id)])];
for(const route of paths){
 const file=path.resolve('dist',route,'index.html'),html=fs.readFileSync(file,'utf8');
 const prefix=html.match(/<base href="([^"]+)"/)[1];
 assert.equal(path.resolve(path.dirname(file),prefix),path.resolve('dist'));
 for(const match of html.matchAll(/(?:src|href)="(\.\/assets\/[^" ]+)"/g))assert.ok(fs.existsSync(path.resolve(path.dirname(file),prefix,match[1])),route+' → '+match[1]);
 assert.match(html,/<title>[^<]+ · Aula IMF<\/title>/);
}
assert.equal(paths.length,50);console.log('50 páginas verificadas: entradas, base y archivos enlazados.');
