# Microexplicaciones 3D de los conceptos · 8.2

Cada una de las 80 páginas abre con definición a la izquierda y una explicación tridimensional breve a la derecha. En móvil se conserva el orden definición → explicación. Las demostraciones 2D, la práctica de un ajuste, las referencias clínicas y el laboratorio avanzado anterior se conservan debajo.

## Estado de entrega

80 storyboards y 80 escenas configuradas; ocho narraciones originales recibidas, verificadas e integradas. Sonido, ultrasonido, frecuencia, período, longitud de onda, amplitud, velocidad de propagación e impedancia acústica tienen voz. Las otras 72 permiten reproducción visual y búsqueda, y avisan expresamente que su voz está pendiente. No se sustituyen por voz del navegador ni se presentan como narradas.

HeyGen devolvió un error de transporte al solicitar «Eco». Se detuvo la generación y se solicitó al propietario autorización para reintentar y continuar; no se repitieron las ocho solicitudes exitosas. La existencia del error no demuestra que la solicitud fallida no consumiera cuota. No hay reintentos automáticos de síntesis.

## Método adaptado de Flebo Animaciones

Se consultaron `GUIA_PARA_FUTURAS_ANIMACIONES.md`, `docs/animacion/ARQUITECTURA.md`, `PRODUCCION.md`, el compilador de narración y las guías pertinentes del proyecto de referencia local. Sus originales no se modificaron. Se adaptaron los métodos a **Three.js r186 modular y React**, versiones ya presentes aquí; no se incorporó el motor global r128 ni se copió su aplicación.

- Objetivo: definición y mecanismo del glosario revisado, con fuentes por concepto.
- Tres tomas: orientación/idea, acercamiento al mecanismo y consecuencia o confusión que debe evitarse. El control cambia en la segunda toma; la tercera permite observar el resultado.
- Construcción: superficies BufferGeometry, conductos CatmullRomCurve3/TubeGeometry, jerarquías de sonda/partes, eritrocitos y partículas instanciados. Deformaciones actualizan vértices, normales y límites sin reconstruir mallas por fotograma.
- Reproducción determinista: `sampleConceptFilm(film,t,audio)` reconstruye cámara, parámetro y desplazamiento. La búsqueda no acumula fases previas. Los tiempos están ampliados; no se presentan velocidades de animación como tiempos fisiológicos reales.
- Cámara: encuadre general → foco → resultado, con interpolación orbital. Pausar permite girar y acercar. La preferencia de movimiento reducido conserva una cámara fija; reproducir sigue siendo voluntario.
- Flujo: trayectorias dentro del conducto, cambios continuos de desplazamiento y deformación ilustrativa de la luz. Las valvas mantienen una inserción en la pared; no se afirma simulación hemodinámica validada.

## Audio y sincronización

Voz comprobada por identificador: **Rocío - Calm & Trustworthy**, `84854979e66846989bc6c5855f53268f`, español, disponible y con pausas. Se envió SSML con pausas de 0,9 s entre tomas y 1,2 s final; se omitieron `engine` y `speed`. Las ocho respuestas registraron `orca`. No se acelera ni procesa el MP3; la reproducción web usa 1×.

El reloj principal de las piezas narradas es `audio.currentTime`. Las tomas, cámara, mecanismo y subtítulos usan segundos absolutos derivados de las marcas de palabra recibidas. El compilador comprueba la coincidencia exacta normalizada del texto y verifica duración/códec con FFprobe. El SHA-256 forma parte del nombre MP3 para evitar una copia antigua en caché. Se conservan guion, SSML, voz, motor devuelto, duración, hash, requestId y palabras con tiempos. Las URLs temporales de descarga no se publican.

Archivos por pieza aceptada en `public/media/concept-films/`: MP3 original con hash, JSON de procedencia y tiempos, subtítulos VTT y SRT. El usuario puede descargarlos desde «Guion y recursos». `speech-scripts.json` contiene los 80 guiones; `storyboards.json`, sus objetivos y tomas. Las respuestas originales se conservan en la carpeta local ignorada `output/narration-v9/`.

Para añadir una narración autorizada: usar el guion ya preparado; conservar la respuesta como `<id>-response.json`; ejecutar `python scripts/download-concept-audio.py`; revisar la coincidencia/transcripción, límites de cue y reproducción; construir/publicar otra vez. El descargador nunca solicita síntesis y no reintenta generaciones.

No se exportó MP4. Esta entrega reproduce geometría 3D y audio en el navegador; permite ampliar, pausar, recorrer y volver a abrir la pieza.

## Precisión y revisión

Las afirmaciones proceden del glosario y sus referencias primarias identificadas (IAEA, FDA, AIUM y guías venosas según cada término). No se añadieron umbrales clínicos ni se atribuye al consenso cartográfico una norma de física del ultrasonido. Se conservan la fuente y las limitaciones de cada concepto. Los 13 originales documentales del consenso se verifican por sus hashes en las pruebas existentes.

Se revisan especialmente: onda longitudinal frente a transporte material; frecuencia portadora frente a repetición de pulsos; ángulo/signo; envoltura por Nyquist; ganancia frente a emisión; selección de profundidad; persistencia; TI como índice, no temperatura; MI y sus unidades. El monitor de las escenas contiene señales sintéticas identificadas, nunca imágenes clínicas inventadas.

La prueba de geometría recorre las 80 configuraciones y sus tomas, comprueba matrices y vértices finitos, topología estable y limpieza. Las pruebas de audio verifican integridad de archivos, duración y límites de subtítulos/tomas. La revisión de navegador cubre reproducción a 1×, final, pausa, búsqueda, ampliación/cierre, reapertura y pantalla estrecha; no sustituye una revisión docente clínica independiente ni una escucha humana completa de todas las piezas.

Los originales gráficos del consenso, el constructor y la metodología no cambian en esta revisión. No se incorporan cuestionarios ni puntuaciones.
