import { mappingSteps } from './mapping.js';
import { methodologyByStep } from './methodology.js';

// Original teaching copy for independent pages. Clinical acquisition follows the
// sources attached to each page; the Latin American consensus governs the map.
// Frame IDs and order remain those of the reviewed animation sequences.
const pages = {
  preparar: {
    title: 'Prepara el estudio y a la persona',
    kicker: '01 · Antes de explorar',
    lead: 'Define qué necesitas responder, qué territorios explorarás y cómo conservarás la evidencia.',
    position: 'Explica los cambios de posición y las maniobras. Valora movilidad, tolerancia y apoyos antes de colocar al paciente.',
    probe: 'Prepara sonda, gel y cable. Realiza higiene y limpieza o desinfección según el contacto previsto y el fabricante.',
    screen: 'Abre el estudio con lado, indicación y territorios. En esta web utiliza únicamente datos ficticios.',
    record: 'Conserva indicación, antecedentes relevantes, lateralidad y alcance. La sospecha de un proceso agudo requiere el protocolo asistencial indicado.',
    steps: [
      { lookFor: 'La indicación, el lado y el alcance se corresponden; los antecedentes orientan la exploración.', save: 'Motivo del estudio, lado, intervenciones previas y territorios previstos.' },
      { lookFor: 'El paciente entiende la exploración y mantiene una postura estable y tolerada.', save: 'Posición inicial, necesidad de apoyo y cualquier limitación de acceso o tolerancia.' },
      { lookFor: 'Puedes recuperar cada captura por vena, lado y nivel, sin depender de la memoria.', save: 'Sistema de rótulos y hoja de trabajo que acompañarán al mapa y al informe.' }
    ]
  },
  equipo: {
    title: 'Prepara la imagen y orienta la sonda',
    kicker: '02 · Mano, marcador y pantalla',
    lead: 'Consigue primero una imagen B reconocible. El plano anatómico y la orientación Doppler se ajustan como acciones distintas.',
    position: 'Acerca el territorio al operador y coloca el monitor en su línea de visión; organiza cable y apoyo del antebrazo.',
    probe: 'Comprueba el marcador. Usa la frecuencia clínicamente útil que alcance la estructura, con gel y contacto ligero.',
    screen: 'Encuadra luz, pared y referencias. Después adapta foco, ganancia y Doppler a la señal; los números del simulador no son presets clínicos.',
    record: 'Guarda imágenes legibles en B y Doppler cuando corresponda, con región y orientación identificadas.',
    steps: [
      { lookFor: 'El extremo marcado corresponde al indicador de pantalla según el plano y la convención del laboratorio.', save: 'Orientación anatómica correcta y rótulos coherentes con el plano obtenido.' },
      { lookFor: 'Luz, paredes y tejidos de referencia visibles, sin aplanamiento mantenido por el transductor.', save: 'Imagen B del vaso y sus referencias con contacto que permita valorar su luz.' },
      { lookFor: 'Al girar sobre el centro permaneces en el mismo vaso; ambas paredes se prolongan en eje largo.', save: 'Vistas transversal y longitudinal reconocibles del mismo segmento.' },
      { lookFor: 'Muestra PW dentro de la luz, haz favorable y señal visible sin ruido que invada tejidos.', save: 'Registro útil con escala, línea de base y segmento identificados.' }
    ]
  },
  posicion: {
    title: 'Coloca al paciente para estudiar reflujo',
    kicker: '03 · Dependencia, estabilidad y acceso',
    lead: 'La posición modifica el llenado venoso. Organiza una exploración en dependencia con el miembro examinado relajado y sin carga.',
    position: 'Para reflujo, utiliza bipedestación cuando sea factible y segura. El peso descansa en el miembro contrario y existe apoyo estable.',
    probe: 'Accede al territorio medial o posterior sin forzar el equilibrio. Mantén gel y contacto ligero al estudiar flujo o calibre.',
    screen: 'Comprueba que la luz sigue visible al retirar presión excesiva. Cambiar la posición o apretar modifica las condiciones del registro.',
    record: 'Anota la posición y sus límites. Si no puede estar de pie, AIUM contempla Trendelenburg inverso de al menos 45°; sedestación para superficial y perforantes de pantorrilla.',
    steps: [
      { lookFor: 'Paciente estable, apoyo accesible y miembro examinado sin carga sostenida.', save: 'Posición utilizada y condición de descarga del miembro explorado.' },
      { lookFor: 'La alternativa mantiene dependencia apropiada para el objetivo y tolerancia suficiente.', save: 'Alternativa empleada, inclinación cuando corresponda y motivo de la adaptación.' },
      { lookFor: 'Llegas a la cara medial o posterior sin pedir giros inestables ni colapsar la vena.', save: 'Limitación de acceso o cambio de posición que afecte la comparación de registros.' }
    ]
  },
  profundo: {
    title: 'Evalúa el sistema profundo antes de interpretar el circuito',
    kicker: '04 · Compresión y función',
    lead: 'Que el sistema profundo no se dibuje en esta plantilla no permite omitir su estudio. Adapta el examen a la indicación clínica.',
    position: 'La posición para valorar compresión puede diferir de la utilizada para reflujo. Conserva el contexto de cada adquisición.',
    probe: 'En transversal, centra el segmento y aplica compresión controlada manteniendo sus paredes en el plano; libera para valorar flujo.',
    screen: 'Compara el mismo segmento sin y con compresión. Busca duplicaciones y completa los territorios del protocolo indicado.',
    record: 'Guarda compresión y registros Doppler pertinentes, identificados por nivel. Esta demostración de un segmento no constituye un protocolo completo de TVP.',
    steps: [
      { lookFor: 'La identidad y las paredes del mismo segmento permanecen visibles durante el movimiento de la sonda.', save: 'B transversal antes de la compresión, con vena, lado y nivel identificados.' },
      { lookFor: 'Coaptación observada en el mismo plano; las luces duplicadas pertinentes también se evalúan.', save: 'Secuencia sin y con compresión del segmento y descripción de una respuesta incompleta o no evaluable.' },
      { lookFor: 'Al liberar presión recuperas la luz y puedes completar Doppler y el alcance profundo previsto.', save: 'Hallazgos anatómicos y funcionales, territorios evaluados y limitaciones; sigue el circuito clínico si hay sospecha aguda.' }
    ]
  },
  ingle: {
    title: 'Demuestra la unión safenofemoral',
    kicker: '05 · De las relaciones a la conexión',
    lead: 'Identifica la confluencia por continuidad anatómica. Después estudia su respuesta sin extender un hallazgo de unión a toda la safena.',
    position: 'Facilita acceso inguinal manteniendo privacidad, estabilidad y una posición apropiada para el componente que evalúas.',
    probe: 'Empieza en transversal, sigue GSV hasta la confluencia y gira sobre el segmento reconocido para obtener eje largo.',
    screen: 'Relaciona arteria femoral, vena femoral común y GSV. El color ayuda a localizar flujo; el nombre depende de anatomía y continuidad.',
    record: 'Conserva anatomía de la unión y registro espectral basal y provocado. Añade una ampliación inguinal si el patrón lo requiere.',
    steps: [
      { lookFor: 'GSV conecta con la vena femoral común; las relaciones se comprueban durante cortes próximos.', save: 'Barrido y vistas que permiten recuperar la confluencia y las tributarias relevantes.' },
      { lookFor: 'Conservas la unión identificada, luz abierta y muestra dentro del vaso al recuperar el eje largo.', save: 'Vista longitudinal y señal basal útil con la localización de la muestra.' },
      { lookFor: 'La maniobra identificada provoca una respuesta interpretable sin colapsar localmente el vaso muestreado.', save: 'Basal, maniobra y respuesta. En femoral común/SFJ se utiliza Valsalva o aumento distal según protocolo y capacidad.' }
    ]
  },
  gsv: {
    title: 'Rastrea la safena mayor de forma continua',
    kicker: '06 · GSV / VSM · territorio medial',
    lead: 'Sigue un eje reconocido entre niveles. Cada rama y cada cambio de condición se demuestran durante el rastreo.',
    position: 'Facilita acceso medial con el miembro relajado; para reflujo conserva dependencia y descarga.',
    probe: 'Avanza mediante barridos cortos y solapados. Si pierdes la luz, vuelve al último nivel reconocido antes de continuar.',
    screen: 'Reconoce el compartimento safeno y distingue el eje de venas epifasciales. Una imagen aislada no prueba continuidad.',
    record: 'Conserva niveles de muslo y pantorrilla, conexiones, medidas y límites de segmentos anormales. Describe variantes y regiones no evaluables.',
    steps: [
      { lookFor: 'La vena está localizada por sus relaciones fasciales y por su continuidad con la referencia proximal.', save: 'Referencia proximal identificada y B del compartimento safeno.' },
      { lookFor: 'Cada desplazamiento se enlaza con el anterior; verificas bifurcaciones antes de elegir la rama que seguirás.', save: 'Niveles rotulados y capturas que permitan reconstruir trayecto y conexiones.' },
      { lookFor: 'Distingues dónde empieza y termina el segmento con hallazgos anormales, sin extrapolar a todo el eje.', save: 'Límites anatómicos, espectros pertinentes y longitud del reflujo segmentario en cm para el mapa.' }
    ]
  },
  ssv: {
    title: 'Sigue la safena menor hasta su terminación real',
    kicker: '07 · SSV / VSP · territorio posterior',
    lead: 'Organiza el acceso posterior y sigue la vena cranealmente. La desembocadura del atlas es una referencia, no una conexión ya demostrada.',
    position: 'Reubica al operador y adapta el acceso posterior conservando estabilidad. Documenta las posiciones usadas para anatomía y reflujo.',
    probe: 'Localiza SSV en su compartimento, síguela hacia proximal y comprueba conexiones en los planos necesarios.',
    screen: 'Distingue SSV, vena poplítea y conexiones musculares o extensión craneal. No completes una SPJ no visualizada por su apariencia esperada.',
    record: 'Registra trayecto, terminación, variantes y hemodinámica de segmentos identificados. Añade ampliación poplítea cuando aporte claridad.',
    steps: [
      { lookFor: 'El acceso posterior permite explorar sin cargar el miembro ni perder apoyo y tolerancia.', save: 'Posición y límites de acceso a pantorrilla y fosa poplítea.' },
      { lookFor: 'La continuidad craneal demuestra dónde termina SSV y qué conexiones regionales participan.', save: 'Terminación observada, nivel y relación con referencias; conserva lo no resuelto.' },
      { lookFor: 'El espectro pertenece al vaso rastreado, con la luz abierta y maniobra distal identificada.', save: 'Registro basal y provocado, segmento y posición; expresa las limitaciones de una terminación no evaluable.' }
    ]
  },
  tributarias: {
    title: 'Reconstruye conexiones y perforantes',
    kicker: '08 · Del trayecto al circuito',
    lead: 'Demuestra conexión, plano y dirección antes de asignar una función. La cercanía entre dos vasos no demuestra comunicación.',
    position: 'Adapta el acceso a la rama y al territorio; evita que una postura inestable o la presión de la sonda alteren el registro.',
    probe: 'Parte de una referencia reconocida y sigue la rama. Cambia de plano para demostrar continuidad y un eventual cruce de fascia.',
    screen: 'Distingue una comunicante superficial de una perforante que conecta superficial y profundo a través de fascia.',
    record: 'Documenta origen, propagación y reentrada cuando estén demostrados. Para el mapa incluye las perforantes participantes, con diámetro y altura referenciada.',
    steps: [
      { lookFor: 'El barrido enlaza rama y eje; no se deduce una conexión solo por superposición en una vista.', save: 'Trayecto seguido y punto de conexión anatómica demostrado.' },
      { lookFor: 'El vaso cruza fascia y su continuidad distingue una perforante de una comunicación entre venas superficiales.', save: 'Cruce fascial, conexión, localización y planos que sustentan la identificación.' },
      { lookFor: 'Dirección y respuesta a la maniobra explican la función de la conexión dentro del circuito observado.', save: 'Función demostrada o incertidumbre. No asignes fuga o reentrada por diámetro aislado.' }
    ]
  },
  reflujo: {
    title: 'Provoca y registra el flujo retrógrado',
    kicker: '09 · Basal, maniobra y respuesta',
    lead: 'Obtén una señal útil antes de medir. La duración se toma sobre el flujo observado y se interpreta según segmento y guía.',
    position: 'Conserva la posición de reflujo identificada y explica la maniobra. La respuesta depende también de cómo se ejecuta.',
    probe: 'Obtén eje largo, libera presión y sitúa la muestra en la luz. Mantén estable la sonda mientras la acción distal genera la respuesta.',
    screen: 'Identifica barra, línea de base y sentido anatómico. Escala, filtro y ganancia deben permitir ver el intervalo sin confundir ruido o aliasing.',
    record: 'Guarda basal y respuesta con cursores temporales, vena, lado, posición y maniobra. SVS usa >0,5 s en ejes superficiales; >1 s en femoral común, femoral y poplítea.',
    steps: [
      { lookFor: 'Luz abierta, señal reconocible y muestra intraluminal antes de iniciar la provocación.', save: 'Basal con escala temporal, línea de base y segmento identificados.' },
      { lookFor: 'Distingues aumento distal, liberación y respuesta; la presión local de la sonda no sustituye la maniobra distal.', save: 'Secuencia completa. En Valsalva identifica la respuesta durante el esfuerzo, sin aplicar el cronograma del aumento distal.' },
      { lookFor: 'Los cursores delimitan el flujo retrógrado observado; no la duración de la compresión o del esfuerzo.', save: 'Tiempo en s o ms con criterio de segmento. Tibiales, femoral profunda y perforantes tienen umbral SVS >0,5 s; no generalices >1 s a todo el profundo.' }
    ]
  },
  diametros: {
    title: 'Mide y localiza cada dato',
    kicker: '10 · Diámetro, longitud y altura',
    lead: 'Tres datos distintos necesitan plano, unidad y referencia. La localización del dibujo no sustituye una distancia medida en el paciente.',
    position: 'Registra la posición y conserva dependencia para las mediciones pertinentes. Evita reducir el calibre por presión del transductor.',
    probe: 'Recupera una sección verdaderamente transversal y bordes reconocibles antes de colocar calibradores.',
    screen: 'Para esta cartografía mide el diámetro incluyendo pared y exprésalo en mm. Identifica las dilataciones focales aparte.',
    record: 'Anota vena, lado, nivel y convención. Las longitudes y alturas se expresan en cm, con planta del pie en pierna o pliegue de rodilla en muslo como referencias del consenso.',
    steps: [
      { lookFor: 'El corte es perpendicular al eje; una sección alargada por oblicuidad no se usa como diámetro.', save: 'Imagen transversal del nivel identificado antes de medir.' },
      { lookFor: 'Las paredes son delimitables sin aplanamiento por la sonda; aplicas la convención de pared incluida del consenso.', save: 'Diámetro en mm, vena, nivel y posición. Conserva al menos GSV de muslo y pierna y SSV; describe dilataciones focales aparte.' },
      { lookFor: 'Puedes distinguir calibre, longitud y altura. En PV, la medida transversal corresponde al nivel de la fascia.', save: 'PV con diámetro en mm y altura en cm desde una referencia explícita; longitud del reflujo segmentario cuando corresponda.' }
    ]
  },
  cartografia: {
    title: 'Construye el mapa a partir del estudio',
    kicker: '11 · Lenguaje del consenso latinoamericano',
    lead: 'Traslada evidencia ya adquirida. El color informa condición, el trazo informa plano y los símbolos identifican estructuras.',
    position: 'Traslada lateralidad y contexto del examen. Las tres caras describen el mismo miembro, aunque la adquisición haya requerido distintas posiciones.',
    probe: 'En esta etapa revisas capturas y barridos guardados; no añades conexiones o hallazgos para completar la silueta.',
    screen: 'Usa las caras anteroexterna, anterointerna y posterior. Separa colores cartográficos de la barra de Doppler.',
    record: 'Incluye GSV y SSV aun competentes, participantes pertinentes, medidas, referencias y límites. Añade ampliaciones inguinal o poplítea si facilitan la lectura.',
    steps: [
      { lookFor: 'Lateralidad y orientación coinciden en las tres caras y con el registro del estudio.', save: 'Plantilla identificada con sus tres vistas y ampliaciones necesarias.' },
      { lookFor: 'La leyenda se conserva: azul competente, rojo incompetente, gris ablacionada y negro trombosada; ondulación significa plano epifascial.', save: 'Condición, plano y símbolos coherentes con evidencia; las marcas del mapa no son códigos del Doppler.' },
      { lookFor: 'Cada trayecto representado y cada cifra se recuperan en el estudio; un examen normal también deja GSV y SSV con sus diámetros.', save: 'Mapa completo y legible, con unidades, referencias y limitaciones concordantes con el informe.' }
    ]
  },
  informe: {
    title: 'Entrega imágenes, mapa e informe concordantes',
    kicker: '12 · Cierre documental',
    lead: 'Revisa el mismo estudio desde sus tres registros. Otra persona debe poder localizar los hallazgos y entender qué quedó sin evaluar.',
    position: 'Conserva las posiciones efectivamente usadas y los cambios que condicionaron la adquisición.',
    probe: 'Comprueba que el registro identifica los territorios explorados. Una imagen ausente no se sustituye por una afirmación de normalidad.',
    screen: 'Resume anatomía, función, medidas y limitaciones por sistema y segmento; el profundo se describe aunque no se dibuje en la plantilla superficial.',
    record: 'Coteja lateralidad, territorios, tiempos, medidas y referencias. La web organiza el aprendizaje; la competencia de adquisición requiere práctica supervisada.',
    steps: [
      { lookFor: 'Mapa, capturas y texto coinciden en lado, segmento, condición y medidas; cada afirmación tiene sustento recuperable.', save: 'Conjunto concordante de imágenes, cartografía e informe descriptivo.' },
      { lookFor: 'El informe distingue resultados negativos de regiones no evaluadas o técnicamente insuficientes.', save: 'Posiciones, maniobras y limitaciones con segmento y motivo; no declares normal un territorio no visualizado.' },
      { lookFor: 'Puedes explicar qué evidencia sostiene el resultado y qué condiciones limitan su interpretación.', save: 'Revisión supervisada del estudio y correcciones de discrepancias antes de su uso asistencial.' }
    ]
  }
};

export const methodologyPages = mappingSteps.map(step => {
  const copy = pages[step.id];
  const guide = methodologyByStep[step.id];
  if (copy.steps.length !== guide.frames.length) throw new Error(`Incomplete methodology page: ${step.id}`);
  return {
    id: step.id,
    title: copy.title,
    kicker: copy.kicker,
    lead: copy.lead,
    position: copy.position,
    probe: copy.probe,
    screen: copy.screen,
    record: copy.record,
    steps: guide.frames.map((frame, index) => ({
      id: frame.id,
      title: frame.title,
      action: frame.action,
      lookFor: copy.steps[index].lookFor,
      save: copy.steps[index].save,
      error: frame.error,
      correction: frame.correction
    })),
    sources: step.sources.map(source => ({ id: source.id, detail: source.detail }))
  };
});

export const methodologyPageById = Object.fromEntries(methodologyPages.map(page => [page.id, page]));
