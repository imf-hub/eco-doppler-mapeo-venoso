import {useId} from 'react';
import './ProcedureIllustration.css';

const C={ink:'#18384b',muted:'#63818f',skin:'#d9b69d',skinLight:'#ead1bc',skinShade:'#bd9276',gown:'#d9e7e9',blue:'#3386b2',cyan:'#69c5d1',red:'#b44a67',gold:'#cd9b52',fascia:'#a6bab1',paper:'#fffdf9',line:'#cad6d8'};
const titles={preparar:'Organiza el examen antes del primer barrido',equipo:'Relaciona equipo, mano y pantalla',posicion:'Apoyo estable y miembro examinado sin carga',profundo:'Conserva el mismo segmento durante la compresión',ingle:'Demuestra la unión por continuidad',gsv:'Sigue la safena mayor de un nivel al siguiente',ssv:'Sigue la safena menor hasta su terminación real',tributarias:'Demuestra qué conecta y qué atraviesa la fascia',reflujo:'Separa contacto local, aumento distal y liberación',diametros:'Obtén transversal y mide con la pared',cartografia:'Traduce la evidencia a las tres caras',informe:'Conserva la concordancia entre imagen, mapa e informe'};
const regions={ingle:'Región inguinal',gsv:'Cara medial',ssv:'Cara posterior',profundo:'Segmento profundo',tributarias:'Conexión por demostrar',reflujo:'Segmento identificado',diametros:'Nivel de medición'};
const clamp=n=>Math.max(0,Math.min(1,Number.isFinite(n)?n:.5));

function Text({x,y,children,small=false,muted=false,anchor='start',className='',...rest}){
  const lines=Array.isArray(children)?children:[children];
  return <text x={x} y={y} textAnchor={anchor} className={`m4-illustration-text ${small?'m4-illustration-small':''} ${className}`} fill={muted?C.muted:C.ink} {...rest}>{lines.map((line,i)=><tspan key={i} x={x} dy={i?25:0}>{line}</tspan>)}</text>;
}
function Arrow({d,id,color=C.gold,dashed=false,width=4,...rest}){return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed?'8 8':undefined} markerEnd={`url(#${id})`} {...rest}/>;}
function Dot({x,y,label,number}){return <g><circle cx={x} cy={y} r="18" fill={C.ink}/><text x={x} y={y+6} textAnchor="middle" fill="white" fontSize="17" fontWeight="700">{number}</text>{label&&<Text x={x+30} y={y+7}>{label}</Text>}</g>;}
function Leader({x1,y1,x2,y2,label,anchor='start'}){return <g><path d={`M${x1} ${y1} L${x2} ${y2}`} fill="none" stroke={C.muted} strokeWidth="2"/><circle cx={x1} cy={y1} r="4" fill={C.gold}/><Text x={x2+(anchor==='end'?-10:10)} y={y2+5} small anchor={anchor}>{label}</Text></g>;}

/* Original schematic: the outlined patient supplies posture and access context,
   not a patient-specific or exhaustive vascular reconstruction. */
