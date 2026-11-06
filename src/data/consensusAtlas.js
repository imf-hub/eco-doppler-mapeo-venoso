import {CONSENSUS_NOMENCLATURE} from './consensusStandard.js';
// Source assets supplied by the project owner on 6 November 2026.
export const CONSENSUS_FOLDER='https://drive.google.com/drive/folders/1lXUTkjYLXQzfgql9SUTZpMqaRKkvTWiF';
export const CONSENSUS_PDF='https://drive.google.com/file/d/1wgNyZX2CVucJ_DRirduj29OPn2DEddKX/view';
export const CONSENSUS_SPANISH='https://drive.google.com/file/d/1uFGKwxI_GxgaleVFBGvoZLJNZkSS4KBC/view';
export const consensusAsset=file=>typeof document==='undefined'?'media/consenso/'+file:new URL('media/consenso/'+file,document.baseURI).href;
export const TEMPLATE_SIZE={width:566,height:800};
// Semantic views remain stable; the left form reverses their printed order.
export const TEMPLATE_REGIONS={
 derecho:[{x:0,y:100,w:200,h:470},{x:150,y:100,w:200,h:470},{x:300,y:100,w:200,h:470},{x:242,y:46,w:112,h:112},{x:459,y:300,w:100,h:100}],
 izquierdo:[{x:366,y:100,w:200,h:470},{x:225,y:100,w:200,h:470},{x:50,y:100,w:200,h:470},{x:210,y:46,w:112,h:112},{x:5,y:301,w:100,h:100}]
};
export const WORK_VIEWS=['Anteroexterna','Anterointerna','Posterior','Ampliación inguinal','Ampliación poplítea'];
export const viewHeight=view=>view>=3?200:470;
export const templateFile=(side,extension='png')=>'plantilla-'+(side==='izquierdo'?'izquierda':'derecha')+'.'+extension;
export const templateRegion=(side,view)=>TEMPLATE_REGIONS[side==='izquierdo'?'izquierdo':'derecho'][view];
export const consensusFigures={
 colorsES:{file:'es-colores-trazos.jpg',title:'Colores del mapa: tabla original en español',locator:'PDF español proporcionado · p. 3 · sección 2.1',es:'Correspondencia: artículo original, tabla V, p. 54',alt:'Tabla original en español: azul competente, rojo incompetente, gris ablacionada, negro trombosada, verde linfoganglionar y amarillo no vascular no ganglionar.',crop:[250,420,1000,520],spanish:true},
 strokesES:{file:'es-colores-trazos.jpg',title:'Trazos: tabla original en español',locator:'PDF español proporcionado · p. 3 · sección 2.2',es:'La última celda continúa en la página 4.',alt:'Trazos originales: recta continua subfascial, ondulante epifascial, segmentaria hipoplasia y punteada aplasia o ablación.',crop:[250,1400,1000,400],spanish:true},
 strokeNotesES:{file:'es-trazos-notas.jpg',title:'Bridas, engrosamiento y notas del consenso',locator:'PDF español proporcionado · p. 4 · continuación de 2.2',es:'Incluye la aclaración original sobre plano fascial y morfología.',alt:'Continuación original del código de trazos con X negras, bordes negros y notas sobre el significado de líneas y cambios tras trombosis o ablación.',crop:[245,165,1005,1260],spanish:true},
 shapesES:{file:'es-figuras-nomenclatura.jpg',title:'Figuras geométricas: tabla original en español',locator:'PDF español proporcionado · p. 6 · sección 2.3',es:'Correspondencia: artículo original, tabla V, p. 54',alt:'Figuras originales: circunferencia sin relleno, círculo relleno en trayecto, óvalo, paralelas perpendiculares y úlcera con cuadriculado y contorno.',crop:[250,315,1000,535],spanish:true},

 templates:{file:'articulo-figuras-2-3.jpg',title:'Plantilla y nueve ejemplos de representación de GSV',locator:'Artículo original · p. 52 · figuras 2 y 3',es:'PDF español · figuras 1 y 2 · pp. 2 y 5',alt:'Página original con tres caras, ampliaciones inguinal y poplítea y ejemplos de GSV competente, incompetente, hipoplásica, aplásica, ablacionada, operada, trombosada y con alteraciones parietales.'},
 symbols:{file:'articulo-tabla-v.jpg',title:'Código gráfico del consenso',locator:'Artículo original · p. 54 · tabla V',es:'PDF español · pp. 3–6',alt:'Tabla V original: colores, trazos y figuras geométricas con sus significados y notas sobre el plano fascial.'},
 measures:{file:'articulo-tabla-vi-figura-4.jpg',title:'Nomenclatura y ubicación de las medidas',locator:'Artículo original · p. 55 · tabla VI y figura 4',es:'PDF español · pp. 6–8 · figura 3',alt:'Tabla VI original de siglas en inglés, español y portugués, y figura 4 con diámetros, longitud de reflujo y alturas referidas a pliegue de rodilla o planta del pie.'},
 inguinal:{file:'articulo-ampliaciones-ingle.jpg',title:'Ampliación inguinal',locator:'Artículo original · p. 56 · figura 5',es:'PDF español · pp. 9–11 · figuras 4–6',alt:'Figura 5 original con variantes funcionales de las válvulas terminal y preterminal, distancia al pliegue inguinal y afluentes pélvicos o recidiva.'},
 popliteal:{file:'articulo-ampliaciones-poplitea.jpg',title:'Ampliación poplítea',locator:'Artículo original · p. 57 · figura 6',es:'PDF español · pp. 11–12 · figuras 7–9',alt:'Figura 6 original con desembocaduras variables de SSV, altura de SPJ y conexiones de venas intersafenas, ciática y perforante poplítea.'}
};
export const consensusChapters=[
 {id:'plantillas',title:'Reconoce la plantilla',lead:'Elige el miembro y ubica sus tres caras antes de dibujar.',source:'Plantillas · español pp. 1–2; original pp. 51–52'},
 {id:'simbolos',title:'Aprende el código gráfico',lead:'Color, trazo y figura comunican datos diferentes.',source:'Representación gráfica · español pp. 3–6; original pp. 53–54'},
 {id:'nomenclatura',title:'Nombra cada estructura',lead:'Lee las siglas del consenso y su equivalencia en español.',source:'Nomenclatura · español pp. 6–7; original tabla VI, p. 55'},
 {id:'mediciones',title:'Coloca las medidas',lead:'Distingue diámetro, longitud y altura con referencia anatómica.',source:'Mediciones · español pp. 7–8; original figura 4, p. 55'},
 {id:'ampliaciones',title:'Detalla las uniones',lead:'Amplía la ingle o el hueco poplíteo cuando las tres caras no basten.',source:'Visiones ampliadas · español pp. 9–12; original figuras 5–6, pp. 56–57'},
 {id:'construccion',title:'Construye el mapa',lead:'Traslada los datos demostrados a la plantilla proporcionada.',source:'Integración educativa de las secciones 1–4 del consenso'},
 {id:'informe',title:'Une mapa e informe',lead:'Comprueba que imágenes, dibujo y descripción conservan el mismo estudio.',source:'Alcance y limitaciones · español pp. 1 y 7–8; original pp. 51 y 53'}
];
export const consensusTermIds=CONSENSUS_NOMENCLATURE.map(t=>t.term);
export const buildingStages=[
 ['Identifica','Miembro derecho, tres caras y ampliaciones. Elige lado antes de registrar datos.'],
 ['Dibuja los ejes','GSV y SSV se representan aun cuando sean competentes. En este caso sus segmentos se evaluaron.'],
 ['Delimita el reflujo','Solo el segmento demostrado se representa en rojo. La parte competente conserva azul.'],
 ['Conecta el circuito','Añade la tributaria epifascial y la perforante de reentrada demostradas. La ondulación representa plano.'],
 ['Anota las medidas','Diámetros en mm; longitud segmentaria y alturas en cm. Toda altura lleva referencia.'],
 ['Relaciona el informe','El texto identifica posición, maniobras, extensión y límites del caso. Coteja los tres registros.']
];
export function buildingStageEntries(entries,stage){
 if(stage===0)return [];
 if(stage<=2){const ids=new Set(stage===1?['gsv-prox','gsv-dist','ssv']:['gsv-prox','gsv-ref','gsv-dist','ssv']);return entries.filter(e=>ids.has(e.id));}
 return entries.filter(e=>stage>=4||e.type!=='annotation');
}
