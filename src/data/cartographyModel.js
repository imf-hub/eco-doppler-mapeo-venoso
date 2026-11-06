import {escapeXML} from '../lib.js';
import {CONSENSUS_CONDITIONS} from './consensusStandard.js';
import {perpendicularMarks,contourHatch} from '../simulation/cartographicGeometry.js';
import {consensusAsset,templateFile,templateRegion,viewHeight,WORK_VIEWS} from './consensusAtlas.js';

export const MAP_VIEWS=['Anteroexterna','Anterointerna','Posterior'];
export const MAP_CONDITIONS=CONSENSUS_CONDITIONS;
export const DEFAULT_META={code:'SIM-001',side:'derecho',position:'',maneuver:'',indication:'',notes:'',limitations:'',views:[0,1,2]};
const outlines=[
 'M61 38Q33 93 43 164L51 242Q37 275 45 322L61 409L57 430Q40 439 36 445Q63 457 96 442L102 417Q121 336 120 301Q128 265 115 242L135 143Q148 81 117 38Z',
 'M61 38Q39 89 46 163L56 240Q43 280 51 327L66 409L61 430Q43 443 42 447Q70 456 98 440L105 414Q118 344 116 302Q124 265 111 241L128 143Q143 82 117 38Z',
 'M61 38Q33 91 44 166L52 240Q35 276 45 325L64 410L59 437Q77 451 100 438L102 414Q120 337 120 299Q127 263 114 240L131 144Q145 83 117 38Z'
];
export function outlineFor(view){return outlines[view]||outlines[1];}
const text=(x,y,s,size=7,color='#677281',anchor='start')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${color}">${escapeXML(s)}</text>`;
export function diagramBackground(view,side='derecho',imageHref=consensusAsset(templateFile(side))){
 const r=templateRegion(side,view),h=viewHeight(view);
 return `<svg x="0" y="0" width="200" height="${h}" viewBox="${r.x} ${r.y} ${r.w} ${r.h}" preserveAspectRatio="none"><image href="${escapeXML(imageHref)}" width="566" height="800"/></svg>`;
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
const lineMarkup=(segments,width=1)=>segments.map(([a,b])=>`<path d="M${a[0]},${a[1]}L${b[0]},${b[1]}" stroke="#000000" stroke-width="${width}" fill="none"/>`).join('');
function crossMarks(points,surgery){return lineMarkup(perpendicularMarks(points,{crosses:!surgery}));}

const wrap=(s,n=16)=>String(s||'').match(new RegExp(`.{1,${n}}(?:\\s|$)|.{1,${n}}`,'g'))?.map(x=>x.trim())||[];
export function markSVG(e,selected=false,{ink,annotations=true}={}){
 if(!e?.points?.length)return '';
 const [x,y]=e.points[0],color=ink||MAP_CONDITIONS[e.condition]?.color||'#697586';let shape='';
 if(e.type==='perforator')shape=`<circle cx="${x}" cy="${y}" r="6" fill="white" stroke="${color}" stroke-width="2"/>`;
 else if(e.type==='gulf')shape=`<path d="M${x-13},${y}H${x+13}" stroke="${color}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="6" fill="${color}"/>`;
 else if(e.type==='oval')shape=`<ellipse cx="${x}" cy="${y}" rx="11" ry="7" fill="none" stroke="${color}" stroke-width="1.7"/>`;
 else if(e.type==='ulcer'){
  if(e.points.length>=3){shape=`<path d="${mapPath(e.points,'subfascial')}Z" fill="white" stroke="#000000" stroke-width="1.2"/>`+lineMarkup(contourHatch(e.points),.7);}
  else shape=`<path d="M${x-7},${y}H${x+7}M${x},${y-7}V${y+7}" stroke="#697586" stroke-dasharray="2 2" fill="none"/>`;
 }
 else if(e.type==='surgery'){shape=`<path d="${mapPath(e.points,'subfascial')}" stroke="#000000" stroke-width="2" fill="none"/>`+crossMarks(e.points,true);}
 else if(e.type==='vessel'){
  const d=mapPath(e.points,e.plane),dash=e.plane==='hypoplasia'?'8 5':e.plane==='aplasia'||['ablated','aplastic'].includes(e.condition)?'0 6':'';
  if(selected)shape+=`<path d="${d}" stroke="#caa8b6" stroke-width="8" opacity=".35" fill="none"/>`;
  if(e.wall||e.plane==='wall')shape+=`<path d="${d}" fill="none" stroke="#000000" stroke-width="5.4"/>`;
  shape+=`<path d="${d}" fill="none" stroke="${color}" stroke-width="${e.lineWidth===6?6:3}" stroke-linecap="round" stroke-dasharray="${dash}"/>`;
  if(e.synechiae||e.plane==='synechiae')shape+=crossMarks(e.points,false);
  if(e.surgery||e.plane==='surgery')shape+=crossMarks(e.points,true);
 }
 if(!annotations)return shape;
 const annotationColor=['nonvascular','aplastic'].includes(e.condition)||['surgery','ulcer'].includes(e.type)?'#000000':color;
 const inside=e.type==='vessel'||e.type==='gulf',junction=e.view>=3,tx=Number.isFinite(e.labelX)?e.labelX:inside?86:139,ty=Number.isFinite(e.labelY)?e.labelY:Math.min(y+10,viewHeight(e.view)-42),lineHeight=junction?15:10,fontSize=junction?12:9;
 const rows=inside?[e.label,e.diameter?`${e.diameter} mm`:'',e.reflux?`${e.reflux} s`:'',e.length?`L ${e.length} cm`:'']:[e.label,e.diameter?`${e.diameter} mm`:'',e.type==='ulcer'&&e.length?`${e.length}${e.ulcerWidth?' × '+e.ulcerWidth:''} cm`:'',e.height?`${e.height} cm`:'',e.height?e.reference:''];
 const lines=rows.filter(Boolean).flatMap(v=>wrap(v,inside?14:12));
 let annotation=`<text x="${tx}" y="${ty}" class="map-annotation" font-size="${fontSize}" stroke="white" stroke-width="1.6" paint-order="stroke" stroke-linejoin="round" text-anchor="${inside&&!junction?'middle':'start'}" fill="${annotationColor}">${lines.map((v,i)=>`<tspan x="${tx}" dy="${i?lineHeight:0}">${escapeXML(v)}</tspan>`).join('')}</text>`;
 if(!inside)annotation=`<path d="M${x+6},${y}L135,${ty-3}" fill="none" stroke="${color}" stroke-width=".6"/>`+annotation;
 if(inside&&e.height){const hx=junction?tx:145,hy=junction?ty+lines.length*lineHeight+7:y+10;annotation+=text(hx,hy,`${e.height} cm`,junction?11:7,color)+wrap(e.reference||'Referencia pendiente',junction?20:13).map((line,i)=>text(hx,hy+(junction?13:9)*(i+1),line,junction?9:6.5,color)).join('');}
 return shape+annotation;
}
export function serializeMap(entries,meta){return JSON.stringify({schemaVersion:3,educativo:true,meta:{...meta,views:[0,1,2]},entries},null,2);}
export function parseMap(value){
 const data=typeof value==='string'?JSON.parse(value):value;
 if(!data||!Array.isArray(data.entries)||!data.meta||typeof data.meta!=='object'||Array.isArray(data.meta)||data.entries.length>160)throw new Error('El archivo no contiene una cartografía de práctica válida.');
 const types=['vessel','perforator','gulf','oval','ulcer','annotation','surgery'];const seen=new Set();
 const entries=data.entries.map((e,i)=>{
  if(!e||!types.includes(e.type)||!Number.isInteger(e.view)||e.view<0||e.view>4||!Array.isArray(e.points)||!e.points.length||e.points.length>200)throw new Error(`Elemento ${i+1}: estructura o cara no válida.`);
  const points=e.points.map(p=>{if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)||p[0]<0||p[0]>200||p[1]<0||p[1]>viewHeight(e.view))throw new Error(`Elemento ${i+1}: coordenadas fuera de la plantilla.`);return [...p];});
  if(['vessel','surgery'].includes(e.type)&&points.length<2)throw new Error('Un trayecto necesita dos puntos.');
  const id=String(e.id||`import-${i}`).slice(0,80);if(seen.has(id))throw new Error('Hay identificadores repetidos.');seen.add(id);
  const clean={id,type:e.type,view:e.view,points};
  for(const key of ['label','condition','plane','diameter','reflux','length','height','reference','region','flowRole','ulcerWidth'])clean[key]=String(e[key]??'').slice(0,key==='label'||key==='reference'?70:35);
  for(const key of ['wall','synechiae','surgery'])clean[key]=e[key]===true;
  clean.lineWidth=e.lineWidth===6?6:3;
  for(const key of ['labelX','labelY'])if(Number.isFinite(e[key])&&e[key]>=0&&e[key]<=(key==='labelX'?200:viewHeight(e.view)))clean[key]=e[key];
  return clean;
 });
 const meta={...DEFAULT_META};for(const k of Object.keys(DEFAULT_META)){if(k!=='views')meta[k]=String(data.meta[k]??DEFAULT_META[k]).slice(0,['notes','limitations'].includes(k)?2500:200);}
 if(!['derecho','izquierdo'].includes(meta.side))throw new Error('La lateralidad del archivo no es válida.');
 return {entries,meta};
}
export function officialMapMarkup(entries,meta,{imageHref=consensusAsset(templateFile(meta.side)),showLabels=true}={}){
 return `<image href="${escapeXML(imageHref)}" width="566" height="800"/>`+WORK_VIEWS.map((name,view)=>{const r=templateRegion(meta.side,view);return `<svg x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" viewBox="0 0 200 ${viewHeight(view)}" preserveAspectRatio="none" overflow="visible" data-map-view="${view}"><title>${escapeXML(name)}</title>${entries.filter(e=>e.view===view).map(e=>{const mark=markSVG(e);return showLabels?mark:mark.replace(/<text[\s\S]*?<\/text>/g,'');}).join('')}</svg>`;}).join('');
}
export function createMapSVG(entries,meta,{includeReport=true,imageHref}={}){
 const report=includeReport?[`Indicación: ${meta.indication||'pendiente'}`,`Posición: ${meta.position||'pendiente'} · Maniobra: ${meta.maneuver||'pendiente'}`,`Informe: ${meta.notes||'sin completar'}`,`Limitaciones: ${meta.limitations||'no consignadas'}`].flatMap(s=>wrap(s,110)):[];
 const h=includeReport?895+report.length*12:885;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${Math.round(h*1200/606)}" viewBox="0 0 606 ${h}"><title>Mapa ${escapeXML(meta.side)}: ANTEROEXTERNA, ANTEROINTERNA, POSTERIOR y ampliaciones</title><rect width="606" height="${h}" fill="white"/><g font-family="Arial,sans-serif">${text(20,17,'IMF · PRÁCTICA SOBRE PLANTILLA MERIT',10,'#a80f32')}${text(20,31,`Caso ${meta.code} · Miembro ${meta.side} · EJERCICIO FICTICIO`,9)}<g transform="translate(20 42)">${officialMapMarkup(entries,meta,{imageHref})}</g>${text(20,858,'Base: plantilla MERIT proporcionada · Convenciones: Bottini et al., 2023. Anotaciones de práctica.',8)}${text(20,874,'Diámetros mm · Longitudes/alturas cm · Mapa complementario al informe dúplex.',8)}${report.map((s,i)=>text(20,895+i*12,s,8.5)).join('')}</g></svg>`;
}

