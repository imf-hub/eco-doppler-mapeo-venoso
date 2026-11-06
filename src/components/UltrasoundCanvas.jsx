import {useEffect,useRef} from 'react';
import {clamp,aliasFrequency,dopplerHz} from '../lib';
import {DEFAULT_SETTINGS,TARGET_DEPTH_CM,flowVelocity,signalAt} from '../simulation/ultrasoundModel';

const noise=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n);};

// Original signal visualization. It is not an acoustic propagation simulator.
export default function UltrasoundCanvas({settings=DEFAULT_SETTINGS,mode='Color',plane='Transversal',frozen=false,inverted=false,scenario='normal',compact=false,provoked=false,calipers=null,runId=0}){
 const ref=useRef(null),state=useRef({}),clock=useRef({t:0,run:0});
 state.current={settings:{...DEFAULT_SETTINGS,...settings},mode,plane,frozen,inverted,scenario,provoked,calipers,runId};
 useEffect(()=>{
  const canvas=ref.current,ctx=canvas.getContext('2d');if(!ctx)return;
  let animation,last=0,lastProps='',visible=true,previous=0;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(canvas);
  const tissue=document.createElement('canvas');tissue.width=320;tissue.height=170;
  const tc=tissue.getContext('2d'),pixels=tc.createImageData(320,170);
  function draw(now){
   animation=requestAnimationFrame(draw);if(now-last<65)return;
   const delta=previous?Math.min((now-previous)/1000,.15):0;previous=now;last=now;
   if(!visible||document.hidden)return;
   const p=state.current,signature=JSON.stringify(p);
   if(p.runId!==clock.current.run){clock.current.t=0;clock.current.run=p.runId;}
   if(!p.frozen&&!reduce)clock.current.t+=delta;
   if((p.frozen||reduce)&&signature===lastProps)return;
   lastProps=signature;
   render(ctx,tc,pixels,tissue,p,clock.current.t);
  }
  animation=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(animation);observer.disconnect();};
 },[]);
 return <canvas ref={ref} width="720" height="450" role="img" className={'ultrasound '+(compact?'compact':'')} aria-label={`Esquema ${mode}, ${plane}. Ganancia ${settings.gain}. Profundidad ${settings.depth} cm. ${frozen?'Imagen congelada.':''}`}/>;
}

