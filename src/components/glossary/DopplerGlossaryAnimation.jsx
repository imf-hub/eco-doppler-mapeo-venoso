import {useId} from 'react';
import {dopplerShiftHz,correctedVelocityCMs,aliasHz,nyquistHz,baselineRangeHz,mechanicalIndex} from '../../simulation/glossaryPhysics';

// Original, deterministic teaching drawings. Coordinates, displayed amplitudes and
// synthetic traces explain a mechanism; they do not reconstruct a patient study.
const C={bg:'#0b2031',panel:'#102b3e',line:'#31536a',text:'#d3e5ee',muted:'#9bb7c9',cyan:'#7edce8',blue:'#6b9be2',gold:'#edc483',rose:'#e89eb5',orange:'#ecb26b',skin:'#758187'};
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),rad=a=>a*Math.PI/180,mod=(x,n)=>((x%n)+n)%n;
const f=(v,d=1)=>Number(v).toFixed(d).replace('.',',');
function T({x,y,children,size=21,fill=C.text,anchor='start',weight=500,...props}){return <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight} {...props}>{(Array.isArray(children)?children:[children]).map((line,i)=><tspan key={i} x={x} dy={i?size*1.35:0}>{line}</tspan>)}</text>;}
function Arrow({x1,y1,x2,y2,id,color=C.gold,dash=false,width=4,...props}){return <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={color} strokeWidth={width} fill="none" strokeDasharray={dash?'7 7':undefined} markerEnd={`url(#${id})`} {...props}/>;}
function Probe({x,y,angle=0,phase=0,active=true}){return <g transform={`translate(${x} ${y}) rotate(${angle})`}><rect x="-18" y="-44" width="36" height="31" rx="7" fill="#90aab8"/><path d="M-57-23H57L51 3Q0 14-51 3Z" fill="#dce7e9" stroke="#7897a8" strokeWidth="2"/><path d="M-49 4Q0 12 49 4" fill="none" stroke={active?C.cyan:C.muted} strokeWidth="6"/><circle cx="-42" cy="-10" r="4" fill={C.gold}/>{active&&<path d={`M-43 ${19+mod(phase,1)*30}H43`} stroke={C.cyan} strokeWidth="2" opacity={1-mod(phase,1)}/>}</g>;}
function Vessel({x=80,y=225,w=620,h=115,phase=0,speed=1,direction=1,color=null,pressure=0,particles=true}){
 x=Number(x);y=Number(y);w=Number(w);h=Number(h);
 const ry=Math.max(.8,h/2*(1-pressure)),cy=y+h/2;
 return <g data-vessel-pressure={pressure.toFixed(3)}><path d={`M${x} ${cy-ry}Q${x+w/2} ${cy-ry-8} ${x+w} ${cy-ry}V${cy+ry}Q${x+w/2} ${cy+ry+8} ${x} ${cy+ry}Z`} fill="#071723" stroke="#a4c0ce" strokeWidth="4"/>{color&&<rect x={x+3} y={cy-ry+3} width={w-6} height={Math.max(0,ry*2-6)} fill={color} opacity=".62"/>}{particles&&Array.from({length:22},(_,i)=>{const q=mod(i/22+phase*speed*direction,1),yy=cy+Math.sin(i*2.3)*Math.max(0,ry-10)*.72;return <ellipse key={i} cx={x+15+q*(w-30)} cy={yy} rx="7" ry="4" fill={color?C.text:C.rose} opacity=".85"/>;})}<path d={`M${x} ${cy}H${x+w}`} stroke="#456b82" strokeWidth="1" strokeDasharray="5 7" opacity=".45"/></g>;
}
function Panel({x,y,w,h,title,children}){return <g transform={`translate(${x} ${y})`}><rect width={w} height={h} rx="8" fill={C.panel} stroke={C.line}/>{title&&<T x="18" y="30" size={16} fill={C.muted}>{title}</T>}{children}</g>;}
function Formula({children,x=550,y=539}){const size=Math.min(25,1000/(String(children).length*.53));return <T x={x} y={y} anchor="middle" size={size} fill={C.gold}>{children}</T>;}
function PlotGrid({x=620,y=160,w=410,h=240,base=.6,unit='señal relativa'}){return <><rect x={x} y={y} width={w} height={h} fill="#081b2a"/>{[0,.25,.5,.75,1].map(q=><path key={q} d={`M${x} ${y+q*h}H${x+w}M${x+q*w} ${y}V${y+h}`} stroke="#24475f" strokeWidth="1"/>)}<path d={`M${x} ${y}V${y+h}H${x+w}M${x} ${y+base*h}H${x+w}`} fill="none" stroke="#769cb3" strokeWidth="1.5"/><T x={x} y={y-14} size={15} fill={C.muted}>{unit}</T><T x={x+w} y={y+h+28} size={15} anchor="end" fill={C.muted}>tiempo →</T></>;}
function curve(fn,x,y,w,h,n=200){return Array.from({length:n+1},(_,i)=>`${i?'L':'M'}${(x+i/n*w).toFixed(2)},${(y-fn(i/n)*h).toFixed(2)}`).join(' ');}
function splitWrapped(fn,x,y,w,scale,n=240){const paths=[];let path='',previous=null;for(let i=0;i<=n;i++){const v=fn(i/n);const yy=y-v*scale;if(previous!==null&&Math.abs(yy-previous)>170){paths.push(path);path='';}path+=`${path?'L':'M'}${(x+i/n*w).toFixed(2)},${yy.toFixed(2)}`;previous=yy;}if(path)paths.push(path);return paths;}
function LabelBox({x,y,w=290,title,value,accent=C.cyan}){return <g><rect x={x} y={y} width={w} height="86" rx="5" fill="#132f43" stroke={C.line}/><T x={x+14} y={y+26} size={15} fill={C.muted}>{title}</T><T x={x+14} y={y+62} size={25} fill={accent}>{value}</T></g>;}

