import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import * as THREE from 'three';
import {conceptFilms,FILM_VOICE} from '../src/data/conceptFilmConfig.js';
import {glossarySpecs} from '../src/data/glossarySpecs.js';
import {sampleConceptFilm,activeFilmCaption} from '../src/simulation/conceptFilm.js';
import {buildConceptFilmScene} from '../src/components/narration/buildConceptFilmScene.js';
const audio=JSON.parse(fs.readFileSync('src/data/conceptFilmAudio.json','utf8'));
const scripts=JSON.parse(fs.readFileSync('docs/animation/concept-films/speech-scripts.json','utf8'));

test('80 conceptos con objetivo, tres tomas y guion continuo trazable',()=>{
 assert.equal(Object.keys(conceptFilms).length,80);assert.equal(scripts.length,80);
 for(const term of glossarySpecs){const film=conceptFilms[term.id],job=scripts.find(s=>s.id===term.id);assert.ok(film.objective&&film.family&&film.sources.length,term.id);assert.equal(film.scenes.length,3);assert.equal(job.voiceId,FILM_VOICE.id);assert.equal(job.language,'es');assert.equal(job.inputType,'ssml');assert.ok(job.text.startsWith('<speak>')&&job.text.endsWith('</speak>'));assert.ok(!('speed' in job)&&!('engine' in job));}
});
test('reproducción y búsqueda reconstruyen exactamente el mismo estado físico y cámara',()=>{
 for(const film of Object.values(conceptFilms)){const track=audio[film.id];for(const t of [0,5.21,12.7,23.1,30]){const a=sampleConceptFilm(film,t,track);sampleConceptFilm(film,2,track);assert.deepEqual(sampleConceptFilm(film,t,track),a,film.id);assert.ok([...a.camera.position,...a.camera.target,a.value,a.flowDistance].every(Number.isFinite),film.id);}
 const fixed=sampleConceptFilm(film,0,track,{reducedMotion:true}).camera;assert.deepEqual(sampleConceptFilm(film,19,track,{reducedMotion:true}).camera,fixed);}
});
test('ganancia mantiene emisión; ángulo a 90° elimina proyección; aliasing envuelve',()=>{
 const gain=conceptFilms.ganancia;assert.equal(sampleConceptFilm(gain,0).output,sampleConceptFilm(gain,30).output);assert.ok(sampleConceptFilm(gain,30).gain>sampleConceptFilm(gain,0).gain);
 assert.ok(Math.abs(sampleConceptFilm(conceptFilms['angulo-doppler'],30).doppler)<1e-8);
 const wrapped=sampleConceptFilm(conceptFilms.aliasing,30);assert.ok(Math.abs(wrapped.aliased)<=wrapped.nyquist);assert.notEqual(wrapped.aliased,wrapped.doppler);
});
test('la variación de ritmo no inventa retorno; el ejemplo de reflujo sí invierte el desplazamiento',()=>{
 for(const id of ['fasicidad-respiratoria','pulsatilidad']){const film=conceptFilms[id];for(let t=.1;t<30;t+=.1)assert.ok(sampleConceptFilm(film,t+.001).flowDistance>sampleConceptFilm(film,t).flowDistance,id);}
 const reflux=conceptFilms['reflujo-venoso'];assert.ok(sampleConceptFilm(reflux,14).flowDistance<sampleConceptFilm(reflux,13).flowDistance);assert.ok(sampleConceptFilm(reflux,23).flowDistance>sampleConceptFilm(reflux,22).flowDistance);
});
test('audio original, hashes y subtítulos conservan tiempos reales del proveedor',()=>{
 for(const [id,track] of Object.entries(audio)){const file=fs.readFileSync('public/media/concept-films/'+track.file),meta=JSON.parse(fs.readFileSync('public/media/concept-films/'+id+'.json','utf8'));const sha=crypto.createHash('sha256').update(file).digest('hex');assert.ok(track.file.includes(sha.slice(0,12)),id);assert.ok(track.duration>5&&track.duration<90,id);assert.equal(track.cues.length,3);for(let i=0;i<3;i++){assert.ok(track.cues[i].start>=0&&track.cues[i].end<=track.duration+.1,id);if(i)assert.ok(track.cues[i].start>=track.cues[i-1].end-.1,id);}for(const c of track.captions){assert.ok(c.start<c.end&&c.end<=track.duration+.1,id);assert.equal(activeFilmCaption(track.captions,c.start+.001),c.text);}assert.ok(meta.word_timestamps?.length||meta.wordTimestamps?.length,id);assert.ok(fs.existsSync('public/media/concept-films/'+id+'.vtt'));assert.ok(fs.existsSync('public/media/concept-films/'+id+'.srt'));}
});
test('las 80 geometrías mantienen buffers estables y coordenadas finitas al recorrer las tomas',()=>{
 // Only the generated monitor texture needs a 2D context. No browser or WebGL is mocked.
 const old=globalThis.document,ctx=new Proxy({},{get:()=>()=>{}});globalThis.document={createElement:()=>({width:640,height:460,getContext:()=>ctx})};
 try{for(const film of Object.values(conceptFilms)){const scene=new THREE.Scene(),model=buildConceptFilmScene(THREE,scene,film),geometries=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);});for(const time of [0,7.5,13,19,24,30,2]){model.sample(sampleConceptFilm(film,time,audio[film.id]));scene.traverse(o=>{if(o.geometry){assert.ok(geometries.has(o.geometry),film.id+' reemplazó geometría');const positions=o.geometry.attributes.position?.array;assert.ok(!positions||positions.every(Number.isFinite),film.id+' contiene coordenadas no finitas');}if(o.isInstancedMesh)assert.ok(o.instanceMatrix.array.every(Number.isFinite),film.id+' instancias inválidas');});}model.dispose();assert.equal(scene.children.length,0,film.id);}}
 finally{globalThis.document=old;}
});
