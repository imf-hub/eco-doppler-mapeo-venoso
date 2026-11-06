import {escapeXML} from '../lib.js';

export const MAP_VIEWS=['Anteroexterna','Anterointerna','Posterior'];
export const MAP_CONDITIONS={competent:{name:'Competente',color:'#2563eb'},reflux:{name:'Incompetente',color:'#dc2626'},ablated:{name:'Ablacionada',color:'#7c8490'},thrombosed:{name:'Trombosada',color:'#16181d'},lymph:{name:'Linfoganglionar',color:'#16803d'},nonvascular:{name:'No vascular',color:'#c28b00'}};
export const DEFAULT_META={code:'SIM-001',side:'derecho',position:'',maneuver:'',indication:'',notes:'',limitations:'',views:[0,1,2]};
const outlines=[
 'M61 38Q33 93 43 164L51 242Q37 275 45 322L61 409L57 430Q40 439 36 445Q63 457 96 442L102 417Q121 336 120 301Q128 265 115 242L135 143Q148 81 117 38Z',
 'M61 38Q39 89 46 163L56 240Q43 280 51 327L66 409L61 430Q43 443 42 447Q70 456 98 440L105 414Q118 344 116 302Q124 265 111 241L128 143Q143 82 117 38Z',
 'M61 38Q33 91 44 166L52 240Q35 276 45 325L64 410L59 437Q77 451 100 438L102 414Q120 337 120 299Q127 263 114 240L131 144Q145 83 117 38Z'
];
export function outlineFor(view){return outlines[view]||outlines[1];}
const text=(x,y,s,size=7,color='#677281',anchor='start')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${color}">${escapeXML(s)}</text>`;
export function diagramBackground(view,side='derecho'){
 const reflect=side==='izquierdo'?'translate(200 0) scale(-1 1)':'';
 return `<g transform="${reflect}"><path d="${outlineFor(view)}" fill="#fcf8f5" stroke="#c7bfbb" stroke-width="1.2"/>${view===2?'<path d="M58 280Q77 299 87 333Q97 299 113 281M87 338L84 409" fill="none" stroke="#e4d9d3"/>':''}</g><path d="M43 242H143M57 426H121" stroke="#dfd7d2" stroke-dasharray="3 3" stroke-width=".7"/>${text(145,245,'Pliegue',6)}${text(145,253,'rodilla',6)}${text(126,429,'Planta',6)}${text(14,27,view===2?'Cara posterior':view===1?'Cara anterointerna':'Cara anteroexterna',6)}${text(100,463,'Esquema · distancias no a escala',6,'#8b817b','middle')}`;
}
export function mapPath(points,plane){
 if(!points?.length)return '';
 let d=`M${points[0][0]},${points[0][1]}`;
 for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i];
  if(plane==='epifascial'){const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy)||1;const n=Math.max(2,Math.round(length/15));for(let j=1;j<=n;j++){const t=j/n,mid=(j-.5)/n,sign=j%2?1:-1;d+=`Q${a[0]+dx*mid-dy/length*5*sign},${a[1]+dy*mid+dx/length*5*sign} ${a[0]+dx*t},${a[1]+dy*t}`;}}
  else d+=`L${b[0]},${b[1]}`;
 }return d;
}
function crossMarks(points,surgery){let out='';for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(!len)continue;for(let t=8;t<len;t+=surgery?10:22){const x=a[0]+dx*t/len,y=a[1]+dy*t/len,nx=-dy/len*4,ny=dx/len*4;out+=`<path d="M${x-nx},${y-ny}L${x+nx},${y+ny}${surgery?'':`M${x-3},${y+3}l6,-6`}" stroke="#20242a" stroke-width="1"/>`;}}return out;}
const wrap=(s,n=16)=>String(s||'').match(new RegExp(`.{1,${n}}(?:\\s|$)|.{1,${n}}`,'g'))?.map(x=>x.trim())||[];
export function markSVG(e,selected=false){
 if(!e?.points?.length)return '';
 const [x,y]=e.points[0],color=MAP_CONDITIONS[e.condition]?.color||'#697586';let shape='';
 if(e.type==='perforator')shape=`<circle cx="${x}" cy="${y}" r="6" fill="white" stroke="${color}" stroke-width="2"/>`;
 else if(e.type==='gulf')shape=`<circle cx="${x}" cy="${y}" r="6" fill="${color}"/>`;
 else if(e.type==='oval')shape=`<ellipse cx="${x}" cy="${y}" rx="11" ry="7" fill="${color}22" stroke="${color}" stroke-width="1.7"/>`;
 else if(e.type==='ulcer'){for(let k=-9;k<=9;k+=4)shape+=`<path d="M${x-10} ${y+k}h20M${x+k} ${y-10}v20" stroke="#222" stroke-width=".7"/>`;shape+=`<rect x="${x-10}" y="${y-10}" width="20" height="20" fill="none" stroke="#222"/>`;}
 else if(e.type==='vessel'){
  const d=mapPath(e.points,e.plane),dash=e.plane==='hypoplasia'?'8 5':e.plane==='aplasia'||e.condition==='ablated'?'1 5':'';
  if(selected)shape+=`<path d="${d}" stroke="#caa8b6" stroke-width="8" opacity=".35" fill="none"/>`;
  if(e.wall||e.plane==='wall')shape+=`<path d="${d}" fill="none" stroke="#20242a" stroke-width="5.4"/>`;
  shape+=`<path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash}"/>`;
  if(e.synechiae||e.plane==='synechiae')shape+=crossMarks(e.points,false);
  if(e.surgery||e.plane==='surgery')shape+=crossMarks(e.points,true);
 }
 const inside=e.type==='vessel'||e.type==='gulf',tx=inside?86:139,ty=Math.min(y+10,428);
 const rows=inside?[e.label,e.diameter?`${e.diameter} mm`:'',e.reflux?`${e.reflux} s`:'',e.length?`L ${e.length} cm`:'']:[e.label,e.diameter?`${e.diameter} mm`:'',e.height?`${e.height} cm`:'',e.height?e.reference:''];
 const lines=rows.filter(Boolean).flatMap(v=>wrap(v,inside?14:12));
 let annotation=`<text x="${tx}" y="${ty}" class="map-annotation" font-size="9" stroke="white" stroke-width="1.6" paint-order="stroke" stroke-linejoin="round" text-anchor="${inside?'middle':'start'}" fill="${color}">${lines.map((v,i)=>`<tspan x="${tx}" dy="${i?10:0}">${escapeXML(v)}</tspan>`).join('')}</text>`;
 if(!inside)annotation=`<path d="M${x+6},${y}L135,${ty-3}" fill="none" stroke="${color}" stroke-width=".6"/>`+annotation;
 if(inside&&e.height)annotation+=text(139,ty,`${e.height} cm`,6.5,color)+text(139,ty+8,e.reference||'¿Referencia?',5.8,color);
 return shape+annotation;
}
export function serializeMap(entries,meta){return JSON.stringify({schemaVersion:2,educativo:true,meta:{...meta,views:[0,1,2]},entries},null,2);}
export function parseMap(value){
 const data=typeof value==='string'?JSON.parse(value):value;
 if(!data||!Array.isArray(data.entries)||!data.meta||typeof data.meta!=='object'||Array.isArray(data.meta)||data.entries.length>160)throw new Error('El archivo no contiene una cartografía de práctica válida.');
 const types=['vessel','perforator','gulf','oval','ulcer','annotation'];const seen=new Set();
 const entries=data.entries.map((e,i)=>{
  if(!e||!types.includes(e.type)||!Number.isInteger(e.view)||e.view<0||e.view>2||!Array.isArray(e.points)||!e.points.length||e.points.length>200)throw new Error(`Elemento ${i+1}: estructura o cara no válida.`);
  const points=e.points.map(p=>{if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)||p[0]<0||p[0]>200||p[1]<0||p[1]>470)throw new Error(`Elemento ${i+1}: coordenadas fuera de la plantilla.`);return [...p];});
  if(e.type==='vessel'&&points.length<2)throw new Error('Un trayecto necesita dos puntos.');
  const id=String(e.id||`import-${i}`).slice(0,80);if(seen.has(id))throw new Error('Hay identificadores repetidos.');seen.add(id);
  const clean={id,type:e.type,view:e.view,points};
  for(const key of ['label','condition','plane','diameter','reflux','length','height','reference','region','flowRole'])clean[key]=String(e[key]??'').slice(0,key==='label'||key==='reference'?70:35);
  for(const key of ['wall','synechiae','surgery'])clean[key]=e[key]===true;
  return clean;
 });
 const meta={...DEFAULT_META};for(const k of Object.keys(DEFAULT_META)){if(k!=='views')meta[k]=String(data.meta[k]??DEFAULT_META[k]).slice(0,['notes','limitations'].includes(k)?2500:200);}
 if(!['derecho','izquierdo'].includes(meta.side))throw new Error('La lateralidad del archivo no es válida.');
 return {entries,meta};
}
export function createMapSVG(entries,meta,{includeReport=true}={}){
 const report=includeReport?[`Indicación: ${meta.indication||'pendiente'}`,`Posición: ${meta.position||'pendiente'} · Maniobra: ${meta.maneuver||'pendiente'}`,`Informe: ${meta.notes||'sin completar'}`,`Limitaciones: ${meta.limitations||'no consignadas'}`].flatMap(s=>wrap(s,110)):[];
 const h=includeReport?608+report.length*12:600;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${Math.round(h*1200/720)}" viewBox="0 0 720 ${h}"><rect width="720" height="${h}" fill="white"/><g font-family="Arial,sans-serif">${text(22,25,'IMF · CARTOGRAFÍA EDUCATIVA',16,'#a80f32')}${text(22,44,`Caso ${meta.code} · Miembro ${meta.side} · EJERCICIO FICTICIO`,10)}${MAP_VIEWS.map((v,i)=>`<g transform="translate(${22+i*226} 57)">${text(100,12,v.toUpperCase(),10,'#3b4654','middle')}${diagramBackground(i,meta.side)}${entries.filter(e=>e.view===i).map(e=>markSVG(e)).join('')}</g>`).join('')}${text(22,550,'Azul competente · Rojo incompetente · Gris ablación · Negro trombosis · Verde linfoganglionar · Amarillo no vascular',8)}${text(22,565,'Trazo recto: subfascial · Ondulado: epifascial · ○ perforante · Diámetros mm · Longitudes y alturas cm',8)}${text(22,584,'Mapa e informe de práctica: revisar concordancia con evidencia dúplex. Sin validación clínica automática.',8)}${report.map((s,i)=>text(22,608+i*12,s,8.5)).join('')}</g></svg>`;
}