function Projection({kind,value,phase,id}){
 const correction=kind==='angle-correction',steering=kind==='steering';
 const angle=correction?60:steering?90-value:kind==='doppler'?55:value;
 const velocity=kind==='doppler'?value:15,df=dopplerShiftHz(velocity,angle),theta=rad(angle),cx=365,cy=368;
 const px=cx+195*Math.cos(theta),py=cy-195*Math.sin(theta),estimated=correction?correctedVelocityCMs(15,60,value):velocity;
 const declared=rad(value),rx=cx+150*Math.cos(declared),ry=cy-150*Math.sin(declared);
 return <>
  <T x="69" y="114" size={20}>El flujo continúa aunque su proyección sea cero.</T>
  <Vessel x={75} y={307} w={560} h={122} phase={phase} speed={.65*velocity/15}/>
  <Probe x={px} y={py} angle={90-angle} phase={phase}/>
  <path d={`M${px} ${py+6}L${cx} ${cy}`} stroke={C.cyan} strokeWidth="4"/>
  <Arrow x1={cx} y1={cy} x2={cx+160} y2={cy} id={id}/>
  <Arrow x1={cx} y1={cy} x2={cx+140*Math.cos(theta)} y2={cy-140*Math.sin(theta)} id={id} color={C.cyan}/>
  <path d={`M${cx+74} ${cy}A74 74 0 ${Math.abs(angle)>180?1:0} 0 ${cx+74*Math.cos(theta)} ${cy-74*Math.sin(theta)}`} fill="none" stroke={C.gold} strokeWidth="2"/>
  <T x={cx+87*Math.cos(theta/2)} y={cy-87*Math.sin(theta/2)+6} size={18} fill={C.gold}>{'θ '+f(angle,0)+'°'}</T>
  <T x="98" y="473" size={17} fill={C.muted}>Dispersores en movimiento · vectores conceptuales</T>
  {correction?<>
   <path d={`M${cx} ${cy}L${rx} ${ry}`} stroke={C.rose} strokeWidth="3" strokeDasharray="7 6"/><T x="675" y="141" size={20}>Ángulo real fijo: 60°</T>
   <LabelBox x={675} y={169} w={340} title="Rapidez real del modelo" value="15 cm/s"/>
   <LabelBox x={675} y={275} w={340} title="Estimación con el ángulo declarado" value={f(estimated,1)+' cm/s'} accent={C.rose}/>
   <T x="675" y="414" size={17} fill={C.muted}>{['La señal recibida no cambia.','Cambia la conversión de Δf a velocidad.']}</T>
   <Formula>{`v estimada = 15 × cos 60° / cos ${f(value,0)}°`}</Formula>
  </>:<>
   <PlotGrid x={695} y={176} w={310} h={208} base={.5} unit="Señal Doppler · ventana de 8 ms"/>
   <path d={curve(t=>Math.abs(df)<1e-8?0:Math.sin(t*Math.abs(df)*.008*2*Math.PI-phase*2*Math.PI)*.8,695,280,310,82)} fill="none" stroke={df<0?C.blue:C.rose} strokeWidth="3"/>
   <T x="850" y="455" size={27} anchor="middle" fill={C.gold}>{`Δf = ${f(df,0)} Hz`}</T>
   <Formula>{`Δf = 2 × 5 MHz × ${f(velocity,0)} cm/s × cos ${f(angle,0)}° / 1540 m/s`}</Formula>
  </>}
 </>;
}

function Sampling({kind,value,phase,id}){
 const prf=['scale','nyquist'].includes(kind)?value:2,signal=kind==='aliasing'?value*1000:kind==='nyquist'?800:1400;
 const offset=kind==='baseline'?value:0,{min,max,width}=baselineRangeHz(prf,offset),top=148,bottom=412,h=bottom-top;
 const yy=v=>bottom-(v-min)/width*h,base=yy(0),wave=t=>signal*(.78+.22*Math.sin(t*4*Math.PI));
 const wrap=v=>mod(v-min,width)+min,sign=kind==='invert'&&value>=.5?-1:1;
 const render=t=>kind==='invert'?sign*wrap(wave(t)):wrap(wave(t));
 const plottedMin=kind==='invert'&&sign<0?-max:min,plottedMax=kind==='invert'&&sign<0?-min:max;
 const ppY=v=>bottom-(v-plottedMin)/(plottedMax-plottedMin)*h,baseY=ppY(0),paths=splitWrapped(render,125,baseY,660,h/width);
 const aliased=Math.abs(aliasHz(signal,prf*1000)-signal)>1;
 return <>
  <T x="76" y="112" size={20}>{kind==='baseline'?'La base redistribuye el intervalo; la PRF permanece igual.':kind==='invert'?'Invertir cambia la presentación, no el flujo.':'La señal y el intervalo muestreable son cosas distintas.'}</T>
  <rect x="115" y={top} width="690" height={h} fill="#081927" stroke={C.line}/>
  {[0,.25,.5,.75,1].map(q=><path key={q} d={`M115 ${top+q*h}H805M${115+q*690} ${top}V${bottom}`} stroke="#24465b"/>)}
  <path d={`M115 ${baseY}H805`} stroke={C.gold} strokeWidth="2"/><T x="100" y={baseY+6} anchor="end" size={18}>0</T>
  <T x="105" y={top+8} anchor="end" size={17}>{f(plottedMax/1000,2)}</T><T x="105" y={bottom} anchor="end" size={17}>{f(plottedMin/1000,2)}</T><T x="70" y="139" size={15} fill={C.muted}>kHz</T>
  {paths.map((d,i)=><path key={i} d={d} stroke={C.cyan} strokeWidth="4" fill="none"/>)}
  <path d={`M${125+phase*660} ${top}V${bottom}`} stroke={C.rose} opacity=".7" strokeDasharray="5 5"/>
  <T x="805" y="445" size={16} anchor="end" fill={C.muted}>Tiempo del esquema →</T>
  <LabelBox x={835} y={153} w={210} title="PRF" value={f(prf,2)+' kHz'}/>
  <LabelBox x={835} y={256} w={210} title="Señal antes de muestrear" value={f(signal/1000,2)+' kHz'} accent={C.rose}/>
  <T x="835" y="384" size={16} fill={C.muted}>{kind==='baseline'?['Intervalo total constante:',f(width/1000,2)+' kHz']:kind==='invert'?['La anatomía y el sentido','real se conservan.']:[aliased?'Hay envoltura en el ejemplo.':'Señal dentro del intervalo.','No se recorta el exceso.']}</T>
  {kind==='nyquist'?<><T x="132" y="484" size={17} fill={C.muted}>Con base centrada, límites simétricos:</T><Formula y={535}>{`±Nyquist = ±PRF/2 = ±${f(nyquistHz(prf)/1000,2)} kHz`}</Formula></>:<Formula y={535}>{kind==='baseline'?`Máximo − mínimo = ${f(width/1000,2)} kHz, también al mover la base`:kind==='invert'?'La inversión no modifica la señal adquirida.':`PRF/2 = ${f(prf/2,2)} kHz · el pliegue no demuestra reflujo.`}</Formula>}
 </>;
}

