import test from 'node:test';
import assert from 'node:assert/strict';
import {cameraPose} from '../src/simulation/cameraMotion.js';
import {readAcademyRoute} from '../src/methodologyRoutes.js';

test('la cámara conserva su órbita al pasar de anterior a posterior y devuelve los extremos',()=>{
 const a={position:[0,1,18],target:[0,0,0]},b={position:[0,1,-18],target:[0,0,0]};
 for(const t of [0,.1,.5,.9,1]){const p=cameraPose(a,b,t);assert.ok(Math.abs(Math.hypot(...p.position)-Math.hypot(...a.position))<1e-8);}
 for(const [t,expected] of [[0,a],[1,b]]){const p=cameraPose(a,b,t);for(let i=0;i<3;i++){assert.ok(Math.abs(p.position[i]-expected.position[i])<1e-8);assert.equal(p.target[i],expected.target[i]);}}
 const moved=cameraPose(a,{position:[4,2,8],target:[2,1,0]},1);assert.deepEqual(moved.target,[2,1,0]);
});
test('la portada de laboratorio conserva las rutas clínicas y los enlaces antiguos',()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;
 try{
  globalThis.document={baseURI:'https://example.test/aula/'};
  for(const [path,hash,expected] of [
   ['/aula/','',{page:'inicio',detail:'',moment:''}],
   ['/aula/mapeo/posicion/bipedestacion-segura/','',{page:'mapeo',detail:'posicion',moment:'bipedestacion-segura'}],
   ['/aula/consenso/simbolos/','',{page:'consenso',detail:'simbolos',moment:''}],
   ['/aula/glosario/angulo-doppler/','',{page:'glosario',detail:'angulo-doppler',moment:''}],
   ['/aula/','#visuales/pressure',{page:'visuales',detail:'pressure',moment:''}]
  ]){globalThis.window={location:{pathname:path,hash}};assert.deepEqual(readAcademyRoute(),expected);}
 }finally{globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
