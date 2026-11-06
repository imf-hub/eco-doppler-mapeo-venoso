// Entirely simulated teaching cases. No patient data or treatment decisions.
const consensus = {
  label: 'Consenso Latinoamericano 2023: cartografía superficial y perforante',
  url: 'https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf'
};
const svs = {
  label: 'SVS / AVF / AVLS 2023, apartados 1.3–1.4',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11523430/'
};
const aium = {
  label: 'AIUM: ultrasonido venoso periférico, revisión 2024 publicada en 2026',
  url: 'https://onlinelibrary.wiley.com/doi/10.1002/jum.70049'
};

export const cases = [
  {
    id: 'flujo-que-no-se-ve', title: 'El flujo que no aparece', level: 'Inicial', scenario: 'slow', mode: 'Color',
    vignette: 'Caso simulado. En una GSV compresible y de paredes finas apenas ves color. El haz está casi perpendicular al vaso, la escala es alta y el filtro de pared está alto. Tras optimizar estos ajustes y disminuir la presión del transductor, reaparece señal. El examen completo de los segmentos previstos no muestra reflujo anormal.',
    findings: [
      'El vaso coapta completamente en los segmentos accesibles examinados.',
      'La ausencia inicial de color cambia al corregir la técnica.',
      'El registro espectral adecuado tras la maniobra no demuestra reflujo anormal.',
      'GSV: 4.1 mm en muslo y 3.0 mm en pierna; SSV: 2.8 mm, medidas para el mapa en transversal incluyendo pared.'
    ],
    questions: [
      { question: '¿Qué explica mejor la ausencia inicial de color?', options: ['Una limitación de detección por los ajustes y el ángulo', 'Trombosis demostrada', 'Una vena aplásica'], answer: 0, explanation: 'Hay una vena visible y compresible cuya señal aparece al optimizar el equipo. La ausencia de color aislada no prueba trombosis.' },
      { question: '¿Qué ajuste favorece detectar este flujo lento?', options: ['Aumentar el filtro de pared', 'Usar escala y filtro adecuados a flujo lento y un ángulo favorable', 'Aumentar siempre la potencia al máximo'], answer: 1, explanation: 'La optimización depende de la señal y del equipo. La ganancia de recepción no es lo mismo que la potencia acústica.' },
      { question: 'Con una exploración adecuada sin reflujo anormal, ¿cómo queda el mapa?', options: ['Vacío', 'GSV y SSV negras porque al inicio no había color', 'GSV y SSV competentes, con sus diámetros'], answer: 2, explanation: 'El consenso pide representar ambos ejes safenos también cuando el estudio superficial es normal.' }
    ],
    mappingTask: 'Representa el estudio normal después de resolver la limitación técnica inicial. Conserva las medidas y las unidades.',
    expectedMap: ['GSV y SSV azules, sin clasificar como trombosis el artefacto inicial', 'Trayecto safeno subfascial continuo según anatomía demostrada', 'GSV muslo 4.1 mm; GSV pierna 3.0 mm; SSV 2.8 mm', 'Cartografía acompañada de informe y evidencia de la exploración adecuada'],
    source: aium, sources: [aium, svs, consensus]
  },
  {
    id: 'reflujo-segmentario', title: 'Rojo solo donde hay evidencia', level: 'Intermedio', scenario: 'reflux', mode: 'PW',
    vignette: 'Caso simulado. En bipedestación y con maniobras reproducibles, GSV muestra 0.9 s de flujo retrógrado en un segmento de muslo de 24 cm. Los segmentos proximales y distales examinados no muestran reflujo anormal. El rastreo demuestra una tributaria epifascial vinculada al circuito. No hay datos suficientes para atribuir el origen a SFJ.',
    findings: [
      'El reflujo se limita al segmento documentado de muslo.',
      'GSV mide 6.2 mm en el segmento rectilíneo de muslo y 3.1 mm en pierna.',
      'La tributaria sale del plano safeno; su relación se demostró con barrido continuo.',
      'La evidencia no permite nombrar SFJ como origen del reflujo.'
    ],
    questions: [
      { question: '¿Qué patrón está demostrado?', options: ['Reflujo axial de toda GSV', 'Reflujo segmentario de GSV', 'Reflujo profundo por definición'], answer: 1, explanation: 'Solo se ha demostrado reflujo en una porción. La presencia de un tramo insuficiente no convierte todo el eje en insuficiente.' },
      { question: '¿Cómo representas la tributaria epifascial patológica?', options: ['Roja y con trazo ondulado', 'Azul porque no es GSV', 'Recta porque todas las venas se dibujan rectas'], answer: 0, explanation: 'El rojo expresa incompetencia; la ondulación expresa plano epifascial. Son dos canales de información distintos.' },
      { question: '¿Qué dato añades al segmento con reflujo?', options: ['Una recomendación de tratamiento automática', 'Solo la velocidad máxima', 'Su longitud en cm y sus límites localizables'], answer: 2, explanation: 'El consenso requiere la longitud del reflujo segmentario y referencias que permitan ubicar el trayecto.' }
    ],
    mappingTask: 'Dibuja GSV conservando los segmentos competentes y la longitud del segmento insuficiente. Evita inventar un origen no demostrado.',
    expectedMap: ['Segmento de GSV con reflujo en rojo y trazo subfascial', 'Resto de GSV evaluada competente en azul', 'Longitud del segmento: 24 cm; diámetros 6.2 mm en muslo y 3.1 mm en pierna', 'Tributaria epifascial patológica roja y ondulada', 'Origen no demostrado indicado como limitación, sin atribuirlo por defecto a SFJ'],
    source: consensus, sources: [consensus, svs]
  },
  {
    id: 'mismo-tiempo-distinta-vena', title: '0.8 segundos: importa el segmento', level: 'Intermedio', scenario: 'reflux', mode: 'PW',
    vignette: 'Caso simulado. Dos registros técnicamente adecuados, con posición y maniobra documentadas, muestran 0.8 s de flujo retrógrado: uno en la vena femoral y otro en GSV. Se pide aplicar los criterios SVS/AVF/AVLS, sin decidir tratamiento.',
    findings: [
      'Vena femoral: flujo retrógrado reproducible de 0.8 s.',
      'GSV: flujo retrógrado reproducible de 0.8 s.',
      'No se aportan datos de vena femoral profunda ni de venas tibiales.',
      'Las duraciones son mediciones temporales, no velocidades.'
    ],
    questions: [
      { question: 'Aplicando esa guía, ¿qué registro supera su umbral de reflujo?', options: ['Ambos, porque todo reflujo usa 0.5 s', 'GSV; la vena femoral no supera el criterio de >1 s', 'Solo vena femoral'], answer: 1, explanation: 'La guía usa >0.5 s para GSV y >1 s para femoral, femoral común y poplítea. Un umbral no debe extrapolarse a todos los vasos.' },
      { question: '¿Sería correcto enseñar “todo el sistema profundo necesita >1 s”?', options: ['Sí, sin excepciones', 'No: la guía usa >0.5 s para tibiales y femoral profunda'], answer: 1, explanation: '“Profundo” agrupa vasos con distintos criterios en esta guía. Hay que nombrar el segmento concreto.' },
      { question: '¿De dónde procede aquí el criterio temporal?', options: ['De la leyenda de colores del consenso latinoamericano', 'De la apariencia del espectro en el simulador', 'De la guía SVS/AVF/AVLS identificada'], answer: 2, explanation: 'El consenso latinoamericano regula la representación cartográfica; no define estos umbrales temporales.' }
    ],
    mappingTask: 'Ubica el segmento insuficiente de GSV en el mapa superficial y describe por separado la medición femoral en el informe, identificando el criterio empleado.',
    expectedMap: ['GSV insuficiente solo en la extensión demostrada por el rastreo', 'Sin dibujar el sistema femoral profundo completo en la plantilla superficial de este consenso', 'Informe con 0.8 s femoral y 0.8 s GSV, posición y maniobra', 'Criterios temporales atribuidos a SVS/AVF/AVLS, sin inferir tratamiento'],
    source: svs, sources: [svs, consensus]
  },
  {
    id: 'ssv-sin-union-tipica', title: 'La safena menor toma otro camino', level: 'Avanzado', scenario: 'reflux', mode: 'Color',
    vignette: 'Caso simulado. El barrido continuo demuestra SSV posterior con prolongación craneal y una conexión intersafena en muslo. No se identifica una desembocadura directa típica en la vena poplítea en el territorio explorado. El circuito con reflujo está demostrado a través de esa conexión; no se ha medido una SPJ convencional.',
    findings: [
      'SSV identificada y seguida de forma continua desde pantorrilla hacia su extensión craneal.',
      'Conexión intersafena demostrada anatómica y hemodinámicamente.',
      'SSV: 4.3 mm en transversal; el espectro confirma reflujo en los segmentos documentados.',
      'No existe una imagen que justifique dibujar una SPJ típica en este caso.'
    ],
    questions: [
      { question: '¿Qué haces con la SPJ en la cartografía?', options: ['Dibujar una unión típica para completar la plantilla', 'Representar la anatomía demostrada y aclarar que no se identificó la unión típica', 'Cambiar el nombre de SSV por vena poplítea'], answer: 1, explanation: 'Las variantes anatómicas deben conservarse. Una plantilla no autoriza a completar con conexiones supuestas.' },
      { question: '¿Qué siglas del consenso ayudan a describir el trayecto?', options: ['CE SSV e IV', 'SFJ para toda conexión', 'PV para cualquier comunicación'], answer: 0, explanation: 'CE SSV identifica la extensión craneal; IV las venas intersafenas. Una comunicación entre territorios superficiales no es por sí sola una perforante.' },
      { question: '¿Cuándo conviene una ampliación poplítea?', options: ['Nunca, el mapa solo permite tres siluetas', 'Solo si se ha decidido un tratamiento', 'Si ayuda a expresar la anatomía y sus conexiones sin superposición'], answer: 2, explanation: 'El consenso admite ampliaciones regionales cuando la anatomía requiere mayor detalle.' }
    ],
    mappingTask: 'Representa SSV, extensión craneal y conexión intersafena demostradas. Añade una ampliación si facilita la lectura; no inventes una unión.',
    expectedMap: ['SSV y su variante anatómica con color de condición por segmento', 'Extensión craneal rotulada CE SSV; conexión intersafena IV', 'Diámetro SSV 4.3 mm', 'Ausencia de SPJ típica identificada descrita con el alcance real del rastreo', 'Ampliación poplítea si agrega claridad'],
    source: consensus, sources: [consensus, aium]
  },
  {
    id: 'perforante-de-reentrada', title: 'Una perforante grande no cuenta toda la historia', level: 'Avanzado', scenario: 'normal', mode: 'PW',
    vignette: 'Caso simulado. Una tributaria epifascial insuficiente conecta con una perforante de 4.0 mm, situada a 22 cm de la planta del pie. El rastreo y las maniobras demuestran flujo de reentrada hacia el sistema profundo. En las condiciones del examen no se documenta flujo sostenido hacia afuera >0.5 s. El caso corresponde a C2.',
    findings: [
      'La perforante cruza la fascia y pertenece al circuito patológico observado.',
      'Diámetro transversal a nivel fascial: 4.0 mm.',
      'Altura: 22 cm desde la planta del pie, con lado y cara identificados.',
      'Se ha demostrado función de reentrada; el diámetro aislado no demuestra incompetencia.'
    ],
    questions: [
      { question: '¿Debe incluirse esta perforante en el mapa del consenso?', options: ['Sí, porque participa como reentrada en el circuito patológico', 'No, solo se dibujan perforantes de fuga', 'Solo si mide más de 5 mm'], answer: 0, explanation: 'El consenso incluye perforantes de fuga o reentrada que formen parte de un circuito patológico.' },
      { question: '¿4.0 mm demuestra por sí solo una perforante incompetente?', options: ['Sí, cualquier diámetro >3.5 mm es suficiente', 'No: hay que integrar dirección, duración y contexto'], answer: 1, explanation: 'En C2, SVS/AVF/AVLS combina diámetro >3.5 mm con flujo hacia afuera >0.5 s. El caso no demuestra ese componente hacia afuera.' },
      { question: '¿Cuál es una anotación localizable?', options: ['Perforante grande', 'PV 4.0', 'PV 4.0 mm; 22 cm desde planta del pie; lado y cara'], answer: 2, explanation: 'La sigla y el calibre deben acompañarse de altura con unidad y referencia anatómica.' }
    ],
    mappingTask: 'Añade la perforante con su símbolo, calibre, ubicación y función demostrada. No la conviertas en fuga por su tamaño.',
    expectedMap: ['Circunferencia sin relleno para la perforante', 'PV 4.0 mm y altura 22 cm desde planta del pie, lado y cara', 'Función de reentrada descrita; color de condición basado en la evaluación hemodinámica', 'Tributaria epifascial insuficiente con trazo ondulado rojo', 'Sin clasificar incompetencia de la perforante a partir del diámetro aislado'],
    source: consensus, sources: [consensus, svs]
  },
  {
    id: 'informe-limitado', title: 'No visible no significa normal', level: 'Intermedio', scenario: 'slow', mode: 'B',
    vignette: 'Caso simulado. Un apósito y la ventana acústica impiden valorar adecuadamente los segmentos medio y distal de SSV. Los intentos de optimización no resuelven la limitación. Se dispone de mediciones válidas de GSV, pero no de un examen completo de SSV. No se aportan datos para concluir aplasia ni ablación.',
    findings: [
      'GSV evaluada en los niveles previstos, con medidas e imágenes válidas.',
      'SSV media y distal no evaluables con la técnica disponible.',
      'La ausencia de visualización no demuestra ausencia anatómica.',
      'La incertidumbre impide cerrar un estudio superficial completo normal.'
    ],
    questions: [
      { question: '¿Cómo describes SSV?', options: ['Normal porque no se observó patología', 'No evaluable en los segmentos identificados, con motivo de la limitación', 'Aplásica por defecto'], answer: 1, explanation: 'Una limitación técnica debe nombrarse y explicarse. No equivale a un hallazgo normal ni a ausencia anatómica.' },
      { question: '¿Qué harías en la cartografía?', options: ['Marcar el dato como no evaluado y vincularlo al informe', 'Pintar SSV azul completa', 'Dibujar ablación gris sin antecedente ni evidencia'], answer: 0, explanation: 'El mapa no debe afirmar una condición que el examen no pudo establecer. Puede usar anotación explícita de limitación sin inventar una nueva condición clínica.' },
      { question: '¿Qué evidencia de aprendizaje permite este caso?', options: ['Una certificación para explorar de forma independiente', 'Una decisión terapéutica automática', 'Reconocer límites, documentarlos y pedir revisión docente'], answer: 2, explanation: 'El entrenador evalúa razonamiento en un caso simulado. La competencia clínica necesita práctica supervisada y evaluación profesional.' }
    ],
    mappingTask: 'Entrega un mapa parcial y un informe que conserven la evidencia válida e identifiquen lo que quedó sin evaluar.',
    expectedMap: ['Hallazgos válidos de GSV representados con sus mediciones', 'SSV media y distal indicadas como no evaluadas, sin calificarlas competentes, aplásicas o ablacionadas', 'Motivo de la limitación consignado en el informe', 'Sin conclusión de examen superficial completo normal', 'Revisión docente o evaluación complementaria según el contexto clínico y el protocolo del laboratorio'],
    source: consensus, sources: [consensus, aium]
  }
];

export const caseRubric = [
  { id: 'evidencia', label: 'Separa evidencia de suposición', criterion: 'Distingue hallazgo, artefacto y limitación; no inventa segmentos ni conexiones.', points: 2 },
  { id: 'hemodinamica', label: 'Interpreta el contexto hemodinámico', criterion: 'Relaciona vena, posición, maniobra, dirección y duración; identifica la guía aplicada.', points: 2 },
  { id: 'anatomia', label: 'Reconstruye el circuito', criterion: 'Localiza ejes, planos, origen demostrado, extensión y conexiones; reconoce variantes.', points: 2 },
  { id: 'mapa', label: 'Aplica el lenguaje cartográfico', criterion: 'Usa vistas, colores, trazos, símbolos y medidas con unidades y referencias coherentes.', points: 2 },
  { id: 'informe', label: 'Comunica límites y concordancia', criterion: 'Mantiene coherencia entre imágenes, mapa e informe; explicita qué no pudo evaluarse.', points: 2 }
];

export const caseAssessmentNote = 'Autoevaluación educativa de casos simulados. La puntuación y el avance no son una certificación ni acreditan competencia clínica. Utiliza la rúbrica con revisión docente y práctica supervisada.';