function ColorField({kind,value,phase,id}){
 const speed=kind==='color'?value:12,mapInverted=kind==='color-map'&&value>=.5,orange=kind==='power',flash=kind==='flash',box=kind==='color-box';
 const direction=orange?(phase<.5?1:-1):speed<0?-1:1,positive=(speed>=0)!==mapInverted;
 const color=orange?C.orange:positive?C.rose:C.blue,roiW=box?value*5:500,roiX=330-roiW/2;
 const gain=kind==='color-gain'?value:55,intensity=orange?value:clamp(gain/70,0,1),motion=flash?Math.sin(phase*2*Math.PI)*value*7:0;
 const fps=5000/(128+Math.round(roiW/7)*8);
 return <>
  <T x="74" y="111" size={20}>{orange?'La misma magnitud puede proceder de direcciones opuestas.':flash?'Mueve la sonda: también aparece señal fuera de la luz.':box?'Más líneas Doppler requieren más adquisiciones en este modelo.':'La barra define qué significa cada color.'}</T>
  <g transform={`translate(${motion} 0)`}><Probe x="447" y="194" angle={45} phase={phase}/></g>
  <path d="M66 207Q362 190 672 207V425H66Z" fill="#344a58" stroke="#627e8d"/>
  {Array.from({length:55},(_,i)=><circle key={i} cx={83+mod(i*47,565)} cy={222+mod(i*31,185)} r={1.5+mod(i,3)} fill="#849da9" opacity=".23"/>)}
  <path d={`M${447+motion} 201L330 318`} stroke={C.gold} strokeWidth="3" strokeDasharray="6 5"/><Vessel x={81} y={272} w={576} h={92} phase={orange?(phase<.5?phase:1-phase):phase} direction={orange?1:direction} speed={kind==='color'?Math.abs(speed)/30:1} particles/>
  <rect x={roiX} y="230" width={roiW} height="165" fill="none" stroke={C.gold} strokeWidth="2"/>
  {Array.from({length:Math.max(3,Math.round(roiW/15))},(_,i)=>{const x=roiX+5+i*15;return <g key={i} opacity={Math.abs(speed)<.5&&!orange?0:intensity}><rect x={x} y="280" width="12" height="76" fill={color} opacity={.45+.35*Math.sin(i*.8+phase*3)}/></g>;})}
  {kind==='color-gain'&&gain>68&&Array.from({length:Math.round((gain-68)*2)},(_,i)=><rect key={i} x={roiX+mod(i*43,roiW)} y={234+mod(i*37,157)} width="8" height="6" fill={i%2?C.rose:C.blue} opacity=".7"/>)}
  {flash&&Array.from({length:Math.round(value*25)},(_,i)=><rect key={i} x={77+mod(i*31,582)} y={218+mod(i*47,199)} width="17" height="12" fill={i%2?C.rose:C.blue} opacity={.1+.5*Math.abs(Math.cos(phase*2*Math.PI))}/>)}
  {box&&<path d={`M${roiX+phase*roiW} 230V395`} stroke={C.cyan} strokeWidth="3"/>}
  <Arrow x1="254" y1="468" x2={direction>0?424:116} y2="468" id={id} color={C.cyan}/><T x="80" y="510" size={16} fill={C.muted}>{orange?'El flujo ilustrado cambia de sentido; Power conserva el código.':'Movimiento del modelo, identificado respecto al haz.'}</T>
  {box?<><LabelBox x={748} y={188} w={290} title="Líneas Doppler ilustrativas" value={Math.round(roiW/7)+' líneas'}/><LabelBox x={748} y={296} w={290} title="Tasa calculada del ejemplo" value={f(fps,1)+' cuadros/s'}/><T x="748" y="442" size={16} fill={C.muted}>{['PRF y conjunto de pulsos fijos.','No es un ajuste clínico universal.']}</T></>:<>
   <Panel x={751} y={180} w={278} h={260} title={orange?'Power convencional':'Barra del ejemplo'}>{orange?<><rect x="35" y="67" width="207" height="35" fill={C.orange} opacity={value}/><T x="137" y="143" anchor="middle" size={20}>Potencia recibida</T><T x="137" y="179" anchor="middle" size={17} fill={C.muted}>Sin signo direccional</T><T x="137" y="216" anchor="middle" size={17} fill={C.muted}>No es velocidad</T></>:<><rect x="35" y="61" width="48" height="65" fill={mapInverted?C.blue:C.rose}/><rect x="35" y="132" width="48" height="65" fill={mapInverted?C.rose:C.blue}/><T x="103" y="91" size={18}>Hacia la sonda</T><T x="103" y="162" size={18}>Se aleja</T><T x="35" y="233" size={15} fill={C.muted}>No identifica arteria o vena.</T></>}</Panel>
  </>}
  <Formula y={557}>{kind==='color-gain'?'La anatomía y el flujo no crecen al subir la ganancia.':flash?'El movimiento de tejidos puede contaminar la estimación Doppler.':orange?'La codificación convencional de potencia no informa dirección.':box?'Caja de color = región que se interroga, no una vena más grande.':'El signo se interpreta con orientación y barra identificadas.'}</Formula>
 </>;
}