function Patient({x=0,y=0,scale=1,posterior=false,unloaded=true,examined=true,support=false,markerId,opacity=1}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
  {unloaded&&<path d="M33 467H94V493H33Z" fill="#d7e1e2" stroke="#9eb2b7" strokeWidth="2"/>}
  {support&&<g stroke="#8da4a9" strokeWidth="9" strokeLinecap="round"><path d="M146 90V493M146 115H272M272 115V493"/><path d="M128 493H166M252 493H291" strokeWidth="5"/></g>}
  <path d="M-45 210C-49 260-55 309-47 350L-35 450Q-39 474-54 486L-18 490Q-5 479-11 459L-6 351C3 325 8 291 6 261" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <path d={unloaded?'M12 210C29 251 40 290 35 327L48 420Q55 445 76 452L72 465L41 458Q29 454 27 434L7 349C-6 308-14 265-10 235':'M12 210C29 251 33 290 27 335L30 455Q39 469 53 478L47 488L10 480Q-1 475 1 457L-8 340C-18 300-19 267-10 235'} fill={examined?C.skin:C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <path d="M-44 70Q-21 58-8 60H12Q37 61 54 79L42 141L43 239Q-2 256-60 230L-52 145Z" fill={C.gown} stroke="#95acb2" strokeWidth="2"/>
  <path d="M-46 78Q-62 78-67 108L-81 188Q-84 199-76 205L-64 204L-48 129" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <path d={support?'M49 79Q66 88 68 114L83 150L120 125L128 137L84 174Q72 177 63 160L45 119':'M49 79Q66 88 66 116L78 184Q83 201 72 206L60 199L45 119'} fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  {support&&<path d="M119 124Q131 117 143 120L154 130Q158 137 150 139L130 137" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>}
  <path d="M-10 45V67Q4 78 21 63L19 43" fill={C.skin}/>
  <ellipse cx="5" cy="17" rx="29" ry="37" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <path d="M-23 7Q-27-22 2-24Q30-26 33 4L24-6Q2-12-21 5" fill="#71858a"/>
  {!posterior&&<><path d="M17 7L22 22L15 24" fill="none" stroke={C.skinShade} strokeWidth="2"/><path d="M10 36H21" stroke={C.skinShade} strokeWidth="2"/></>}
  <path d="M-40 97Q-8 110 35 100M-41 217Q-8 229 36 221" fill="none" stroke="#afc4c8" strokeWidth="2"/>
  <path d="M-38 344L-19 346M15 342L30 340" fill="none" stroke={C.skinShade} strokeWidth="2"/>
  {examined&&<path d={posterior?'M14 244Q5 286 13 322L22 390':'M10 243Q1 281 11 320L26 411'} fill="none" stroke={C.blue} strokeWidth="6" opacity=".55"/>}
  {markerId&&<Arrow id={markerId} d="M-113 385V469" color={C.blue}/>}
 </g>;
}

function Probe({x=0,y=0,rotation=0,scale=1,markerId,hand=true,contact=true}){
 return <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
  {contact&&<ellipse cx="0" cy="11" rx="65" ry="13" fill={C.cyan} opacity=".3"/>}
  <path d="M-18-87Q-13-120 14-120Q39-119 62-148" fill="none" stroke="#8096a0" strokeWidth="7"/>
  <rect x="-22" y="-91" width="44" height="72" rx="13" fill="#b4c3c7" stroke="#557383" strokeWidth="2"/>
  <path d="M-63-31Q-68-29-67-21L-60 1Q0 15 60 1L67-21Q69-28 61-31Z" fill="#edf0ec" stroke="#557383" strokeWidth="2"/>
  <path d="M-59 1Q0 12 59 1" fill="none" stroke="#5a6872" strokeWidth="8"/>
  <circle cx="-50" cy="-16" r="5" fill={C.gold} stroke="#a77734" strokeWidth="2"/>
  {hand&&<g>
   <path d="M188-134L143-127L82-105Q61-121 44-101L13-81Q0-73-1-61Q1-51 10-52L30-68L22-43Q18-28 29-25Q39-23 43-38L49-56L45-29Q43-17 54-17Q64-18 66-34L69-55L70-35Q71-22 80-25Q88-28 86-43L84-67Q102-71 118-83L183-82Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M184-142L222-149L230-70L182-74Z" fill="#dbe6e8" stroke="#91a9b0" strokeWidth="2"/>
   <path d="M47-78L59-83M63-72L76-79M82-66L94-73" stroke={C.skinShade} strokeWidth="2" fill="none"/>
  </g>}
  {markerId&&<Leader x1={-50} y1={-16} x2={-112} y2={-64} label="Marcador" anchor="end"/>}
 </g>;
}

function Leg({x=0,y=0,scale=1,posterior=false,vascular=true,region='gsv',phase=.5,markerId}){
 const route=region==='ssv'?'M15 394Q21 315 19 259Q14 214 17 180':'M24 33Q-1 91 5 145Q1 214 10 265L18 402';
 const length=region==='ssv'?217:380;
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M-52 8Q-88 92-67 174Q-63 202-69 226Q-78 269-47 326L-35 408Q-44 425-24 435L29 436Q47 428 31 417L20 407L29 330Q59 272 46 228Q34 208 42 181Q66 94 36 10Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <path d="M-61 215Q-18 231 43 216M-42 325Q-15 335 24 325M-32 408L19 408" fill="none" stroke={C.skinShade} strokeWidth="2" opacity=".7"/>
  {!posterior&&<path d="M-45 70Q-34 141-44 183M24 70Q10 127 24 181" fill="none" stroke="#e8c5ae" strokeWidth="11" opacity=".8"/>}
  {vascular&&<>
   <path d={route} fill="none" stroke={C.blue} strokeWidth="8" strokeLinecap="round"/>
   {region!=='ssv'&&<path d="M4 148Q-38 174-32 218M11 269Q-20 288-16 319" fill="none" stroke={C.blue} strokeWidth="4"/>}
   {region==='ssv'&&<path d="M17 180Q17 141 0 112M17 180Q47 161 52 126" fill="none" stroke={C.blue} strokeWidth="4" strokeDasharray="5 6"/>}
   <path d={route} pathLength={length} fill="none" stroke={C.gold} strokeWidth="12" strokeLinecap="round" strokeDasharray={`22 ${length+50}`} strokeDashoffset={-phase*(length-25)} opacity=".9"/>
  </>}
  {markerId&&<path d="M-99 11V439M-105 11H-93M-105 439H-93" fill="none" stroke={C.line} strokeWidth="2"/>}
 </g>;
}

function Cut({x=0,y=0,scale=1,kind='gsv',phase=.5,compression=false,error=false,measure=false,markerId}){
 const collapse=compression?(error ? .15 : Math.sin(phase*Math.PI)*.9):0;
 const ry=38*(1-collapse),deep=kind==='deep';
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M0 26Q165-6 346 25L346 248H0Z" fill="#ead6c2" stroke="#b9a18b" strokeWidth="2"/>
  <path d="M0 55Q166 28 346 55" fill="none" stroke="#c9b7a5" strokeWidth="12"/>
  <path d="M0 151Q164 172 346 147L346 248H0Z" fill="#ccae9c"/>
  {[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M${i*48-18} 190L${i*48+45} 245`} stroke="#bb9686" strokeWidth="2" opacity=".65"/>)}
  <path d="M0 148Q166 174 346 148" fill="none" stroke={C.fascia} strokeWidth="9"/>
  {!deep&&<path d="M57 112Q163 46 278 111Q162 167 57 112Z" fill="#f0e4d5" stroke={C.fascia} strokeWidth="5"/>}
  <ellipse cx="171" cy={deep?199:110} rx="53" ry={ry} fill="#d4edf0" stroke={C.blue} strokeWidth="8"/>
  {deep&&<ellipse cx="267" cy="197" rx="28" ry="25" fill="#e7c1ba" stroke="#a86d6a" strokeWidth="7"/>}
  {!deep&&<ellipse cx="282" cy="85" rx="15" ry="11" fill="#d4edf0" stroke={C.blue} strokeWidth="4"/>}
  {measure&&<>
   <path d="M114 109H228M114 99V119M228 99V119" stroke={C.gold} strokeWidth="4"/>
   <circle cx="114" cy="109" r="4" fill={C.gold}/><circle cx="228" cy="109" r="4" fill={C.gold}/>
   <Text x={171} y={deep?270:18} small anchor="middle">Pared incluida · mm</Text>
  </>}
  {markerId&&<>
   <Leader x1={310} y1={149} x2={392} y2={143} label="Fascia muscular"/>
   <Leader x1={172} y1={deep?199:110} x2={392} y2={deep?221:85} label={deep?'Vena profunda':'Compartimento safeno'}/>
  </>}
 </g>;
}

function Machine({x=0,y=0,scale=1,phase=.5}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M75 197V353M-16 356H166M23 358V377M128 358V377" stroke="#91a5ad" strokeWidth="18" strokeLinecap="round"/>
  <circle cx="23" cy="388" r="15" fill="#4f6977"/><circle cx="128" cy="388" r="15" fill="#4f6977"/>
  <path d="M-40 178H202L231 224H-67Z" fill="#dce5e7" stroke="#829ba6" strokeWidth="3"/>
  <rect x="-29" y="-9" width="217" height="180" rx="12" fill="#c8d6da" stroke="#829ba6" strokeWidth="3"/>
  <rect x="-14" y="8" width="188" height="144" rx="4" fill="#1a3447"/>
  <path d="M0 52H160M0 114H160" stroke="#76909c" strokeWidth="2"/>
  <ellipse cx="73" cy="81" rx="43" ry="22" fill="#081925" stroke="#c2d0d4" strokeWidth="5"/>
  <path d={`M38 82Q67 ${58-phase*10} 109 82Q73 ${103+phase*10} 38 82`} fill={C.cyan} opacity=".45"/>
  <circle cx="145" cy="197" r="13" fill="#687f8a"/><circle cx="181" cy="202" r="10" fill="#687f8a"/>
  <path d="M-14 192H91M-8 207H99" stroke="#9eb1b8" strokeWidth="6"/>
  <path d="M187 107Q254 140 257 213Q267 287 221 307" fill="none" stroke="#829ba6" strokeWidth="6"/>
 </g>;
}

function Preparation({phase,id}){
 return <>
  <Patient x={235} y={95} scale={.96} support markerId={id}/>
  <Leader x1={235} y1={153} x2={60} y2={70} label={['Explicación','y tolerancia']}/>
  <Leader x1={361} y1={217} x2={448} y2={210} label="Apoyo preparado"/>
  <path d="M138 591H514" stroke={C.line} strokeWidth="3"/>
  <g transform="translate(650 110)">
   <path d="M0 0H330V390H0Z" fill={C.paper} stroke={C.line} strokeWidth="3"/>
   <path d="M98 0V-17H232V0" fill="#b6c7cc" stroke={C.muted} strokeWidth="3"/>
   <Text x={32} y={56}>Antes del primer barrido</Text>
   {['Motivo del estudio','Lado y territorios','Antecedentes relevantes','Posición y tolerancia'].map((t,i)=><g key={t} opacity={phase>=i*.2?1:.35}><Dot x={39} y={107+i*66} number={i+1}/><Text x={72} y={114+i*66} small>{t}</Text><path d={`M72 ${130+i*66}H292`} stroke={C.line} strokeWidth="2"/></g>)}
  </g>
  <Text x={650} y={557} small muted>Registro organizado desde el inicio.</Text>
 </>;
}

function Equipment({phase,id}){
 return <>
  <Machine x={225} y={167} scale={1.08} phase={phase}/>
  <path d="M501 468C548 514 603 507 632 439S652 340 702 357" fill="none" stroke="#829ba6" strokeWidth="7"/>
  <path d="M631 397Q768 370 984 400V516H630Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <Probe x={752} y={393} scale={1.05} markerId={id}/>
  <Leader x1={356} y1={254} x2={427} y2={152} label="Primero identifica en B"/>
  <Leader x1={752} y1={407} x2={678} y2={545} label="Gel y contacto ligero" anchor="end"/>
  <Text x={673} y={133}>El mismo objetivo en mano y pantalla</Text>
  <path d="M718 435L779 437L784 510H712Z" fill={C.cyan} opacity=".2"/>
  <ellipse cx="752" cy="469" rx="34" ry="21" fill="#d4edf0" stroke={C.blue} strokeWidth="5"/>
  <Text x={226} y={617} anchor="middle" small muted>Los ajustes dependen del equipo y del objetivo.</Text>
 </>;
}

function Position({phase,id,error,momentId}){
 if(momentId==='acceso-sin-forzar')return <>
  <Text x={292} y={92} anchor="middle">Acceso medial</Text><Text x={856} y={92} anchor="middle">Acceso posterior</Text>
  <Leg x={282} y={130} scale={1.05} region="gsv" phase={.35}/><Leg x={840} y={130} scale={1.05} posterior region="ssv" phase={.35}/>
  <Probe x={301} y={315} scale={.8} rotation={8}/><Probe x={859} y={397} scale={.8} rotation={-10}/>
  <path d="M597 143V588" stroke={C.line} strokeWidth="2"/>
  <Leader x1={300} y1={322} x2={392} y2={475} label={['Contacto ligero','sin vaciar la luz']}/>
  <Leader x1={860} y1={410} x2={965} y2={531} label={['Acerca el territorio','al operador']}/>
  <Text x={600} y={637} small anchor="middle" muted>Adapta el acceso sin forzar la postura ni perder estabilidad.</Text>
 </>;
 const onlyStanding=momentId==='bipedestacion-segura',onlyReverse=momentId==='alternativa-tolerada';
 return <>
  {!onlyReverse&&<g transform={onlyStanding?'translate(300 0)':undefined}>
  <Text x={210} y={91} anchor="middle">Bipedestación con apoyo</Text>
  <Patient x={226} y={151} scale={.87} support={!error} unloaded={!error} markerId={id}/>
  <path d="M108 589H490" stroke={C.line} strokeWidth="3"/>
  <Leader x1={251} y1={487} x2={364} y2={446} label={error?['Carga sobre','el examinado']:['Miembro examinado','sin carga']}/>
  <Leader x1={206} y1={558} x2={103} y2={622} label="Peso contralateral"/>
  </g>}
  {!onlyStanding&&<g transform={onlyReverse?'translate(-150 0)':undefined}>
  <Text x={805} y={91} anchor="middle">{error?'Supino plano: no equivale a dependencia':'Alternativa si no tolera estar de pie'}</Text>
  <g transform={`translate(725 373) rotate(${error?0:45})`}>
   <rect x="-164" y="39" width="409" height="28" rx="9" fill="#9ab2be"/>
   <path d="M-118 30Q-90 20-75 24L98 15Q121 10 137 16L194 22L208 37H-115Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M-65-28Q-30-59 19-29L64 24H-69Z" fill={C.gown} stroke="#95acb2" strokeWidth="2"/>
   <ellipse cx="-112" cy="-7" rx="26" ry="31" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M-17-22Q-1-15 15 4L49 17" fill="none" stroke={C.skin} strokeWidth="12" strokeLinecap="round"/>
   <path d="M218 8V71" stroke="#6f8e9f" strokeWidth="11"/>
  </g>
  <path d="M744 420V563M650 571H839" stroke="#8ca5af" strokeWidth="15" strokeLinecap="round"/>
  <path d="M626 593H881" stroke={C.line} strokeWidth="3"/>
  {!error&&<><Leader x1={652} y1={289} x2={757} y2={218} label="Cabeza elevada"/><Text x={970} y={453} small>≥45°*</Text></>}
  <Text x={660} y={623} small muted>{error?'Corrige y documenta la posición antes de interpretar reflujo.':'*Alternativa AIUM; documenta posición y límites.'}</Text>
  </g>}
 </>;
}

function Tracking({stepId,phase,id,error}){
 const posterior=stepId==='ssv',groin=stepId==='ingle';
 const scanY=groin?122:posterior?470-phase*170:176+phase*284;
 return <>
  <Patient x={174} y={119} scale={.83} posterior={posterior} support unloaded/>
  <Text x={103} y={618} small>{posterior?'Acceso posterior':'Acceso medial / inguinal'}</Text>
  <path d="M330 185L429 141M325 486L429 574" fill="none" stroke={C.line} strokeWidth="2" strokeDasharray="5 6"/>
  <Leg x={580} y={127} scale={1.07} posterior={posterior} region={posterior?'ssv':'gsv'} phase={phase} markerId={id}/>
  <Probe x={601} y={scanY} scale={.62} rotation={groin?-10:posterior?-12:10}/>
  <Arrow d={posterior?'M468 532V322':'M470 184V508'} id={id} color={C.gold}/>
  <Text x={438} y={posterior?296:559} small anchor="middle">Barrido continuo</Text>
  <Text x={758} y={129}>{regions[stepId]}</Text>
  {groin?<>
   <g transform="translate(813 230)">
    <path d="M0 0V239M0 88Q90 93 107 173" fill="none" stroke={C.blue} strokeWidth="24" strokeLinecap="round"/>
    <path d="M58 10V239" fill="none" stroke="#b47d79" strokeWidth="16"/>
    <Arrow d="M103 193Q82 129 25 112" id={id} color={C.gold} width={3}/>
   </g>
   <Leader x1={812} y1={318} x2={848} y2={190} label="Vena femoral común"/>
   <Leader x1={920} y1={403} x2={1006} y2={414} label="GSV / VSM"/>
   <Text x={769} y={564} small muted>La continuidad sostiene la identificación.</Text>
  </>:posterior?<>
   <g transform="translate(801 211)">
    <path d="M72 300V112Q70 56 23 9M72 112Q114 75 150 34" stroke={C.blue} strokeWidth="13" fill="none" strokeLinecap="round"/>
    <path d="M72 112V-10" stroke={C.blue} strokeWidth="10" strokeDasharray="6 8" fill="none"/>
    <circle cx="72" cy="112" r="29" fill="none" stroke={C.gold} strokeWidth="3"/>
    <Text x={72} y={351} anchor="middle" small>Terminación por demostrar</Text>
   </g>
   <Text x={759} y={143} small muted>Esquema de variabilidad, no patrón universal.</Text>
  </>:<>
   <Cut x={748} y={235} scale={.86} kind="gsv" phase={phase}/>
   <Leader x1={896} y1={329} x2={1011} y2={491} label="GSV entre fascias" anchor="end"/>
   <Text x={751} y={565} small muted>Recupera el último nivel reconocido si la pierdes.</Text>
  </>}
  {error&&<Text x={437} y={654} fill={C.red} small>Perder el plano no demuestra ausencia anatómica.</Text>}
 </>;
}

function Deep({phase,id,error}){
 return <>
  <g transform="translate(102 248)">
   <path d="M0 177H460M48 179V298M403 179V298" stroke="#91a5ad" strokeWidth="13" strokeLinecap="round"/>
   <rect x="-10" y="152" width="490" height="26" rx="10" fill="#b7c9cf"/>
   <ellipse cx="39" cy="108" rx="29" ry="31" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M74 112Q123 82 177 107L236 142L430 143L452 154H73Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M74 111Q124 85 177 107L236 142H73Z" fill={C.gown} stroke="#95acb2" strokeWidth="2"/>
   <Probe x={269} y={135} scale={.66}/>
  </g>
  <Text x={96} y={131}>Identifica el segmento en transversal</Text>
  <Arrow d="M589 339H670" id={id}/>
  <Cut x={705} y={249} scale={1.05} kind="deep" phase={phase} compression error={error}/>
  <Probe x={884} y={277+Math.sin(phase*Math.PI)*12} scale={.85} markerId={id}/>
  <Text x={826} y={133} anchor="middle">{phase>.75?'Libera y vuelve a interrogar':'Antes → durante → después'}</Text>
  <Text x={721} y={590} small>{error?'Salir del plano no es coaptación.':'Sigue las mismas paredes durante toda la presión.'}</Text>
  <Text x={98} y={636} small muted>Esquema de compresión; completa el protocolo profundo indicado.</Text>
 </>;
}

function Connections({phase,id}){
 return <>
  <Leg x={199} y={131} scale={1.05} region="gsv" phase={phase}/>
  <Probe x={224} y={379} scale={.59} rotation={-12}/>
  <path d="M248 360L452 235M248 406L452 514" stroke={C.line} strokeWidth="2" strokeDasharray="6 6"/>
  <g transform="translate(482 185)">
   <path d="M0 30Q250-20 568 22V355H0Z" fill="#ead6c2" stroke="#b9a18b" strokeWidth="2"/>
   <path d="M0 218Q240 244 568 218V355H0Z" fill="#ccae9c"/>
   <path d="M0 218Q240 244 568 218" fill="none" stroke={C.fascia} strokeWidth="10"/>
   <path d="M21 111Q115 65 234 110Q110 163 21 111" fill="#f4e9da" stroke={C.fascia} strokeWidth="5"/>
   <path d="M39 112H188Q229 112 264 161L315 264Q329 291 368 291H524" fill="none" stroke={C.blue} strokeWidth="18" strokeLinecap="round"/>
   <path d="M189 111Q259 61 315 76H504" fill="none" stroke={C.blue} strokeWidth="10"/>
   <circle cx="296" cy="229" r="25" fill="none" stroke={C.gold} strokeWidth="3"/>
   <Arrow d={`M${45+phase*110} 112H${93+phase*110}`} id={id} color={C.gold} width={3}/>
   <Leader x1={295} y1={230} x2={414} y2={184} label="Cruce fascial demostrado"/>
   <Text x={58} y={-16} small>Eje superficial</Text><Text x={404} y={345} small>Sistema profundo</Text>
  </g>
  <Text x={479} y={604} small muted>Una rama superficial no es una perforante solo por su forma.</Text>
 </>;
}

function Reflux({phase,id,error}){
 const released=phase>.48;
 const points=Array.from({length:181},(_,i)=>{const t=i/180;const y=t<.26?313-Math.sin(t*28)*6:t<.48?313-112*Math.sin((t-.26)/.22*Math.PI):t<.76?313+65*Math.sin((t-.48)/.28*Math.PI):313+Math.sin(t*30)*3;return `${713+t*353},${y}`;}).join(' ');
 return <>
  <Leg x={240} y={130} scale={1.03} region="gsv" phase={.4}/>
  <Probe x={253} y={277} scale={.65} rotation={-8}/>
  <g transform={`translate(245 ${released?485:465}) rotate(7)`} opacity={error ? .35 : 1}>
   <path d="M-62 1Q-76-12-66-27L-34-45Q-19-51-11-38L1-18L44-18Q60-17 61-4Q60 8 44 9L6 13L-5 39Q-10 50-22 46L-42 33Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M48-22L130-16L129 38L45 11" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M115-21L163-19L160 45L115 39" fill={C.gown} stroke="#95acb2" strokeWidth="2"/>
  </g>
  <Leader x1={255} y1={275} x2={386} y2={208} label="Contacto local ligero"/>
  <Leader x1={244} y1={467} x2={418} y2={515} label={released?'Liberación distal':'Aumento distal'}/>
  <path d="M672 145H1090V487H672Z" fill="#f7faf9" stroke={C.line} strokeWidth="2"/>
  {[0,1,2,3,4].map(i=><path key={i} d={`M704 ${183+i*61}H1072`} stroke="#d9e3e5" strokeWidth="1"/>)}
  <path d="M704 169V446H1074M704 313H1074" stroke={C.muted} strokeWidth="2" fill="none"/>
  <polyline points={points} fill="none" stroke={C.blue} strokeWidth="4" strokeLinecap="round"/>
  <path d={`M${713+phase*353} 171V444`} stroke={C.gold} strokeWidth="3"/>
  <Text x={707} y={116} small>Trazo inventado · no es una adquisición clínica</Text>
  <Text x={716} y={476} small>Basal</Text><Text x={810} y={476} small>Aumento</Text><Text x={946} y={476} small>Liberación</Text>
  <Text x={1085} y={531} small anchor="end">Tiempo →</Text>
  <Text x={698} y={588} small>Identifica dirección y mide el intervalo observado.</Text>
  <Text x={81} y={644} small muted>Este cronograma ilustra aumento distal y liberación; no Valsalva.</Text>
 </>;
}

function Diameter({phase,id,error}){
 return <>
  <Leg x={231} y={127} scale={1.05} region="gsv" phase={.4}/>
  <Probe x={246} y={319} scale={.75} rotation={error?37:0}/>
  <path d="M166 321L299 321L327 377L150 377Z" fill={C.cyan} stroke={C.blue} strokeWidth="2" opacity=".35"/>
  <Text x={126} y={624} small>Corte perpendicular al eje del vaso</Text>
  <Arrow d="M446 343H540" id={id}/>
  <Cut x={608} y={236} scale={1.24} kind="gsv" phase={phase} measure/>
  <Text x={815} y={122} anchor="middle">Diámetro transversal, con pared</Text>
  <Leader x1={749} y1={373} x2={651} y2={579} label="Borde externo de pared" anchor="end"/>
  <Leader x1={890} y1={373} x2={1001} y2={579} label="Borde externo de pared" anchor="end"/>
  {error&&<Text x={638} y={635} fill={C.red} small>Corrige la oblicuidad y la presión antes de medir.</Text>}
 </>;
}

function MapLeg({x,y,face,phase=1}){
 return <g transform={`translate(${x} ${y})`}>
  <path d="M-48 0Q-87 80-61 160L-61 211Q-70 266-41 316L-34 391Q-48 410-21 418L31 418Q46 410 27 399L22 388L32 315Q56 259 43 213L37 165Q67 80 34 0" fill="#f5efe5" stroke="#9fb3b8" strokeWidth="2"/>
  <path d="M-61 210Q-13 225 43 211M-34 389H21" fill="none" stroke="#bbc9c9" strokeWidth="2" strokeDasharray="5 4"/>
  {face==='Anterointerna'?<><path d="M20 20Q-4 78 4 158L11 268L16 390" fill="none" stroke={C.blue} strokeWidth="7"/><path d="M5 88L4 158" fill="none" stroke={C.red} strokeWidth="8" opacity={phase>.25?1:.2}/><path d="M4 147Q-26 178-29 220Q-18 238-30 263" fill="none" stroke={C.red} strokeWidth="5"/><circle cx="-30" cy="263" r="8" fill="white" stroke={C.ink} strokeWidth="2"/></>:face==='Posterior'?<path d="M14 384L18 264Q8 226 16 170" fill="none" stroke={C.blue} strokeWidth="7"/>:null}
  <Text x={-3} y={459} small anchor="middle">{face}</Text>
 </g>;
}

function Cartography({phase,id}){
 return <>
  <Text x={589} y={88} anchor="middle">El mismo miembro · tres caras complementarias</Text>
  {['Anteroexterna','Anterointerna','Posterior'].map((face,i)=><MapLeg key={face} face={face} x={242+i*339} y={145} phase={phase}/>)}
  <path d="M470 145V555M811 145V555" stroke={C.line} strokeWidth="2"/>
  <g transform="translate(130 655)">
   {[['Competente',C.blue],['Incompetente',C.red],['Ablacionada','#879395'],['Trombosada','#293239']].map(([label,color],i)=><g key={label} transform={`translate(${i*251} 0)`}><path d="M0 0H35" stroke={color} strokeWidth="7"/><Text x={46} y={7} small>{label}</Text></g>)}
  </g>
 </>;
}

function Report({phase,id}){
 return <>
  <Text x={600} y={90} anchor="middle">Una observación recuperable en tres registros</Text>
  <g transform="translate(91 165)">
   <path d="M0 0H277V345H0Z" fill={C.paper} stroke={C.line} strokeWidth="3"/>
   <Text x={24} y={45}>Imágenes identificadas</Text>
   <rect x="24" y="74" width="229" height="150" fill="#153146"/>
   <path d="M32 119H245M32 191H245" stroke="#8aa4af" strokeWidth="4"/>
   <ellipse cx="137" cy="155" rx="49" ry="29" stroke="#adccd7" strokeWidth="5" fill="#071b2a"/>
   <Text x={24} y={265} small>{['Lado · vena · nivel','Posición · plano · maniobra']}</Text>
  </g>
  <Arrow d="M386 324H455" id={id}/>
  <g transform="translate(477 165)">
   <path d="M0 0H229V345H0Z" fill={C.paper} stroke={C.line} strokeWidth="3"/>
   <Text x={22} y={45}>Mapa</Text>
   <g transform="translate(78 76) scale(.5)"><MapLeg x={0} y={0} face="Anterointerna" phase={phase}/></g>
   <Text x={21} y={321} small>Trayecto · condición · medidas</Text>
  </g>
  <Arrow d="M728 324H798" id={id}/>
  <g transform="translate(820 165)">
   <path d="M0 0H279V345H0Z" fill={C.paper} stroke={C.line} strokeWidth="3"/>
   <Text x={25} y={45}>Informe</Text>
   {['Anatomía y función','Origen y extensión','Medidas y referencias','Alcance y limitaciones'].map((t,i)=><g key={t} opacity={phase>i*.18?1:.35}><Text x={25} y={99+i*58} small>{t}</Text><path d={`M25 ${113+i*58}H251`} stroke={C.line} strokeWidth="2"/></g>)}
  </g>
  <Text x={600} y={596} anchor="middle">Lado, segmento y condiciones deben coincidir.</Text>
  <Text x={600} y={643} anchor="middle" small muted>No evaluado y no interpretable se documentan; no se convierten en normal.</Text>
 </>;
}

function ProbeRotation({phase,id}){
 const angle=phase*90;
 return <>
  <Text x={600} y={82} anchor="middle">Gira sobre el centro del mismo vaso · todavía en B</Text>
  <Text x={314} y={145} small anchor="middle">Vista desde arriba</Text>
  <path d="M107 190Q313 161 524 191V552Q316 578 107 552Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <path d="M313 208V539" stroke={C.blue} strokeWidth="28" opacity=".4"/>
  <circle cx="313" cy="365" r="111" fill="none" stroke={C.gold} strokeWidth="2" strokeDasharray="6 8"/>
  <g transform={`translate(313 365) rotate(${angle})`}>
   <rect x="-77" y="-27" width="154" height="54" rx="16" fill="#f0f2ed" stroke="#597687" strokeWidth="3"/>
   <rect x="-25" y="-49" width="50" height="97" rx="15" fill="#b5c6cd" stroke="#597687" strokeWidth="2"/>
   <circle cx="-61" cy="-15" r="6" fill={C.gold}/>
   <path d="M-87 0H87" stroke={C.gold} strokeWidth="3" strokeDasharray="6 5"/>
  </g>
  <circle cx="313" cy="365" r="5" fill={C.ink}/>
  <Arrow d="M374 260Q442 301 419 370" id={id} color={C.gold} width={3}/>
  <Text x={312} y={620} small anchor="middle">Mantén el centro bajo la sonda</Text>
  <Arrow d="M567 366H648" id={id}/>
  <Text x={891} y={168} anchor="middle">Recupera continuidad y ambas paredes</Text>
  <path d="M707 219H1085V536H707Z" fill="#e6d2be" stroke="#b9a18b" strokeWidth="2"/>
  <path d="M709 282H1083M709 475H1083" stroke={C.fascia} strokeWidth="6"/>
  {phase<.7?<ellipse cx="896" cy="377" rx={36+phase*125} ry="37" fill="#d7edf0" stroke={C.blue} strokeWidth="8"/>:<>
   <path d="M707 339H1085M707 415H1085" stroke={C.blue} strokeWidth="8"/>
   <path d="M708 377H1084" stroke="#d7edf0" strokeWidth="68"/>
  </>}
  <Text x={893} y={586} anchor="middle" small>{phase<.25?'Eje corto':phase<.7?'Plano intermedio / oblicuo':'Eje largo'}</Text>
  <Text x={600} y={660} anchor="middle" small muted>El giro cambia el plano anatómico; después orienta el haz para Doppler.</Text>
 </>;
}

function ProbeTilt({phase,id,error}){
 const tilt=error?0:phase*35,rad=tilt*Math.PI/180,sampleX=520+161*Math.tan(rad);
 return <>
  <Text x={600} y={82} anchor="middle">Mismo eje largo · ahora cambia la orientación del haz</Text>
  <path d="M105 315Q530 284 1090 315V574H105Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
  <path d="M108 376Q589 355 1087 377" stroke={C.fascia} strokeWidth="8" fill="none"/>
  <path d="M108 423H1087M108 495H1087" stroke={C.blue} strokeWidth="8"/>
  <path d="M108 459H1087" stroke="#d7edf0" strokeWidth="64"/>
  <g transform={`translate(520 298) rotate(${-tilt})`}>
   <path d="M-62 17H62L45 322H-45Z" fill={C.cyan} opacity=".3"/>
   <path d="M0 18V322" stroke={C.gold} strokeWidth="3" strokeDasharray="7 6"/>
  </g>
  <Probe x={520} y={298} scale={.8} rotation={-tilt} markerId={id}/>
  <Arrow d="M241 459H336" id={id} color={C.blue}/><Arrow d="M890 459H984" id={id} color={C.blue}/>
  <path d={`M${sampleX-10} 444V474M${sampleX+10} 444V474`} stroke={C.gold} strokeWidth="4"/>
  <Leader x1={sampleX} y1={459} x2={821} y2={583} label="Muestra dentro de la luz"/>
  <Text x={856} y={196} small>{tilt<8?['Haz casi perpendicular','al flujo']:['Inclina sin perder','la identidad del vaso']}</Text>
  <Text x={600} y={655} small anchor="middle" muted>El ángulo Doppler es entre haz y flujo; el eje largo por sí solo no lo garantiza.</Text>
 </>;
}

function ProbeDetail({stepId,phase,id,error,momentId}){
 if(momentId==='giro-sobre-el-vaso')return <ProbeRotation phase={phase} id={id}/>;
 if(momentId==='orientar-haz')return <ProbeTilt phase={phase} id={id} error={error}/>;
 const isFlow=['ingle','reflujo','ssv','gsv','tributarias'].includes(stepId),isCompress=stepId==='profundo';
 const tilt=isFlow?Math.sin(phase*Math.PI)*20:0;
 return <>
  <Text x={600} y={83} anchor="middle">{isCompress?'Comprimir conserva segmento y plano':stepId==='diametros'?'El plano de medición es transversal':'Girar, inclinar y desplazar son acciones diferentes'}</Text>
  <g transform="translate(140 198)">
   <path d="M0 162Q146 115 324 153L324 351H0Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M0 206Q161 171 324 203" fill="none" stroke={C.fascia} strokeWidth="7"/>
   <ellipse cx="155" cy="244" rx="51" ry={isCompress?35*(1-.85*Math.sin(phase*Math.PI)):35} fill="#d7edf0" stroke={C.blue} strokeWidth="7"/>
   <Probe x={155} y={150+(isCompress?Math.sin(phase*Math.PI)*14:0)} scale={1.12} rotation={stepId==='diametros'&&error?32:0} markerId={id}/>
   <path d="M93 171L216 172L200 304H112Z" fill={C.cyan} opacity=".18"/>
   <Text x={151} y={410} anchor="middle" small>{isCompress?'Eje corto · mismo segmento':stepId==='diametros'?'Transversal para el diámetro':'Primero centra la luz en B'}</Text>
  </g>
  <g transform="translate(725 203)">
   <path d="M-45 157Q120 110 337 157L337 350H-45Z" fill={C.skinLight} stroke={C.skinShade} strokeWidth="2"/>
   <path d="M-45 243Q121 211 337 243" fill="none" stroke={C.blue} strokeWidth="38"/>
   <path d="M-45 243Q121 211 337 243" fill="none" stroke="#d7edf0" strokeWidth="25"/>
   <Probe x={143} y={149} scale={1.12} rotation={tilt}/>
   <path d={`M${84+tilt} 170L${202+tilt} 170L237 307H129Z`} fill={C.cyan} opacity=".19"/>
   <path d="M135 179L194 256" stroke={C.gold} strokeWidth="3" strokeDasharray="6 6"/>
   <Arrow d="M29 239H100" id={id} color={C.blue} width={3}/>
   <Text x={140} y={410} anchor="middle" small>{isFlow?'Eje largo y haz orientado para Doppler':'Eje largo demuestra continuidad'}</Text>
  </g>
  <Arrow d="M510 320C539 280 583 280 615 320" id={id}/>
  <Text x={564} y={380} anchor="middle" small>{stepId==='diametros'?'No medir oblicuo':'Girar sobre el centro'}</Text>
  <Text x={600} y={658} anchor="middle" small muted>Marcador verificado con la convención del laboratorio; las poses son ilustrativas.</Text>
 </>;
}

function AnatomyDetail({stepId,phase,id,error,momentId}){
 if(stepId==='cartografia')return <Cartography phase={phase} id={id}/>;
 if(stepId==='informe'||stepId==='preparar')return <Report phase={phase} id={id}/>;
 if(stepId==='tributarias')return <Connections phase={phase} id={id}/>;
 if(stepId==='reflujo')return <Reflux phase={phase} id={id} error={error}/>;
 if(stepId==='ingle'||stepId==='gsv'||stepId==='ssv')return <Tracking stepId={stepId} phase={phase} id={id} error={error}/>;
 if(stepId==='posicion')return <Position phase={phase} id={id} error={error} momentId={momentId}/>;
 if(stepId==='equipo')return <ProbeDetail stepId={stepId} phase={phase} id={id} error={error} momentId={momentId}/>;
 return <>
  <Text x={600} y={98} anchor="middle">{stepId==='profundo'?'Relación del vaso con fascia y músculo':'Pared, luz y plano de medición'}</Text>
  <Cut x={178} y={241} scale={1.75} kind={stepId==='profundo'?'deep':'gsv'} phase={phase} compression={stepId==='profundo'} measure={stepId==='diametros'} error={error}/>
  <Leader x1={783} y1={504} x2={888} y2={548} label="Músculo"/>
  <Leader x1={783} y1={503-145} x2={889} y2={296} label="Fascia de referencia"/>
  <Text x={178} y={654} small muted>Esquema de relaciones espaciales; no determina permeabilidad ni competencia.</Text>
 </>;
}

/** A large, original, deterministic procedure plate. phase is normalized 0..1.
 *  This asset deliberately does not create or label a synthetic study as real.
 *  Clinical source attribution belongs alongside the plate in the owning page.
 */
export default function ProcedureIllustration({stepId='preparar',view='external',phase=.5,error=false,momentId}){
 const uid=useId().replace(/[^a-zA-Z0-9_-]/g,''),id=`m4-arrow-${uid}`,p=clamp(phase),title=titles[stepId]||titles.preparar;
 let content;
 if(view==='probe')content=stepId==='posicion'?<Position phase={p} id={id} error={error} momentId={momentId}/>:['preparar','cartografia','informe'].includes(stepId)?<Report phase={p} id={id}/>:<ProbeDetail stepId={stepId} phase={p} id={id} error={error} momentId={momentId}/>;
 else if(view==='anatomy')content=<AnatomyDetail stepId={stepId} phase={p} id={id} error={error} momentId={momentId}/>;
 else switch(stepId){
  case 'equipo':content=['giro-sobre-el-vaso','orientar-haz'].includes(momentId)?<ProbeDetail stepId={stepId} phase={p} id={id} error={error} momentId={momentId}/>:<Equipment phase={p} id={id}/>;break;
  case 'posicion':content=<Position phase={p} id={id} error={error} momentId={momentId}/>;break;
  case 'profundo':content=<Deep phase={p} id={id} error={error}/>;break;
  case 'ingle':case 'gsv':case 'ssv':content=<Tracking stepId={stepId} phase={p} id={id} error={error}/>;break;
  case 'tributarias':content=<Connections phase={p} id={id}/>;break;
  case 'reflujo':content=<Reflux phase={p} id={id} error={error}/>;break;
  case 'diametros':content=<Diameter phase={p} id={id} error={error}/>;break;
  case 'cartografia':content=<Cartography phase={p} id={id}/>;break;
  case 'informe':content=<Report phase={p} id={id}/>;break;
  default:content=<Preparation phase={p} id={id}/>;
 }
 return <svg className={`m4-illustration m4-illustration-${stepId}`} viewBox="0 0 1200 720" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
  <title id={`${uid}-title`}>{title+(view==='probe'?' · Mano, transductor y plano':view==='anatomy'?' · Relación anatómica':'')}</title>
  <desc id={`${uid}-desc`}>Ilustración docente original y simplificada. Las posiciones, cortes y movimientos muestran relaciones; no representan una adquisición clínica ni todas las variantes de un paciente.</desc>
  <defs><marker id={id} viewBox="0 0 10 10" refX="8.7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs>
  <path d="M0 0H1200V720H0Z" fill="#f3f7f6"/>
  <path d="M40 681H1160" stroke={C.line} strokeWidth="1"/>
  {content}
  <text className="m4-illustration-provenance" x="42" y="706">IMF · ESQUEMA ORIGINAL · NO ES UNA ADQUISICIÓN CLÍNICA</text>
 </svg>;
}