function render(ctx,tc,pixels,tissue,p,elapsed){
 const s=p.settings,pw=p.mode==='PW',bottom=pw?219:391,top=43,plotHeight=bottom-top;
 const x0=60,x1=653,cy=top+TARGET_DEPTH_CM/s.depth*plotHeight;
 const rx=58*4/s.depth,ry=Math.max(.7,35*(1-s.pressure/100)*4/s.depth);
 const longitudinal=p.plane==='Longitudinal',phase=p.provoked?Math.min(elapsed,5):elapsed;
 const velocity=flowVelocity(phase,p.scenario,p.provoked),signal=signalAt(s,velocity,p.mode,p.inverted);
 ctx.fillStyle='#080e16';ctx.fillRect(0,0,720,450);
 // Speckle field: reception, dynamic range and depth compensation are explicit.
 for(let y=0;y<170;y++){for(let x=0;x<320;x++){
  const sx=x0+x/320*(x1-x0),sy=top+y/170*plotHeight,dep=y/170*s.depth;
  const vein=longitudinal?Math.abs(sy-cy)<ry:((sx-350)/rx)**2+((sy-cy)/ry)**2<1;
  const artery=!longitudinal&&((sx-492)/(rx*.62))**2+((sy-(cy+40))/(rx*.62))**2<1;
  const temporal=elapsed/(1+s.persistence),n=noise(x+Math.floor(temporal*6)*.12,y);
  let gray=(17+Math.sqrt(n)*71)*(s.gain/48)*Math.exp(-dep*s.frequency*.009)+(s.tgc-50)*dep/8;
  gray=(gray-45)*(65/s.dynamic)+45;
  if(vein||artery)gray=3+noise(x,y)*Math.max(0,s.gain-58)*1.9;
  const i=(y*320+x)*4,b=clamp(gray,0,245);pixels.data[i]=b;pixels.data[i+1]=b;pixels.data[i+2]=b;pixels.data[i+3]=255;
 }}
 tc.putImageData(pixels,0,0);ctx.imageSmoothingEnabled=true;ctx.drawImage(tissue,x0,top,x1-x0,plotHeight);
 ctx.save();ctx.beginPath();ctx.rect(x0,top,x1-x0,plotHeight);ctx.clip();
 const lumen=new Path2D();if(longitudinal)lumen.rect(75,cy-ry,550,ry*2);else lumen.ellipse(350,cy,rx,ry,0,0,Math.PI*2);
 ctx.save();ctx.filter=`blur(${Math.abs(s.focus-TARGET_DEPTH_CM)*1.1+(15-s.frequency)*.1}px)`;
 ctx.strokeStyle=`rgba(229,235,243,${clamp(s.gain/63,.12,1)})`;ctx.lineWidth=2.4;ctx.stroke(lumen);ctx.restore();
 ctx.strokeStyle='#5b6674';ctx.lineWidth=1.4;
 if(!longitudinal){ctx.beginPath();ctx.ellipse(350,cy,rx*1.55,ry*1.5+16,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#c5cbd5';ctx.beginPath();ctx.ellipse(492,cy+40,rx*.62,rx*.62,0,0,Math.PI*2);ctx.stroke();}
 else {ctx.beginPath();ctx.moveTo(75,cy-ry-16);ctx.lineTo(625,cy-ry-16);ctx.moveTo(75,cy+ry+16);ctx.lineTo(625,cy+ry+16);ctx.stroke();}
 if(p.mode!=='B'){
  const roi={x:190,y:Math.max(top,cy-70),w:345,h:Math.min(140,plotHeight)};
  if(signal.detected){ctx.save();ctx.clip(lumen);ctx.beginPath();ctx.rect(roi.x,roi.y,roi.w,roi.h);ctx.clip();
   for(let x=roi.x;x<roi.x+roi.w;x+=6){for(let y=roi.y;y<roi.y+roi.h;y+=6){
    const shift=signal.hz*(.8+noise(x,y)*.2),signed=aliasFrequency(shift,s.prf*1000)*(p.inverted?-1:1);
    const rgb=p.mode==='Power'?'247,165,60':signed>=0?'241,68,80':'49,136,247';
    ctx.fillStyle=`rgba(${rgb},${signal.power*(.7+.2*noise(x+Math.floor(elapsed*5),y))})`;ctx.fillRect(x,y,6,6);
   }}ctx.restore();
   if(s.colorGain>77){ctx.fillStyle=`rgba(231,87,112,${(s.colorGain-77)/55})`;for(let n=0;n<100;n++)ctx.fillRect(roi.x+noise(n,1)*roi.w,roi.y+noise(n,2)*roi.h,4,4);}
  }
  ctx.strokeStyle='#71889e';ctx.lineWidth=.8;ctx.strokeRect(roi.x,roi.y,roi.w,roi.h);
 }
 if(pw){ctx.strokeStyle='#f5df9a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(342,cy-s.gate*1.5);ctx.lineTo(358,cy-s.gate*1.5);ctx.moveTo(342,cy+s.gate*1.5);ctx.lineTo(358,cy+s.gate*1.5);ctx.stroke();}
 ctx.restore();
 ctx.font='11px ui-monospace,monospace';ctx.fillStyle='#b9c7d6';ctx.fillText('IMF · IMAGEN SINTÉTICA',18,22);ctx.fillText(p.mode,655,22);
 ctx.fillStyle='#8fa2b7';ctx.fillText(`${s.frequency} MHz   D ${s.depth} cm   G ${s.gain}`,18,435);
 ctx.fillText(p.provoked?`Compresión distal / liberación · t ${Math.min(phase,5).toFixed(1)} s`:'Sin maniobra · flujo venoso conceptual',285,435);
 for(let d=0;d<=s.depth;d++){const y=top+d/s.depth*plotHeight;ctx.fillText(String(d),680,y+3);ctx.fillRect(667,y,5,1);}ctx.fillText('cm',676,bottom+16);
 if(s.focus<=s.depth){ctx.fillStyle='#f0bf67';ctx.fillText('◀',656,top+s.focus/s.depth*plotHeight);}
 if(p.mode!=='B'){
  const g=ctx.createLinearGradient(0,55,0,138);g.addColorStop(0,p.mode==='Power'?'#ffde7a':p.inverted?'#3187ef':'#ef455b');g.addColorStop(.5,'#121b27');g.addColorStop(1,p.mode==='Power'?'#b06119':p.inverted?'#ef455b':'#3187ef');ctx.fillStyle=g;ctx.fillRect(20,55,13,83);ctx.fillStyle='#a7b6c8';ctx.fillText(p.mode==='Power'?'P':'±',21,152);
 }
 if(pw)drawSpectrum(ctx,p,phase);
}

function drawSpectrum(ctx,p,phase){
 const s=p.settings,base=319,scale=64,x0=74,x1=650,nyquist=s.prf*500;
 ctx.fillStyle='#a6b8c9';ctx.font='9px ui-monospace,monospace';ctx.fillText('Δf (Hz)',14,245);
 ctx.strokeStyle='#24364a';ctx.lineWidth=.7;
 for(const n of [-1,0,1]){const y=base-n*scale;ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke();ctx.fillText(n===0?'0':`${Math.round(n*nyquist)}`,16,y+3);}
 for(let t=0;t<=5;t++){const x=x0+t/5*(x1-x0);ctx.beginPath();ctx.moveTo(x,252);ctx.lineTo(x,389);ctx.stroke();ctx.fillText(String(t),x-2,405);}ctx.fillText('Tiempo (s)',575,419);
 // A Doppler shift above Nyquist wraps to the opposite edge, rather than clipping.
 ctx.save();ctx.beginPath();ctx.rect(x0,252,x1-x0,134);ctx.clip();
 for(let x=x0;x<x1;x+=2){
  const t=(x-x0)/(x1-x0)*5,v=flowVelocity(t,p.scenario,p.provoked);
  const signal=signalAt(s,v,'PW',p.inverted);if(!signal.detected)continue;
  const center=signal.hz,spread=28+s.gate*13;
  for(let n=-3;n<=3;n++){
   const hz=aliasFrequency(center+n*spread/3,s.prf*1000)*(p.inverted?-1:1),y=base-hz/nyquist*scale;
   ctx.fillStyle=`rgba(244,225,155,${(.5-Math.abs(n)*.075)*clamp(s.gain/48,.1,1.4)})`;ctx.fillRect(x,y,2,2);
  }
 }
 if(p.provoked){ctx.fillStyle='#c4bfa9';ctx.fillText('Aumento',x0+(x1-x0)*.21,250);ctx.fillText('Liberación',x0+(x1-x0)*.4,250);if(p.scenario==='reflux'){ctx.fillStyle='#f29ca8';ctx.fillText('Retrógrado',x0+(x1-x0)*.43,378);}}
 if(p.calipers&&p.provoked){ctx.setLineDash([3,3]);ctx.strokeStyle='#7cdbdf';for(const v of p.calipers){const x=x0+v/5*(x1-x0);ctx.beginPath();ctx.moveTo(x,253);ctx.lineTo(x,387);ctx.stroke();ctx.fillStyle='#9ce9e9';ctx.fillText(`${v.toFixed(2)} s`,x+4,269);}ctx.setLineDash([]);}
 ctx.restore();
 if(p.provoked){const x=x0+Math.min(phase,5)/5*(x1-x0);ctx.fillStyle='#e4edf5';ctx.fillRect(x,253,1,133);}
}