function Filtering({kind,value,phase,id}){
 const filter=kind==='wall-filter'?value:100,tf=kind==='clutter'?dopplerShiftHz(value,60):80,bf=650;
 const x=hz=>135+hz*.8,base=405;
 const comp=[{f:tf,a:kind==='clutter'?1:.9,color:C.rose,name:'Tejido'},{f:220,a:.38,color:C.cyan,name:'Flujo lento'},{f:bf,a:.46,color:C.blue,name:'Flujo más rápido'}];
 return <>
  <T x="74" y="112" size={20}>{kind==='clutter'?'Tejido lento puede producir una señal mucho más intensa.':'Un filtro alto también puede borrar parte del flujo lento.'}</T>
  <path d="M118 164V405H836" stroke="#7d9cb1" fill="none"/>
  {[0,100,200,400,600,800].map(hz=><g key={hz}><path d={`M${x(hz)} 166V405`} stroke={C.line}/><T x={x(hz)} y="435" anchor="middle" size={16} fill={C.muted}>{hz}</T></g>)}
  {kind==='wall-filter'&&<><rect x={x(0)} y="164" width={filter*.8} height="241" fill={C.rose} opacity=".13"/><path d={`M${x(filter)} 158V412`} stroke={C.gold} strokeWidth="3"/><T x={x(filter)+9} y="151" size={17} fill={C.gold}>{'Filtro '+f(filter,0)+' Hz'}</T></>}
  {comp.map((c,i)=>{const retained=kind==='wall-filter'?c.f>=filter:true;return <g key={i} data-frequency={f(c.f,2)} data-retained={retained}><path d={curve(t=>c.a*Math.exp(-(((t*800-c.f)/26)**2)),135,base,640,210)} fill={c.color} fillOpacity={retained?.24:.035} stroke={c.color} strokeOpacity={retained?1:.18} strokeWidth="3"/><T x={x(c.f)} y={base-c.a*210-18} anchor="middle" size={17} fill={c.color}>{c.name}</T></g>;})}
  <T x="838" y="464" anchor="end" size={17} fill={C.muted}>Desplazamiento Doppler (Hz)</T>
  <T x="910" y="219" anchor="middle" size={24} fill={C.gold}>{kind==='clutter'?f(tf,0)+' Hz':'Corte'}</T>
  <T x="910" y="258" anchor="middle" size={17} fill={C.muted}>{kind==='clutter'?'Tejido del modelo':f(filter,0)+' Hz'}</T>
  <path d={curve(t=>Math.sin(t*7-phase*2*Math.PI)*.75,855,340,190,37)} stroke={C.rose} fill="none" strokeWidth="3"/>
  <path d={curve(t=>Math.sin(t*37-phase*2*Math.PI)*.19,855,340,190,37)} stroke={C.cyan} fill="none" strokeWidth="2"/>
  <T x="950" y="417" anchor="middle" size={15} fill={C.muted}>Entrada temporal ilustrativa</T>
  <Formula y={535}>{kind==='clutter'?'Mayor amplitud no significa mayor velocidad.':'El filtro discrimina frecuencia, no sabe qué señal interesa.'}</Formula>
 </>;
}

function Persistence({value,phase,id}){
 const n=Math.round(value),cx=120+mod(phase,1)*570;
 return <>
  <T x="74" y="112" size={20}>Promediar mezcla el presente con cuadros anteriores.</T>
  <Panel x={71} y={156} w={624} h={291} title="Objeto actual y memoria de la presentación"><path d="M35 179H589" stroke="#779aac" strokeWidth="2" strokeDasharray="7 7"/>{Array.from({length:n},(_,i)=>{const q=mod(phase-i*.045,1);return <rect key={i} x={24+q*530} y="109" width="40" height="95" fill={C.rose} opacity={(n-i)/n*.65} stroke={i===0?C.gold:'none'} strokeWidth="2"/>;})}<T x="312" y="258" size={16} anchor="middle" fill={C.muted}>El rastro es retención temporal; no añade anatomía.</T></Panel>
  <Panel x={735} y={156} w={295} h={291} title="Cuadros incluidos">{Array.from({length:6},(_,i)=><g key={i}><rect x="25" y={54+i*31} width="33" height="20" fill={i<n?C.cyan:'#193c52'} opacity={i<n?(n-i)/n*.75+.2:1}/><T x="75" y={70+i*31} size={17} fill={i<n?C.text:C.muted}>{i===0?'Actual':'Anterior '+i}</T></g>)}</Panel>
  <Arrow x1={105} y1={490} x2={650} y2={490} id={id}/><Formula y={546}>{`${n} cuadro${n===1?'':'s'} en el promedio ilustrativo → menor respuesta a cambios rápidos`}</Formula>
 </>;
}

function RangeSampling({kind,value,phase,id}){
 const pw=kind==='pw',cw=kind==='cw',gate=kind==='gate',broad=kind==='spectral-broadening';
 const sampleY=200+value*35,sampleX=450-(sampleY-170)*.55;
 if(pw)return <>
  <T x="74" y="112" size={20}>PW usa retraso de ida y vuelta para elegir profundidad.</T><Probe x="450" y="170" angle={29} phase={phase}/>
  <path d="M409 185L223 490H365L491 185Z" fill={C.cyan} opacity=".08"/><path d="M450 177L278 490" stroke={C.gold} strokeWidth="2" strokeDasharray="6 5"/>
  {[2,3,6].map((z,i)=><g key={z}><Vessel x={150} y={180+z*35} w={305} h={39} phase={phase} speed={.4+i*.13} color={Math.abs(z-value)<.6?C.rose:null}/><T x="111" y={206+z*35} anchor="end" size={17}>{z+' cm'}</T></g>)}
  <rect x={sampleX-28.5} y={sampleY-19} width="57" height="38" transform={`rotate(${Math.atan(.55)*180/Math.PI} ${sampleX} ${sampleY})`} fill={C.gold} opacity=".18" stroke={C.gold} strokeWidth="3"/><Arrow x1="492" y1={200+value*35} x2="620" y2={200+value*35} id={id}/>
  <Panel x={654} y={160} w={370} h={310} title="Ventana temporal de recepción"><path d="M32 247H340" stroke={C.muted}/>{[2,3,6].map((z,i)=><g key={z}><path d={`M${32+z*39} 247V${95+i*26}`} stroke={Math.abs(z-value)<.6?C.gold:C.muted} strokeWidth="5"/><T x={32+z*39} y="276" anchor="middle" size={15}>{f(2*z/100/1540*1e6,0)}</T></g>)}<rect x={32+value*39-13} y="61" width="26" height="190" fill={C.gold} opacity=".13"/><T x="338" y="301" anchor="end" size={15} fill={C.muted}>µs de ida y vuelta</T></Panel><Formula y={540}>{`Muestra a ${f(value,1)} cm → escucha alrededor de ${f(2*value/100/1540*1e6,1)} µs`}</Formula>
 </>;
 if(cw)return <>
  <T x="74" y="112" size={20}>CW emite y recibe continuamente: las profundidades se superponen.</T><Probe x="380" y="168" angle={35} phase={phase}/><Probe x="450" y="168" angle={35} phase={phase+.5}/><T x="216" y="163" anchor="middle" size={16}>Tx / emisión</T><T x="567" y="163" anchor="middle" size={16}>Rx / recepción</T>
  <path d="M340 185L180 468H455L420 185Z" fill={C.cyan} opacity=".1"/><path d="M410 185L250 468H525L490 185Z" fill={C.gold} opacity=".1"/><path d="M380 176L274 440M450 176L344 440" stroke={C.gold} strokeDasharray="6 5" strokeWidth="2"/>
  {[{y:268,v:20},{y:383,v:value}].map((o,i)=><g key={i}><Vessel x="135" y={o.y} w="395" h="45" phase={phase} speed={o.v/100}/><T x="103" y={o.y+30} anchor="end" size={16}>{'Nivel '+(i+1)}</T></g>)}
  <PlotGrid x={659} y={191} w={360} h={240} base={.86} unit="Señales mezcladas del trayecto"/><path d={curve(t=>.22+.16*Math.sin(t*19-phase*4)+value/180*Math.abs(Math.sin(t*12-phase*3)),659,397,360,180)} stroke={C.cyan} fill="none" strokeWidth="3"/><T x="840" y="492" anchor="middle" size={17} fill={C.muted}>Sin puerta que localice cada contribución.</T><Formula y={549}>El Doppler continuo no identifica la profundidad por sí solo.</Formula>
 </>;
 const len=gate?value:3,spread=broad?value/100:clamp(len/8,.08,1),center=304;
 return <>
  <T x="74" y="112" size={20}>{broad?'La muestra puede contener una distribución de velocidades.':'Una puerta mayor integra más regiones y puede alcanzar paredes.'}</T>
  <Vessel x="74" y="236" w="515" h="142" phase={phase} speed={.4}/><Probe x="430" y="176" angle={45} phase={phase}/><path d="M430 182L297 304" stroke={C.gold} strokeWidth="3" strokeDasharray="6 5"/>
  <rect x="268" y={center-len*9} width="58" height={len*18} transform={`rotate(${Math.atan2(430-297,304-182)*180/Math.PI} 297 304)`} fill={C.gold} fillOpacity=".13" stroke={C.gold} strokeWidth="3"/>
  {[0,1,2,3,4].map(i=>{const yy=250+i*26,sp=1-Math.abs(2-i)/3;return <Arrow key={i} x1="380" y1={yy} x2={380+sp*130} y2={yy} id={id} color={C.cyan} width={2.5}/>;})}
  <PlotGrid x={680} y={186} w={340} h={239} base={.94} unit="Distribución ilustrativa"/>
  {Array.from({length:26},(_,i)=>{const q=i/25,baseV=.55+Math.sin(q*12+phase*4)*.06,low=baseV-spread*.37,high=baseV+spread*.2;return <path key={i} d={`M${686+q*325} ${408-low*200}V${408-high*200}`} stroke={C.cyan} strokeWidth="9" opacity={.35+.45*Math.sin(q*Math.PI)}/>;})}
  <T x="85" y="446" size={17} fill={C.muted}>{gate?`Puerta de ${f(value,1)} mm en el esquema`:'Perfil heterogéneo dentro de una muestra fija'}</T><Formula y={540}>{broad?'Ensanchamiento espectral aislado no diagnostica estenosis.':'Localiza y dimensiona la muestra antes de interpretar el espectro.'}</Formula>
 </>;
}

