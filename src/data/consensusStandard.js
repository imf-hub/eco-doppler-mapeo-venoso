// Semantic codes: Bottini et al., 2023, table V / supplied Spanish PDF, pp. 3–6.
// RGB values read from the stroke operators in page 3 of that specific Spanish PDF.
// The consensus prescribes color names, not universal digital color coordinates.
export const CONSENSUS_PALETTE={blue:'#0000ff',red:'#ff0000',grey:'#999999',black:'#000000',green:'#6aa84f',yellow:'#ffff00'};
const P=CONSENSUS_PALETTE;
export const CONSENSUS_CONDITIONS={
 competent:{name:'Competente',color:P.blue},reflux:{name:'Incompetente',color:P.red},
 ablated:{name:'Ablacionada',color:P.grey},thrombosed:{name:'Trombosada',color:P.black},
 lymph:{name:'Linfoganglionar',color:P.green},nonvascular:{name:'No vascular no ganglionar',color:P.yellow},
 aplastic:{name:'Aplasia documentada',color:P.blue}
};
export const CONSENSUS_SYMBOLS=[
 {id:'competent',label:'Vena competente',type:'color',color:P.blue,glyph:'line',page:3,description:'Azul. El color representa competencia en el mapa.'},
 {id:'reflux',label:'Vena incompetente',type:'color',color:P.red,glyph:'line',page:3,description:'Rojo. El color representa incompetencia en el mapa.'},
 {id:'ablated',label:'Vena ablacionada',type:'color',color:P.grey,glyph:'dotted',page:3,description:'Gris. En el trayecto ablacionado se combina con línea punteada.'},
 {id:'thrombosed',label:'Vena trombosada',type:'color',color:P.black,glyph:'line',page:3,description:'Negro para la condición trombosada. El diagnóstico requiere la evaluación dúplex.'},
 {id:'lymph',label:'Estructuras linfoganglionares',type:'color',color:P.green,glyph:'oval',page:3,description:'Verde para estructuras linfoganglionares relacionadas con el territorio representado.'},
 {id:'nonvascular',label:'Estructuras no vasculares no ganglionares',type:'color',color:P.yellow,glyph:'oval',page:3,description:'Amarillo: quiste de Baker, nervio y otras estructuras no vasculares no ganglionares.'},
 {id:'subfascial',label:'Trayecto venoso subfascial',type:'stroke',color:P.blue,glyph:'line',page:3,description:'Línea recta continua.'},
 {id:'epifascial',label:'Trayecto venoso epifascial',type:'stroke',color:P.red,glyph:'wavy',page:3,description:'Línea ondulante. Representa el plano respecto de la fascia; no la morfología real del vaso. Véase también la nota de p. 4.'},
 {id:'hypoplasia',label:'Trayecto venoso subfascial hipoplásico',type:'stroke',color:P.blue,glyph:'dashed',page:3,description:'Línea recta segmentaria.'},
 {id:'aplasia',label:'Trayecto venoso subfascial aplásico o ablacionado',type:'stroke',color:P.blue,glyph:'dotted',page:3,description:'Línea recta punteada. Aplasia y ablación se distinguen con el color, la identificación y el contexto documentado.'},
 {id:'synechiae',label:'Bridas / sinequias',type:'stroke',color:P.red,glyph:'crosses',page:4,description:'X negras superpuestas al trayecto subfascial insuficiente con bridas tras trombosis superficial o fracaso de ablación.'},
 {id:'wall',label:'Engrosamiento parietal',type:'stroke',color:P.red,glyph:'outlined',page:4,description:'Fina línea negra sobre los bordes del trayecto subfascial afectado tras trombosis superficial o ablación.'},
 {id:'perforator',label:'Vena perforante',type:'shape',color:P.red,glyph:'circle',page:6,description:'Circunferencia sin relleno.'},
 {id:'gulf',label:'Golfo venoso / trayecto subfascial ondulante',type:'shape',color:P.red,glyph:'filled-circle',page:6,description:'Círculo en un trayecto, con relleno.'},
 {id:'oval',label:'Otras estructuras no vasculares',type:'shape',color:P.yellow,glyph:'oval',page:6,description:'Óvalo. La tabla V del artículo lo representa sin relleno; el color identifica la clase de estructura.'},
 {id:'surgery',label:'Safenectomía / crossectomía',type:'shape',color:P.black,glyph:'ticks',page:6,description:'Trazo lineal con paralelas perpendiculares. Es una marca quirúrgica, no una clasificación de trombosis.'},
 {id:'ulcer',label:'Úlcera venosa',type:'shape',color:P.black,glyph:'hatch',page:6,description:'Imagen cuadriculada de la morfología y tamaño de la úlcera; negro, sin colorear según el fondo. Véase también p. 3.'}
];
// Article table VI: retained separately from the 2024 ASV terminology update.
export const CONSENSUS_NOMENCLATURE=[
 ['GSV','Great saphenous vein','Vena safena mayor','Veia safena magna'],
 ['SSV','Small saphenous vein','Vena safena menor','Veia safena parva'],
 ['AAGSV','Anterior accessory saphenous vein','Vena safena accesoria anterior de muslo','Veia safena acessória anterior'],
 ['PAGSV','Posterior accessory saphenous vein','Vena safena accesoria posterior de muslo','Veia safena acessória posterior'],
 ['SFJ','Saphenous femoral junction','Union safeno femoral','Junção safeno femoral'],
 ['SPJ','Saphenous popliteal junction','Union safeno poplitea','Junção safeno poplítea'],
 ['PV','Perforating vein','Vena perforante','Veia perfurante'],
 ['PPV','Popliteal perforating vein','Vena perforante poplitea','Veia perfurante poplítea'],
 ['GPV','Gluteal perforating vein','Vena perforante glútea','Veia perfurante glútea'],
 ['EPV','External pudendal vein','Vena pudenda externa','Veia pudenda externa'],
 ['SCI','Superficial circumflex iliac vein','Vena circunfleja ilíaca superficial','Veia circunflexa ilíaca superficial'],
 ['SEPi','Superficial epigastric vein','Vena epigástrica superficial','Veia epigástrica superficial'],
 ['CE SSV','Cranial extension of the small saphenous vein','Extensión craneal de la vena safena menor','Extensão cranial da safena parva'],
 ['ASSV','Superficial accessory vein of the small saphenous vein','Vena accesoria superficial de la vena safena menor','Veia acessória superficial da veia safena parva'],
 ['IV','Intersaphenous veins','Venas intersafenas','Veias intersafênicas'],
 ['LMV','Lateral marginal vein','Vena marginal lateral','Veia marginal lateral'],
 ['CiV','Sciatic vein','Vena ciática','Veia ciática']
].map(([term,english,spanish,portuguese])=>({term,english,spanish,portuguese}));
export const ULCER_SAMPLE=[[35,110],[47,104],[62,110],[77,106],[86,117],[82,133],[66,139],[49,134],[34,137],[30,126]];
export function consensusSymbolEntry(s){
 const type=s.glyph==='circle'?'perforator':s.glyph==='filled-circle'?'gulf':s.glyph==='oval'?'oval':s.glyph==='hatch'?'ulcer':s.glyph==='ticks'?'surgery':'vessel';
 return {id:'symbol-'+s.id,type,view:1,points:type==='ulcer'?ULCER_SAMPLE:['perforator','gulf','oval'].includes(type)?[[70,122]]:[[30,122],[115,122]],condition:s.id==='lymph'?'lymph':['nonvascular','oval'].includes(s.id)?'nonvascular':s.id==='aplasia'?'aplastic':['competent','hypoplasia','subfascial'].includes(s.id)?'competent':s.id==='thrombosed'?'thrombosed':s.id==='ablated'?'ablated':type==='surgery'?'':'reflux',plane:s.glyph==='wavy'?'epifascial':s.glyph==='dotted'?'aplasia':s.glyph==='dashed'?'hypoplasia':'subfascial',wall:s.glyph==='outlined',synechiae:s.glyph==='crosses',label:''};
}
