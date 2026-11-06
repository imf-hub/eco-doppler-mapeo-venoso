import {useId} from 'react';

const P={ink:'#17384b',muted:'#607d8b',red:'#a83e58',teal:'#247f82',blue:'#378ab7',gold:'#c89645',skin:'#e2c7b0',wall:'#90adb5',tissue:'#d3b79f',line:'#c8d6d9',paper:'#fffefa'};
const describe={
 marker:['Rótulos sin correspondencia comprobada','Comprueba marcador, indicador y referencia'],
 pressure:['Presión excesiva para valorar flujo o calibre','Libera presión y recupera la luz'],
 oblique:['Plano oblicuo para el objetivo de adquisición','Recupera el plano que requiere el objetivo'],
 angle:['Haz casi perpendicular al flujo','Orienta el haz sin perder el vaso'],
 'lost-vessel':['Capturas aisladas sin continuidad demostrada','Conserva continuidad con barridos solapados'],
 support:['Carga o equilibrio sin apoyo estable','Apoyo estable y miembro examinado descargado'],
 'supine-reflux':['Supino plano no equivale a reflujo en dependencia','Adapta una posición dependiente y documentada'],
 'no-maneuver':['Conclusión sin maniobra interpretable','Conserva basal, maniobra y respuesta'],
 'wrong-timing':['Cursores sobre la acción provocadora','Cursores sobre el intervalo de flujo observado'],
 'missing-reference':['Distancia sin origen anatómico','Distancia con referencia anatómica explícita'],
 'wrong-side':['Lateralidad que no coincide entre registros','El mismo lado en imagen, mapa e informe'],
 'wrong-code':['Copiar Doppler no codifica la condición del mapa','Separa condición, plano y dirección Doppler'],
 'incomplete-report':['Convertir falta de evaluación en normalidad','Identifica el segmento y documenta su limitación'],
 'missing-context':['Registro sin condiciones recuperables','Contexto identificado y localizable']
};
const clamp=v=>Math.min(1,Math.max(0,Number.isFinite(v)?v:.5));