function Compression({value,phase,id}){
 const collapse=clamp(value/100,0,1),ry=45*(1-collapse)+.5,cy=329,indent=collapse*22;
 return <>
  <T x="74" y="112" size={20}>Las mismas paredes se aproximan: no se pierde el vaso del plano.</T>
  <path d={`M110 229Q310 ${204+indent} 543 229V447H110Z`} fill="#536976" stroke="#7d98a7"/>
  <Probe x={331} y={218+indent} phase={phase}/>
  <ellipse cx="331" cy={cy} rx="91" ry={ry} fill="#061723" stroke="#b7d4df" strokeWidth="7" data-lumen-height={f(ry*2,2)}/>
  <path d={`M260 ${cy-ry}Q331 ${cy-ry-9} 402 ${cy-ry}`} stroke={C.gold} strokeWidth="5" fill="none"/>
  <path d={`M260 ${cy+ry}Q331 ${cy+ry+9} 402 ${cy+ry}`} stroke={C.cyan} strokeWidth="5" fill="none"/>
  <ellipse cx="466" cy="332" rx="37" ry="33" fill="#173849" stroke="#819dab" strokeWidth="6"/>
  <Arrow x1="571" y1="327" x2="654" y2="327" id={id}/>
  <Panel x={688} y={174} w={335} h={300} title="Correspondencia entre paredes"><path d="M30 155H305" stroke={C.line}/><path d={`M37 ${155-ry*1.6}H298`} stroke={C.gold} strokeWidth="5"/><path d={`M37 ${155+ry*1.6}H298`} stroke={C.cyan} strokeWidth="5"/><T x="167" y="257" anchor="middle" size={17} fill={C.muted}>{collapse>.95?'Coaptación del esquema':'Luz aún representada'}</T></Panel>
  <Formula y={540}>Un segmento ilustrado no sustituye un protocolo completo de TVP.</Formula>
 </>;
}

function Augmentation({value,phase,id}){
 const squeeze=phase<.5?Math.sin(phase*2*Math.PI):0,baseline=420;
 const displacement=(.35*phase+value*(1-Math.cos(2*Math.PI*Math.min(phase,.5)))/(2*Math.PI))/(.35+value/Math.PI);
 return <>
  <T x="74" y="112" size={20}>Contacto ligero en la muestra; la compresión se realiza distalmente.</T>
  <Vessel x="93" y="252" w="550" h="102" phase={displacement} speed={1} direction={-1}/><Probe x="185" y="196" angle={-38} phase={phase}/><path d="M185 202L267 300" stroke={C.gold} strokeWidth="3" strokeDasharray="6 5"/>
  <g transform={`translate(543 ${220+squeeze*22})`}><path d="M-39-11Q-35-39-13-25L5-4L48-8Q68-6 63 9L32 22L-20 19Z" fill="#d2ba9e" stroke="#8d7b70" strokeWidth="2"/><path d="M46-12L119-38L124-7L57 21" fill="#b6c8cc"/></g>
  <T x="120" y="395" size={17} fill={C.muted}>Muestra proximal</T><T x="510" y="395" size={17} anchor="middle" fill={C.gold}>{phase<.5?'Aumento distal':'Liberación distal'}</T>
  <PlotGrid x={712} y={192} w={311} h={236} base={.88}/>
  <path d={curve(t=>t<.15?.12:t<.5?.12+value*Math.sin((t-.15)/.35*Math.PI):.12,712,baseline,311,173)} fill="none" stroke={C.cyan} strokeWidth="4"/>
  <path d={`M${712+phase*311} 194V429`} stroke={C.gold} strokeWidth="2"/><T x="717" y="476" size={17} fill={C.muted}>Respuesta inventada sin retorno sostenido.</T>
  <Formula y={546}>La acción distal y la presión de la sonda no son intercambiables.</Formula>
 </>;
}

