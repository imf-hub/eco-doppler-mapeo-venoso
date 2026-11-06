import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {consensusChapters} from '../src/data/consensusAtlas.js';
for(const route of ['consenso',...consensusChapters.map(c=>'consenso/'+c.id)]){
 const file=path.resolve('dist',route,'index.html'),html=fs.readFileSync(file,'utf8'),prefix=html.match(/<base href="([^"]+)"/)[1];
 assert.equal(path.resolve(path.dirname(file),prefix),path.resolve('dist'));
 for(const match of html.matchAll(/(?:src|href)="(\.\/assets\/[^" ]+)"/g))assert.ok(fs.existsSync(path.resolve(path.dirname(file),prefix,match[1])));
 assert.match(html,/<title>[^<]+ · Aula IMF<\/title>/);
}
const provenance=JSON.parse(fs.readFileSync('dist/media/consenso/provenance.json','utf8'));
for(const f of provenance.files){const bytes=fs.readFileSync('dist/media/consenso/'+f.file);assert.equal(bytes.length,f.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),f.sha256);}
console.log('8 páginas de consenso y 9 activos originales verificados.');
