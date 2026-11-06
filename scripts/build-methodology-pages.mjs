import fs from 'node:fs';
import path from 'node:path';
import {mappingSteps} from '../src/data/mapping.js';
import {methodologyByStep} from '../src/data/methodology.js';
import {glossarySpecs} from '../src/data/glossarySpecs.js';
import {consensusChapters} from '../src/data/consensusAtlas.js';
import {glossaryContent} from '../src/data/glossaryContent.js';
const root=path.resolve('dist'),template=fs.readFileSync(path.join(root,'index.html'),'utf8');
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pages=[{parts:['mapeo'],title:'Mapeo venoso: metodología paso a paso',description:'Del paciente al informe: preparación, exploración dúplex y cartografía venosa en páginas ilustradas.'}];
for(const step of mappingSteps){
 pages.push({parts:['mapeo',step.id],title:step.title,description:step.objective});
 for(const frame of methodologyByStep[step.id].frames)pages.push({parts:['mapeo',step.id,frame.id],title:frame.title,description:frame.action});
}
pages.push({parts:['glosario'],title:'Índice de conceptos de Eco-Doppler',description:'80 conceptos organizados de lo básico a la exploración: definición breve, animación guiada, un ajuste para experimentar y laboratorio avanzado.'});
for(const term of glossarySpecs)pages.push({parts:['glosario',term.id],title:term.title,description:glossaryContent[term.id].definition});
pages.push({parts:['consenso'],title:'El mapa del consenso latinoamericano',description:'Plantillas MERIT originales, figuras del consenso, simbología, nomenclatura, medidas y construcción del mapa venoso.'});
for(const chapter of consensusChapters)pages.push({parts:['consenso',chapter.id],title:chapter.title,description:chapter.lead});
for(const page of pages){
 const dir=path.join(root,...page.parts);fs.mkdirSync(dir,{recursive:true});
 const html=template.replace('<base href="./"/>',`<base href="${'../'.repeat(page.parts.length)}"/>`).replace(/<title>.*?<\/title>/,`<title>${escape(page.title)} · Aula IMF</title>`).replace(/<meta name="description" content="[^"]*"\/>/,`<meta name="description" content="${escape(page.description)}"/>`);
 if(!html.includes(`<base href="${'../'.repeat(page.parts.length)}"/>`))throw Error('Base de página no preparada');
 fs.writeFileSync(path.join(dir,'index.html'),html);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['',...pages.map(p=>p.parts.join('/')+'/')].map(p=>`<url><loc>https://imf-hub.github.io/eco-doppler-mapeo-venoso/${p}</loc></url>`).join('')+'</urlset>');
console.log(`50 páginas de metodología y ${glossarySpecs.length+1} de glosario y 8 de consenso preparadas (${pages.length} entradas).`);