function Physiology({kind,value,phase,id}){
 const respiratory=kind==='phasicity',seconds=respiratory?16:4,cycles=seconds*value/60,q=phase*cycles,amplitude=.75+.24*Math.sin(q*2*Math.PI);
 const signal=t=>respiratory?.5-.28*Math.sin(t*cycles*2*Math.PI):.45+.4*Math.pow(Math.max(0,Math.sin(t*cycles*2*Math.PI)),4);
 return <>
  <T x="74" y="112" size={20}>{respiratory?'Ejemplo de miembro inferior: la respiración modula el flujo.':'La actividad cardíaca puede modular el flujo venoso.'}</T>
  {respiratory?<g transform="translate(260 285)"><path d="M-18-100V-56L-49-29M18-100V-56L49-29" stroke={C.muted} strokeWidth="14" fill="none"/>{[-1,1].map(side=><path key={side} d={`M${side*15} -50Q${side*111} -93 ${side*115} 76Q${side*67} 106 ${side*15} 82Z`} fill={C.blue} opacity=".45" transform={`scale(${1+.07*Math.sin(q*2*Math.PI)})`}/>)}<path d={`M-140 ${120+Math.sin(q*2*Math.PI)*13}Q0 ${83+Math.sin(q*2*Math.PI)*13} 140 ${120+Math.sin(q*2*Math.PI)*13}`} stroke={C.gold} strokeWidth="5" fill="none"/><T x="0" y="180" anchor="middle" size={18} fill={C.muted}>{[Math.cos(q*2*Math.PI)>0?'Inspiración: diafragma desciende':'Espiración: diafragma asciende','Miembro inferior · flujo del modelo']}</T></g>:<g transform={`translate(265 286) scale(${.92+.08*Math.sin(q*2*Math.PI)})`}><path d="M0-42C-91-128-162-30-111 44L0 143L111 44C162-30 91-128 0-42Z" fill={C.rose} opacity=".65" stroke={C.rose} strokeWidth="3"/><path d="M-90 10H-39L-17-28L7 71L30-1H88" stroke={C.gold} strokeWidth="5" fill="none"/></g>}
  <PlotGrid x={548} y={175} w={474} h={260} base={.94} unit={respiratory?'Flujo relativo · miembro inferior':'Flujo relativo del modelo'}/><path d={curve(signal,548,419,474,198)} stroke={C.cyan} strokeWidth="3.5" fill="none"/><path d={`M${548+phase*474} 176V435`} stroke={C.gold} strokeWidth="2"/>
  {[0,.25,.5,.75,1].map(t=><T key={t} x={548+t*474} y="471" size={15} anchor="middle" fill={C.muted}>{f(t*seconds,0)+' s'}</T>)}
  <Formula y={542}>{`${f(value,0)} ${respiratory?'ciclos/min':'latidos/min'} · patrón inventado, dependiente del territorio`}</Formula>
 </>;
}

function Valve({value,phase,id}){
 const forward=phase<.5||value<.01,closing=forward?0:clamp(.8+(phase-.5)*8*value,0,1),tipY=forward?42:42*(1-closing),cy=300;
 return <>
  <T x="74" y="112" size={20}>Las valvas se mueven con la relación de presiones y el flujo.</T>
  <Vessel x="95" y="225" w="625" h="150" phase={phase} speed={.6} direction={forward?1:-1} particles={false}/>
  <path d={`M351 226Q385 257 439 ${cy-tipY}`} stroke="#dce5df" strokeWidth="7" fill="none"/><path d={`M351 374Q385 343 439 ${cy+tipY}`} stroke="#dce5df" strokeWidth="7" fill="none"/>
  {Array.from({length:16},(_,i)=>{const q=mod(i/16+phase*(forward?.9:-.9),1),xx=110+q*590,blocked=!forward&&closing>.9&&xx<439;return <ellipse key={i} cx={blocked?454+mod(i*19,190):xx} cy={252+mod(i*31,97)} rx="7" ry="4" fill={C.rose}/>;})}
  <Arrow x1="808" y1="252" x2={forward?1004:750} y2="252" id={id} color={forward?C.cyan:C.gold}/>
  <T x="869" y="313" anchor="middle" size={23}>{forward?'Avance':'Intento de retorno'}</T><T x="869" y="358" anchor="middle" size={18} fill={C.muted}>{forward?'Valvas abiertas':closing>.9?'Coaptación del esquema':'Cierre progresivo del esquema'}</T>
  <Formula y={536}>Ver una válvula no demuestra por sí solo su competencia clínica.</Formula>
 </>;
}