export async function embeddedTemplate(side){
 const response=await fetch(consensusAsset(templateFile(side)));if(!response.ok)throw new Error('No se pudo cargar la plantilla original. Conserva el JSON y vuelve a intentar.');
 const blob=await response.blob();return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('No se pudo incorporar la plantilla.'));reader.readAsDataURL(blob);});
}

export const EXAMPLE_MAP={meta:{...DEFAULT_META,code:'SIM-GSV-02',position:'Bipedestación con apoyo; miembro sin carga',maneuver:'Aumento distal y liberación en los segmentos indicados; SFJ evaluada con maniobra documentada',indication:'Caso ficticio: describir extensión segmentaria de reflujo de GSV y conexión con tributaria',notes:'SFJ competente de 7.1 mm, 2 cm por debajo del pliegue inguinal. SPJ competente de 5.0 mm, 3 cm por encima del pliegue de rodilla. Las venas femoral y poplítea de las ampliaciones se describen competentes en esta viñeta. GSV proximal competente; reflujo de 0.85 s en segmento de muslo entre 30 y 12 cm por encima del pliegue de rodilla, con longitud de 18 cm; GSV distal competente. Diámetro GSV de muslo 6.2 mm y pierna 3.2 mm en transversal con pared. Tributaria epifascial incompetente con flujo retrógrado de 1.0 s; reentrada por PV de 3.0 mm a 18 cm desde planta del pie. SSV 3.0 mm sin reflujo anormal en los segmentos evaluados. El sistema profundo fue evaluado según el protocolo del caso y se describe sin alteraciones en esta viñeta.',limitations:'Datos inventados para practicar códigos. Las coordenadas no equivalen a distancias medidas ni reconstruyen un paciente.'},entries:[
 {id:'gsv-prox',view:1,type:'vessel',points:[[104,58],[106,96]],condition:'competent',plane:'subfascial',label:'GSV proximal',diameter:'4.2',region:'muslo'},
 {id:'gsv-ref',view:1,type:'vessel',points:[[106,96],[105,147],[96,211]],condition:'reflux',plane:'subfascial',label:'GSV segmento',diameter:'6.2',reflux:'0.85',length:'18',height:'30',reference:'pliegue de rodilla; encima',region:'muslo'},
 {id:'gsv-dist',view:1,type:'vessel',points:[[96,211],[90,282],[77,352],[73,420]],condition:'competent',plane:'subfascial',label:'GSV distal',diameter:'3.2',labelY:365,region:'pierna'},
 {id:'gsv-end-note',view:1,type:'annotation',points:[[105,211]],condition:'',plane:'subfascial',label:'Fin reflujo',height:'12',reference:'pliegue rodilla; encima',region:'muslo',labelX:145,labelY:221},
 {id:'trib',view:1,type:'vessel',points:[[105,147],[70,206],[66,267],[76,317]],condition:'reflux',plane:'epifascial',label:'Tributaria',diameter:'4.1',reflux:'1.00',region:'pierna'},
 {id:'pv',view:1,type:'perforator',points:[[76,317]],condition:'competent',plane:'subfascial',label:'PV reentrada',diameter:'3.0',height:'18',reference:'planta del pie',region:'pierna',flowRole:'reentrada'},
 {id:'femoral-context',view:3,type:'vessel',points:[[75,25],[75,170]],condition:'competent',plane:'subfascial',label:'Femoral',lineWidth:6,labelX:32,labelY:45},
 {id:'sfj-detail',view:3,type:'vessel',points:[[75,85],[115,110],[115,170]],condition:'competent',plane:'subfascial',label:'SFJ',diameter:'7.1',height:'2',reference:'pliegue inguinal; debajo',region:'union',labelX:120,labelY:90},
 {id:'popliteal-context',view:4,type:'vessel',points:[[75,25],[75,170]],condition:'competent',plane:'subfascial',label:'Poplitea',lineWidth:6,labelX:32,labelY:45},
 {id:'spj-detail',view:4,type:'vessel',points:[[75,85],[115,110],[115,170]],condition:'competent',plane:'subfascial',label:'SPJ',diameter:'5.0',height:'3',reference:'pliegue rodilla; encima',region:'union',labelX:120,labelY:90},
 {id:'ssv',view:2,type:'vessel',points:[[88,240],[87,294],[78,354],[72,420]],condition:'competent',plane:'subfascial',label:'SSV',diameter:'3.0',region:'pierna'}
]};
