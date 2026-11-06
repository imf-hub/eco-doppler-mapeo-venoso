import {validContour} from './cartographicGeometry.js';
export const DRAW_TOOLS={
 vessel:{label:'Trayecto',finish:'Terminar trayecto',minimum:2,instruction:'Marca el inicio y sigue el trayecto con varios puntos. Después pulsa Terminar trayecto.'},
 perforator:{label:'Perforante',finish:'Confirmar perforante',minimum:1,point:true,instruction:'Un clic coloca una circunferencia sin relleno. Elige su condición y pulsa Confirmar perforante. Otro clic recoloca el borrador.'},
 gulf:{label:'Golfo',finish:'Confirmar golfo',minimum:1,point:true,instruction:'Un clic coloca un círculo relleno sobre una línea. Después confirma el golfo.'},
 oval:{label:'Estructura',finish:'Confirmar estructura',minimum:1,point:true,instruction:'Un clic coloca un óvalo. Selecciona la clase de estructura y confirma.'},
 annotation:{label:'Nota',finish:'Confirmar nota',minimum:1,point:true,instruction:'Un clic ubica la nota. Confirma y edita su texto.'},
 surgery:{label:'Cirugía',finish:'Confirmar marca quirúrgica',minimum:2,instruction:'Marca dos extremos para la línea con paralelas perpendiculares. Después confirma.'},
 ulcer:{label:'Úlcera',finish:'Cerrar contorno',minimum:3,instruction:'Rodea la úlcera con tres o más puntos sin cruzar el contorno. Después pulsa Cerrar contorno.'}
};
export function appendDraft(tool,points,point){
 if(!DRAW_TOOLS[tool]||!point.every(Number.isFinite))return points;
 if(DRAW_TOOLS[tool].point)return [[...point]];
 if(points.length>=200||points.some(p=>Math.hypot(p[0]-point[0],p[1]-point[1])<.5))return points;
 return [...points,[...point]];
}
export function draftProblem(tool,points,condition){
 const spec=DRAW_TOOLS[tool];if(!spec)return 'Selecciona un elemento del mapa para editarlo o borrarlo.';
 if(points.length<spec.minimum)return spec.point?'Haz clic en la plantilla para ubicar el símbolo.':`Faltan ${spec.minimum-points.length} puntos distintos para completar la figura.`;
 if(['vessel','perforator','gulf','oval'].includes(tool)&&!condition)return 'Selecciona la condición demostrada antes de confirmar.';
 if(tool==='ulcer'&&!validContour(points))return 'El contorno debe tener área y no cruzarse. Deshaz el último punto y vuelve a marcarlo.';
 return '';
}
function segmentDistance(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l)):0;return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);}
function inside(p,points){let yes=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
export function markDistance(entry,point){
 const points=entry.points,[x,y]=points[0],r=Math.hypot(point[0]-x,point[1]-y);
 if(['perforator','gulf'].includes(entry.type))return Math.max(0,r-7);
 if(entry.type==='oval')return Math.max(0,(Math.hypot((point[0]-x)/11,(point[1]-y)/7)-1)*7);
 if(entry.type==='annotation')return r;
 if(entry.type==='ulcer'&&inside(point,points))return 0;
 let distance=Infinity;for(let i=1;i<points.length;i++)distance=Math.min(distance,segmentDistance(point,points[i-1],points[i]));
 if(entry.type==='ulcer')distance=Math.min(distance,segmentDistance(point,points.at(-1),points[0]));
 return Math.max(0,distance-(entry.plane==='epifascial'?5:2));
}
export function pickMark(entries,view,point,tolerance){
 return entries.filter(e=>e.view===view).map((entry,i)=>({entry,d:markDistance(entry,point),i})).filter(x=>x.d<=tolerance).sort((a,b)=>a.d-b.d||b.i-a.i)[0]?.entry||null;
}
export function translatePoints(points,dx,dy,height){
 const x=Math.max(-Math.min(...points.map(p=>p[0])),Math.min(dx,200-Math.max(...points.map(p=>p[0]))));
 const y=Math.max(-Math.min(...points.map(p=>p[1])),Math.min(dy,height-Math.max(...points.map(p=>p[1]))));
 return points.map(p=>[Math.round((p[0]+x)*10)/10,Math.round((p[1]+y)*10)/10]);
}
