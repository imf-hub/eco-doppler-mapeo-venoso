import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),dist=path.resolve(root,'dist'),docs=path.resolve(root,'docs');
if(!fs.existsSync(path.join(dist,'index.html')))throw new Error('Primero ejecuta npm run build');
fs.mkdirSync(docs,{recursive:true});
// Remove only generated folders; preserve the clinical and maintenance documents.
for(const name of ['assets','media','mapeo','glosario','consenso']){
 const target=path.resolve(docs,name);
 if(!target.startsWith(docs+path.sep)||!docs.startsWith(root+path.sep))throw new Error('Ruta de salida no válida');
 fs.rmSync(target,{recursive:true,force:true});
}
for(const name of fs.readdirSync(dist))fs.cpSync(path.join(dist,name),path.join(docs,name),{recursive:true});
fs.writeFileSync(path.join(docs,'.nojekyll'),'');
console.log('GitHub Pages preparado en docs/.');
