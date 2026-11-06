// Educational acquisition sequence. Cartography rules: Bottini et al. 2023.
// Acquisition technique is explicitly attributed to complementary guidelines.
export const mappingSources = {
  consensus: { id: 'consensus', title: 'Primer Consenso Latinoamericano de Mapa Venoso Superficial y Perforante', year: 2023, url: 'https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf', citation: 'Bottini O, Rodriguez Santos F, Boroda A, et al. Int Angiol. 2023;42:45–58. doi:10.23736/S0392-9590.23.04991-X', scope: 'Representación del mapa superficial y perforante; no constituye por sí solo un protocolo completo de adquisición.' },
  svs: { id: 'svs', title: 'Guías SVS / AVF / AVLS: evaluación dúplex', year: 2023, url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11523430/', citation: 'Gloviczki P, et al. The 2023 SVS, AVF, and AVLS clinical practice guidelines. Part II. J Vasc Surg Venous Lymphat Disord.', scope: 'Posición, maniobras, documentación y criterios de reflujo: apartados 1.3–1.4.' },
  aium: { id: 'aium', title: 'AIUM: ultrasonido venoso periférico, revisión 2024', year: 2026, url: 'https://doi.org/10.1002/jum.70049', citation: 'AIUM Practice Parameter for the Performance of a Peripheral Venous Ultrasound Examination, 2024 Revision. J Ultrasound Med. 2026;45:E1–E9. doi:10.1002/jum.70049', scope: 'Técnica, registro, equipo, seguridad y límites de la exploración.' },
  esvs: { id: 'esvs', title: 'ESVS 2022: enfermedad venosa crónica', year: 2022, url: 'https://doi.org/10.1016/j.ejvs.2021.12.024', citation: 'De Maeseneer MG, et al. ESVS 2022 Clinical Practice Guidelines on the Management of Chronic Venous Disease of the Lower Limbs. Eur J Vasc Endovasc Surg. 2022;63:184–267. doi:10.1016/j.ejvs.2021.12.024', scope: 'Evaluación anatómica y hemodinámica, sección 2.3.' },
  asv: { id: 'asv', title: 'Actualización de término: vena safena anterior (ASV)', year: 2024, url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11523399/', citation: 'Meissner MH, Boyle EM, Labropoulos N, et al. The anterior saphenous vein. Part 1. J Vasc Surg Venous Lymphat Disord. 2024;12:101721. doi:10.1016/j.jvsv.2023.101721', scope: 'Recomienda ASV en lugar de AASV; se conserva AAGSV al enseñar la tabla histórica del consenso de 2023.' }
};

// Original teaching prompts: acquisition and representation remain distinct.
const acquisitionByStep = {
  preparar: {
    patient: 'Explica el objetivo y verifica tolerancia, movilidad y apoyos antes de decidir la posición.',
    probe: 'Prepara sonda, gel y limpieza según el contacto y el fabricante.',
    screen: 'Abre un caso ficticio identificado por lado y objetivo; evita empezar con una conclusión predeterminada.',
    capture: ['Hoja de trabajo con indicación, antecedentes relevantes y territorios que deben evaluarse.'],
    quality: ['La pregunta clínica y el alcance del examen quedan explícitos.'],
    nextDecision: 'Si hay una sospecha clínica aguda, sigue el protocolo asistencial correspondiente; este recorrido de reflujo no la resuelve por sí solo.'
  },
  equipo: {
    patient: 'Acerca el territorio al operador sin mantener hombro elevado o muñeca forzada.',
    probe: 'Comprueba qué lado del transductor tiene marcador y qué lado de la pantalla le corresponde, según la convención del laboratorio.',
    screen: 'Empieza en B: encuadra luz, pared y referencias; después optimiza el Doppler para la señal que intentas detectar.',
    capture: ['Imagen B legible y región Doppler delimitada al objetivo.'],
    quality: ['Puedes explicar el efecto de cada ajuste antes de cambiar otro.'],
    nextDecision: 'Si no hay señal, corrige técnica y ajustes antes de atribuir la ausencia a una enfermedad.'
  },
  posicion: {
    patient: 'Para reflujo, paciente estable, miembro examinado dependiente, relajado y sin carga; documenta la alternativa si no puede estar de pie.',
    probe: 'Usa gel suficiente y contacto ligero para no vaciar la vena que quieres interrogar.',
    screen: 'Confirma que la vena permanece visible al retirar presión excesiva.',
    capture: ['Posición utilizada y cualquier limitación de tolerancia o acceso.'],
    quality: ['La posición permite estudiar el objetivo y mantiene la seguridad del paciente.'],
    nextDecision: 'Ante intolerancia, cambia a una alternativa apropiada y conserva esa condición en el informe.'
  },
  profundo: {
    patient: 'La posición puede cambiar entre valorar compresión y valorar reflujo; documenta ambas si corresponde.',
    probe: 'En transversal, centra el segmento y comprime de forma controlada hasta valorar la coaptación, sin deslizarte fuera del vaso.',
    screen: 'Relaciona la secuencia antes/durante compresión con el mismo segmento anatómico.',
    capture: ['B sin/con compresión: femoral común, femoral proximal-media-distal y poplítea; completa el protocolo indicado.'],
    quality: ['No confundes una vena duplicada sin evaluar con compresión completa del eje.'],
    nextDecision: 'Un examen de reflujo o un esquema de puntos aislados no equivale a excluir TVP con un protocolo completo.'
  },
  ingle: {
    patient: 'Facilita acceso inguinal manteniendo privacidad y una posición tolerada.',
    probe: 'Localiza la confluencia en transversal; gira siguiendo la luz y recupera el eje largo antes del espectro.',
    screen: 'Verifica continuidad de GSV con la unión; no asignes nombres únicamente por la forma de una imagen.',
    capture: ['Anatomía de la unión y espectro basal más la maniobra identificada.'],
    quality: ['La unión y las tributarias relevantes tienen evidencia localizable.'],
    nextDecision: 'Si el origen del reflujo no está demostrado, continúa el rastreo sin etiquetar SFJ por defecto.'
  },
  gsv: {
    patient: 'Acceso medial con miembro relajado y dependiente para evaluar reflujo.',
    probe: 'Avanza con pequeños barridos continuos; vuelve al último punto reconocido si pierdes la vena.',
    screen: 'Reconoce las relaciones fasciales y confirma cada bifurcación en más de un plano.',
    capture: ['GSV: registros en muslo superior, medio, distal y pantorrilla; conserva límites de los segmentos anormales.'],
    quality: ['Puedes volver desde una tributaria al eje y justificar cuál trayecto seguiste.'],
    nextDecision: 'Detalla la variante observada; no conviertas la pérdida de imagen en ausencia anatómica.'
  },
  ssv: {
    patient: 'Acceso posterior seguro, evitando pedir una postura inestable para alcanzar la fosa poplítea.',
    probe: 'Sigue SSV cranealmente y localiza su terminación real antes de nombrar la unión.',
    screen: 'Distingue eje poplíteo, venas gastrocnemias y posible extensión craneal.',
    capture: ['Trayecto, terminación y respuesta hemodinámica de SSV; ampliación regional si aporta claridad.'],
    quality: ['La conexión dibujada coincide con una continuidad que sí se observó.'],
    nextDecision: 'Una SPJ típica no visualizada no debe completarse de memoria en la plantilla.'
  },
  tributarias: {
    patient: 'Explora las conexiones que explican el patrón clínico, sin limitarte a las venas visibles.',
    probe: 'Sigue cada rama hasta demostrar su relación con ejes, fascia o sistema profundo.',
    screen: 'Relaciona dirección y respuesta a maniobras con la anatomía, sin deducir función del calibre.',
    capture: ['Origen demostrado, propagación, conexiones y reentrada si puede establecerse.'],
    quality: ['Distingues una comunicante superficial de una perforante que atraviesa fascia.'],
    nextDecision: 'Documenta conexiones no resueltas y solicita evaluación adicional cuando el territorio exceda el estudio.'
  },
  reflujo: {
    patient: 'Mantén la posición identificada y explica la maniobra que se repetirá.',
    probe: 'Obtén eje largo, sitúa muestra dentro de la luz y orienta el haz para registrar una señal interpretable.',
    screen: 'Guarda antes, durante y después de la provocación; identifica dirección anatómica y línea de base.',
    capture: ['Espectro con escala temporal y cursores entre inicio y final del flujo retrógrado, con vena, lado y maniobra.'],
    quality: ['La duración procede del flujo observado, no del tiempo que mantuviste la compresión.'],
    nextDecision: 'Repite un registro equívoco; aplica el umbral de la guía al segmento concreto.'
  },
  diametros: {
    patient: 'Registra posición y evita que la sonda reduzca el diámetro por presión.',
    probe: 'Obtén un corte verdaderamente transversal; no midas una sección oblicua como diámetro.',
    screen: 'Para este mapa incluye pared venosa y especifica unidades y convención.',
    capture: ['Diámetros rotulados en mm; longitudes y alturas en cm con referencia anatómica.'],
    quality: ['Una dilatación focal queda diferenciada del calibre representativo de un segmento rectilíneo.'],
    nextDecision: 'Si el borde o el nivel no son reproducibles, registra la limitación en vez de inventar una medida.'
  },
  cartografia: {
    patient: 'Transfiere al mapa la lateralidad y las condiciones ya documentadas.',
    probe: 'Utiliza las imágenes guardadas para comprobar cada trayecto y conexión, sin añadir observaciones que no se adquirieron.',
    screen: 'Separa color de condición, trazo de plano y símbolos; conserva las tres caras y usa ampliaciones pertinentes.',
    capture: ['Mapa superficial/perforante legible que concuerda con el registro del estudio.'],
    quality: ['Los ejes normales también quedan documentados y las incertidumbres siguen visibles.'],
    nextDecision: 'Si dos caras o el informe discrepan, vuelve a la evidencia y corrige antes de cerrar.'
  },
  informe: {
    patient: 'El informe de práctica usa un código ficticio; el ejercicio no sustituye un estudio asistencial.',
    probe: 'Comprueba que el registro permite a otra persona localizar los segmentos explorados.',
    screen: 'Resume anatomía, función, medidas y limitaciones por territorio.',
    capture: ['Informe descriptivo, mapa e imágenes concordantes para revisión con docente.'],
    quality: ['No declaras normal un territorio no evaluado ni conviertes una medida en una indicación terapéutica automática.'],
    nextDecision: 'La evaluación de habilidad práctica y la revisión clínica corresponden a formación supervisada.'
  }
};

export const mappingSteps = [
  {
    id: 'preparar', number: 1, phase: 'Preparación', title: 'Empieza por la pregunta clínica', duration: '4 min',
    objective: 'Organizar una exploración identificada, trazable y segura antes de apoyar el transductor.',
    explanation: 'El mapa responde dónde está el circuito patológico. El estudio dúplex aporta la evidencia que permite dibujarlo. Una silueta coloreada por sí sola no demuestra permeabilidad, obstrucción ni reflujo.',
    actions: ['Confirma identidad, lado y motivo del estudio. Pregunta por trombosis previa, cirugía, ablación y cambios clínicos recientes.', 'Inspecciona ambos miembros según la indicación: trayectos visibles, edema, cambios cutáneos, úlcera y cicatrices. Registra la localización.', 'Explica que habrá cambios de posición, contacto con gel y maniobras de compresión. Prepara apoyo estable para el paciente.', 'Limpia y prepara el transductor según el fabricante y la política de control de infecciones.'],
    observe: 'Una hoja de trabajo con lado, fecha, antecedentes y pregunta clínica; no datos de pacientes reales en este entrenador.',
    pitfalls: ['Entrar directamente a dibujar varices sin estudiar sus conexiones.', 'Usar un simulador como sustituto de práctica supervisada.', 'Interpretar una exploración limitada como estudio normal.'],
    checkpoint: { question: '¿Qué acompaña obligatoriamente a la cartografía?', options: ['Un informe descriptivo y la evidencia del estudio dúplex', 'Solo una fotografía de las varices', 'El color de la piel'], answer: 0, feedback: 'El consenso presenta el mapa como complemento del informe del estudio, no como sustituto.' },
    sources: [{ id: 'consensus', detail: 'PDF p. 1, alcance' }, { id: 'aium', detail: 'Documentation; Quality and Safety' }]
  },
  {
    id: 'equipo', number: 2, phase: 'Preparación', title: 'Configura una imagen venosa útil', duration: '7 min',
    objective: 'Distinguir ajustes para ver paredes de ajustes para detectar flujo lento.',
    explanation: 'Primero consigue una imagen B interpretable; después añade Doppler. Los números de ganancia y de escala dependen de cada equipo y paciente: aprende el efecto y el criterio de calidad.',
    actions: ['Elige un transductor lineal con la frecuencia más alta que permita llegar a la vena. Para estructuras profundas puede necesitarse una frecuencia menor.', 'Selecciona el preajuste vascular venoso si existe. Ajusta profundidad para incluir la vena y sus referencias anatómicas; coloca el foco a la altura del vaso.', 'Ajusta ganancia B y compensación por profundidad (TGC) para distinguir luz, pared y fascia sin blanquear la luz.', 'Para Doppler venoso reduce escala y filtro de pared lo suficiente para detectar flujo lento; ajusta ganancia de color hasta antes del ruido extraluminal.', 'Mantén la caja de color pequeña y dirigida al área de interés. Inclina el haz o el transductor para evitar un ángulo de 90° respecto del flujo.'],
    observe: 'Vaso definido en B y señal Doppler utilizable cuando existe flujo; una ausencia de color aislada no prueba trombosis.',
    pitfalls: ['Confundir ganancia de recepción con potencia acústica.', 'Subir la ganancia hasta colorear tejidos.', 'Dejar un filtro alto que borre flujo venoso lento.', 'Interpretar aliasing como reflujo sin comprobar dirección y espectro.'],
    checkpoint: { question: 'La vena no muestra color. ¿Qué haces primero?', options: ['Concluir que está trombosada', 'Revisar ángulo, escala, ganancia, filtro y presión del transductor', 'Pintarla de negro en el mapa'], answer: 1, feedback: 'La falta de señal puede ser técnica. La evaluación integra B, compresión y Doppler, con el contexto clínico.' },
    sources: [{ id: 'aium', detail: 'Equipment Specifications; ALARA' }, { id: 'svs', detail: '1.4, examen dúplex' }]
  },
  {
    id: 'posicion', number: 3, phase: 'Preparación', title: 'Coloca al paciente para estudiar reflujo', duration: '5 min',
    objective: 'Crear distensión venosa sin comprometer la seguridad.',
    explanation: 'La gravedad modifica el llenado. La posición usada para estudiar compresibilidad no siempre es la adecuada para provocar reflujo.',
    actions: ['Para estudiar reflujo, usa bipedestación siempre que sea factible y segura, con apoyo estable.', 'Deja el miembro examinado relajado y sin carga; el peso descansa en el contralateral. Facilita acceso medial o posterior según el segmento.', 'Si no tolera estar de pie, documenta la alternativa. AIUM permite Trendelenburg inverso de al menos 45°; la sedestación puede servir para venas superficiales y perforantes de la pantorrilla.', 'Controla tolerancia. Interrumpe y asiste si hay mareo o inestabilidad. Anota la posición en el registro.'],
    observe: 'Venas distendidas con el músculo relajado y paciente estable.',
    pitfalls: ['Explorar reflujo con el paciente plano en supino y declararlo ausente.', 'Pedir al paciente que se sostenga sin apoyo.', 'Comprimir continuamente la vena con el transductor.'],
    checkpoint: { question: '¿Por qué registrar la posición?', options: ['Solo por una cuestión estética', 'Porque modifica el llenado y la evaluación hemodinámica', 'Porque sustituye el registro de maniobras'], answer: 1, feedback: 'Un resultado debe poder interpretarse junto con las condiciones en que se obtuvo.' },
    sources: [{ id: 'svs', detail: '1.4.1' }, { id: 'aium', detail: 'Venous Insufficiency: Lower Extremity, Technique 4' }]
  },
  {
    id: 'profundo', number: 4, phase: 'Rastreo', title: 'Revisa el sistema profundo', duration: '8 min',
    objective: 'Reconocer que excluirlo del dibujo superficial no equivale a omitir su estudio.',
    explanation: 'El consenso latinoamericano limita qué se representa en su mapa superficial y perforante. La exploración dúplex clínica debe evaluar también el sistema profundo conforme a la indicación y al protocolo del laboratorio.',
    actions: ['Identifica y sigue los segmentos profundos previstos por el protocolo: femoral común, femoral proximal, media y distal y poplítea; evalúa pantorrilla y territorios adicionales cuando corresponda a la indicación.', 'En los segmentos accesibles, obtén vistas transversales antes y durante compresión para valorar coaptación, junto con la información Doppler. No sustituyas un protocolo completo de TVP por una revisión de puntos aislados.', 'Registra anatomía, permeabilidad, cambios parietales y hemodinámica. Busca duplicaciones para no dejar un canal sin evaluar; documenta espectros profundos según el protocolo de reflujo.', 'Si hay hallazgos sugestivos de trombosis, obstrucción o limitación técnica, documenta y sigue el circuito clínico correspondiente; no fuerces el caso dentro de un ejercicio de reflujo superficial.'],
    observe: 'Compresibilidad de segmentos accesibles, señal y variación del flujo; imágenes identificadas por lado y nivel.',
    pitfalls: ['Llamar “vena femoral superficial” a la vena femoral y asumir que no es profunda.', 'Excluir TVP con una sola imagen o porque hay color.', 'Considerar que toda vena no compresible tiene la misma causa o antigüedad.'],
    checkpoint: { question: 'El sistema profundo no se dibuja en esta cartografía. ¿Se omite su evaluación?', options: ['Sí', 'No: su estudio se registra en el informe y las imágenes'], answer: 1, feedback: 'El alcance del mapa no define por sí solo el alcance de la exploración clínica.' },
    sources: [{ id: 'consensus', detail: 'PDF p. 1' }, { id: 'svs', detail: '1.4.3–1.4.4' }, { id: 'aium', detail: 'Venous Insufficiency; Venous Thromboembolic Disease' }]
  },
  {
    id: 'ingle', number: 5, phase: 'Rastreo', title: 'Encuentra la unión safenofemoral', duration: '8 min',
    objective: 'Relacionar la GSV con su unión y sus tributarias sin asumir una anatomía fija.',
    explanation: 'Una imagen redondeada en la ingle no basta para nombrar una vena. Confirma continuidad anatómica en un barrido y después observa la respuesta hemodinámica.',
    actions: ['En corte transversal identifica arteria femoral, vena femoral común y desembocadura de la GSV. Confirma relaciones y continuidad con barridos cortos.', 'Gira a longitudinal sobre la unión y ajusta el haz Doppler. Localiza el flujo en color antes de colocar la muestra espectral dentro de la luz.', 'Registra flujo basal y respuesta a Valsalva o aumento distal, conforme al protocolo y a la capacidad del paciente.', 'Distingue el segmento de unión, las válvulas terminal/preterminal cuando sean identificables y las tributarias implicadas. Si el patrón es complejo, planifica una ampliación inguinal.'],
    observe: 'Qué vaso origina el flujo retrógrado, por dónde se propaga y qué tributarias participan.',
    pitfalls: ['Tomar una imagen típica como prueba universal de la anatomía.', 'Pintar toda la GSV de rojo por observar reflujo solo en la unión.', 'Usar exclusivamente Valsalva para todos los segmentos distales.'],
    checkpoint: { question: 'Hay reflujo en SFJ. ¿Ya conoces toda su extensión?', options: ['Sí: toda la GSV será insuficiente', 'No: hay que seguir y documentar los segmentos'], answer: 1, feedback: 'El reflujo puede ser de unión, segmentario o axial; el barrido debe establecer cuál.' },
    sources: [{ id: 'consensus', detail: 'PDF pp. 9–11, ampliación inguinal' }, { id: 'svs', detail: '1.3.2; 1.4.2–1.4.4' }]
  },
  {
    id: 'gsv', number: 6, phase: 'Rastreo', title: 'Sigue la safena mayor de forma continua', duration: '10 min',
    objective: 'Identificar trayecto, plano fascial, variantes y límites del reflujo de GSV.',
    explanation: 'El rastreo combina continuidad en B con interrogaciones Doppler dirigidas. Una tributaria varicosa visible puede salir del compartimento safeno y no representar una continuación de la GSV.',
    actions: ['Sigue GSV por muslo y pierna con barridos transversales, reconociendo sus relaciones con las fascias.', 'Comprueba continuidad ante una bifurcación; identifica segmentos hipoplásicos, ausentes, duplicados y cambios de plano.', 'En los niveles de interés, gira a longitudinal, provoca aumento distal y registra el espectro después de liberar la maniobra.', 'Marca el inicio y final de cada segmento con reflujo y sigue la conexión hacia tributarias o perforantes. Registra longitud si es segmentario.', 'Mide y registra al menos un diámetro en muslo y otro en pierna para el mapa, sin usar una dilatación focal aislada como representación de todo el eje.'],
    observe: 'Un trayecto anatómico continuo y una lista de segmentos evaluados, con y sin reflujo.',
    pitfalls: ['Seguir solo las venas visibles.', 'Confundir epifascial con tortuoso: son conceptos distintos.', 'Suponer que calibre grande demuestra insuficiencia.'],
    checkpoint: { question: 'En la cartografía, ¿qué significa una línea ondulada?', options: ['Siempre tortuosidad', 'Plano epifascial', 'Flujo acelerado'], answer: 1, feedback: 'El consenso usa el tipo de trazo para el plano respecto de la fascia; no representa por sí solo la geometría real del vaso.' },
    sources: [{ id: 'consensus', detail: 'PDF pp. 2–4 y 8' }, { id: 'svs', detail: '1.3.2; 1.4.2–1.4.5' }]
  },
  {
    id: 'ssv', number: 7, phase: 'Rastreo', title: 'Explora safena menor y región poplítea', duration: '8 min',
    objective: 'Localizar la terminación real de SSV y las conexiones relevantes.',
    explanation: 'No todas las safenas menores terminan de la misma manera. Rastrea la vena y verifica su continuidad con la unión poplítea o su prolongación craneal antes de etiquetar.',
    actions: ['Obtén acceso posterior seguro. Identifica SSV en la pantorrilla y síguela cranealmente en B.', 'Identifica vena poplítea, venas gastrocnemias y sus desembocaduras. Distingue SSV de estas estructuras.', 'Interroga SSV y la región de su terminación con color y Doppler espectral usando aumento distal.', 'Registra diámetro, patrón de reflujo y, cuando corresponda, distancia de SPJ al pliegue de rodilla, indicando por encima o por debajo.', 'Busca extensión craneal, venas intersafenas u otras conexiones si participan en el circuito; usa ampliación poplítea si el dibujo de tres caras no es suficiente.'],
    observe: 'Terminación demostrada, conexiones y ubicación reproducible respecto del pliegue.',
    pitfalls: ['Inventar una SPJ cuando no se ha visualizado.', 'Asumir la misma anatomía en ambos lados.', 'Omitir un trayecto craneal que explica el reflujo.'],
    checkpoint: { question: 'No identificas una SPJ típica. ¿Qué documentas?', options: ['Una unión normal por defecto', 'La anatomía demostrada y las limitaciones; continúas el rastreo'], answer: 1, feedback: 'La variabilidad anatómica es parte del estudio y debe conservarse en el informe y el mapa.' },
    sources: [{ id: 'consensus', detail: 'PDF pp. 8 y 11–12' }, { id: 'aium', detail: 'Venous Insufficiency, Recording' }]
  },
  {
    id: 'tributarias', number: 8, phase: 'Rastreo', title: 'Reconstruye origen, trayecto y reentrada', duration: '9 min',
    objective: 'Explicar el circuito con las conexiones realmente observadas.',
    explanation: 'La cartografía es una síntesis anatómica y funcional. El objetivo del barrido no es colorear vasos sueltos, sino relacionar los hallazgos.',
    actions: ['Explora la safena anterior y las accesorias o tributarias que expliquen el patrón clínico. Verifica su plano y sus conexiones.', 'Sigue el flujo desde el origen demostrado de reflujo hasta su propagación y reentrada cuando pueda establecerse.', 'Busca perforantes que atraviesen fascia y participen en el circuito; distingue salida de flujo hacia el sistema superficial y reentrada hacia el profundo.', 'No deduzcas origen pélvico solo por localización de una variz. Si la sospecha excede la exploración, documenta y considera una evaluación específica.'],
    observe: 'Relaciones entre unión, eje, tributaria epifascial y perforante, incluyendo incertidumbres.',
    pitfalls: ['Representar toda perforante identificable aunque no pertenezca al circuito patológico.', 'Confundir una vena comunicante entre superficiales con una perforante.', 'Usar una flecha para afirmar una dirección no demostrada.'],
    checkpoint: { question: '¿Qué perforantes se incluyen en este mapa?', options: ['Todas las visibles, sin importar función', 'Las de fuga o reentrada que participan en un circuito patológico'], answer: 1, feedback: 'El criterio cartográfico es su participación en el circuito, no solo su presencia anatómica.' },
    sources: [{ id: 'consensus', detail: 'PDF pp. 2 y 8' }, { id: 'svs', detail: '1.4.2' }, { id: 'asv', detail: 'Actualización terminológica de 2024' }]
  },
  {
    id: 'reflujo', number: 9, phase: 'Medición', title: 'Demuestra y mide el reflujo', duration: '10 min',
    objective: 'Medir tiempo de flujo retrógrado en un espectro interpretable.',
    explanation: 'El color orienta y el Doppler pulsado documenta la evolución en el tiempo. Rojo y azul en la pantalla representan dirección respecto del haz según la barra activa, no competencia ni oxigenación.',
    actions: ['En longitudinal, coloca la muestra en la luz, ajusta escala, filtro, ganancia y barrido para registrar flujo basal, maniobra y recuperación.', 'En femoral común/SFJ utiliza Valsalva o aumento distal según el protocolo; en segmentos más distales utiliza aumento distal. En compresión distal, observa el aumento y el flujo al liberar; con Valsalva, identifica la respuesta durante la maniobra sin confundir ambos momentos.', 'Usa cursores sobre el eje temporal para medir el intervalo retrógrado observado, no la duración de la compresión o del esfuerzo. Repite si hay artefactos o resultado equívoco.', 'Como referencia SVS/AVF/AVLS: >0.5 s en ejes superficiales, tibiales, femoral profunda y perforantes; >1 s en femoral común, femoral y poplítea.', 'No extrapoles la definición de perforante patológica en C2 a todo contexto: esta guía combina flujo hacia afuera >0.5 s y diámetro >3.5 mm. El contexto y otros consensos importan.'],
    observe: 'Tiempo, segmento, maniobra y posición registrados; criterio utilizado identificado.',
    pitfalls: ['Medir el pico de compresión como si fuera reflujo.', 'Confundir aliasing con inversión real de flujo.', 'Llamar patológica a toda perforante por diámetro aislado.', 'Atribuir los umbrales al consenso de cartografía, que no los define.'],
    checkpoint: { question: 'GSV con 0.8 s de flujo retrógrado reproducible tras la maniobra: según SVS, ¿supera el umbral?', options: ['Sí, supera 0.5 s', 'No, todas las venas requieren más de 1 s'], answer: 0, feedback: 'Los umbrales dependen del segmento; la calidad de adquisición y el contexto siguen siendo necesarios.' },
    sources: [{ id: 'svs', detail: '1.3.1–1.3.3; 1.4.4' }, { id: 'aium', detail: 'Venous Insufficiency, Technique 1 y 5' }, { id: 'esvs', detail: '2.3.1, variabilidad de umbrales en perforantes' }]
  },
  {
    id: 'diametros', number: 10, phase: 'Medición', title: 'Mide diámetros, longitudes y referencias', duration: '9 min',
    objective: 'Producir mediciones que otra persona pueda localizar e interpretar.',
    explanation: 'Diámetro, longitud del segmento y altura anatómica son datos diferentes. Usa milímetros para diámetros y centímetros para longitudes y distancias del mapa.',
    actions: ['Para el consenso latinoamericano, mide el diámetro en transversal incluyendo la pared venosa. Evita comprimir el vaso y registra la posición.', 'Registra el diámetro mayor de GSV en muslo y pierna y de SSV; usa segmentos rectilíneos y describe una dilatación focal aparte. Añade diámetros de SFJ/SPJ y de accesoria anterior/posterior si es insuficiente.', 'En una perforante incluida en el circuito, mide el diámetro transversal a nivel de la fascia y registra PV más diámetro en mm.', 'Para el nivel de una perforante o de un cambio de plano, indica distancia en cm desde la planta del pie en pierna o desde el pliegue de rodilla en muslo; especifica referencia.', 'Para reflujo segmentario, registra la longitud del segmento en cm. Documenta dilatación focal aparte y limitaciones de visibilidad.'],
    observe: 'Cada número con unidad, vena, lado, nivel y referencia anatómica.',
    pitfalls: ['Mezclar mm y cm.', 'Medir oblicuo y sobredimensionar el vaso.', 'Anotar “32 cm” sin decir desde qué referencia.', 'Trasladar reglas de medición de otro protocolo sin declarar la diferencia.'],
    checkpoint: { question: '¿Qué medición corresponde a una perforante en el mapa?', options: ['Solo su diámetro', 'PV, diámetro en mm y altura en cm con referencia anatómica'], answer: 1, feedback: 'El calibre sin ubicación no permite recuperar de forma reproducible la perforante.' },
    sources: [{ id: 'consensus', detail: 'PDF pp. 7–8, sección 3.2' }, { id: 'svs', detail: '1.4.5, mediciones en dependencia' }]
  },
  {
    id: 'cartografia', number: 11, phase: 'Cartografía', title: 'Traduce el estudio al lenguaje del consenso', duration: '14 min',
    objective: 'Crear una síntesis legible sin perder plano, función ni localización.',
    explanation: 'En el mapa cada canal visual tiene un significado: color para condición, trazo para plano y figuras para estructuras. Estos colores no son los de la barra Doppler.',
    actions: ['Usa tres vistas por miembro: anteroexterna, anterointerna y posterior. Añade ampliaciones inguinal o poplítea cuando mejoren la lectura.', 'Representa GSV y SSV aun si son competentes. Añade variantes, venas accesorias o epifasciales patológicas y perforantes participantes.', 'Codifica condición: azul competente, rojo incompetente, gris ablacionada, negro trombosada; verde para estructuras linfoganglionares y amarillo para otras estructuras no vasculares.', 'Codifica plano: continuo recto subfascial, ondulado epifascial, segmentado hipoplásico y punteado aplásico o ablacionado. Resuelve la distinción entre aplasia y ablación con color y contexto.', 'Añade circunferencia hueca para perforante; círculo relleno para golfo/trayecto subfascial ondulante; óvalo para estructura no vascular; marcas perpendiculares para safenectomía/crossectomía.', 'Usa trama cuadriculada negra para úlcera, localizada respecto del circuito. Añade siglas, diámetros y distancias con unidades.'],
    observe: 'Un mapa que una persona puede leer sin confundir dirección Doppler con competencia.',
    pitfalls: ['Dibujar el sistema profundo completo dentro de la plantilla superficial de este consenso.', 'Dejar el mapa vacío en un estudio normal.', 'Usar ondulaciones para expresar toda tortuosidad real.', 'Pintar una úlcera según el color del lecho.'],
    checkpoint: { question: '¿Cómo queda un mapa superficial normal?', options: ['En blanco', 'Con GSV y SSV competentes y sus diámetros'], answer: 1, feedback: 'La representación normal también deja constancia de que se realizó la cartografía.' },
    sources: [{ id: 'consensus', detail: 'PDF pp. 1–9, secciones 1–4' }]
  },
  {
    id: 'informe', number: 12, phase: 'Cartografía', title: 'Cierra con informe y control de calidad', duration: '8 min',
    objective: 'Entregar una cartografía coherente con el registro dúplex y sus límites.',
    explanation: 'El resultado docente es un mapa defendible: cada dato debe proceder de una observación guardada. Completar pantallas en esta web no acredita competencia clínica.',
    actions: ['Revisa lado, vistas, nomenclatura y correspondencia entre mapa, imágenes e informe.', 'Resume los hallazgos anatómicos y hemodinámicos por sistema y segmento; describe estudio profundo aunque no se represente en esta plantilla.', 'Indica posición, maniobras, tiempos anormales, diámetros y referencias pertinentes. Especifica segmentos no visualizados y la causa.', 'No conviertas un hallazgo aislado en una recomendación terapéutica automática. La decisión integra indicación, clínica y evaluación especializada.', 'En práctica supervisada, presenta el estudio al docente y corrige discrepancias antes de utilizarlo para atención clínica.'],
    observe: 'Mapa e informe concordantes y una lista explícita de limitaciones.',
    pitfalls: ['Escribir “normal” cuando faltan segmentos.', 'Usar el caso simulado como informe de un paciente real.', 'Prometer que una evaluación web sustituye entrenamiento práctico.'],
    checkpoint: { question: 'No pudiste visualizar un segmento. ¿Cómo cierras el estudio?', options: ['Lo clasificas normal', 'Indicas el segmento y el motivo de la limitación'], answer: 1, feedback: 'La incertidumbre documentada es parte de un informe de calidad.' },
    sources: [{ id: 'consensus', detail: 'PDF pp. 7–8, imágenes subóptimas' }, { id: 'aium', detail: 'Documentation; Recording' }]
  }
].map(step => ({
  ...step,
  acquisition: acquisitionByStep[step.id],
  shortTitle: step.title,
  intro: step.explanation,
  checkpoint: { ...step.checkpoint, explanation: step.checkpoint.feedback },
  source: {
    label: mappingSources[step.sources[0].id].title,
    url: mappingSources[step.sources[0].id].url,
    pages: step.sources[0].detail
  },
  territory: ({ ingle: 'sfj', gsv: 'gsv', ssv: 'ssv', profundo: 'deep', tributarias: 'perforator' })[step.id] || 'all'
}));

export const glossary = [
  { term: 'GSV', name: 'Vena safena mayor', english: 'Great saphenous vein', definition: 'Eje safeno medial de pierna y muslo. Confirma su continuidad y relación fascial por rastreo, no por una imagen aislada.', source: 'consensus', page: 6 },
  { term: 'SSV', name: 'Vena safena menor', english: 'Small saphenous vein', definition: 'Eje safeno posterior de la pantorrilla, con terminación variable. La anatomía de su desembocadura debe demostrarse.', source: 'consensus', page: 6 },
  { term: 'AAGSV', name: 'Safena accesoria anterior de muslo (tabla de 2023)', english: 'Anterior accessory great saphenous vein', definition: 'Abreviatura histórica en el consenso. Un panel AVLS/AVF/UIP de 2024 recomienda “vena safena anterior”, ASV; no debe confundirse automáticamente con una tributaria epifascial.', source: 'asv', page: null },
  { term: 'ASV', name: 'Vena safena anterior', english: 'Anterior saphenous vein', definition: 'Término recomendado en 2024 para sustituir anterior accessory saphenous vein. La equivalencia histórica facilita leer el consenso de 2023.', source: 'asv', page: null },
  { term: 'PAGSV', name: 'Safena accesoria posterior de muslo', english: 'Posterior accessory great saphenous vein', definition: 'Denominación usada por el consenso para la accesoria posterior de muslo.', source: 'consensus', page: 7 },
  { term: 'SFJ', name: 'Unión safenofemoral', english: 'Saphenofemoral junction', definition: 'Conexión de GSV con el sistema femoral. El mapa puede incluir una ampliación para detallar tributarias, condición y diámetro.', source: 'consensus', page: 7 },
  { term: 'SPJ', name: 'Unión safenopoplítea', english: 'Saphenopopliteal junction', definition: 'Unión de SSV con la vena poplítea cuando existe esa disposición. Se localiza respecto del pliegue de rodilla.', source: 'consensus', page: 7 },
  { term: 'PV', name: 'Vena perforante', english: 'Perforating vein', definition: 'Vena que atraviesa fascia para comunicar sistemas superficial y profundo. En esta cartografía se incluyen las que participan en circuitos patológicos.', source: 'consensus', page: 7 },
  { term: 'PPV', name: 'Vena perforante poplítea', english: 'Popliteal perforating vein', definition: 'Perforante poplítea; puede participar en variantes del circuito de reflujo regional.', source: 'consensus', page: 7 },
  { term: 'GPV', name: 'Vena perforante glútea', english: 'Gluteal perforating vein', definition: 'Abreviatura de perforante glútea en la tabla del consenso.', source: 'consensus', page: 7 },
  { term: 'EPV', name: 'Vena pudenda externa', english: 'External pudendal vein', definition: 'Tributaria que puede requerir representación en la ampliación inguinal.', source: 'consensus', page: 7 },
  { term: 'SCI', name: 'Vena circunfleja ilíaca superficial', english: 'Superficial circumflex iliac vein', definition: 'Sigla empleada en el consenso para una tributaria de la región inguinal.', source: 'consensus', page: 7 },
  { term: 'SEPi', name: 'Vena epigástrica superficial', english: 'Superficial epigastric vein', definition: 'Tributaria de la región del cayado; se detalla si participa en el patrón observado.', source: 'consensus', page: 7 },
  { term: 'CE SSV', name: 'Extensión craneal de SSV', english: 'Cranial extension of the small saphenous vein', definition: 'Continuación craneal de la safena menor; debe seguirse cuando explique la anatomía o el reflujo.', source: 'consensus', page: 7 },
  { term: 'ASSV', name: 'Vena accesoria superficial de SSV', english: 'Superficial accessory vein of the small saphenous vein', definition: 'Abreviatura de la tabla histórica; distinguir su trayecto del eje safeno menor.', source: 'consensus', page: 7 },
  { term: 'IV', name: 'Venas intersafenas', english: 'Intersaphenous veins', definition: 'Conexiones entre territorios safenos; no son por ese solo hecho venas perforantes.', source: 'consensus', page: 7 },
  { term: 'LMV', name: 'Vena marginal lateral', english: 'Lateral marginal vein', definition: 'Variante que tiene su sigla específica en la tabla del consenso.', source: 'consensus', page: 7 },
  { term: 'CiV', name: 'Vena ciática', english: 'Sciatic vein', definition: 'Variante venosa contemplada en la nomenclatura y en posibles conexiones poplíteas.', source: 'consensus', page: 7 },
  { term: 'LNVN', name: 'Red venosa linfonodal', english: 'Lymph node venous network', definition: 'El consenso pide representarla en la ampliación inguinal si está dilatada.', source: 'consensus', page: 11 },
  { term: 'Epifascial', name: 'Plano superficial a la fascia', english: 'Epifascial', definition: 'En el mapa se expresa con trazo ondulado. La ondulación codifica plano, no necesariamente la forma real del vaso.', source: 'consensus', page: 4 },
  { term: 'Subfascial', name: 'Plano codificado con trazo recto', english: 'Subfascial', definition: 'Término utilizado por este consenso para los trayectos safenos bajo la fascia superficial; no equivale a dibujar todo el sistema profundo.', source: 'consensus', page: 4 },
  { term: 'Reflujo segmentario', name: 'Flujo retrógrado limitado a parte de un eje', english: 'Segmental reflux', definition: 'Reflujo en una porción del eje; se deben localizar sus límites y registrar la longitud si se representa según el consenso.', source: 'svs', page: null },
  { term: 'Reflujo de unión', name: 'Reflujo limitado a SFJ o SPJ', english: 'Junctional reflux', definition: 'No permite asumir insuficiencia de todo el trayecto safeno.', source: 'svs', page: null },
  { term: 'Reflujo axial', name: 'Patrón retrógrado continuo del eje', english: 'Axial reflux', definition: 'Se define según el vaso y su extensión en la guía utilizada; no es sinónimo de cualquier reflujo localizado.', source: 'svs', page: null },
  { term: 'Fuga', name: 'Salida que alimenta el circuito superficial', english: 'Escape point', definition: 'La función se establece por anatomía y dirección de flujo demostradas; una perforante no se clasifica solo por su diámetro.', source: 'consensus', page: 8 },
  { term: 'Reentrada', name: 'Retorno desde el circuito superficial', english: 'Re-entry', definition: 'Conexión de retorno hacia el sistema profundo que forma parte del circuito observado.', source: 'consensus', page: 8 }
];

export const symbols = [
  { id: 'competent', label: 'Vena competente', type: 'color', color: '#2563eb', glyph: 'line', description: 'Azul en la cartografía. No significa alejamiento del haz Doppler.', page: 3 },
  { id: 'reflux', label: 'Vena incompetente', type: 'color', color: '#dc2626', glyph: 'line', description: 'Rojo en la cartografía cuando se ha demostrado incompetencia.', page: 3 },
  { id: 'ablated', label: 'Vena ablacionada', type: 'color', color: '#848b96', glyph: 'dotted', description: 'Gris; combinar con trazo y antecedentes para distinguir de aplasia.', page: 3 },
  { id: 'thrombosed', label: 'Vena trombosada', type: 'color', color: '#16181d', glyph: 'line', description: 'Negro. La trombosis se establece mediante evaluación clínica y dúplex, no por ausencia de color aislada.', page: 3 },
  { id: 'lymph', label: 'Estructura linfoganglionar', type: 'color', color: '#16a34a', glyph: 'oval', description: 'Verde para estructuras linfoganglionares relacionadas.', page: 3 },
  { id: 'nonvascular', label: 'Otra estructura no vascular', type: 'color', color: '#eab308', glyph: 'oval', description: 'Amarillo para estructuras como nervio o quiste de Baker; no diagnosticar solo por su representación.', page: 3 },
  { id: 'subfascial', label: 'Trayecto subfascial', type: 'stroke', color: '#2563eb', glyph: 'line', description: 'Línea recta continua: informa el plano fascial.', page: 3 },
  { id: 'epifascial', label: 'Trayecto epifascial', type: 'stroke', color: '#dc2626', glyph: 'wavy', description: 'Línea ondulada: plano epifascial, no tortuosidad por sí sola.', page: 4 },
  { id: 'hypoplasia', label: 'Trayecto hipoplásico', type: 'stroke', color: '#2563eb', glyph: 'dashed', description: 'Línea recta segmentada.', page: 3 },
  { id: 'aplasia', label: 'Trayecto aplásico', type: 'stroke', color: '#2563eb', glyph: 'dotted', description: 'Línea recta punteada. El mismo tipo de trazo con gris representa ablación; el color y el contexto distinguen ambas condiciones.', page: 3 },
  { id: 'synechiae', label: 'Bridas / sinequias', type: 'stroke', color: '#dc2626', glyph: 'crosses', description: 'Cruces negras superpuestas al trayecto safeno insuficiente con bridas tras trombosis o fracaso de ablación.', page: 4 },
  { id: 'wall', label: 'Engrosamiento parietal', type: 'stroke', color: '#dc2626', glyph: 'outlined', description: 'Bordes negros finos sobre el trayecto safeno afectado; conservar la condición funcional mediante el color.', page: 4 },
  { id: 'perforator', label: 'Perforante', type: 'shape', color: '#dc2626', glyph: 'circle', description: 'Circunferencia sin relleno. Añadir PV, diámetro y referencia de altura.', page: 6 },
  { id: 'gulf', label: 'Golfo / trayecto subfascial ondulante', type: 'shape', color: '#dc2626', glyph: 'filled-circle', description: 'Círculo relleno colocado en el trayecto, según la leyenda del consenso.', page: 6 },
  { id: 'oval', label: 'Estructura no vascular', type: 'shape', color: '#eab308', glyph: 'oval', description: 'Óvalo, con el color que corresponda a su clase.', page: 6 },
  { id: 'surgery', label: 'Safenectomía / crossectomía', type: 'shape', color: '#16181d', glyph: 'ticks', description: 'Trazo con pequeñas paralelas perpendiculares.', page: 6 },
  { id: 'ulcer', label: 'Úlcera venosa', type: 'shape', color: '#16181d', glyph: 'hatch', description: 'Área con cuadriculado negro, contorno y ubicación aproximados de la úlcera; su relación con el circuito es lo relevante.', page: 3 }
];

export const mappingQualityChecklist = [
  'Lado, posición y maniobras identificados',
  'Sistema profundo evaluado según indicación y descrito en el informe',
  'GSV y SSV representadas, incluso si son competentes',
  'Tres caras por miembro, con ampliaciones si son necesarias',
  'Origen, extensión y conexiones del reflujo sustentados por el estudio',
  'Colores de condición y trazos de plano usados sin mezclarlos con la barra Doppler',
  'Diámetros en mm; longitudes y alturas en cm con referencia anatómica',
  'Perforantes participantes identificadas y localizadas',
  'Variantes, tratamientos previos y estructuras relacionadas registradas',
  'Imágenes, mapa e informe concordantes; limitaciones explícitas'
];

export const clinicalCaveats = [
  'Entrenador educativo con imágenes sintéticas: no conectado a un ecógrafo ni validado para diagnóstico.',
  'El consenso latinoamericano estandariza la cartografía superficial y perforante; la adquisición se apoya en guías complementarias identificadas.',
  'Una evaluación web no acredita competencia para realizar exploraciones clínicas de forma independiente: se requiere práctica supervisada.',
  'La cartografía acompaña al informe descriptivo y a las imágenes; no sustituye el estudio profundo ni una evaluación de trombosis cuando está indicada.',
  'Los umbrales de reflujo dependen del segmento y de la guía. El diámetro aislado no demuestra incompetencia ni indica tratamiento.',
  'No introduzcas información identificable de pacientes reales en los ejercicios.'
];