function Reflux({kind,value,phase,id}){
 const duration=clamp(value,.2,1.5),start=2,end=start+duration,time=phase*4.5,baseline=327;
 const signal=t=>t<1?.06:t<2?.08+.73*Math.sin((t-1)*Math.PI):t<end?-.46*Math.sin((t-start)/duration*Math.PI):.06;
 const x=t=>108+t/4.5*884;
 const beforeReturn=.06+.08+.73*2/Math.PI;
 const integral=t=>t<1?.06*t:t<2?.06+.08*(t-1)+.73*(1-Math.cos((t-1)*Math.PI))/Math.PI:t<end?beforeReturn-.46*duration*(1-Math.cos((t-start)/duration*Math.PI))/Math.PI:beforeReturn-.46*duration*2/Math.PI+.06*(t-end);
 const displacement=integral(time)/integral(4.5);
 return <>
  <T x="74" y="112" size={20}>{kind==='reflux-duration'?'Los dos cursores delimitan flujo, no el esfuerzo provocador.':'El retorno sostenido se registra con posición y maniobra identificadas.'}</T>
  {kind==='reflux'&&<><Vessel x={75} y={250} w={384} h={112} phase={displacement} direction={1} speed={1} color={time>start&&time<end?C.blue:C.rose}/><Probe x="350" y="188" angle={43} phase={phase}/><path d="M350 195L256 306" stroke={C.gold} strokeWidth="2" strokeDasharray="5 5"/><Arrow x1="184" y1="414" x2={time>start&&time<end?98:409} y2="414" id={id} color={time>start&&time<end?C.blue:C.cyan}/><T x="270" y="474" anchor="middle" size={23} fill={time>start&&time<end?C.blue:C.cyan}>{time>start&&time<end?'Flujo retrógrado':'Flujo de avance'}</T><T x="270" y="515" anchor="middle" size={16} fill={C.muted}>Segmento, posición y maniobra identificados</T></>}
  <g transform={kind==='reflux'?'translate(450 90) scale(.58 .78)':undefined}>
  <rect x="94" y="154" width="920" height="309" fill="#081a28" stroke={C.line}/>
  {[0,1,2,3,4].map(t=><g key={t}><path d={`M${x(t)} 163V453`} stroke={C.line}/><T x={x(t)} y="489" size={17} anchor="middle" fill={C.muted}>{t+' s'}</T></g>)}
  <path d="M108 327H995" stroke={C.gold} strokeWidth="1.5"/><T x="83" y="333" size={17} anchor="end">0</T>
  <path d={curve(q=>signal(q*4.5),108,baseline,884,186)} stroke={C.cyan} strokeWidth="4" fill="none"/>
  <rect x={x(start)} y="337" width={x(end)-x(start)} height="112" fill={C.rose} opacity=".10"/>
  <path d={`M${x(start)} 180V451M${x(end)} 180V451M${x(start)} 437H${x(end)}`} stroke={C.rose} strokeWidth="3"/>
  <T x={(x(start)+x(end))/2} y="205" anchor="middle" size={24} fill={C.rose}>{f(duration,2)+' s'}</T>
  <path d={`M${x(time)} 161V454`} stroke={C.gold} strokeWidth="2"/>
  <T x={x(.45)} y="527" anchor="middle" size={17} fill={C.muted}>Basal</T><T x={x(1.5)} y="527" anchor="middle" size={17} fill={C.muted}>Aumento distal</T><T x={x(2)} y="566" anchor="middle" size={17} fill={C.gold}>Liberación</T><T x={x(3.8)} y="527" anchor="middle" size={17} fill={C.muted}>Después</T>
  {kind==='reflux'&&<T x="1015" y="563" anchor="end" size={16} fill={C.muted}>Señal inventada · no Valsalva</T>}
  </g>
 </>;
}

function Safety({kind,value,phase,id}){
 if(kind==='mi'){
  const mi=mechanicalIndex(value,2),x=t=>135+t/2*785,y=v=>302-v*72;
  return <><T x="74" y="112" size={20}>MI usa presión rarefaccional derated y frecuencia central.</T><path d="M135 169V457H940M135 302H940" stroke={C.muted} fill="none"/>{[0,.5,1,1.5,2].map(t=><g key={t}><path d={`M${x(t)} 169V457`} stroke={C.line}/><T x={x(t)} y="489" anchor="middle" size={16} fill={C.muted}>{f(t,1)+' µs'}</T></g>)}<path d={Array.from({length:321},(_,i)=>{const t=i/160;return `${i?'L':'M'}${x(t)},${y(value*Math.sin(t*4*Math.PI-phase*2*Math.PI))}`;}).join(' ')} stroke={C.cyan} strokeWidth="3" fill="none"/><path d={`M135 ${y(-value)}H940`} stroke={C.rose} strokeDasharray="6 6"/><T x="940" y={y(-value)-12} anchor="end" size={18} fill={C.rose}>{`−${f(value,2)} MPa`}</T><Formula y={549}>{`MI = ${f(value,2)} / √2 = ${f(mi,2)} · índice, no predicción individual de daño`}</Formula></>;
 }
 if(kind==='ti')return <>
  <T x="74" y="112" size={20}>TI es un índice basado en modelos de calentamiento.</T>
  <Panel x={87} y={170} w={475} h={295} title="Relación en un modelo de referencia"><T x="30" y="89" size={19}>Potencia del ejemplo</T><rect x="30" y="108" width={value*185} height="29" fill={C.rose}/><T x="30" y="191" size={19}>Referencia del modelo</T><rect x="30" y="211" width="185" height="29" fill={C.muted}/><T x="437" y="270" anchor="end" size={16} fill={C.muted}>TIS / TIB / TIC dependen del modelo.</T></Panel>
  <Panel x={626} y={170} w={383} h={295} title="Indicador de pantalla"><T x="191" y="118" anchor="middle" size={61} fill={C.gold}>{'TI '+f(value,1)}</T><T x="191" y="190" anchor="middle" size={26}>{'No equivale a '+f(value,1)+' °C'}</T><T x="191" y="243" anchor="middle" size={17} fill={C.muted}>No es un sensor de temperatura.</T></Panel>
  <Arrow x1="569" y1="326" x2="620" y2="326" id={id} color={C.gold}/><circle cx={572+phase*43} cy="326" r="7" fill={C.gold}/>
  <Formula y={541}>El índice y el tiempo se interpretan en el contexto del examen.</Formula>
 </>;
 if(kind==='alara'){
  const angle=value/60*Math.PI*2,arc=`M272 198A103 103 0 ${angle>Math.PI?1:0} 1 ${272+103*Math.sin(angle)} ${301-103*Math.cos(angle)}`;
  return <><T x="74" y="112" size={20}>Obtén la información necesaria con exposición razonablemente baja.</T><circle cx="272" cy="301" r="103" stroke={C.line} strokeWidth="13" fill="none"/>{value>0&&value<60&&<path d={arc} stroke={C.gold} strokeWidth="13" fill="none"/>}{value>=60&&<circle cx="272" cy="301" r="103" stroke={C.gold} strokeWidth="13" fill="none"/>}<T x="272" y="310" anchor="middle" size={43} fill={C.gold}>{f(value,0)+' s'}</T><T x="272" y="458" anchor="middle" size={17} fill={C.muted}>Tiempo ilustrativo · sin límite seguro inferido</T><Panel x={550} y={175} w={456} h={294} title="Decisiones durante la adquisición">{['Definir qué necesitas ver','Optimizar técnica y recepción','Observar índices y tiempo','Congelar cuando no necesitas emitir'].map((s,i)=><g key={s}><circle cx="31" cy={79+i*54} r="8" fill={i===Math.min(3,Math.floor(phase*4))?C.gold:C.cyan}/><T x="54" y={85+i*54} size={20}>{s}</T></g>)}</Panel><Formula y={542}>ALARA no significa reducir ajustes hasta perder la información necesaria.</Formula></>;
 }
 const amplitude=Math.sqrt(value),pulse=mod(phase*2,1);
 return <><T x="74" y="112" size={20}>La potencia cambia la emisión; la ganancia cambia la recepción.</T><Probe x="279" y="171" phase={phase}/><path d="M230 190L118 454H439L327 190Z" fill={C.cyan} opacity={value*.14}/>{[0,1,2,3].map(i=>{const yy=202+mod(pulse+i/4,1)*232;return <path key={i} d={`M${230-(yy-202)*.4} ${yy}H${327+(yy-202)*.4}`} stroke={C.cyan} opacity={.2+amplitude*.7} strokeWidth={2+amplitude*3}/>;})}<path d="M126 459H440" stroke={C.muted} strokeWidth="8"/><Panel x={571} y={181} w={440} h={288} title="Dos controles diferentes"><T x="29" y="83" size={20}>Potencia de emisión</T><rect x="29" y="105" width={value*359} height="27" fill={C.cyan}/><T x="29" y="191" size={20}>Ganancia de recepción fija</T><rect x="29" y="213" width="180" height="27" fill={C.rose}/></Panel><Formula y={541}>La amplitud de presión del modelo escala con √potencia.</Formula></>;
}