export const EXAMPLE_MAP={meta:{...DEFAULT_META,code:'SIM-GSV-02',position:'Bipedestación con apoyo; miembro sin carga',maneuver:'Aumento distal y liberación en los segmentos indicados; SFJ evaluada con maniobra documentada',indication:'Caso ficticio: describir extensión segmentaria de reflujo de GSV y conexión con tributaria',notes:'SFJ competente en el caso. GSV proximal competente; reflujo de 0.85 s en segmento de muslo que inicia 8 cm distal a SFJ y se extiende 18 cm; GSV distal competente. Diámetro GSV de muslo 6.2 mm y pierna 3.2 mm en transversal con pared. Tributaria epifascial incompetente con flujo retrógrado de 1.0 s; reentrada por PV de 3.0 mm a 18 cm desde planta del pie. SSV 3.0 mm sin reflujo anormal en los segmentos evaluados. El sistema profundo fue evaluado según el protocolo del caso y se describe sin alteraciones en esta viñeta.',limitations:'Datos inventados para practicar códigos. Las coordenadas no equivalen a distancias medidas ni reconstruyen un paciente.'},entries:[
 {id:'gsv-prox',view:1,type:'vessel',points:[[104,58],[106,96]],condition:'competent',plane:'subfascial',label:'GSV proximal',diameter:'4.2',region:'muslo'},
 {id:'gsv-ref',view:1,type:'vessel',points:[[106,96],[105,147],[96,211]],condition:'reflux',plane:'subfascial',label:'GSV segmento',diameter:'6.2',reflux:'0.85',length:'18',region:'muslo'},
 {id:'gsv-dist',view:1,type:'vessel',points:[[96,211],[90,282],[77,352],[73,420]],condition:'competent',plane:'subfascial',label:'GSV distal',diameter:'3.2',region:'pierna'},
 {id:'trib',view:1,type:'vessel',points:[[105,147],[70,206],[66,267],[76,317]],condition:'reflux',plane:'epifascial',label:'Tributaria',diameter:'4.1',reflux:'1.00',region:'pierna'},
 {id:'pv',view:1,type:'perforator',points:[[76,317]],condition:'competent',plane:'subfascial',label:'PV reentrada',diameter:'3.0',height:'18',reference:'planta del pie',region:'pierna',flowRole:'reentrada'},
 {id:'ssv',view:2,type:'vessel',points:[[88,240],[87,294],[78,354],[72,420]],condition:'competent',plane:'subfascial',label:'SSV',diameter:'3.0',region:'pierna'}
]};
