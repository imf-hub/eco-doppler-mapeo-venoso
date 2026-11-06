# Revisión independiente de la cartografía de práctica

6 de noviembre de 2026. Alcance: lectura del código de `Cartography.jsx`, comprobación del documento primario y de sus figuras. Esta revisión no constituye validación clínica, prueba de aprendizaje con médicos ni auditoría visual de navegador. Las comprobaciones de interfaz deben agregarse por separado.

## Criterio de aceptación docente

Un médico que empieza debe poder trasladar datos adquiridos a un mapa comprensible sin que el programa invente normalidad, direcciones o conexiones. La herramienta debe mostrar qué información falta, conservar el contexto de adquisición en la salida y enseñar la relación entre dato, símbolo y circuito. Completar casillas no basta para evaluar una cartografía.

## Fuente comprobada

[Primer Consenso Latinoamericano de Mapa Venoso Superficial y Perforante, versión española](https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf), Bottini et al., 2023; [publicación bibliográfica](https://pubmed.ncbi.nlm.nih.gov/36892521/). Se verificó el PDF de 12 páginas y se inspeccionaron las figuras 1–3. Las páginas siguientes se cuentan desde la primera hoja del PDF español.

El documento es una norma de representación complementaria al informe, no una guía suficiente de adquisición. Establece tres caras por miembro (pp. 1–2), códigos separados de color y trazo (pp. 3–6), y unidades y referencias de medidas (pp. 7–8). En p. 8 sitúa diámetros y longitud segmentaria dentro de la silueta, y alturas referidas anatómicamente fuera. Las ampliaciones inguinal y poplítea resuelven detalles complejos (pp. 9–12).

## Fallas y mejoras prioritarias en la versión recibida

### 1. El punto del puntero puede registrarse en otra posición — prioridad alta

`point()` calcula X/Y por fracciones del rectángulo HTML del SVG. El SVG conserva su proporción, mientras el diseño limita su altura. Cuando aparecen bandas laterales, la conversión ignora esas bandas. Esto puede desplazar el punto respecto de donde el alumno tocó y dar una falsa impresión de torpeza manual.

**Corrección propuesta:** transformar `clientX/clientY` por la inversa de `svg.getScreenCTM()`, no por la anchura del contenedor. Probar en escritorio ancho, móvil y ampliación. Conservar dibujo por teclado o formulario de puntos como alternativa accesible.

### 2. Tres títulos encima de una única silueta no enseñan tres proyecciones — prioridad alta

`outline` es idéntico en las tres caras. Cambiar derecho/izquierdo solo modifica el texto. La relación entre cara, orientación del pie, región inguinal y posición medial/posterior queda insuficientemente indicada.

**Corrección propuesta:** usar contornos esquemáticos diferenciados, referencias anatómicas y lateralidad explícita. No reflejar textos ni trasladar automáticamente hallazgos de un lado a otro. Aclarar que la geometría de práctica no es una reconstrucción del paciente.

### 3. El registro puede presentarse como terminado con información insuficiente — prioridad alta

El cierre actual depende de casillas marcadas, una entrada y cualquier nota no vacía. Puede faltar la SSV, no haber ningún diámetro o existir una perforante sin altura. El texto explica los límites, pero no ofrece retroalimentación específica al ejercicio que el alumno acaba de crear.

**Corrección propuesta:** una comprobación educativa de integridad que nombre lo que falta. Debe conservarse el mapa parcial si está explícitamente limitado. No debe diagnosticar ni afirmar que el dibujo es correcto.

### 4. La maniobra se fija por defecto sin una acción de edición — prioridad alta

`meta.maneuver` se inicia como compresión distal y liberación, pero el editor no ofrece un campo para cambiarla. Imprimir ese valor puede convertir un valor de plantilla en una maniobra supuestamente realizada. Falta una pregunta clínica estructurada.

**Corrección propuesta:** campos editables de indicación, posición, maniobra y limitaciones. Iniciar los datos clínicos como pendientes o marcados explícitamente como ejemplo; no confundir datos precargados con evidencia del alumno.

### 5. SVG y PDF no conservan el mismo contexto — prioridad alta

`createMapSVG()` incluye caso, lado y posición, pero omite maniobra e informe. La impresión añade notas aparte. El SVG puede circular separado de su contexto. Su leyenda también omite los códigos verde y amarillo que sí permite el editor.

**Corrección propuesta:** exportación con informe o un resumen documental visible, fecha/versión del ejercicio, estado parcial/completo y leyenda completa de los códigos presentes. Mantener siempre la identificación de ejercicio ficticio. Verificar SVG/XML y salida impresa con textos largos.

### 6. La ubicación de las etiquetas no sigue la función de la medida — prioridad media

`markSvg()` coloca todas las filas a `offset + 137`, fuera de la silueta. Diámetros, longitud, altura y referencia comparten el mismo bloque lateral. El alumno no distingue que cada dato ocupa un lugar distinto en el lenguaje cartográfico.

**Corrección propuesta:** separar etiquetas intrínsecas (sigla, diámetro, longitud segmentaria) de referencias extrínsecas (alturas y distancia). Ofrecer recolocación o evitar solapamientos. No usar el número escrito como una escala exacta de los píxeles de la plantilla.

### 7. El ejemplo precargado necesita más contexto para ser un caso docente — prioridad media

Se anuncia reflujo segmentario y aparecen GSV roja de muslo, segmento azul distal y una tributaria conectada con reentrada. No constan SFJ, condiciones de adquisición ni límites anatómicos medidos del segmento. Los 18 cm se asignan a una de las proyecciones; repetir el eje en otras caras no constituye evidencia adicional.

**Corrección propuesta:** denominarlo muestra de códigos, o convertirlo en un caso ficticio completo con datos de unión, inicio/final de reflujo, referencias y respuesta esperada. Evitar que una unión no mostrada sea interpretada como sana o insuficiente.

### 8. La safenectomía se representa con marcas diagonales aisladas — prioridad media

El código dibuja una diagonal en cada nodo del trayecto cuando `plane === 'surgery'`. La convención solicitada es un trazo con pequeñas paralelas perpendiculares. Una curva con pocos puntos puede quedar con muy pocas marcas y parecer otro signo.

**Corrección propuesta:** generar marcas cortas perpendiculares a intervalos del trayecto y enseñar su significado. Separar plano fascial de cirugía y de alteración parietal; un único selector excluyente impide combinaciones legítimas, por ejemplo engrosamiento con sinequias.

### 9. Se pueden crear combinaciones de tipo y color contradictorias — prioridad media

El mismo selector permite una vena verde o amarilla y una estructura oval azul o roja. La úlcera siempre se pinta de negro, pero su registro conserva cualquier condición seleccionada: la lista puede mostrar un código distinto del dibujo.

**Corrección propuesta:** restringir opciones según el tipo de objeto, conservando color funcional para venas y categoría para otras estructuras. Una ausencia o limitación debe tener texto explícito, sin color que parezca afirmar competencia.

### 10. Los datos importados o del almacenamiento no se normalizan — prioridad media

La salida presupone `points[0]`, coordenadas finitas y objetos completos. Una entrada dañada podría bloquear el mapa o producir SVG inválido. Los campos permiten números sin feedback específico y no hay recuperación guiada del trabajo.

**Corrección propuesta:** validar esquema, tipos, identificadores y números al cargar. Si falla un registro, ofrecer recuperación o exportación de la copia dañada sin perder los demás elementos. Un estado dañado no debe convertirse en un trayecto negro por defecto.

### 11. Pérdida de trabajo no suficientemente previsible — prioridad media

Cambiar cara o herramienta descarta el trazo abierto. Cargar el ejemplo sustituye el mapa activo. El estado seleccionado puede seguir apuntando a un elemento ya retirado; no existe importación para retomar un JSON exportado.

**Corrección propuesta:** conservar borradores por cara o avisar antes de descartarlos, deshacer/rehacer coherente y carga de ejercicios con copia previa. La importación necesita validación y control de tamaño.

### 12. El lenguaje de control de calidad puede ser más útil — prioridad media

Una lista fija no muestra el vínculo entre un problema y el dato concreto del mapa. La biblioteca presenta descripciones sin una muestra gráfica local del símbolo. Las regiones inguinal y poplítea no tienen su propia ampliación de trabajo.

**Corrección propuesta:** mostrar primero errores de datos; después datos faltantes; por último observaciones para revisión docente. Poder seleccionar la entrada desde cada mensaje. Añadir muestras gráficas del código y actividades de corrección de un mapa mal representado. Las ampliaciones requieren contexto y datos, no solo aumento de tamaño.

## Módulo de comprobación aportado

`src/data/mapValidation.js` exporta `validateEducationalMap(entries, meta)`. Devuelve objetos `{id,severity,message,entryId?}`. Revisa datos legibles, lateralidad, contexto, esquema de elementos, coordenadas, números, identificación de ejes, medidas, perforantes y categorías de color. `meta.views` admite tres caras sin exigir contenido en cada una. Una SSV descrita como no evaluada conserva esa limitación y no se califica como normal.

Campos opcionales útiles para la interfaz: `meta.indication`, `meta.views`, `entry.region`, `entry.flowRole`. Los chequeos no aplican umbrales diagnósticos de reflujo ni deducen función de perforantes por calibre. Una duración no se convierte en decisión terapéutica.

Prueba ejecutada: `node --test tests/map-validation.test.mjs`, cuatro casos: mapa normal sin duplicación de caras, lateralidad y número inválido, perforante sin referencia y datos dañados con anotación no evaluable. Esta prueba acredita funcionamiento de esas reglas, no validez clínica del mapa.
