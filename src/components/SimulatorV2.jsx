import {useState} from 'react';
import {Pause,Play,RotateCcw,Info,ArrowDownUp,CheckCircle2,Download,FlaskConical} from 'lucide-react';
import UltrasoundCanvas from './UltrasoundCanvas';
import {controlVisualMap} from '../data/visualCurriculum';
import {download} from '../lib';
import {DEFAULT_SETTINGS,EXPERIMENTS,signalAt,flowVelocity,measurementResult} from '../simulation/ultrasoundModel';
export {default as UltrasoundCanvas} from './UltrasoundCanvas';

const controls={
 gain:['Ganancia B',0,100,1,'%','Amplifica los ecos recibidos en toda la imagen. El exceso puede llenar la luz de ecos. No modifica la potencia emitida.'],
 colorGain:['Ganancia Doppler',0,100,1,'%','Aumenta la señal Doppler recibida. El exceso añade ruido extraluminal; no equivale a más flujo.'],
 depth:['Profundidad',2,8,.5,'cm','Incluye el objetivo y sus referencias. Si el objetivo queda fuera del campo, no puedes evaluarlo.'],
 frequency:['Frecuencia',5,15,1,'MHz','Mayor frecuencia ofrece más detalle potencial y más atenuación. Elige penetración suficiente para el objetivo.'],
 focus:['Foco',.5,5,.1,'cm','Coloca la zona focal cerca del vaso. En el modelo el vaso está a 2.1 cm; no es un valor universal.'],
 tgc:['TGC profundo',0,100,1,'%','Compensa la recepción según profundidad. No cambia la potencia ni recupera información que nunca regresó.'],
 dynamic:['Rango dinámico',35,95,5,'dB','Un rango amplio muestra más grises; uno estrecho aumenta contraste y puede perder matices.'],
 prf:['Escala / PRF',.3,5,.1,'kHz','Nyquist = PRF / 2. Si el desplazamiento lo supera, el espectro se envuelve. Ajusta sensibilidad al flujo estudiado.'],
 filter:['Filtro de pared',0,400,10,'Hz','Suprime señales de baja frecuencia. Un filtro elevado también puede eliminar flujo venoso lento.'],
 angle:['Ángulo haz–flujo',0,90,1,'°','Ángulo entre haz y flujo. A 90° no se detecta el desplazamiento ideal; no es el ángulo sonda–piel.'],
 pressure:['Presión de la sonda',0,100,1,'%','Colapsa la vena permeable del modelo. Es diferente de comprimir distalmente para provocar flujo.'],
 gate:['Volumen de muestra',1,8,.5,'mm','Selecciona una región del vaso en PW. Aquí amplía la banda ilustrativa de señales; no reproduce el beamforming de un equipo.'],
 persistence:['Persistencia',0,6,1,'','Promedia información temporal. Aquí reduce el cambio de la textura; un equipo real puede producir estelas en movimiento.']
};
export default function Simulator({initialMode='Color',initialScenario='normal',embedded=false,onComplete}){
 const [s,setS]=useState({...DEFAULT_SETTINGS}),[mode,setMode]=useState(initialMode),[plane,setPlane]=useState('Transversal');
 const [frozen,setFrozen]=useState(false),[inverted,setInverted]=useState(false),[scenario,setScenario]=useState(initialScenario),[active,setActive]=useState('gain');
 const [provoked,setProvoked]=useState(false),[run,setRun]=useState(0),[start,setStart]=useState(1.8),[end,setEnd]=useState(3.1),[experiment,setExperiment]=useState(null),[done,setDone]=useState([]),[notice,setNotice]=useState('');
 const signal=signalAt(s,flowVelocity(0,scenario),mode,inverted),measure=measurementResult(start,end,s,scenario,provoked);
 const keys=mode==='B'?['gain','depth','frequency','focus','tgc','dynamic','pressure','persistence']:['gain','colorGain','depth','frequency','prf','filter','angle','pressure',...(mode==='PW'?['gate']:[])];
 function reset(){setS({...DEFAULT_SETTINGS});setMode(initialMode);setScenario(initialScenario);setPlane('Transversal');setFrozen(false);setInverted(false);setProvoked(false);setExperiment(null);setNotice('Ajustes restaurados.');}
 function exercise(e){setS({...DEFAULT_SETTINGS,...e.settings});setMode(e.mode);setScenario(e.scenario);setPlane(e.mode==='PW'?'Longitudinal':'Transversal');setFrozen(false);setProvoked(false);setInverted(false);setExperiment(e);setNotice('');}
 function pass(id){setDone(a=>a.includes(id)?a:[...a,id]);onComplete?.(id==='measurement'?'medicion':'lab-'+id);setNotice('Práctica y explicación registradas.');}
 let status=mode==='Power'?'Potencia de señal: sin dirección convencional':s.depth<2.1?'El objetivo queda fuera del campo':s.pressure>=92?'Vena colapsada por la sonda':s.angle>=89.5?'Desplazamiento casi nulo por ángulo':Math.abs(signal.hz)<=s.filter?'Señal suprimida por el filtro':!signal.detected?'Ganancia Doppler insuficiente':signal.aliased?'Aliasing: la señal supera Nyquist':'Señal detectable en el modelo';
 return <div className="simulator-module">
 {!embedded&&<section className="experiment-picker"><div><span className="eyebrow">Mira el cambio en pantalla</span><h3>Demostraciones de los ajustes.</h3></div><div>{EXPERIMENTS.map(e=><button key={e.id} className={experiment?.id===e.id?'active':''} onClick={()=>exercise(e)}>{done.includes(e.id)?<CheckCircle2 size={15}/>:<FlaskConical size={15}/>} {e.title}</button>)}<button onClick={()=>{exercise({id:'measurement',mode:'PW',scenario:'reflux',settings:{},prompt:'Ejecuta la maniobra distal. Congela y coloca los cursores al inicio y final del flujo retrógrado.'});setProvoked(true);setRun(run+1);}}>Medir reflujo</button></div></section>}
 {experiment&&<div className="experiment-brief" role="status"><strong>{experiment.title||'Mide el intervalo retrógrado'}</strong><p>{experiment.prompt}</p><small>Los rangos y resultados son exclusivos del modelo educativo.</small></div>}
 <div className={'simulator '+(embedded?'embedded':'')}>
 <div className="machine"><div className="machine-toolbar"><span className="machine-label"><span className="live-dot"/>{frozen?'CONGELADO':'EN VIVO'} · SIMULACIÓN</span><button aria-label="Restaurar ajustes" onClick={reset}><RotateCcw size={17}/></button></div>
 <UltrasoundCanvas settings={s} mode={mode} plane={plane} frozen={frozen} inverted={inverted} scenario={scenario} provoked={provoked} calipers={[start,end]} runId={run}/>
 <div className="mode-bar">{['B','Color','PW','Power'].map(m=><button key={m} aria-pressed={mode===m} className={mode===m?'active':''} onClick={()=>{setMode(m);setFrozen(false);setProvoked(false);}}>{m==='B'?'Modo B':m==='PW'?'Espectral PW':m}</button>)}<button className="freeze" aria-label={frozen?'Reanudar imagen':'Congelar imagen'} onClick={()=>setFrozen(!frozen)}>{frozen?<Play size={16}/>:<Pause size={16}/>}</button></div>
 <div className="machine-controls"><label>Plano<select aria-label="Plano" value={plane} onChange={e=>setPlane(e.target.value)}><option>Transversal</option><option>Longitudinal</option></select></label><label>Escenario<select aria-label="Escenario" value={scenario} onChange={e=>{setScenario(e.target.value);setProvoked(false);setFrozen(false);}}><option value="normal">Vena permeable</option><option value="slow">Flujo lento</option><option value="reflux">Reflujo simulado</option></select></label></div>
 <div className="machine-actions"><button className="btn light small" onClick={()=>setInverted(!inverted)} disabled={mode==='B'||mode==='Power'}><ArrowDownUp size={15}/>Invertir escala</button><button className="btn light small" onClick={()=>{setMode('PW');setPlane('Longitudinal');setProvoked(true);setRun(run+1);setFrozen(false);}}>Maniobra distal y liberación</button><button className="icon-btn" aria-label="Descargar ajustes del modelo" onClick={()=>download('ajustes-ecografo-didactico.json',JSON.stringify({educativo:true,settings:s,mode,plane,scenario},null,2))}><Download size={17}/></button></div>
 <p className="caption dark-caption">Escena sintética original. El eje PW muestra desplazamiento de frecuencia (Hz); no es una medición clínica de velocidad. La maniobra representada es compresión distal y liberación, no Valsalva.</p>
 {mode==='PW'&&provoked&&<div className="calipers"><strong>Mide el tramo retrógrado después de la liberación</strong><div className="range-grid"><label>Cursor inicial <b>{start.toFixed(2)} s</b><input aria-label="Cursor inicio" type="range" min="1.5" max="3.4" step=".01" value={start} onChange={e=>setStart(+e.target.value)}/></label><label>Cursor final <b>{end.toFixed(2)} s</b><input aria-label="Cursor final" type="range" min="1.5" max="3.4" step=".01" value={end} onChange={e=>setEnd(+e.target.value)}/></label></div><p>Duración: <strong>{measure.interval>=0?measure.interval.toFixed(2)+' s':'cursores invertidos'}</strong>. {measure.reason}</p>{scenario==='reflux'?<><p className="caption">Referencia del modelo: 2.00–2.85 s. La clasificación clínica depende del segmento, posición y maniobra; no del dibujo por sí solo.</p>{measure.correct&&plane==='Longitudinal'&&null}</>:<p>En este escenario solo hay un transitorio breve de cierre, no reflujo sostenido generado.</p>}</div>}
 </div>
 <div className="control-panel"><div className="panel-top"><div><span className="eyebrow">Conecta el control con su efecto</span><h3>Controles del ecógrafo</h3></div><Info size={19}/></div><div className="mobile-signal-preview"><UltrasoundCanvas settings={s} mode={mode} plane={plane} frozen inverted={inverted} scenario={scenario} provoked={provoked} calipers={[start,end]} runId={run} compact/><span>Vista estática de los ajustes · cambia al mover un control</span></div><div className="control-list">{keys.map(key=>{const [name,min,max,step,unit]=controls[key];return <label key={key} className={active===key?'selected':''} onFocus={()=>setActive(key)}><span>{name}<output>{s[key]} <small>{unit}</small></output></span><input aria-label={name} type="range" min={min} max={max} step={step} value={s[key]} onChange={e=>{setS({...s,[key]:+e.target.value});setActive(key);}}/></label>;})}</div><div className="control-explanation" role="status"><strong>{controls[active][0]}</strong><p>{controls[active][5]}</p><a className="visual-link-control" href={'#visuales/'+controlVisualMap[active]}>Ver este ajuste en 3D, cortes y gráficas <ArrowDownUp size={14}/></a></div>{mode!=='B'&&<div className={'signal-status '+(signal.aliased?'amber':'')} role="status"><strong>{status}</strong><span>Δf ≈ {Math.round(signal.hz)} Hz · Nyquist ±{Math.round(signal.nyquist)} Hz</span>{mode==='Power'&&<small>La paleta de potencia no cambia de sentido al invertir rojo/azul.</small>}</div>}<div className="mini-note"><strong>Criterio antes de interpretar</strong><p>Confirma objetivo visible, luz definida, ganancia sin desborde y una señal útil. Una ausencia técnica de señal no demuestra patología.</p></div></div>
 </div>

 {notice&&<p className="success-text" role="status">{notice}</p>}
 </div>;
}

