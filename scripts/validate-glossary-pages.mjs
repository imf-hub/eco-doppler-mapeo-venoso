import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {glossarySpecs} from '../src/data/glossarySpecs.js';
const pages=['glosario',...glossarySpecs.map(t=>'glosario/'+t.id)];
for(const route of pages){
 const file=path.resolve('dist',route,'index.html'),html=fs.readFileSync(file,'utf8'),prefix=html.match(/<base href="([^"]+)"/)[1];
 assert.equal(path.resolve(path.dirname(file),prefix),path.resolve('dist'));
 for(const match of html.matchAll(/(?:src|href)="(\.\/assets\/[^" ]+)"/g))assert.ok(fs.existsSync(path.resolve(path.dirname(file),prefix,match[1])),route);
 assert.match(html,/<title>[^<]+ · Aula IMF<\/title>/);assert.ok(html.includes('name="description"'));
}
assert.equal(pages.length,81);console.log('81 páginas de glosario: rutas y recursos relativos verificados.');
