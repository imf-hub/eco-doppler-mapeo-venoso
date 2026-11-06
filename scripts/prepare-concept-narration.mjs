import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {conceptFilms,FILM_VOICE} from '../src/data/conceptFilmConfig.js';
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const jobs=Object.values(conceptFilms).map(film=>({id:film.id,voiceId:FILM_VOICE.id,language:'es',inputType:'ssml',text:'<speak>'+film.scenes.map(s=>escape(s.text)).join('<break time="0.9s"/>')+'<break time="1.2s"/></speak>',scenes:film.scenes.map(s=>s.text),sources:film.sources}));
for(const j of jobs){if(j.text.length>5000)throw Error(j.id+': supera el límite de síntesis');j.scriptHash=createHash('sha256').update(j.text).digest('hex');}
fs.mkdirSync('output/narration-v9',{recursive:true});
fs.writeFileSync('output/narration-v9/jobs.json',JSON.stringify(jobs,null,2));
fs.mkdirSync('docs/animation/concept-films',{recursive:true});
fs.writeFileSync('docs/animation/concept-films/storyboards.json',JSON.stringify(Object.values(conceptFilms),null,2));
fs.writeFileSync('docs/animation/concept-films/speech-scripts.json',JSON.stringify(jobs,null,2));
console.log(JSON.stringify({pieces:jobs.length,characters:jobs.reduce((n,j)=>n+j.text.length,0),longest:Math.max(...jobs.map(j=>j.text.length)),voice:FILM_VOICE.name,plan:'One continuous narration per concept, three shots and two inter-shot pauses. No engine or speed override.'}));