function Duplex({value,phase,id}){
 const modes=Math.round(value),active=Math.min(modes-1,Math.floor(phase*modes));
 return <><T x="74" y="112" size={20}>La presentación combina modos; las adquisiciones se intercalan.</T><Panel x={77} y={155} w={553} h={340} title={modes===1?'B':modes===2?'B + color':'B + color + PW'}><path d="M23 89H527M23 217H527" stroke="#8da4b0" strokeWidth="4"/><ellipse cx="256" cy="153" rx="157" ry="49" fill="#071724" stroke="#c0d4dc" strokeWidth="5"/>{modes>=2&&<ellipse cx="256" cy="153" rx="150" ry="43" fill={C.rose} opacity=".55"/>}{modes>=3&&<><rect x="243" y="131" width="27" height="46" fill="none" stroke={C.gold} strokeWidth="3"/><path d={curve(t=>.2+.32*Math.pow(Math.max(0,Math.sin(t*15-phase*2)),2),24,319,502,80)} fill="none" stroke={C.cyan} strokeWidth="3"/><path d="M23 317H527" stroke={C.muted}/></>}</Panel><Panel x={682} y={155} w={342} h={340} title="Reparto de adquisición ilustrativo">{['B','Color','PW'].map((label,i)=><g key={label} opacity={i<modes?1:.2}><rect x="28" y={63+i*82} width="285" height="58" fill={i===active?C.cyan:'#20465e'} stroke={i===active?C.gold:C.line}/><T x="170" y={100+i*82} anchor="middle" size={23} fill={i===active?'#123245':C.text}>{label}</T></g>)}</Panel><Formula y={552}>Añadir modos puede reducir la resolución temporal disponible.</Formula></>;
}

const supported=new Set(['doppler','doppler-angle','angle-correction','baseline','color','color-map','flow-direction','color-gain','scale','nyquist','aliasing','invert','wall-filter','clutter','persistence','color-box','steering','pw','gate','spectral-broadening','cw','power','flash','compression','augmentation','phasicity','pulsatility','valve','reflux','reflux-duration','alara','ti','mi','output-power','duplex']);
export const DOPPLER_ANIMATIONS=[...supported];
export const dopplerGlossaryAnimationKeys=DOPPLER_ANIMATIONS;
export default function DopplerGlossaryAnimation({term,value,phase=.5,compact=false}){
 const uid=useId().replace(/[^a-zA-Z0-9_-]/g,''),id='dg-arrow-'+uid,kind=term.animation;
 if(!supported.has(kind))throw new Error('Unsupported Doppler glossary animation: '+kind);
 const p=clamp(Number.isFinite(phase)?phase:.5,0,1),v=clamp(Number.isFinite(value)?value:term.control.initial,term.control.min,term.control.max);
 let content;
 if(['doppler','doppler-angle','flow-direction','steering','angle-correction'].includes(kind))content=<Projection kind={kind} value={v} phase={p} id={id}/>;
 else if(['baseline','scale','nyquist','aliasing','invert'].includes(kind))content=<Sampling kind={kind} value={v} phase={p} id={id}/>;
 else if(['color','color-map','color-gain','color-box','power','flash'].includes(kind))content=<ColorField kind={kind} value={v} phase={p} id={id}/>;
 else if(['wall-filter','clutter'].includes(kind))content=<Filtering kind={kind} value={v} phase={p} id={id}/>;
 else if(kind==='persistence')content=<Persistence value={v} phase={p} id={id}/>;
 else if(['pw','gate','spectral-broadening','cw'].includes(kind))content=<RangeSampling kind={kind} value={v} phase={p} id={id}/>;
 else if(kind==='compression')content=<Compression value={v} phase={p} id={id}/>;
 else if(kind==='augmentation')content=<Augmentation value={v} phase={p} id={id}/>;
 else if(['phasicity','pulsatility'].includes(kind))content=<Physiology kind={kind} value={v} phase={p} id={id}/>;
 else if(kind==='valve')content=<Valve value={v} phase={p} id={id}/>;
 else if(['reflux','reflux-duration'].includes(kind))content=<Reflux kind={kind} value={v} phase={p} id={id}/>;
 else if(['alara','ti','mi','output-power'].includes(kind))content=<Safety kind={kind} value={v} phase={p} id={id}/>;
 else if(kind==='duplex')content=<Duplex value={v} phase={p} id={id}/>;
 else content=<T x="550" y="300" anchor="middle">Mecanismo no disponible.</T>;
 return <svg className={'glossary-mechanism glossary-doppler '+(compact?'glossary-mechanism-compact':'')} data-animation={kind} data-value={v} data-phase={p} viewBox="0 0 1100 610" role="img" aria-labelledby={uid+'-title '+uid+'-desc'} style={{display:'block',width:'100%',height:'auto',background:C.bg,fontFamily:'Inter,Arial,sans-serif'}}><title id={uid+'-title'}>{term.title+' · mecanismo animado original'}</title><desc id={uid+'-desc'}>Representación educativa original con parámetro manipulable. El movimiento y la señal son esquemáticos, no un registro clínico real ni un ajuste universal.</desc><defs><marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs><rect width="1100" height="610" fill={C.bg}/><T x="43" y="41" size={13} fill={C.muted}>IMF · GLOSARIO VISUAL · MODELO DIDÁCTICO</T><path d="M43 60H1057M43 582H1057" stroke={C.line}/>{content}<T x="1056" y="600" size={11} fill={C.muted} anchor="end">GEOMETRÍA Y TIEMPOS ILUSTRATIVOS · NO ES UN ESTUDIO DE PACIENTE</T></svg>;
}