function Label({x,y,children,size=23,anchor='start',fill=P.ink,weight=600}){const lines=Array.isArray(children)?children:[children];return <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontWeight={weight}>{lines.map((v,i)=><tspan key={i} x={x} dy={i?size*1.3:0}>{v}</tspan>)}</text>;}
function Arrow({x1,y1,x2,y2,id,color=P.gold,dashed=false,width=4}){return <path d={`M${x1} ${y1}L${x2} ${y2}`} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed?'7 7':undefined} markerEnd={`url(#${id})`} strokeLinecap="round"/>;}
function Cross({x,y,size=18}){return <g stroke={P.red} strokeWidth="5" strokeLinecap="round"><path d={`M${x-size} ${y-size}L${x+size} ${y+size}M${x-size} ${y+size}L${x+size} ${y-size}`}/></g>;}
function Tick({x,y,size=20}){return <path d={`M${x-size} ${y}L${x-3} ${y+size*.7}L${x+size} ${y-size*.8}`} stroke={P.teal} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;}
function Probe({x,y,angle=0,scale=1}){return <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}><path d="M-12-80Q-9-111 19-116L51-139" stroke="#7f97a2" strokeWidth="6" fill="none"/><rect x="-19" y="-78" width="38" height="55" rx="10" fill="#adbec6" stroke="#5e7f90" strokeWidth="2"/><path d="M-62-24H62L55 3Q0 12-55 3Z" fill="#eaf0ef" stroke="#5e7f90" strokeWidth="2"/><circle cx="-45" cy="-10" r="5" fill={P.gold}/></g>;}
function Tissue({x=0,y=0,w=500,h=190,children}){return <g transform={`translate(${x} ${y})`}><path d={`M0 15Q${w/2} -14 ${w} 15V${h}H0Z`} fill={P.skin} stroke="#b9a18b" strokeWidth="2"/><path d={`M0 ${h*.45}Q${w/2} ${h*.53} ${w} ${h*.45}`} stroke="#a7b9b1" strokeWidth="7" fill="none"/><path d={`M0 ${h*.49}Q${w/2} ${h*.57} ${w} ${h*.49}V${h}H0Z`} fill={P.tissue} opacity=".45"/>{children}</g>;}
function Screen({x,y,w=270,h=205,side,children}){return <g transform={`translate(${x} ${y})`}><rect width={w} height={h} rx="5" fill="#152e41" stroke="#8fa9b7" strokeWidth="3"/>{side&&<><rect x="12" y="12" width="59" height="31" rx="3" fill="#e5eeee"/><Label x={41} y={34} size={19} anchor="middle">{side}</Label></>}{children}</g>;}
function Leg({x,y,scale=1,path=false}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-49 0Q-78 80-56 152L-58 189Q-65 244-37 287L-31 357Q-41 372-20 379H31Q46 371 25 362L21 354L29 287Q52 239 40 192L35 156Q61 83 34 0" fill="#f3e9dc" stroke="#9eb4b9" strokeWidth="2"/><path d="M-58 189Q-10 201 40 192M-31 357H21" fill="none" stroke="#b6c6c7" strokeWidth="2"/>{path&&<path d="M19 17Q-3 83 5 147L11 240L16 355" fill="none" stroke={P.blue} strokeWidth="7"/>}</g>;}

function Marker({error,id}){return <>
 <Label x={244} y={145} anchor="middle">Transductor</Label><Label x={753} y={145} anchor="middle">Pantalla</Label>
 <g transform="translate(247 286)"><rect x="-103" y="-41" width="206" height="82" rx="23" fill="#d3dfe1" stroke="#76939f" strokeWidth="3"/><rect x="-26" y="-81" width="52" height="120" rx="16" fill="#afc4cb" stroke="#76939f" strokeWidth="2"/><circle cx="-79" cy="-22" r="9" fill={P.gold}/></g>
 <Screen x={622} y={184} w={260} h={202}><circle cx={error?229:29} cy="24" r="9" fill={P.gold}/><path d="M21 78H239M21 150H239" stroke="#8da9b6" strokeWidth="3"/><ellipse cx="130" cy="112" rx="48" ry="24" fill="#071824" stroke="#afc9d5" strokeWidth="4"/></Screen>
 <Arrow x1={346} y1={275} x2={575} y2={275} id={id} color={error?P.red:P.teal} dashed={error}/>{error?<Cross x={462} y={275}/>:<Tick x={464} y={275}/>}
 <Label x={244} y={391} size={21} anchor="middle">Marcador físico</Label><Label x={754} y={423} size={21} anchor="middle">{error?'Rótulos no comprobados':'Correspondencia comprobada'}</Label>
 <Label x={500} y={478} size={18} anchor="middle" fill={P.muted}>La posición del marcador no impone un lado anatómico universal: verifica la convención del laboratorio.</Label>
 </>;}

function Pressure({error,id,phase,distal=false}){return <>
 <Tissue x={113} y={254} w={774} h={160}><ellipse cx="388" cy="95" rx="92" ry={error?9:41} fill="#daf0f1" stroke={P.blue} strokeWidth="9"/></Tissue>
 <Probe x={501} y={error?275:253} scale={1.12}/>
 <Arrow x1={501} y1={134} x2={501} y2={error?222:194} id={id} color={error?P.red:P.teal} width={error?9:4}/>
 <Label x={500} y={454} anchor="middle" size={23}>{error?'Luz deformada por presión local':'Luz recuperada antes de interrogar o medir'}</Label>
 <Label x={500} y={486} anchor="middle" size={18} fill={P.muted}>{distal?'La presión de la sonda sobre la muestra no sustituye el aumento distal.':'La compresión tiene un objetivo específico; este ejemplo se refiere a flujo o calibre.'}</Label>
 </>;}

function Oblique({error,id,longitudinal}){return <>
 <Label x={279} y={139} anchor="middle">Plano del transductor</Label><Label x={749} y={139} anchor="middle">Sección obtenida</Label>
 <path d="M102 257H458M102 327H458" stroke={P.blue} strokeWidth="9"/><path d="M102 292H458" stroke="#d6eef0" strokeWidth="61"/>
 <path d={error?'M204 183L340 390L375 376L239 168':longitudinal?'M113 228H447V355H113Z':'M260 179L286 184L286 390L260 386Z'} fill={error?'#c3868c':'#6db8bf'} opacity=".45" stroke={error?P.red:P.teal} strokeWidth="3"/>
 <Arrow x1={493} y1={285} x2={576} y2={285} id={id}/>
 <Tissue x={616} y={195} w={270} h={190}>{!error&&longitudinal?<><path d="M0 83H270M0 143H270" stroke={P.blue} strokeWidth="7"/><path d="M0 113H270" stroke="#d6eef0" strokeWidth="52"/></>:<ellipse cx="134" cy="109" rx={error?104:47} ry="38" fill="#d6eef0" stroke={P.blue} strokeWidth="8"/>}</Tissue>
 <Label x={279} y={431} anchor="middle" size={22}>{error?'Oblicuidad sin corregir':longitudinal?'Mismo vaso, eje largo':'Transversal verdadero'}</Label>
 <Label x={748} y={431} anchor="middle" size={22}>{error?'Forma alargada por el corte':longitudinal?'Continuidad y ambas paredes':'Paredes en el plano de medida'}</Label>
 <Label x={500} y={484} size={18} anchor="middle" fill={P.muted}>El plano se recupera con la sonda; cambiar unidades o rótulos no corrige la oblicuidad.</Label>
 </>;}

function Angle({error,id}){const angle=error?0:-31;return <>
 <Tissue x={101} y={234} w={796} h={198}><path d="M0 111H796M0 177H796" stroke={P.blue} strokeWidth="8"/><path d="M0 144H796" stroke="#d6eef0" strokeWidth="58"/></Tissue>
 <g transform={`translate(418 236) rotate(${angle})`}><path d="M-57 13H57L38 207H-38Z" fill="#70bdca" opacity=".4"/><path d="M0 13V207" stroke={P.gold} strokeWidth="3" strokeDasharray="7 6"/></g>
 <Probe x={418} y={236} angle={angle} scale={.9}/>
 <Arrow x1={674} y1={377} x2={799} y2={377} id={id} color={P.blue}/>
 <Label x={744} y={342} anchor="middle" size={22}>Flujo</Label>
 {error?<><path d="M418 345H447V376" fill="none" stroke={P.red} strokeWidth="3"/><Label x={467} y={365} size={23} fill={P.red}>90°</Label></>:<><path d="M503 377H566M503 377L471 320" fill="none" stroke={P.gold} strokeWidth="2"/><Label x={554} y={333} size={21}>Haz / flujo</Label></>}
 <Label x={500} y={482} size={18} anchor="middle" fill={P.muted}>Orientación ilustrativa; conserva el vaso, la muestra intraluminal y ajustes adecuados.</Label>
 </>;}

function Continuity({error,id,phase}){const xs=error?[190,762]:[117,283,449,615,781];return <>
 <Label x={500} y={144} anchor="middle">{error?'Dos capturas no muestran lo que ocurre entre ellas':'Cada desplazamiento conserva el nivel anterior'}</Label>
 {xs.map((x,i)=><g key={x} transform={`translate(${x} 209)`}><rect x="-75" width="150" height="143" rx="4" fill={P.paper} stroke={error?P.red:P.teal} strokeWidth="3"/><ellipse cx="0" cy="71" rx="36" ry="25" fill="#d6eef0" stroke={P.blue} strokeWidth="5"/><Label x={0} y={177} anchor="middle" size={19}>{error?`Captura ${i+1}`:`Nivel ${i+1}`}</Label></g>)}
 {error?<><path d="M296 280H657" stroke={P.muted} strokeWidth="3" strokeDasharray="8 12"/><Cross x={477} y={280} size={21}/><Label x={477} y={343} anchor="middle" size={21} fill={P.red}>Continuidad no demostrada</Label></>:<><path d="M91 281H852" stroke={P.blue} strokeWidth="6" opacity=".5"/>{[0,1,2,3].map(i=><Arrow key={i} x1={194+i*166} y1={185} x2={255+i*166} y2={185} id={id} color={P.teal} width={3}/>)}<rect x={90+phase*714} y="202" width="36" height="156" rx="5" fill="none" stroke={P.gold} strokeWidth="3"/></>}
 <Label x={500} y={460} size={20} anchor="middle">{error?'No prolongues ni conectes de memoria.':'Vuelve al último nivel reconocido si pierdes la referencia.'}</Label>
 </>;}

function Standing({error,id}){return <>
 <g transform="translate(447 145) scale(.9)">
  {!error&&<><path d="M183 64V301M183 81H264V301M165 302H202M246 302H281" stroke="#90a9b2" strokeWidth="8" fill="none" strokeLinecap="round"/><rect x="47" y="278" width="61" height="25" fill="#d6e1e3" stroke="#9eb5ba" strokeWidth="2"/></>}
  <path d="M-26 140L-33 216L-26 285L-37 301H-9L-4 280L7 210L7 143" fill={P.skin} stroke="#b08c72" strokeWidth="2"/>
  <path d={error?'M18 142L44 218L38 287L50 301H20L16 282L12 217L0 152':'M18 142L28 210L49 271L70 278L79 265L60 255L48 203L34 142'} fill={P.skin} stroke="#b08c72" strokeWidth="2"/>
  <path d="M-26 24Q5 9 36 28L36 144Q10 158-36 144Z" fill="#d9e8ea" stroke="#94afb6" strokeWidth="2"/>
  <path d="M-25 35L-48 106L-44 145M34 34L65 92L101 78" fill="none" stroke={P.skin} strokeWidth="15" strokeLinecap="round"/>
  {!error&&<path d="M101 78L180 81" stroke={P.skin} strokeWidth="14" strokeLinecap="round"/>}
  {error&&<path d="M101 78L145 120" stroke={P.skin} strokeWidth="14" strokeLinecap="round"/>}
  <ellipse cx="6" cy="-10" rx="24" ry="31" fill={P.skin} stroke="#b08c72" strokeWidth="2"/>
 </g>
 <path d="M306 417H787" stroke={P.line} strokeWidth="3"/>
 <Arrow x1={error?485:394} y1={308} x2={error?485:394} y2={405} id={id} color={error?P.red:P.blue} width={6}/>
 <Label x={error?150:199} y={288} size={21}>{error?['Carga en el miembro','que intentas','explorar']:['Peso en el','contralateral']}</Label>
 <Label x={739} y={197} size={21} fill={error?P.red:P.teal}>{error?['Sin apoyo','estable']:['Apoyo','comprobado']}</Label>
 <Label x={500} y={474} anchor="middle" size={20}>{error?'Reorganiza la posición antes de continuar.':'Miembro explorado relajado, con apoyo ligero y sin carga.'}</Label>
 </>;}

function Supine({error,id}){return <>
 <g transform={`translate(498 242) rotate(${error?0:45}) scale(.86)`}>
  <rect x="-208" y="43" width="467" height="25" rx="9" fill="#9bb4bf"/>
  <ellipse cx="-167" cy="7" rx="29" ry="33" fill={P.skin} stroke="#b08c72" strokeWidth="2"/>
  <path d="M-130 17Q-87-17-32 5L41 36L217 37L236 46H-132Z" fill={P.skin} stroke="#b08c72" strokeWidth="2"/>
  <path d="M-129 17Q-83-18-29 5L42 36H-132Z" fill="#d9e8ea" stroke="#94afb6" strokeWidth="2"/>
  <path d="M-74 5L-11 29L24 29" stroke="#bd997e" strokeWidth="10" strokeLinecap="round" fill="none"/>
  {!error&&<path d="M244 13V75" stroke="#6f909f" strokeWidth="10"/>}
 </g>
 <path d="M501 303V423M404 429H611" stroke="#90a9b2" strokeWidth="15" strokeLinecap="round"/>
 <Label x={error?500:745} y={error?145:158} anchor="middle">{error?'Supino plano':'Cabeza elevada · alternativa tolerada'}</Label>
 {!error&&<Label x={772} y={289} size={25} fill={P.teal}>≥45°*</Label>}
 <Label x={500} y={477} anchor="middle" size={18} fill={P.muted}>{error?'No equiparar esta condición con una evaluación de reflujo en dependencia.':'*Alternativa descrita por AIUM cuando no es factible la bipedestación; documenta límites.'}</Label>
 </>;}

function Maneuver({error,id}){return <>
 <Screen x={108} y={188} w={315} h={216}><path d="M19 143H294" stroke="#a0bcc9" strokeWidth="2"/>{error?<path d="M19 143Q38 136 55 143T90 143T125 143T160 143T195 143T230 143T275 143" fill="none" stroke={P.gold} strokeWidth="3"/>:<path d="M19 143L58 143Q72 46 98 143L130 143Q155 192 185 143H294" fill="none" stroke={P.gold} strokeWidth="3"/>}</Screen>
 <Arrow x1={461} y1={294} x2={548} y2={294} id={id} color={error?P.red:P.teal}/>
 <g transform="translate(585 179)">
  <Label x={4} y={25} size={23}>{error?'Falta provocación interpretable':'Registro con contexto'}</Label>
  {['Basal','Maniobra identificada','Respuesta observada'].map((text,i)=><g key={text} opacity={error&&i>0 ? .25 : 1}><Label x={40} y={91+i*58} size={21}>{text}</Label>{error&&i>0?<Cross x={7} y={84+i*58} size={10}/>:<Tick x={7} y={84+i*58} size={12}/>}</g>)}
 </g>
 <Label x={500} y={466} anchor="middle" size={19} fill={P.muted}>Una señal basal aislada no documenta la respuesta a la maniobra requerida.</Label>
 </>;}

function Timing({error,id}){const x1=error?278:498,x2=error?498:729;return <>
 <path d="M119 189V393H893M119 292H893" stroke="#7694a5" strokeWidth="2" fill="none"/>
 <path d="M127 292H277Q317 289 340 210Q372 167 404 220Q445 280 498 292Q548 366 604 363Q669 361 729 292H885" fill="none" stroke={P.blue} strokeWidth="5"/>
 <path d={`M${x1} 177V390M${x2} 177V390M${x1} 167H${x2}`} stroke={error?P.red:P.teal} strokeWidth="3" fill="none"/>
 <Label x={(x1+x2)/2} y={145} anchor="middle" size={22} fill={error?P.red:P.teal}>{error?'Acción provocadora':'Intervalo de flujo observado'}</Label>
 <Label x={191} y={427} size={20} anchor="middle">Basal</Label><Label x={388} y={427} size={20} anchor="middle">Aumento distal</Label><Label x={611} y={427} size={20} anchor="middle">Tras liberar</Label>
 <Label x={500} y={478} size={18} anchor="middle" fill={P.muted}>Trazo inventado de aumento distal y liberación; no representa el cronograma de Valsalva.</Label>
 </>;}

function Reference({error,id,muslo}){return <>
 <Leg x={405} y={122} scale={.9}/>
 <circle cx={424} cy={muslo?240:346} r="9" fill={P.paper} stroke={P.ink} strokeWidth="3"/>
 <path d={error?'M600 224V394M588 224H612M588 394H612':muslo?'M600 241V293M588 241H612M588 293H612M421 293H610':'M600 346V463M588 346H612M588 463H612M390 463H610'} fill="none" stroke={error?P.red:P.teal} strokeWidth="3"/>
 <Label x={635} y={error?319:muslo?277:405} size={30} fill={error?P.red:P.teal}>18 cm</Label>
 <Label x={635} y={error?359:muslo?322:447} size={21}>{error?'Origen no indicado':muslo?'Desde pliegue de rodilla':'Desde planta del pie'}</Label>
 {!error&&<path d={`M435 ${muslo?240:346}H588`} fill="none" stroke={P.muted} strokeWidth="2" strokeDasharray="6 6"/>}
 <Label x={245} y={474} size={18} fill={P.muted}>Ejemplo de localización: la distancia se mide en el paciente, no en píxeles.</Label>
 </>;}

function Side({error,id}){return <>
 <Screen x={123} y={178} w={285} h={223} side="DER"><path d="M17 87H267M17 165H267" stroke="#8da9b6" strokeWidth="3"/><ellipse cx="141" cy="125" rx="53" ry="29" fill="#071824" stroke="#afc9d5" strokeWidth="5"/></Screen>
 <Arrow x1={450} y1={286} x2={547} y2={286} id={id} color={error?P.red:P.teal}/>
 <g transform="translate(606 153)"><path d="M0 0H262V281H0Z" fill={P.paper} stroke={P.line} strokeWidth="3"/><Label x={132} y={43} anchor="middle" fill={error?P.red:P.teal} size={28}>{error?'IZQ':'DER'}</Label><g transform="translate(132 65) scale(.47)"><Leg x={0} y={0} path/></g><Label x={132} y={263} anchor="middle" size={20}>Mapa del estudio</Label></g>
 {error?<Cross x={499} y={333}/>:<Tick x={499} y={333}/>}
 <Label x={500} y={480} size={20} anchor="middle">Coteja lateralidad antes de trasladar o cerrar los hallazgos.</Label>
 </>;}

function Code({error,id}){return <>
 <g transform="translate(139 188)"><rect width="78" height="172" fill={P.blue}/><rect width="78" height="86" fill={P.red}/><path d="M0 86H78" stroke="white" strokeWidth="2"/><Arrow x1={116} y1={35} x2={193} y2={35} id={id} color={P.red}/><Arrow x1={193} y1={135} x2={116} y2={135} id={id} color={P.blue}/><Label x={85} y={219} anchor="middle" size={20}>{['Doppler: dirección','respecto al haz']}</Label></g>
 {error?<><Arrow x1={413} y1={270} x2={578} y2={270} id={id} color={P.red}/><Cross x={500} y={270}/><Label x={499} y={366} anchor="middle" size={20} fill={P.red}>No trasladar por color</Label><Leg x={742} y={150} scale={.75} path/><path d="M755 164Q739 218 745 260" stroke={P.red} strokeWidth="8" fill="none"/></>:<>
  <path d="M426 159V420" stroke={P.line} strokeWidth="2"/>
  <Label x={512} y={174} size={22}>Cartografía: condición</Label>
  <path d="M513 219H590" stroke={P.blue} strokeWidth="8"/><Label x={615} y={226} size={21}>Competente</Label>
  <path d="M513 270H590" stroke={P.red} strokeWidth="8"/><Label x={615} y={277} size={21}>Incompetente</Label>
  <Label x={512} y={337} size={22}>Trazo: plano fascial</Label>
  <path d="M513 373H590" stroke={P.ink} strokeWidth="5"/><Label x={615} y={380} size={21}>Subfascial</Label>
  <path d="M513 418Q525 401 538 418T564 418T590 418" stroke={P.ink} strokeWidth="5" fill="none"/><Label x={615} y={425} size={21}>Epifascial</Label>
 </>}
 <Label x={500} y={487} size={18} anchor="middle" fill={P.muted}>La ondulación cartográfica informa plano; no equivale por sí sola a tortuosidad.</Label>
 </>;}

function Incomplete({error,id}){return <>
 <g transform="translate(170 174)"><path d="M0 0H274V228H0Z" fill={P.paper} stroke={P.line} strokeWidth="3"/><Label x={137} y={45} size={24} anchor="middle">Registro del segmento</Label><path d="M28 70H246" stroke={P.line} strokeWidth="2"/><Label x={32} y={116} size={22}>{['No visualizado','o no interpretable']}</Label><path d="M32 181H244M32 204H190" stroke="#b6c9cd" strokeWidth="3"/></g>
 <Arrow x1={478} y1={288} x2={553} y2={288} id={id} color={error?P.red:P.teal}/>
 <g transform="translate(589 174)"><path d="M0 0H274V228H0Z" fill={P.paper} stroke={P.line} strokeWidth="3"/><Label x={137} y={45} size={24} anchor="middle">Informe</Label><path d="M28 70H246" stroke={P.line} strokeWidth="2"/>{error?<><Label x={137} y={136} size={34} anchor="middle" fill={P.red}>NORMAL</Label><path d="M50 149L229 101" stroke={P.red} strokeWidth="4"/></>:<><Label x={31} y={108} size={22} fill={P.teal}>Limitación explícita</Label><Label x={31} y={148} size={20}>{['Segmento y motivo','Alcance del examen']}</Label></>}</g>
 <Label x={500} y={475} size={20} anchor="middle">La ausencia de evaluación no se transforma en un hallazgo negativo.</Label>
 </>;}

function Context({error,id,supervised=false}){if(supervised)return <>
 <g transform="translate(131 198)"><rect width="229" height="147" rx="9" fill="#dce6e8" stroke="#8da7b2" strokeWidth="3"/><rect x="14" y="14" width="201" height="115" fill="#173448"/><path d="M48 55H179M48 80H161M48 105H147" stroke="#a8c4ce" strokeWidth="5"/><path d="M88 149V179M52 181H176" stroke="#8da7b2" strokeWidth="8"/><Label x={114} y={229} size={22} anchor="middle">Secuencia web</Label></g>
 <Arrow x1={411} y1={280} x2={534} y2={280} id={id} color={error?P.red:P.teal}/>
 {error?<><Label x={704} y={264} size={27} anchor="middle" fill={P.red}>{['Competencia independiente','asumida por completar']}</Label><Cross x={703} y={351}/></>:<>
  <g transform="translate(648 218)"><circle cx="0" cy="-27" r="25" fill={P.skin}/><path d="M-34 13Q0-1 35 15L32 119H-33Z" fill="#d8e6e8" stroke="#89a5b0" strokeWidth="2"/><circle cx="113" cy="-27" r="25" fill={P.skin}/><path d="M79 13Q113-1 148 15L145 119H80Z" fill="#b4cfd4" stroke="#89a5b0" strokeWidth="2"/><path d="M34 49L72 74L105 58" fill="none" stroke={P.skin} strokeWidth="14" strokeLinecap="round"/><rect x="15" y="130" width="159" height="35" rx="5" fill="#9db7c2"/><Label x={56} y={217} size={23} anchor="middle">Práctica supervisada</Label></g>
 </>}
 <Label x={500} y={485} size={18} anchor="middle" fill={P.muted}>La adquisición real y su revisión docente son necesarias; la web no acredita destreza clínica.</Label>
 </>;
 const names=['Lado','Segmento','Posición','Maniobra'],values=['DER','GSV · muslo','Bipedestación apoyada','Aumento distal'];
 return <>
 <path d="M159 157H841V423H159Z" fill={P.paper} stroke={P.line} strokeWidth="3"/>
 {names.map((n,i)=><g key={n}><Label x={191} y={203+i*61} size={23}>{n}</Label><Label x={469} y={203+i*61} size={22} fill={error?P.red:P.teal}>{error?'Por documentar':values[i]}</Label>{error?<path d={`M450 ${212+i*61}H795`} stroke={P.red} strokeDasharray="6 6" strokeWidth="2"/>:<Tick x={800} y={195+i*61} size={12}/>}</g>)}
 <Label x={500} y={480} size={19} anchor="middle" fill={P.muted}>Ejemplo ficticio: cada captura debe poder relacionarse con sus condiciones.</Label>
 </>;}

function SegmentContext({error,id}){return <>
 <Label x={257} y={144} size={22} anchor="middle">Hallazgo localizado</Label><Label x={746} y={144} size={22} anchor="middle">Extensión registrada</Label>
 <path d="M257 184V400" stroke="#afbfc4" strokeWidth="18"/><path d="M257 216V275" stroke={P.red} strokeWidth="18"/>
 <Arrow x1={345} y1={283} x2={574} y2={283} id={id} color={error?P.red:P.teal}/>
 <path d="M723 184V400" stroke={error?P.red:'#afbfc4'} strokeWidth="18"/>{!error&&<path d="M723 216V275" stroke={P.red} strokeWidth="18"/>}
 <Label x={771} y={236} size={21} fill={P.red}>Segmento demostrado</Label><Label x={771} y={349} size={20} fill={error?P.red:P.muted}>{error?['Resto asumido','sin rastrear']:['Resto: evaluar','y documentar']}</Label>
 <Label x={500} y={478} size={20} anchor="middle">Un hallazgo proximal no establece por sí solo la extensión a todo el eje.</Label>
 </>;}

function FascialContext({error,id}){return <>
 <Tissue x={115} y={174} w={770} h={244}><path d="M0 150H770" stroke="#809d8e" strokeWidth="9"/><path d={error?'M51 72H319Q400 72 478 38H689':'M51 72H319Q366 71 409 118L457 190H689'} fill="none" stroke={P.blue} strokeWidth="18" strokeLinecap="round"/><Label x={27} y={130} size={20}>Superficial</Label><Label x={27} y={223} size={20}>Profundo</Label></Tissue>
 <Label x={786} y={342} size={20}>Fascia</Label>
 <Label x={500} y={463} anchor="middle" size={24} fill={error?P.red:P.teal}>{error?'Una unión superficial no demuestra perforante.':'Cruce fascial y continuidad entre sistemas demostrados.'}</Label>
 </>;}

/** Original educational plates. Every error branch changes the depicted mechanism,
 *  not just its label. No result is a clinical acquisition or an automated diagnosis. */
export default function MethodErrorIllustration({code='missing-context',momentId='',stepId='',error=true,phase=.5}){
 const uid=useId().replace(/[^a-zA-Z0-9_-]/g,''),id=`m4-error-arrow-${uid}`,p=clamp(phase),selected=describe[code]?code:'missing-context',title=(describe[selected])[error?0:1];
 let plate;
 switch(selected){
  case 'marker':plate=<Marker error={error} id={id}/>;break;
  case 'pressure':plate=<Pressure error={error} id={id} phase={p} distal={['maniobra-ubicada','distal-y-liberacion'].includes(momentId)}/>;break;
  case 'oblique':plate=<Oblique error={error} id={id} longitudinal={stepId==='equipo'}/>;break;
  case 'angle':plate=<Angle error={error} id={id}/>;break;
  case 'lost-vessel':plate=<Continuity error={error} id={id} phase={p}/>;break;
  case 'support':plate=<Standing error={error} id={id}/>;break;
  case 'supine-reflux':plate=<Supine error={error} id={id}/>;break;
  case 'no-maneuver':plate=<Maneuver error={error} id={id}/>;break;
  case 'wrong-timing':plate=<Timing error={error} id={id}/>;break;
  case 'missing-reference':plate=<Reference error={error} id={id} muslo={stepId==='gsv'||momentId.includes('muslo')}/>;break;
  case 'wrong-side':plate=<Side error={error} id={id}/>;break;
  case 'wrong-code':plate=<Code error={error} id={id}/>;break;
  case 'incomplete-report':plate=<Incomplete error={error} id={id}/>;break;
  default:plate=momentId==='limites-segmentarios'?<SegmentContext error={error} id={id}/>:momentId==='cruce-fascial'?<FascialContext error={error} id={id}/>:<Context error={error} id={id} supervised={momentId==='revision-supervisada'}/>;
 }
 return <svg className="m4-method-error-illustration" viewBox="0 0 1000 520" role="img" aria-labelledby={`${uid}-title ${uid}-desc`} style={{display:'block',width:'100%',height:'auto',maxWidth:'100%',fontFamily:'Inter,Arial,sans-serif',background:'#f3f7f6',overflow:'hidden'}}>
  <title id={`${uid}-title`}>{title}</title><desc id={`${uid}-desc`}>{`Esquema original de ${error?'error de adquisición o registro':'corrección de técnica o documentación'}. No representa una adquisición clínica ni un diagnóstico automatizado.`}</desc>
  <defs><marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs>
  <rect width="1000" height="520" fill="#f3f7f6"/>
  <path d="M41 36H78" stroke={error?P.red:P.teal} strokeWidth="5"/>
  <Label x={91} y={42} size={15} fill={error?P.red:P.teal}>{error?'ERROR QUE DEBES RECONOCER':'CORRECCIÓN DE LA TÉCNICA'}</Label>
  <Label x={42} y={88} size={26}>{momentId==='revision-supervisada'?(error?'Completar la web no acredita competencia clínica':'Transfiere el aprendizaje a práctica supervisada'):title}</Label>
  {plate}
  <path d="M42 501H958" stroke={P.line} strokeWidth="1"/><Label x={42} y={516} size={11} fill={P.muted}>IMF · ESQUEMA ORIGINAL · NO ES UNA ADQUISICIÓN CLÍNICA</Label>
 </svg>;
}
