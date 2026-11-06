import {glossarySpecs} from './glossarySpecs.js';
import {glossaryContent} from './glossaryContent.js';

// A teaching order, separate from an alphabetical dictionary or the advanced simulator.
export const conceptChapters=[
 {id:'sonido',title:'Sonido: empieza por la onda',groups:[
  {title:'Qué se propaga',terms:['sonido','ultrasonido','velocidad-propagacion']},
  {title:'Cómo describir una onda',terms:['frecuencia','periodo','longitud-de-onda','amplitud']},
  {title:'Qué ocurre en los tejidos',terms:['impedancia-acustica','eco','reflexion','refraccion','dispersion','absorcion','atenuacion']}]},
 {id:'transductor',title:'Del transductor al haz',groups:[
  {title:'Producir y recibir sonido',terms:['piezoelectricidad','arreglo-lineal','acoplamiento','formacion-haz']},
  {title:'Comprender el pulso y el detalle',terms:['pulso','duracion-pulso','longitud-espacial-pulso','ciclo-trabajo','resolucion-axial','resolucion-lateral','resolucion-elevacional']},
  {title:'Enfocar el haz',terms:['campo-cercano','foco']}]},
 {id:'imagen',title:'Construir y ajustar la imagen',groups:[
  {title:'Modos, profundidad y aumento',terms:['modo-b','modo-m','profundidad','zoom']},
  {title:'Ganancias y contraste',terms:['ganancia','tgc','rango-dinamico']},
  {title:'Actualizar la imagen',terms:['tasa-cuadros','densidad-lineas']}]},
 {id:'doppler',title:'Doppler: del movimiento a la señal',groups:[
  {title:'Comprender el efecto Doppler',terms:['efecto-doppler','angulo-doppler','correccion-angular']},
  {title:'Conocer sus modos',terms:['doppler-color','power-doppler','doppler-pulsado','doppler-continuo','duplex-triplex']},
  {title:'Leer dirección y espectro',terms:['direccion-flujo','mapa-color','linea-base','inversion','ensanchamiento-espectral','volumen-muestra']},
  {title:'Ajustar la presentación y el muestreo',terms:['ganancia-color','prf','prp','escala-doppler','limite-nyquist','aliasing','filtro-pared','clutter','persistencia','caja-color','orientacion-haz']}]},
 {id:'artefactos',title:'Reconocer los artefactos',groups:[
  {title:'Separar imagen y estructura',terms:['artefacto-movimiento','sombra-acustica','refuerzo-posterior','reverberacion','imagen-espejo','lobulos-laterales','espesor-corte','anisotropia']}]},
 {id:'vena',title:'Aplicarlo a la exploración venosa',groups:[
  {title:'Vena, válvulas y maniobras',terms:['compresibilidad','valvula-venosa','fasicidad-respiratoria','pulsatilidad','aumento-distal']},
  {title:'Reconocer y registrar el reflujo',terms:['reflujo-venoso','duracion-reflujo']}]},
 {id:'seguridad',title:'Utilizar el ultrasonido de forma prudente',groups:[
  {title:'Emisión e indicadores del equipo',terms:['potencia-acustica','alara','indice-termico','indice-mecanico']} ]}
];
export const courseTermOrder=conceptChapters.flatMap(c=>c.groups.flatMap(g=>g.terms));
export const courseTerms=Object.fromEntries(glossarySpecs.map(t=>[t.id,{...t,...glossaryContent[t.id]}]));
export const courseLocation=Object.fromEntries(conceptChapters.flatMap((c,ci)=>c.groups.flatMap((g,gi)=>g.terms.map((id,ti)=>[id,{chapter:c,group:g,number:`${ci+1}.${gi+1}.${ti+1}`}]))));
export const normalizeConceptSearch=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const synonyms={ganancia:'ganancias ganancia modo b brillo amplificacion',tgc:'ganancias profundas compensacion tiempo', 'ganancia-color':'ganancias doppler color', 'efecto-doppler':'que es doppler principio doppler'};
export function findCourseTerms(query){
 const words=normalizeConceptSearch(query).split(/\s+/).filter(Boolean);
 return courseTermOrder.filter(id=>{const t=courseTerms[id],text=normalizeConceptSearch([t.title,...t.aliases,t.definition,synonyms[id]||''].join(' '));return words.every(w=>text.includes(w));});
}
export const visualTermAliases={sound:'sonido',echo:'eco',frequency:'frecuencia',resolution:'resolucion-axial',attenuation:'atenuacion',transducer:'piezoelectricidad',bmode:'modo-b',doppler:'efecto-doppler',angle:'angulo-doppler',nyquist:'limite-nyquist',color:'doppler-color',spectral:'doppler-pulsado',power:'power-doppler',gain:'ganancia',colorGain:'ganancia-color',depth:'profundidad',focus:'foco',tgc:'tgc',dynamic:'rango-dinamico',filter:'filtro-pared',persistence:'persistencia',gate:'volumen-muestra',pressure:'compresibilidad',deep:'compresibilidad',valves:'valvula-venosa',reflux:'reflujo-venoso'};
