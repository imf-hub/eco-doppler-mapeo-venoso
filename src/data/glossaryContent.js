// Original educational copy. Locator strings identify the supporting topic;
// no illustration or device number is a clinical preset or patient result.
export const glossarySources={
 iaea:{title:'IAEA · Diagnostic Radiology Physics: A Handbook for Teachers and Students',url:'https://www.iaea.org/publications/8841/diagnostic-radiology-physics'},
 who:{title:'OMS · Manual of Diagnostic Ultrasound, volumen 1',url:'https://www.who.int/publications/i/item/9789241547451'},
 terminology:{title:'AIUM · Recommended Ultrasound Terminology',url:'https://aium.s3.amazonaws.com/resourceLibrary/rut.pdf'},
 peripheral:{title:'AIUM · Examen venoso periférico, revisión 2024',url:'https://doi.org/10.1002/jum.70049'},
 svs:{title:'SVS / AVF / AVLS · Guías de varices, evaluación dúplex',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11523430/'},
 prudent:{title:'AIUM · Uso clínico prudente y seguridad del ultrasonido',url:'https://www.aium.org/resources/official-statements/view/prudent-clinical-use-and-safety-of-diagnostic-ultrasound'},
 alara:{title:'AIUM · Principio ALARA',url:'https://www.aium.org/resources/official-statements/view/as-low-as-reasonably-achievable-(alara)-principle'},
 ods:{title:'AIUM · Interpretación de los índices de salida, versión 3',url:'https://doi.org/10.1002/jum.15159'},
 fda:{title:'FDA · Ultrasound Imaging',url:'https://www.fda.gov/radiation-emitting-products/medical-imaging/ultrasound-imaging'}
};
const ref=(id,section)=>({id,section});
const p12=topic=>[ref('iaea','Capítulo 12, Physics of Ultrasound: '+topic)];
const p13=topic=>[ref('iaea','Capítulo 13, Ultrasound Imaging: '+topic)];
const term=entry=>[ref('terminology','Entrada: '+entry)];
const vein=topic=>[ref('peripheral',topic)];
const g=(definition,mechanism,observe,pitfall,sources,related,legacyConcept=null)=>({definition,mechanism,observe,pitfall,sources,related,legacyConcept});
export const glossaryContent={
 'sonido':g(
  'Perturbación mecánica que transporta energía mediante variaciones de presión y desplazamientos locales de las partículas de un medio material.',
  'En una onda longitudinal, las partículas oscilan alrededor de su posición mientras avanzan compresiones y rarefacciones. La animación ralentiza el fenómeno para separar movimiento local y propagación.',
  ['Sigue una compresión que avanza.','Observa la partícula marcada oscilando localmente.','Distingue transporte de energía y desplazamiento de materia.'],
  'No interpretes las partículas como sangre transportada desde el transductor; aquí representan el medio acústico.',p12('§12.2.1, ondas ultrasónicas unidimensionales'),['ultrasonido','frecuencia','amplitud'],'sound'),
 'ultrasonido':g(
  'Sonido de frecuencia superior al límite audible humano convencional de veinte kilohertz; la ecografía diagnóstica utiliza habitualmente frecuencias expresadas en megahertz.',
  'El transductor genera ciclos rápidos de presión y recibe ecos. La onda sigue siendo mecánica: necesita un medio y no es radiación ionizante.',
  ['Identifica los ciclos de la portadora.','Cambia MHz sin cambiar el tipo de onda.','Separa la onda acústica de su visualización ralentizada.'],
  'Las velocidades de reproducción no corresponden a la frecuencia real del ecógrafo.',[...p12('§12.1 y §12.2, ultrasonido y ondas'),ref('fda','Description')],['sonido','piezoelectricidad','eco'],'sound'),
 'frecuencia':g(
  'Número de ciclos de la onda acústica que ocurren por segundo; en ecografía se expresa habitualmente en megahertz.',
  'Con velocidad de propagación fija, aumentar f reduce período y longitud de onda: T=1/f y λ=c/f. La portadora acústica no es la repetición de pulsos.',
  ['Cuenta ciclos en un mismo intervalo.','Compara la separación entre frentes.','Mantén constante la velocidad del medio.'],
  'No confundas frecuencia portadora en MHz con PRF en kHz ni con rapidez de la animación.',p12('§12.2.1, frecuencia, período y longitud de onda'),['periodo','longitud-de-onda','prf'],'frequency'),
 'periodo':g(
  'Tiempo que tarda un ciclo completo de la onda portadora; es el inverso de su frecuencia y suele expresarse en microsegundos.',
  'El intervalo entre dos crestas consecutivas de una misma oscilación es T. Al reducirlo, aparecen más ciclos por segundo; no cambia automáticamente el intervalo entre pulsos.',
  ['Localiza dos crestas consecutivas.','Sigue el intervalo temporal señalado.','Relaciona un período menor con frecuencia mayor.'],
  'Período de la portadora y período de repetición de pulsos son magnitudes distintas.',p12('§12.2.1, descripción temporal de ondas'),['frecuencia','prp','duracion-pulso'],'frequency'),
 'longitud-de-onda':g(
  'Distancia recorrida durante un ciclo de la onda acústica; relaciona velocidad de propagación y frecuencia mediante la expresión λ=c/f.',
  'Dos puntos consecutivos con la misma fase están separados por λ. El dibujo mantiene una velocidad asumida del medio para relacionar distancia espacial y ciclos temporales.',
  ['Busca dos compresiones consecutivas.','Sigue la distancia marcada en milímetros.','Distingue distancia espacial de intervalo temporal.'],
  'La longitud de onda no equivale por sí sola a la resolución de toda la imagen.',p12('§12.2.1, ondas ultrasónicas y λ=c/f'),['frecuencia','velocidad-propagacion','longitud-espacial-pulso'],'frequency'),
 'amplitud':g(
  'Magnitud máxima de una oscilación respecto de su valor de equilibrio; puede describir presión acústica o amplitud de una señal recibida.',
  'Cambiar amplitud modifica la excursión de la onda, no necesariamente sus ciclos. En condiciones comparables de onda plana, la intensidad acústica depende del cuadrado de la amplitud de presión.',
  ['Compara altura de las oscilaciones.','Conserva separación entre ciclos.','Distingue amplitud, frecuencia e intensidad.'],
  'Una onda más alta no significa más ciclos ni mayor velocidad de propagación.',p12('§12.2.2, presión acústica e intensidad'),['frecuencia','ganancia','potencia-acustica'],'sound'),
 'velocidad-propagacion':g(
  'Rapidez con que avanza la perturbación acústica por el medio; depende de sus propiedades y no del movimiento sanguíneo.',
  'El equipo suele convertir retrasos en profundidad asumiendo 1540 m/s para tejido blando. Si la velocidad real difiere, la localización reconstruida puede presentar error.',
  ['Conserva un mismo trayecto de ida y vuelta.','Compara el tiempo de llegada del eco.','Separa velocidad acústica y velocidad sanguínea.'],
  '1540 m/s es una aproximación de reconstrucción, no la velocidad exacta de todos los tejidos.',p12('§12.3.1, velocidad del sonido e impedancia'),['eco','longitud-de-onda','refraccion'],'echo'),
 'impedancia-acustica':g(
  'Propiedad del medio definida como densidad por velocidad acústica; la diferencia entre impedancias influye en la reflexión en una interfaz.',
  'A incidencia normal y en el modelo de medios ideales, la fracción de intensidad reflejada depende de ((Z₂−Z₁)/(Z₂+Z₁))². La animación conserva separados pulso incidente, reflexión y transmisión.',
  ['Identifica los dos medios y su interfaz.','Compara señal reflejada y transmitida.','Observa el efecto del contraste de impedancias.'],
  'La reflexión depende también de la geometría; esta relación ideal no caracteriza por sí sola una lesión.',p12('§12.2.3 y §12.3.1, reflexión e impedancia'),['reflexion','acoplamiento','refraccion'],'echo'),
 'eco':g(
  'Señal acústica que regresa al transductor después de interactuar con estructuras; su retraso permite estimar profundidad y su amplitud participa en el brillo.',
  'El tiempo medido incluye ida y vuelta. Para una trayectoria simple y velocidad asumida c, la profundidad se estima como d=ct/2.',
  ['Sigue el pulso que sale.','Distingue la señal que regresa.','Relaciona el retraso doble con la profundidad.'],
  'Un eco tardío puede proceder de trayectorias múltiples; no siempre representa un reflector directamente más profundo.',[...p12('§12.4, transducción y pulso–eco'),ref('fda','Description: amplitud y tiempo de vuelo')],['velocidad-propagacion','profundidad','reverberacion'],'echo'),
 'reflexion':g(
  'Retorno de parte de la energía acústica al encontrar una interfaz; sus características dependen del contraste de impedancias y de la incidencia.',
  'Una interfaz grande y lisa puede reflejar especularmente: la dirección reflejada cambia con la incidencia. El retorno hacia la sonda no es igual desde todos los ángulos.',
  ['Sigue el rayo incidente hasta la interfaz.','Distingue retorno de transmisión.','Relaciona orientación y recepción del eco.'],
  'Una pared poco visible por incidencia desfavorable no demuestra que la estructura haya desaparecido.',p12('§12.2.3, reflexión y transmisión'),['impedancia-acustica','anisotropia','acoplamiento'],'echo'),
 'refraccion':g(
  'Cambio de dirección de una onda al atravesar oblicuamente una interfaz entre medios con diferentes velocidades de propagación del sonido.',
  'La dirección transmitida obedece a la ley de Snell. El modelo fija dos velocidades y cambia la incidencia respecto de la normal; no asigna esas velocidades a tejidos concretos.',
  ['Localiza la normal a la interfaz.','Compara incidencia y transmisión.','Observa la desviación al cambiar el ángulo.'],
  'No midas los ángulos desde la superficie ni apliques una trayectoria recta a un haz refractado.',p12('§12.2.3, transmisión y refracción'),['velocidad-propagacion','reflexion','imagen-espejo'],'echo'),
 'dispersion':g(
  'Redistribución de energía acústica en distintas direcciones por estructuras pequeñas o irregularidades; parte de esa energía puede regresar como retrodispersión.',
  'Numerosos dispersores contribuyen al eco recibido. En sangre, la señal combina contribuciones de células y agregados; el dibujo amplía objetos y distancias para mostrar el mecanismo.',
  ['Sigue señales emitidas desde pequeños dispersores.','Identifica la porción que vuelve al receptor.','Distingue dispersión de reflexión especular.'],
  'El número de puntos del modelo no estima hematocrito ni concentración celular de un paciente.',p12('§12.3.2, scattering'),['reflexion','atenuacion','efecto-doppler'],'doppler'),
 'absorcion':g(
  'Conversión de parte de la energía acústica en otras formas de energía, principalmente calor, durante su propagación a través del medio.',
  'La absorción contribuye a la atenuación. El esquema varía un coeficiente ilustrativo y muestra pérdida progresiva; no calcula elevación de temperatura ni una dosis biológica en un paciente.',
  ['Sigue la reducción durante el recorrido.','Distingue energía perdida de eco reflejado.','Compara trayectos con diferente coeficiente.'],
  'Un coeficiente del simulador no identifica tejido ni permite predecir temperatura clínica.',p12('§12.2.4 y §12.6.1, atenuación y mecanismos térmicos'),['atenuacion','indice-termico','alara'],'attenuation'),
 'atenuacion':g(
  'Disminución de la señal acústica durante su recorrido por absorción, dispersión y otras pérdidas; suele aumentar con frecuencia y distancia en tejidos blandos.',
  'Un eco profundo ha atravesado el trayecto de ida y de retorno. La compensación electrónica puede aumentar lo recibido, pero no recrea información que no llegó al transductor.',
  ['Compara señal superficial y profunda.','Sigue la pérdida en ida y vuelta.','Distingue atenuación de amplificación posterior.'],
  'Más ganancia no garantiza recuperar un eco ausente ni mejora por sí sola la penetración.',p12('§12.2.4 y §12.3.1, atenuación y coeficientes'),['absorcion','tgc','sombra-acustica'],'attenuation'),
 'acoplamiento':g(
  'Continuidad acústica entre transductor y superficie explorada; el gel reduce la presencia de aire, cuya interfaz dificulta la transmisión útil.',
  'El aire interpuesto produce una gran discontinuidad de impedancia. El esquema separa cara activa, gel y piel, manteniendo contacto ligero para no deformar innecesariamente la vena.',
  ['Identifica la cara activa del transductor.','Compara aire interpuesto y gel continuo.','Distingue contacto acústico de presión excesiva.'],
  'Apretar más no sustituye el gel y puede colapsar la vena al valorar flujo o calibre.',[ref('fda','Description: transductor, piel y capa de gel'),...vein('Quality and Safety: Infection Control')],['impedancia-acustica','compresibilidad','piezoelectricidad'],'transducer'),
 'piezoelectricidad':g(
  'Acoplamiento entre deformación mecánica y carga eléctrica de ciertos materiales, utilizado para emitir ultrasonido y convertir los ecos recibidos en señales eléctricas.',
  'La excitación eléctrica deforma los elementos; un eco provoca deformación y respuesta eléctrica. Se representan emisión y recepción como procesos relacionados, separados en el tiempo en pulso–eco.',
  ['Relaciona excitación eléctrica y deformación.','Sigue la onda que se transmite.','Observa la respuesta eléctrica durante recepción.'],
  'La animación amplía enormemente la deformación; no muestra dimensiones ni voltajes reales del equipo.',p12('§12.4, ultrasonic transduction'),['arreglo-lineal','pulso','eco'],'transducer'),
 'arreglo-lineal':g(
  'Conjunto de elementos dispuestos en línea que permite formar, enfocar y desplazar haces electrónicos para obtener una imagen habitualmente rectangular.',
  'Grupos de elementos participan en emisión y recepción. Su selección y temporización determinan el haz; contar los elementos dibujados no describe toda la arquitectura de una sonda comercial.',
  ['Localiza la fila de elementos.','Sigue el grupo activo durante el barrido.','Relaciona su posición con una línea de imagen.'],
  'El número de elementos del dibujo no es una recomendación de compra ni un ajuste clínico.',p13('§13.2, principios de sistemas de arreglos'),['formacion-haz','orientacion-haz','densidad-lineas'],'transducer'),
 'formacion-haz':g(
  'Combinación temporal de señales de múltiples elementos para orientar o enfocar la sensibilidad acústica, tanto durante emisión como durante recepción.',
  'Los retardos hacen que contribuciones de distintos elementos coincidan en una región o dirección. En recepción, compensan diferencias de tiempo antes de sumar las señales.',
  ['Compara activaciones entre elementos.','Sigue frentes que convergen en el objetivo.','Relaciona retardos con foco y dirección.'],
  'Enfocar y dirigir el haz no son equivalentes a girar físicamente la sonda sobre la piel.',p13('§13.2.1, electronic focusing and beam steering'),['arreglo-lineal','foco','orientacion-haz'],'transducer'),
 'campo-cercano':g(
  'Región próxima al emisor donde la interferencia produce una distribución compleja del campo; más lejos predomina la divergencia del haz.',
  'La extensión depende de apertura y longitud de onda. Una aproximación de pistón circular ideal usa D²/(4λ); no describe por sí sola un arreglo enfocado comercial.',
  ['Identifica apertura del emisor ideal.','Distingue zona próxima y divergencia lejana.','Observa cómo cambia la extensión con la apertura.'],
  'El esquema ideal no proporciona una profundidad focal clínica ni una frontera exacta para todas las sondas.',[...p12('§12.4, características de los transductores'),...p13('§13.2.2, array beam characteristics')],['longitud-de-onda','foco','resolucion-lateral'],'focus'),
 'foco':g(
  'Región donde el haz tiene menor anchura en un plano determinado; colocarla cerca del objetivo puede favorecer la resolución lateral.',
  'El haz converge y después diverge. Cambiar foco desplaza la zona estrecha, sin convertir todas las profundidades en igualmente resueltas ni cambiar automáticamente el foco elevacional.',
  ['Busca la cintura del haz.','Compara anchura en el objetivo y fuera de él.','Mantén el objetivo fijo al mover el foco.'],
  'Un foco bien situado no compensa por sí solo mala señal, acoplamiento o frecuencia inadecuada.',p13('§13.2.1–13.2.3, enfoque electrónico y multifocal'),['resolucion-lateral','formacion-haz','resolucion-elevacional'],'focus'),
 'resolucion-axial':g(
  'Capacidad para distinguir reflectores próximos situados a lo largo del eje del haz; depende especialmente de la respuesta temporal del sistema.',
  'En el modelo simple, se separan ecos cuando su separación evita superposición; la resolución axial se aproxima a la mitad de la longitud espacial del pulso.',
  ['Localiza blancos uno detrás del otro.','Compara ecos separados y superpuestos.','Relaciona pulso más corto con separación axial.'],
  'Cambiar brillo o ampliar píxeles no equivale a mejorar resolución axial adquirida.',p13('§13.2.2, características del haz y resolución; formación de imagen pulso–eco'),['longitud-espacial-pulso','duracion-pulso','resolucion-lateral'],'resolution'),
 'resolucion-lateral':g(
  'Capacidad para distinguir reflectores próximos situados lado a lado en el plano de imagen, transversalmente a la dirección del haz.',
  'Un haz ancho mezcla respuestas de blancos cercanos. Su anchura cambia con profundidad y enfoque; el dibujo conserva los blancos mientras modifica la anchura representada.',
  ['Identifica los dos blancos laterales.','Compara haz estrecho y ancho.','Sigue la unión o separación de sus respuestas.'],
  'Más líneas no eliminan la limitación impuesta por un haz demasiado ancho.',p13('§13.2.2, array beam characteristics y resolución lateral'),['foco','densidad-lineas','resolucion-axial'],'resolution'),
 'resolucion-elevacional':g(
  'Capacidad para distinguir estructuras separadas perpendicularmente al plano de imagen; se relaciona con el espesor del haz o del corte adquirido.',
  'La imagen bidimensional integra señales dentro de un volumen de espesor finito. Un objeto fuera del plano central puede contribuir si permanece dentro de ese espesor.',
  ['Localiza el plano central de imagen.','Observa el espesor que lo rodea.','Sigue qué blancos quedan incluidos al ensancharlo.'],
  'El corte ecográfico no es una lámina sin espesor; estructuras fuera de su centro pueden aportar ecos.',p13('§13.2.2, características elevacionales del haz'),['espesor-corte','resolucion-lateral','foco'],'resolution'),
 'pulso':g(
  'Tren breve de ciclos ultrasónicos emitido como una unidad, seguido por un intervalo de escucha para recibir y localizar ecos.',
  'Cada pulso contiene varias oscilaciones de la portadora. El número de ciclos y su período determinan duración y longitud espacial; la repetición de pulsos se describe por PRF.',
  ['Cuenta ciclos dentro de un pulso.','Separa emisión y escucha.','Distingue ciclos internos de pulsos sucesivos.'],
  'Frecuencia portadora y número de pulsos por segundo no son la misma magnitud.',p12('§12.4, funcionamiento pulso–eco y transducción'),['duracion-pulso','longitud-espacial-pulso','prf'],'transducer'),
 'duracion-pulso':g(
  'Tiempo ocupado por un único pulso desde su inicio hasta su final; depende del número de ciclos y del período portador.',
  'Para un tren de n ciclos, duración=nT. Un pulso más largo puede aumentar superposición axial; no debe confundirse con el tiempo entre inicios de pulsos consecutivos.',
  ['Marca principio y final del mismo tren.','Cuenta sus ciclos completos.','Compara duración de pulso y período de repetición.'],
  'La duración del pulso no es la duración de exploración ni el tiempo de una maniobra clínica.',p12('§12.4, pulsos y respuesta del transductor'),['periodo','pulso','prp'],'resolution'),
 'longitud-espacial-pulso':g(
  'Distancia ocupada por un pulso en el medio, equivalente al número de ciclos multiplicado por su longitud de onda.',
  'SPL=nλ=c·duración. Reducir ciclos o longitud de onda acorta el tren espacial, manteniendo explícita la velocidad acústica asumida en el ejemplo.',
  ['Delimita el frente y la cola del pulso.','Cuenta los ciclos incluidos.','Relaciona longitud espacial y separación axial.'],
  'No confundas la longitud del pulso con la anchura lateral ni con el espesor del haz.',[...p12('§12.4, pulso ultrasónico'),...term('spatial pulse length')],['pulso','longitud-de-onda','resolucion-axial'],'resolution'),
 'prf':g(
  'Número de pulsos emitidos por segundo; determina el muestreo temporal del Doppler pulsado y debe permitir escuchar ecos a la profundidad requerida.',
  'PRF=1/PRP. Aumentarla ofrece más muestras temporales, pero reduce el intervalo de escucha; la máxima profundidad sin ambigüedad y la configuración del equipo limitan las combinaciones posibles.',
  ['Cuenta inicios de pulsos sucesivos.','Observa cómo cambia el intervalo de escucha.','Relaciona PRF con el límite de Nyquist.'],
  'PRF no es frecuencia portadora. No combines cualquier PRF con cualquier profundidad como si fueran controles independientes.',p12('§12.5.3, pulsed wave Doppler'),['prp','limite-nyquist','profundidad'],'nyquist'),
 'prp':g(
  'Intervalo entre el inicio de un pulso y el inicio del siguiente; incluye emisión y el tiempo disponible para escuchar ecos.',
  'Es el inverso de PRF. Un PRP más largo deja más tiempo de escucha para ecos profundos, a costa de menos muestras por segundo.',
  ['Identifica dos inicios consecutivos.','Distingue emisión del intervalo de escucha.','Relaciona intervalo largo con repetición menor.'],
  'PRP no es el período de un ciclo de la portadora ni solamente la duración del silencio.',p12('§12.5.3, muestreo de Doppler pulsado y alcance'),['prf','periodo','duracion-pulso'],'echo'),
 'ciclo-trabajo':g(
  'Fracción del tiempo durante la cual se emite ultrasonido; para pulsos idénticos se obtiene dividiendo duración del pulso entre PRP.',
  'El porcentaje expresa emisión respecto del ciclo completo. En un régimen pulsado, depende de duración y repetición; la exposición también depende de salida acústica y tiempo de exploración.',
  ['Compara tiempo de emisión y escucha.','Mantén visible el ciclo completo.','Relaciona el porcentaje con ambas duraciones.'],
  'Un porcentaje aislado no determina seguridad ni puede variar independientemente de duración y PRF en un mismo modelo.',[...p12('§12.6.2, métricas de salida acústica'),...term('duty factor')],['duracion-pulso','prp','potencia-acustica'],'transducer'),
 'profundidad':g(
  'Extensión del campo representado desde la superficie; depende del tiempo de escucha y debe incluir el objetivo junto con referencias anatómicas útiles.',
  'Ecos más tardíos se sitúan más profundos según la velocidad asumida. Aumentar campo puede requerir mayor escucha y reducir la tasa de cuadros, manteniendo otros factores constantes.',
  ['Localiza el objetivo dentro del campo.','Conserva una referencia por debajo del vaso.','Relaciona el límite profundo con tiempo de escucha.'],
  'Cambiar el campo mostrado no garantiza que la onda penetre ni que exista información útil a esa profundidad.',p13('§13.3, instrumentación B y formación de imagen'),['eco','prf','tasa-cuadros'],'depth'),
 'tasa-cuadros':g(
  'Número de imágenes completas actualizadas por segundo; condiciona la capacidad para seguir movimientos y cambios rápidos durante una exploración en tiempo real.',
  'Cada cuadro requiere adquirir líneas y procesarlas. Profundidad, líneas, focos y muestreo Doppler consumen tiempo; sus compromisos dependen del sistema y del modo seleccionado.',
  ['Compara movimiento continuo con actualizaciones discretas.','Observa retraso entre posiciones sucesivas.','Distingue tasa de cuadros de frecuencia portadora.'],
  'Una reproducción de vídeo más rápida no añade cuadros que no se adquirieron.',p13('§13.2–13.3, adquisición de líneas y actualización de imagen'),['densidad-lineas','profundidad','persistencia'],'persistence'),
 'densidad-lineas':g(
  'Cantidad de líneas acústicas utilizadas para construir una región de imagen; modifica su muestreo espacial y el tiempo necesario para adquirirla.',
  'Más líneas reducen separación de muestreo, pero pueden reducir cuadros por segundo si los demás factores permanecen constantes. La resolución sigue limitada también por el haz y el sistema.',
  ['Sigue el barrido de líneas sucesivas.','Compara separación espacial entre líneas.','Relaciona más líneas con tiempo por cuadro.'],
  'Densidad de líneas y resolución lateral no son sinónimos; un haz ancho no se vuelve estrecho por añadir líneas.',p13('§13.2 y §13.3, sistema de arreglos y B-mode'),['resolucion-lateral','tasa-cuadros','arreglo-lineal'],'resolution'),
 'modo-b':g(
  'Representación bidimensional donde la posición del eco localiza estructuras y su amplitud procesada determina el brillo, ofreciendo la referencia anatómica del estudio dúplex.',
  'Cada línea coloca ecos por tiempo de vuelo y los convierte en niveles de gris. La identidad venosa requiere relaciones, continuidad y respuesta, además de apariencia.',
  ['Relaciona reflector con su posición en pantalla.','Compara amplitud recibida y brillo.','Reconoce luz, paredes y tejidos vecinos.'],
  'Una zona negra no identifica por sí sola una vena ni demuestra permeabilidad.',p13('§13.3, B-mode instrumentation and signal processing'),['ganancia','rango-dinamico','compresibilidad'],'bmode'),
 'modo-m':g(
  'Representación del movimiento a lo largo de una línea acústica en función del tiempo, conservando profundidad como una dimensión de la imagen.',
  'La misma línea se repite y cada adquisición ocupa una columna temporal. Un reflector móvil deja una trayectoria, distinta de un mapa bidimensional completo.',
  ['Localiza la línea seleccionada en la anatomía.','Sigue la profundidad del reflector móvil.','Relaciona columnas sucesivas con el tiempo.'],
  'Una trayectoria en modo M no es un espectro Doppler ni una medición automática de flujo sanguíneo.',[...p13('§13.3, modos de presentación de ecos'),...term('M-mode')],['modo-b','tasa-cuadros','doppler-pulsado'],'bmode'),
 'ganancia':g(
  'Amplificación aplicada a las señales recibidas antes de su presentación; cambia el brillo y la visibilidad del ruido sin aumentar la emisión acústica.',
  'Con la misma anatomía y eco de entrada, más ganancia amplifica señales y ruido. El exceso puede blanquear la luz y ocultar límites útiles.',
  ['Conserva constante el pulso emitido.','Observa la amplificación tras la recepción.','Compara pared y luz al variar brillo.'],
  'Ganancia de recepción no es potencia acústica ni garantiza recuperar información ausente.',p13('§13.3, amplificación y procesamiento de recepción'),['potencia-acustica','tgc','rango-dinamico'],'gain'),
 'tgc':g(
  'Amplificación de recepción que varía con el tiempo de regreso del eco, utilizado como referencia de profundidad para compensar diferencias de señal.',
  'La compensación puede amplificar más ecos tardíos que tempranos. No modifica la energía que ya atravesó el tejido ni reconstruye un eco que nunca se recibió.',
  ['Compara amplificación superficial y profunda.','Sigue el eco antes del procesamiento.','Distingue compensación por nivel de ganancia global.'],
  'Un fondo más brillante tras TGC no demuestra mayor penetración ni un cambio real del tejido.',p13('§13.3, time gain compensation y recepción B'),['ganancia','atenuacion','profundidad'],'tgc'),
 'rango-dinamico':g(
  'Intervalo de amplitudes de señal que se representa en la escala visible; su compresión permite mostrar ecos de intensidades muy diferentes.',
  'La conversión logarítmica y la asignación de grises reducen un amplio rango recibido. Un intervalo mostrado estrecho suele aumentar contraste aparente, sacrificando diferencias pequeñas de amplitud.',
  ['Mantén iguales los ecos de entrada.','Compara su distribución en la escala de grises.','Distingue contraste presentado de resolución espacial.'],
  'Más contraste no significa más información anatómica ni mejor resolución; las implementaciones dependen del equipo.',p13('§13.3, compresión de amplitud y visualización B'),['ganancia','modo-b','resolucion-axial'],'dynamic'),
 'zoom':g(
  'Ampliación de una región de imagen cuya utilidad depende de si modifica la adquisición o solamente presenta más grandes los datos existentes.',
  'El zoom posterior a la adquisición redistribuye o interpola píxeles existentes. Un zoom de adquisición puede cambiar muestreo y campo, según el equipo; no son operaciones equivalentes.',
  ['Identifica la región seleccionada.','Sigue los mismos píxeles al ampliarlos.','Distingue tamaño de pantalla de detalle adquirido.'],
  'Ampliar una captura no revela automáticamente bordes o información que el estudio no adquirió.',[...p13('§13.3, muestreo y presentación de imagen'),...term('zoom')],['modo-b','densidad-lineas','resolucion-lateral'],'depth'),
 'efecto-doppler':g(
  'Cambio de frecuencia de los ecos procedentes de dispersores en movimiento relativo al transductor; informa sobre la componente de movimiento alineada con el haz.',
  'Para el modelo habitual de retrodispersión, Δf=2f₀v·cosθ/c. Cambiar rapidez, portadora o ángulo modifica el desplazamiento; los dispersores pueden seguir moviéndose aunque la componente medida sea nula.',
  ['Sigue los dispersores mientras avanza el haz.','Identifica la componente del movimiento sobre el haz.','Compara frecuencia emitida y recibida.'],
  'Ausencia de desplazamiento detectable no equivale a ausencia de flujo.',p12('§12.5.1, the Doppler effect'),['angulo-doppler','frecuencia','doppler-pulsado'],'doppler'),
 'angulo-doppler':g(
  'Ángulo entre la dirección del haz acústico y la dirección local del flujo; determina cuánto movimiento contribuye al desplazamiento Doppler medido.',
  'La proyección depende de cosθ. Al acercarse a 90°, disminuye la componente detectada, aunque la sangre continúe desplazándose dentro del vaso.',
  ['Localiza el vector del haz y el del flujo.','Compara su proyección al cambiar el ángulo.','Observa movimiento presente con señal Doppler reducida.'],
  'No midas este ángulo entre la carcasa y la piel ni asumas que eje largo significa ángulo favorable.',p12('§12.5.1, ecuación Doppler y dependencia angular'),['correccion-angular','orientacion-haz','direccion-flujo'],'angle'),
 'correccion-angular':g(
  'Declaración de la dirección del flujo utilizada para convertir desplazamiento Doppler en una estimación de velocidad; requiere coherencia con la anatomía observada.',
  'El equipo divide por el coseno del ángulo declarado. Un ángulo incorrecto produce una velocidad calculada incorrecta; cerca de la perpendicular, pequeños errores angulares pueden causar grandes diferencias.',
  ['Conserva el ángulo real del modelo.','Cambia únicamente el ángulo declarado.','Compara velocidad real y calculada.'],
  'La corrección angular no crea señal ausente ni es necesaria para convertir segundos de reflujo en velocidad.',p12('§12.5.1–12.5.3, ecuación Doppler y estimación de velocidad'),['angulo-doppler','duracion-reflujo','efecto-doppler'],'angle'),
 'linea-base':g(
  'Referencia de desplazamiento Doppler cero en la presentación espectral; moverla redistribuye el espacio mostrado para señales de uno u otro signo.',
  'El desplazamiento de la base cambia la ventana de representación. No aumenta PRF ni amplía el intervalo total de frecuencias distinguibles por el muestreo.',
  ['Identifica el cero antes de moverlo.','Conserva señal y PRF constantes.','Compara espacio disponible a ambos lados de la base.'],
  'Mover la base no cambia la fisiología ni aumenta el límite total de muestreo.',[...p12('§12.5.3, presentación de Doppler pulsado'),...term('baseline shift')],['limite-nyquist','aliasing','inversion'],'spectral'),
 'doppler-color':g(
  'Mapa superpuesto a la anatomía que codifica estimaciones de desplazamiento Doppler dentro de una región, según una barra de color y ajustes definidos.',
  'El sistema muestrea ecos repetidamente y estima información de movimiento en cada posición. El color convencional representa dirección relativa y magnitud media, con dependencia angular y límites de muestreo.',
  ['Relaciona color con la luz en B.','Lee la barra antes de interpretar el signo.','Mantén anatomía y flujo al variar la escala.'],
  'Rojo y azul no identifican por sí solos arteria o vena, oxigenación ni competencia valvular.',p13('§13.5, Colour Flow Imaging'),['mapa-color','escala-doppler','power-doppler'],'color'),
 'mapa-color':g(
  'Leyenda que asigna colores a valores y signos de la señal Doppler; su lectura debe comprobarse en la barra del equipo.',
  'Invertir la asignación cambia el color presentado sin invertir el flujo. La barra puede incluir brillo o varianza; la convención concreta se comprueba antes de interpretar.',
  ['Localiza el cero y ambos extremos de la barra.','Invierte el mapa conservando el movimiento real.','Relaciona un mismo signo con su nuevo color.'],
  'El código de color Doppler no es el código de condición usado en la cartografía del consenso.',p13('§13.5, asignación y presentación de color'),['doppler-color','direccion-flujo','inversion'],'color'),
 'direccion-flujo':g(
  'Sentido anatómico del movimiento sanguíneo, relacionado con el signo Doppler mediante la orientación del haz y la convención de presentación utilizada.',
  'La proyección sobre el haz puede ser positiva, negativa o cercana a cero. Cambiar el haz o la inversión de pantalla puede cambiar la presentación sin cambiar el trayecto anatómico.',
  ['Sigue el movimiento dentro del vaso.','Relaciona el sentido con el haz y la barra.','Distingue signo en pantalla de proximal y distal.'],
  'La ubicación sobre o bajo la base no significa universalmente flujo proximal, distal o reflujo.',p12('§12.5.1, signo de desplazamiento y geometría Doppler'),['mapa-color','angulo-doppler','reflujo-venoso'],'color'),
 'ganancia-color':g(
  'Amplificación de las señales Doppler utilizadas para formar el mapa; modifica su visibilidad y puede mostrar ruido fuera de la luz vascular.',
  'Con señal y anatomía constantes, aumentar ganancia puede recuperar señales débiles o provocar desborde. Reducirla demasiado puede ocultar flujo existente.',
  ['Conserva el contorno de la vena en B.','Compara relleno intraluminal y ruido extraluminal.','Relaciona ganancia excesiva con desborde.'],
  'Más color no demuestra más flujo, una conexión anatómica ni una vena de mayor tamaño.',p13('§13.5, recepción y procesamiento de señales color'),['doppler-color','clutter','filtro-pared'],'colorGain'),
 'escala-doppler':g(
  'Intervalo de frecuencias o velocidades presentado por el sistema Doppler; en modos pulsados se relaciona con la repetición y el procesamiento de muestras.',
  'Modificar la escala puede cambiar PRF y los límites mostrados. Una escala demasiado alta dificulta ver señales lentas; una baja puede mostrar aliasing para la misma señal.',
  ['Conserva velocidad y orientación del ejemplo.','Compara la señal con los límites mostrados.','Distingue reajuste de escala de cambio de flujo.'],
  'Los números del esquema no son un preset universal; verifica modo, unidades y equipo.',[...p12('§12.5.3, muestreo PW'),...p13('§13.5, escala en color')],['prf','limite-nyquist','aliasing'],'nyquist'),
 'limite-nyquist':g(
  'Mitad de la frecuencia de muestreo; en el modelo convencional de Doppler pulsado establece el límite de desplazamiento distinguible antes de la ambigüedad.',
  'Con PRF constante, señales que exceden el intervalo permitido pueden representarse en el extremo opuesto. La escala en velocidad también depende de portadora y corrección angular.',
  ['Identifica PRF y su mitad.','Compara la frecuencia Doppler con el límite.','Conserva señal al aumentar el muestreo.'],
  'PRF/2 es un límite de frecuencia Doppler; no una velocidad universal ni un umbral de enfermedad.',p12('§12.5.3, Nyquist y aliasing en PW'),['prf','aliasing','correccion-angular'],'nyquist'),
 'aliasing':g(
  'Ambigüedad por muestreo insuficiente que representa una frecuencia fuera del intervalo distinguible como otra dentro de él, pudiendo invertir su apariencia.',
  'La señal se envuelve en el intervalo de muestreo, en lugar de recortarse sin más. En PW o color, el salto puede cruzar el límite opuesto aunque el flujo continúe en el mismo sentido.',
  ['Sigue la señal real y las muestras.','Observa el salto al extremo opuesto.','Distingue envoltura de inversión fisiológica del flujo.'],
  'Aliasing aislado no demuestra reflujo, turbulencia ni una velocidad válida de forma automática.',p12('§12.5.3, aliasing de Doppler pulsado'),['limite-nyquist','escala-doppler','linea-base'],'nyquist'),
 'inversion':g(
  'Cambio de la asignación de signo o color en la presentación Doppler, sin alterar por sí mismo el movimiento sanguíneo que originó la señal.',
  'La misma señal puede mostrarse en el lado contrario de la base o con otro color. La convención debe mantenerse explícita al interpretar dirección anatómica y maniobras.',
  ['Mantén el movimiento real constante.','Invierte únicamente la presentación.','Compara señal, barra y línea de base.'],
  'Una inversión electrónica no significa que el paciente haya desarrollado reflujo.',[...p12('§12.5, presentación de signo Doppler'),...p13('§13.5, mapa color')],['direccion-flujo','mapa-color','linea-base'],'spectral'),
 'filtro-pared':g(
  'Procesamiento que suprime componentes de baja frecuencia asociadas principalmente con movimiento de tejidos, pero puede eliminar también señales sanguíneas lentas.',
  'Tejido y sangre pueden ocupar regiones de frecuencia próximas. Elevar el filtro reduce clutter de baja frecuencia, a costa de borrar información útil si el corte es excesivo.',
  ['Compara componentes de tejido y sangre.','Desplaza el corte del filtro.','Observa señales lentas que dejan de mostrarse.'],
  'Una vena sin señal después de filtrar no debe considerarse automáticamente sin flujo.',p13('§13.5, clutter y filtrado de señales de flujo'),['clutter','ganancia-color','power-doppler'],'filter'),
 'clutter':g(
  'Señales intensas procedentes del movimiento de paredes o tejidos que pueden interferir con las señales Doppler sanguíneas, especialmente en bajas frecuencias.',
  'El tejido puede producir ecos mucho más intensos que la sangre. El sistema intenta separarlos por su comportamiento temporal y frecuencia; el movimiento de la sonda también contribuye.',
  ['Distingue pared móvil y dispersores sanguíneos.','Compara amplitud y frecuencia de sus señales.','Observa la información retenida tras el filtrado.'],
  'La señal de tejido no es una vena adicional ni equivale a aumento real de perfusión.',p13('§13.5, supresión de clutter en imagen de flujo'),['filtro-pared','artefacto-movimiento','ganancia-color'],'filter'),
 'persistencia':g(
  'Combinación de información de cuadros sucesivos para suavizar la presentación, con posible pérdida de respuesta temporal ante cambios rápidos de flujo o movimiento.',
  'Un promedio temporal conserva parte de cuadros anteriores. Reduce fluctuaciones aparentes, pero retrasa cambios y puede mantener señal cuando el fenómeno que la produjo ya se modificó.',
  ['Compara el objeto actual y la imagen promediada.','Observa retraso al iniciar o detener movimiento.','Distingue estabilidad visual de información temporal nueva.'],
  'Una señal persistente en pantalla no demuestra que el flujo haya permanecido igual durante ese intervalo.',p13('§13.3 y §13.5, procesamiento temporal y persistencia'),['tasa-cuadros','artefacto-movimiento','doppler-color'],'persistence'),
 'caja-color':g(
  'Región de interés donde se adquiere y presenta información Doppler color, superpuesta al modo B para localizarla anatómicamente en la imagen.',
  'Cubrir más líneas o profundidad exige más adquisición. Una caja limitada al objetivo puede favorecer actualización temporal, manteniendo los demás factores y el diseño del equipo comparables.',
  ['Localiza el vaso dentro de la caja.','Compara anchura de región y líneas adquiridas.','Conserva la anatomía útil fuera de la caja.'],
  'Fuera de la caja no se está mostrando color; esa ausencia no significa ausencia de flujo.',p13('§13.5, región de interés y adquisición color'),['tasa-cuadros','densidad-lineas','orientacion-haz'],'color'),
 'orientacion-haz':g(
  'Dirección electrónica del haz respecto del arreglo, que permite modificar la geometría Doppler sin realizar el mismo movimiento que una rotación física.',
  'Retardos entre elementos cambian la dirección del frente de onda. El efecto útil depende de su relación con el flujo; el plano anatómico y la dirección acústica deben conservarse comprensibles.',
  ['Localiza la normal al transductor.','Sigue el frente dirigido por los elementos.','Relaciona la nueva dirección con el flujo.'],
  'Steering no garantiza un ángulo favorable ni sustituye recuperar el vaso en un plano reconocible.',p13('§13.2.1, electronic focusing and beam steering'),['formacion-haz','angulo-doppler','arreglo-lineal'],'orientation'),
 'doppler-pulsado':g(
  'Técnica Doppler que emite pulsos y selecciona ecos por su tiempo de regreso para estudiar movimiento en una región de profundidad definida.',
  'La ventana temporal de recepción permite localizar la muestra. Las repeticiones proporcionan muestreo de movimiento, con compromiso entre profundidad alcanzable y frecuencia Doppler distinguible sin aliasing.',
  ['Separa emisión y escucha.','Relaciona retraso recibido con profundidad de muestra.','Sigue las muestras usadas para construir el espectro.'],
  'Seleccionar profundidad no elimina la influencia del tamaño de muestra, del haz ni del ángulo.',p12('§12.5.3, pulsed wave Doppler'),['volumen-muestra','prf','doppler-continuo'],'gate'),
 'volumen-muestra':g(
  'Región espacial de la que se aceptan señales en Doppler pulsado; su longitud y el ancho del haz determinan qué movimientos contribuyen.',
  'El gate selecciona un intervalo de retrasos, no un punto sin dimensiones. Ampliarlo puede incluir paredes o más velocidades, alterando el espectro recibido.',
  ['Localiza el gate dentro de la luz.','Cambia su longitud conservando el vaso.','Identifica qué señales quedan incluidas o excluidas.'],
  'Una muestra grande no garantiza mejor registro y puede incorporar tejido o vasos vecinos.',p12('§12.5.3, range gating y volumen de muestra'),['doppler-pulsado','ensanchamiento-espectral','filtro-pared'],'gate'),
 'ensanchamiento-espectral':g(
  'Distribución de señal Doppler sobre un intervalo de frecuencias o velocidades; puede depender del flujo y también de la adquisición y el procesamiento.',
  'Distintas velocidades, ángulos y regiones dentro de la muestra contribuyen al espectro. El tamaño del gate, la geometría del haz y ajustes pueden aumentar su extensión aparente.',
  ['Compara un valor único con una distribución.','Observa qué regiones alimentan la muestra.','Relaciona dispersión de señales con anchura espectral.'],
  'El ensanchamiento aislado no demuestra turbulencia ni estenosis; primero revisa contexto y técnica.',p12('§12.5.2–12.5.3, espectros y volumen de muestra'),['volumen-muestra','correccion-angular','doppler-pulsado'],'spectral'),
 'doppler-continuo':g(
  'Técnica que transmite y recibe de forma continua, recogiendo contribuciones del volumen donde coinciden los haces sin seleccionar una única profundidad por tiempo.',
  'Elementos de emisión y recepción operan simultáneamente. Detecta movimientos a lo largo de la región de superposición, sin compartir el límite PRF/2 propio del PW convencional.',
  ['Distingue emisor y receptor simultáneos.','Sigue dispersores a distintas profundidades.','Observa su contribución al mismo espectro.'],
  'Un espectro CW no permite atribuir automáticamente una señal a una profundidad concreta.',p12('§12.5.2, continuous wave Doppler'),['doppler-pulsado','volumen-muestra','limite-nyquist'],'spectral'),
 'power-doppler':g(
  'Presentación de la potencia de la señal Doppler recibida; en su forma convencional no codifica dirección ni velocidad mediante el mismo mapa que color.',
  'Integra magnitud de señal en lugar de mostrar el desplazamiento medio con signo. Puede ayudar con señales débiles, pero sigue dependiendo de técnica, filtros y movimiento.',
  ['Compara magnitud recibida con brillo de Power.','Conserva el color al invertir el sentido del flujo.','Observa la interferencia producida por movimiento.'],
  'Power convencional no demuestra dirección ni duración de reflujo. Existen variantes direccionales; verifica el modo del equipo.',p13('§13.5, power Doppler y presentación de flujo'),['doppler-color','artefacto-movimiento','filtro-pared'],'power'),
 'artefacto-movimiento':g(
  'Señal Doppler aparente causada por movimiento de la sonda o de tejidos, que puede colorear una región amplia sin representar flujo sanguíneo local.',
  'Un desplazamiento del campo produce cambios de fase en numerosos ecos. El destello puede afectar color o Power y confundirse con señal vascular si no se conserva el contexto en B.',
  ['Compara sonda estable y desplazada.','Observa el destello fuera de la luz.','Distingue movimiento global de señal vascular localizada.'],
  'Un destello de color o Power no demuestra por sí solo perfusión, conexión o reflujo.',p13('§13.5, artefactos de movimiento en imagen de flujo'),['clutter','power-doppler','persistencia'],'power'),
 'sombra-acustica':g(
  'Reducción de ecos detrás de una estructura que atenúa o desvía fuertemente el haz, comparada con regiones vecinas situadas a profundidad semejante.',
  'Llega menos energía o regresa menos señal por el trayecto posterior. El patrón puede deberse a reflexión, absorción u otras interacciones y depende también del ángulo y los ajustes.',
  ['Identifica el obstáculo y el trayecto posterior.','Compara señal detrás y a ambos lados.','Sigue la reducción sin cambiar el tejido vecino.'],
  'Una sombra aislada no identifica su causa ni demuestra ausencia anatómica detrás del obstáculo.',[...p12('§12.2.3–12.2.4, reflexión y atenuación'),...p13('formación B: artefactos de propagación')],['atenuacion','refuerzo-posterior','reflexion'],'attenuation'),
 'refuerzo-posterior':g(
  'Aumento relativo de brillo detrás de un trayecto menos atenuante que sus vecinos, observado al comparar regiones situadas a profundidad semejante.',
  'La compensación de recepción se aplica a ecos que han sufrido pérdidas distintas. El trayecto menos atenuado puede aparecer relativamente más brillante sin que el tejido posterior haya cambiado.',
  ['Compara trayectos con diferente atenuación.','Busca el brillo posterior relativo.','Mantén profundidad y ganancia de comparación.'],
  'El patrón no identifica automáticamente un líquido ni una lesión; integra anatomía, planos y contexto.',[...p12('§12.2.4, atenuación'),...p13('formación B: artefactos de propagación y compensación')],['atenuacion','tgc','sombra-acustica'],'attenuation'),
 'reverberacion':g(
  'Repetición aparente de ecos producida por trayectorias con reflexiones múltiples, que el sistema puede situar a profundidades sucesivamente mayores por su retraso.',
  'La onda rebota entre interfaces antes de volver. El equipo interpreta tiempos largos como trayectos profundos si supone una única ida y vuelta recta.',
  ['Sigue cada rebote entre interfaces.','Relaciona regresos tardíos con ecos repetidos.','Compara reflector real y posiciones reconstruidas.'],
  'Las repeticiones no son necesariamente estructuras anatómicas distintas a diferentes profundidades.',[...p12('§12.2.3, reflexión'),...p13('formación B: artefactos por reflexiones múltiples')],['eco','reflexion','imagen-espejo'],'echo'),
 'imagen-espejo':g(
  'Duplicación aparente de una estructura cuando una trayectoria acústica indirecta, asociada a un reflector fuerte, se reconstruye suponiendo un recorrido recto.',
  'El retraso de una reflexión adicional coloca una copia en una posición falsa. El modelo distingue objeto real, reflector, trayecto indirecto y ubicación reconstruida.',
  ['Identifica el objeto real y el reflector fuerte.','Sigue la trayectoria indirecta del eco.','Compara la ubicación real con la copia reconstruida.'],
  'Una copia especular no confirma una segunda estructura ni su localización anatómica.',[...p12('§12.2.3, trayectorias de reflexión'),...p13('formación de imagen: artefactos de localización')],['reflexion','eco','reverberacion'],'echo'),
 'lobulos-laterales':g(
  'Componentes del campo acústico fuera del lóbulo principal que pueden recibir ecos de reflectores laterales y situarlos como si procedieran del eje principal.',
  'La reconstrucción asigna los ecos a la dirección de la línea explorada. Un blanco lateral intenso puede generar señal aparente dentro de una región que no lo contiene.',
  ['Distingue lóbulo principal y componentes laterales.','Sigue el eco desde el blanco fuera del eje.','Observa su posición errónea en la línea reconstruida.'],
  'Ecos dentro de una luz no prueban material real si pueden proceder de fuera del haz principal.',p13('§13.2.2, array beam characteristics y lóbulos laterales'),['formacion-haz','espesor-corte','resolucion-lateral'],'bmode'),
 'espesor-corte':g(
  'Inclusión de ecos originados dentro del espesor elevacional del haz, pero fuera del plano central que la imagen bidimensional parece representar.',
  'Un corte de espesor finito puede integrar una estructura adyacente. Al representarla en el plano mostrado, aparecen ecos que parecen estar dentro de una luz o región anecoica.',
  ['Localiza el plano central y el volumen alrededor.','Sigue el blanco fuera del plano central.','Compara inclusión de ecos al cambiar el espesor.'],
  'La imagen bidimensional no excluye contribuciones fuera de su plano central; cambia de plano antes de atribuir material intraluminal.',p13('§13.2.2, características elevacionales y espesor del haz'),['resolucion-elevacional','lobulos-laterales','modo-b'],'resolution'),
 'anisotropia':g(
  'Variación de la apariencia ecográfica con la orientación del haz respecto de una estructura organizada o una interfaz con reflexión marcadamente direccional.',
  'Al variar la incidencia, una fracción diferente del eco regresa a la sonda. El esquema representa dependencia angular de una interfaz, sin convertirla en un cambio anatómico real.',
  ['Mantén fija la interfaz.','Cambia la incidencia respecto de su normal.','Relaciona retorno de eco y brillo presentado.'],
  'Una estructura más oscura al inclinar la sonda no demuestra por sí sola lesión ni pérdida de continuidad.',[...p12('§12.2.3, reflexión especular'),...term('anisotropy')],['reflexion','angulo-doppler','modo-b'],'orientation'),
 'compresibilidad':g(
  'Respuesta de una vena a la compresión controlada en el plano adecuado, observando aproximación y coaptación de sus paredes en el mismo segmento.',
  'Se conserva la identidad del vaso antes, durante y después de comprimir. La liberación recupera condiciones para valorar flujo o calibre; los números del control no representan fuerza clínica.',
  ['Centra el mismo segmento en transversal.','Sigue ambas paredes durante la presión.','Libera antes de valorar flujo o diámetro.'],
  'Una única imagen o la desaparición por salir del plano no excluyen TVP ni demuestran compresión completa.',vein('Specification: Venous Thromboembolic Disease, Lower Extremity; Technique 2 y Recording'),['acoplamiento','modo-b','aumento-distal'],'pressure'),
 'aumento-distal':g(
  'Maniobra de compresión realizada distal al punto de muestreo para provocar una respuesta de flujo, cuya liberación también se observa y documenta.',
  'La sonda mantiene contacto local ligero mientras otra acción distal modifica el flujo. El registro separa basal, aumento y liberación; Valsalva tiene un mecanismo y cronograma diferentes.',
  ['Distingue mano distal y contacto de la sonda.','Observa aumento y liberación como fases distintas.','Conserva el segmento y el contexto del registro.'],
  'Comprimir el vaso con la sonda no equivale a aumento distal ni sustituye un protocolo completo.',vein('Venous Insufficiency: Lower Extremity; Technique 1–5'),['compresibilidad','reflujo-venoso','duracion-reflujo'],'reflux'),
 'fasicidad-respiratoria':g(
  'Variación del flujo venoso relacionada con la respiración, evaluada en un registro espectral identificado y dentro del contexto anatómico y clínico correspondiente.',
  'Cambios de presión asociados a la respiración modulan el retorno venoso. El esquema muestra una modulación idealizada; amplitud, patrón y respuesta reales dependen del territorio y las condiciones.',
  ['Relaciona el ciclo respiratorio con la envolvente.','Distingue respiración de pulsos cardíacos.','Compara registros bajo condiciones respiratorias equivalentes.'],
  'Un patrón aislado no localiza ni confirma obstrucción; integra técnica, comparación y el examen indicado.',vein('Venous Thromboembolic Disease: Lower Extremity, Technique 4; Upper Extremity, Recording 3'),['pulsatilidad','doppler-pulsado','aumento-distal'],'spectral'),
 'pulsatilidad':g(
  'Variación periódica de la señal asociada al ciclo cardíaco, que puede observarse en registros vasculares y debe interpretarse según territorio y contexto.',
  'La transmisión de variaciones de presión puede modular el flujo venoso. El dibujo separa ciclos cardíacos de respiratorios y no utiliza una apariencia aislada para asignar una causa clínica.',
  ['Sigue la periodicidad del ciclo cardíaco.','Compara su ritmo con la respiración.','Distingue un patrón temporal de un diagnóstico.'],
  'La pulsatilidad venosa no permite atribuir automáticamente una enfermedad cardíaca ni una obstrucción a partir del esquema.',vein('Venous Thromboembolic Disease: Upper Extremity, Recording; comparación de pulsatility y respiratory phasicity'),['fasicidad-respiratoria','doppler-pulsado','ensanchamiento-espectral'],'spectral'),
 'valvula-venosa':g(
  'Estructura intraluminal con valvas que favorecen el avance venoso y limitan el retorno; su función se evalúa junto con la respuesta hemodinámica.',
  'El esquema relaciona diferencias de presión, apertura y coaptación. La morfología de una válvula visible no determina por sí sola competencia ni reemplaza la evaluación con maniobras y espectro.',
  ['Localiza valvas y paredes dentro de la luz.','Relaciona avance proximal con apertura.','Sigue coaptación frente al intento de retorno.'],
  'Una válvula que se mueve, un color del dibujo o una imagen aislada no demuestran competencia clínica.',vein('Venous Insufficiency: Lower Extremity; Technique 1–5 y Recording 1'),['reflujo-venoso','aumento-distal','duracion-reflujo'],'valves'),
 'reflujo-venoso':g(
  'Flujo retrógrado observado en un segmento venoso bajo condiciones y maniobras identificadas; su interpretación requiere duración, anatomía, posición y criterio aplicable.',
  'El registro conserva basal y respuesta provocada. Se sigue el sentido anatómico del flujo, no solamente su ubicación sobre o bajo la base; los umbrales dependen del segmento y de la guía.',
  ['Distingue basal, provocación y respuesta.','Confirma el sentido anatómico del retorno.','Relaciona duración y segmento documentado.'],
  'Retorno breve, aliasing o inversión de pantalla no equivalen automáticamente a reflujo patológico.',[...vein('Venous Insufficiency: Lower Extremity; Technique 1–5'),ref('svs','Definiciones 1.3.1 y adquisición dúplex 1.4')],['duracion-reflujo','aumento-distal','direccion-flujo'],'reflux'),
 'duracion-reflujo':g(
  'Intervalo temporal entre inicio y final del flujo retrógrado observado, delimitado con cursores sobre un registro espectral interpretable e identificado por segmento.',
  'Los cursores miden la señal, no el tiempo de compresión o esfuerzo. El ejemplo permite cambiar una duración inventada; la clasificación clínica conserva el criterio del segmento y las condiciones de adquisición.',
  ['Ubica el inicio del flujo retrógrado.','Sitúa el segundo cursor al final observado.','Lee segundos o milisegundos sin medir la maniobra.'],
  'No utilices un umbral único para todo el sistema profundo ni conviertas el tiempo inventado en diagnóstico.',[...vein('Venous Insufficiency: Lower Extremity; Technique 1 y Recording 1'),ref('svs','1.3.1: >500 ms en ejes superficiales, tibiales, femoral profunda y perforantes; >1 s en femoral común, femoral y poplítea')],['reflujo-venoso','linea-base','correccion-angular'],'reflux'),
 'alara':g(
  'Principio de utilizar la exposición acústica tan baja como sea razonablemente posible para obtener la información necesaria con una indicación clínica justificada.',
  'La técnica, recepción, salida acústica y tiempo de permanencia se consideran juntos. Una imagen útil orienta la optimización; el esquema no transforma segundos o índices en una garantía de seguridad.',
  ['Separa recepción de emisión acústica.','Observa el tiempo de permanencia del haz.','Relaciona la información necesaria con la exposición utilizada.'],
  'ALARA no significa una imagen insuficiente ni un valor universal seguro de tiempo, TI o MI.',[ref('alara','Principio ALARA: salida acústica y tiempo'),ref('fda','Information for Health Care Providers')],['potencia-acustica','indice-termico','indice-mecanico']),
 'indice-termico':g(
  'Índice adimensional que relaciona salida acústica con un modelo de calentamiento tisular; orienta sobre potencial térmico, sin medir directamente la temperatura del paciente.',
  'El TI se basa en modelos y condiciones de exposición. Su interpretación depende del modelo utilizado, tejidos, modo y tiempo de permanencia; el valor del dibujo es únicamente ilustrativo.',
  ['Identifica el índice en la pantalla.','Distingue un índice de una temperatura medida.','Conserva el tiempo como condición separada.'],
  'TI=1 no demuestra que la temperatura del paciente haya subido exactamente 1 °C ni establece seguridad universal.',[ref('ods','Thermal index y tipos de modelo térmico'),ref('prudent','Índices de salida y exposición')],['alara','absorcion','potencia-acustica']),
 'indice-mecanico':g(
  'Índice adimensional relacionado con la presión rarefaccional acústica y la frecuencia, utilizado para orientar sobre el potencial de efectos mecánicos no térmicos.',
  'En su formulación, MI=pᵣ,derated/√f, con presión en MPa y frecuencia en MHz. La presión corregida por atenuación es una estimación normalizada, no una medición directa dentro del paciente.',
  ['Identifica presión y frecuencia como factores distintos.','Sigue la relación con el índice calculado.','Separa MI de temperatura y duración.'],
  'MI no es una probabilidad individual de lesión, una presión en MPa ni un umbral universal de seguridad.',[ref('ods','Mechanical index y presión derated'),...term('mechanical index')],['alara','potencia-acustica','indice-termico']),
 'potencia-acustica':g(
  'Energía acústica emitida por unidad de tiempo; modificar la salida del transductor afecta la exposición y es distinto de amplificar señales ya recibidas.',
  'El control de salida actúa sobre la emisión. La ganancia actúa después de recibir ecos; mejorar acoplamiento, posición o recepción puede evitar aumentar salida para compensar un problema técnico.',
  ['Localiza el cambio antes de entrar al tejido.','Conserva separada la amplificación del receptor.','Compara emisión y brillo de presentación.'],
  'El brillo de la pantalla no mide potencia acústica ni permite deducir TI o MI de un paciente.',[...p12('§12.6.2–12.6.3, métricas acústicas y seguridad'),ref('alara','Control de salida y exposición necesaria')],['ganancia','alara','ciclo-trabajo'],'transducer'),
 'duplex-triplex':g(
  'Combinación de imagen anatómica y evaluación Doppler; la presentación tríplex integra B, color y espectro, con compromisos de adquisición dependientes del equipo.',
  'Los modos aportan información complementaria: B localiza anatomía, color ayuda a situar señal y PW registra su distribución temporal en una muestra. Su intercalación puede reducir la actualización de cada componente.',
  ['Relaciona la muestra con la anatomía en B.','Localiza señal mediante la superposición de color.','Sigue la distribución temporal en el espectro.'],
  'Mostrar tres modos no acredita por sí solo calidad diagnóstica ni elimina sus límites de ángulo y muestreo.',[...p13('§13.3 y §13.5, combinación de B y flujo'),...vein('Equipment Specifications; imagen y análisis de flujo dúplex')],['modo-b','doppler-color','doppler-pulsado'],'spectral')
};
