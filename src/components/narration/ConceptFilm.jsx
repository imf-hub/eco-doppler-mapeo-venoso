import {lazy,Suspense,useEffect,useId,useRef,useState} from 'react';
import {useInView,useReducedMotion} from 'motion/react';
import {Play,Pause,RotateCcw,Volume2,VolumeX,Maximize2,Minimize2,Captions,Download,FileText} from 'lucide-react';
import {conceptFilms,FILM_VOICE} from '../../data/conceptFilmConfig';
import filmAudio from '../../data/conceptFilmAudio.json';
import {activeFilmCaption,cueAt,sampleConceptFilm} from '../../simulation/conceptFilm';
import './ConceptFilm.css';
const Scene=lazy(()=>import('./ConceptFilmScene'));
const media=file=>new URL('media/concept-films/'+file,document.baseURI).href;
const stamp=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
export default function ConceptFilm({termId}){
 const film=conceptFilms[termId],track=filmAudio[termId],root=useRef(null),audio=useRef(null),clock=useRef(0),visible=useInView(root,{amount:.1}),reduce=useReducedMotion(),timelineId=useId();
 const [playing,setPlaying]=useState(false),[time,setTime]=useState(0),[muted,setMuted]=useState(false),[captions,setCaptions]=useState(true),[expanded,setExpanded]=useState(false),[error,setError]=useState('');
 const duration=track?.duration||30,scene=cueAt(track?.cues||[{start:0},{start:10},{start:20}],time),caption=activeFilmCaption(track?.captions,time),value=sampleConceptFilm(film,time,track).value,readout=new Intl.NumberFormat('es-MX',{maximumFractionDigits:film.control.step>=1?0:2}).format(value);
 function pause(){audio.current?.pause();setPlaying(false);}
 useEffect(()=>{const stop=e=>{if(e.detail!==termId){audio.current?.pause();setPlaying(false);}};window.addEventListener('imf-concept-film-play',stop);return()=>{window.removeEventListener('imf-concept-film-play',stop);audio.current?.pause();};},[termId]);
 useEffect(()=>{if(!visible&&!expanded)pause();},[visible,expanded]);
 useEffect(()=>{const stop=()=>{if(document.hidden){audio.current?.pause();setPlaying(false);}};document.addEventListener('visibilitychange',stop);window.addEventListener('beforeprint',stop);return()=>{document.removeEventListener('visibilitychange',stop);window.removeEventListener('beforeprint',stop);};},[]);
 useEffect(()=>{if(track||!playing)return;let id,previous=performance.now(),last=previous;const tick=now=>{clock.current=Math.min(duration,clock.current+(now-previous)/1000);previous=now;if(now-last>100){setTime(clock.current);last=now;}if(clock.current<duration)id=requestAnimationFrame(tick);else{setTime(duration);setPlaying(false);}};id=requestAnimationFrame(tick);return()=>cancelAnimationFrame(id);},[playing,track,duration]);
 useEffect(()=>{
  if(!expanded)return;const previous=document.activeElement,old=document.body.style.overflow;document.body.style.overflow='hidden';root.current?.querySelector('[data-film-expand]')?.focus();
  const key=e=>{if(e.key==='Escape')setExpanded(false);if(e.key==='Tab'){const all=[...root.current.querySelectorAll('button:not(:disabled),input,a,summary')].filter(x=>x.getClientRects().length),first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};document.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',key);previous?.focus();};
 },[expanded]);
 function update(){const t=audio.current?.currentTime||0;clock.current=t;setTime(t);}
 function seek(t){clock.current=t;setTime(t);if(audio.current)audio.current.currentTime=t;}
 async function play(){
  if(playing){pause();return;}
  if(time>=duration-.05)seek(0);window.dispatchEvent(new CustomEvent('imf-concept-film-play',{detail:termId}));
  if(!track){setPlaying(true);return;}try{audio.current.playbackRate=1;await audio.current.play();setError('');}catch{setError('No se pudo cargar el audio. Vuelve a pulsar Reproducir para reintentar su carga.');setPlaying(false);}
 }
 return <figure ref={root} className={'concept-film '+(expanded?'concept-film-expanded':'')} data-concept-film={termId} role={expanded?'dialog':undefined} aria-modal={expanded||undefined} aria-label={(track?'Explicación 3D narrada de ':'Animación 3D de ')+film.title}>
  <header><span><i/> EXPLICACIÓN 3D {track?`· ${stamp(duration)}`:''}</span><button data-film-expand aria-label={expanded?'Cerrar explicación ampliada':'Ampliar explicación 3D'} onClick={()=>setExpanded(!expanded)}>{expanded?<Minimize2 size={17}/>:<Maximize2 size={17}/>}</button></header>
  <div className="concept-film-scene"><Suspense fallback={<div className="concept-film-status" role="status">Preparando la escena 3D…</div>}><Scene film={film} audio={track} getTime={()=>audio.current?.currentTime||clock.current} playing={playing} reducedMotion={!!reduce}/></Suspense><span className="concept-film-shot">{scene+1} / 3 · {film.scenes[scene].title}</span><output className="concept-film-readout" aria-live="off">{film.control.label}: <b>{readout} {film.control.unit}</b></output><span className="concept-film-model-note">Modelo educativo · escalas y tiempos ampliados</span></div>
  <div className="concept-film-caption" aria-label="Subtítulos">{captions&&(!track?film.scenes[scene].caption:caption||(!playing&&time===0?'Escucha la idea mientras observas el modelo.':playing?'':film.scenes[scene].caption))}</div>
  <div className="concept-film-controls"><button className="concept-film-play" onClick={play} aria-label={playing?'Pausar explicación':track?'Reproducir explicación con voz':'Reproducir animación sin voz'}>{playing?<Pause size={18}/>:<Play size={18}/>}<span>{playing?'Pausar':track?'Ver con voz':'Ver animación'}</span></button><button aria-label="Reiniciar explicación" onClick={()=>{pause();seek(0);}}><RotateCcw size={16}/></button><button disabled={!track} aria-label={muted?'Activar voz':'Silenciar voz'} aria-pressed={muted} onClick={()=>{const next=!muted;setMuted(next);if(audio.current)audio.current.muted=next;}}>{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}</button><button aria-label="Mostrar subtítulos" aria-pressed={captions} onClick={()=>setCaptions(!captions)}><Captions size={18}/></button></div>
  <div className="concept-film-timeline"><label className="sr-only" htmlFor={timelineId}>Instante de la explicación</label><input id={timelineId} aria-label="Instante de la explicación" type="range" min="0" max={duration} step=".05" value={time} onChange={e=>seek(+e.target.value)}/><output aria-live="off">{stamp(time)} / {stamp(duration)}</output></div>
  {track&&<audio ref={audio} preload="none" src={media(track.file)} onTimeUpdate={update} onSeeking={update} onPlay={()=>setPlaying(true)} onPause={()=>{update();setPlaying(false);}} onEnded={()=>{update();setPlaying(false);}} onError={()=>{setPlaying(false);setError('No se pudo cargar la narración. Puedes reintentar la reproducción.');}}/>}
  {error&&<p className="concept-film-error" role="status">{error}</p>}{!track&&<p className="concept-film-error" role="status">La escena 3D está disponible. La voz de este concepto está pendiente de generación.</p>}
  <figcaption><span>{track?`${FILM_VOICE.name} · audio a 1×`:'Escena procedural original'}</span><small>Pausa para girar y acercar el modelo.</small><details><summary><FileText size={13}/> Guion y recursos</summary><p>{film.scenes.map(s=>s.text).join(' ')}</p>{track&&<div><a href={media(track.file)} download><Download size={13}/> Audio original</a><a href={media(termId+'.vtt')} download>Subtítulos VTT</a><a href={media(termId+'.srt')} download>Subtítulos SRT</a><a href={media(termId+'.json')} download>Guion, tiempos y procedencia</a></div>}<small>{film.simplification}</small></details></figcaption>
 </figure>;
}
