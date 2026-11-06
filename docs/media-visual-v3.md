# Banco visual clínico v3

Se entregan **13 recursos reales: 10 imágenes y 3 MP4**, con **13 miniaturas estáticas**. Los medios principales suman 4.483.223 bytes (4,48 MB decimales); los GIF originales de dos clips se conservan aparte para trazabilidad. Todo se sirve localmente desde `public/media/clinical-v3/`, sin depender de enlaces externos al visualizarlo.

## Integración

`src/data/clinicalMedia.js` exporta `clinicalMedia` y una exportación por defecto. Incluye `src`, `url`, `thumbnail`, `type` (`image` o `video`), dimensiones, bytes, SHA-256, licencia/enlace, autoría, ficha de origen/figura, región, modo, contexto patológico, límite docente y conceptos. Los tres vídeos tienen duración y número de cuadros. `public/media/clinical-v3/media-manifest.json` es la copia distribuible; `ATTRIBUTION.md` contiene los créditos completos y las adaptaciones.

Mostrar la región y la marca de caso patológico junto al recurso. Conservar visibles las notas clínicas que evitan atribuir normalidad o diagnóstico equivocado al ejemplo. Las miniaturas son estáticas: el estudiante debe activar el vídeo y disponer de pausa; no hace falta animación automática en galerías. Se puede repetir un clip desde la interfaz, pero el MP4 conserva una sola secuencia original.

| ID | Recurso local | Uso visual | Licencia |
|---|---|---|---|
| transductor-lineal-real | `transductor-lineal.jpg` | transducer | CC BY-SA 2.5 |
| ecografo-real | `ecografo-2006.jpg` | transducer | CC BY-SA 2.5 |
| valvula-poplitea-real | `valvula-poplitea.mp4` | bmode, valves, anatomy | CC BY-SA 3.0 |
| coaptacion-yugular-real | `coaptacion-yugular.mp4` | pressure, bmode | CC BY 2.0 |
| femoral-pw-normal-real | `femoral-pw-normal.jpg` | spectral, deep | CC BY 2.0 |
| femoral-pw-obstruccion-real | `femoral-pw-obstruccion.jpg` | spectral, deep | CC BY 2.0 |
| femoral-power-real | `femoral-power-hematoma.jpg` | power, deep | CC BY 2.0 |
| femoral-color-tvp-real | `femoral-color-tvp.jpg` | color, anatomy, deep | CC0 1.0 |
| fibulares-transversal-real | `fibulares-eje-corto-color.jpg` | color, orientation, deep | CC0 1.0 |
| fibulares-longitudinal-real | `fibulares-eje-largo-color.jpg` | color, orientation, deep | CC0 1.0 |
| femoral-compresion-real | `femoral-compresion-color.jpg` | pressure, bmode, deep | CC BY-SA 4.0 |
| safena-bflow-real | `safena-bflow.mp4` | reflux, valves | CC0 1.0 |
| safena-modo-b-real | `safena-aneurisma-modo-b.jpg` | bmode | CC0 1.0 |

## Revisión clínica del material

- Se revisaron las imágenes completas, una hoja de contacto y cuadros de las secuencias. No se observan nombres, números de expediente ni rostros de pacientes. El vídeo yugular conserva hora/fecha de equipo y texto operativo, sin nombre ni identificador de paciente visible. Las fotografías de equipo no muestran pacientes.
- La válvula poplítea aporta anatomía y movimiento de una válvula real. La fuente no describe patología; esto no equivale a certificar normalidad de toda la extremidad.
- El clip yugular demuestra coaptación de una vena en el cuello. No se asignó a anatomía, posición o protocolo de pierna.
- La figura 3 de Lønnebakken et al. es un espectro femoral contralateral descrito por los autores como normal; la figura 2 es el lado obstruido. Las dos capturas indican **θ=74°**: sirven para comparar fasicidad respiratoria, **no** para enseñar corrección angular o cuantificar velocidad. No se asignaron a `angle`, `measurement` ni `reflux`.
- La figura Power del mismo caso conserva el rótulo original «DVT». El artículo indica que era la sospecha inicial y documenta **compresión extrínseca por hematoma**, no TVP confirmada. La nota se mantiene en el manifiesto.
- Las imágenes fibulares se clasifican como **Doppler color**, no Power: se inspeccionó la codificación bicolor real y no se copió la categoría de búsqueda como si confirmara el modo.
- La vena femoral es profunda. No se adopta la nomenclatura obsoleta «vena femoral superficial» de algunas fuentes antiguas ni se enseña como regla universal que la vena siempre está medial a la arteria.
- La imagen de trombo femoral con compresión se redujo proporcionalmente de 4608 × 2682 a 2000 × 1164. No se recortaron rótulos o estructuras; el original de 22,85 MB queda en la carpeta de trabajo, con ficha de origen pública y licencia CC BY-SA 4.0.
- B-flow es una técnica distinta de Doppler color, Power y PW. El caso de safena magna tiene reflujo y un aneurisma trombosado distal; ni ese clip ni una imagen estática permiten medir por sí solos el tiempo de reflujo.
- Predomina material patológico porque las imágenes normales de pierna disponibles en varias revisiones utilizan licencias no comerciales. No se sustituyeron imágenes faltantes por contenido sintético etiquetado como clínico. La anatomía normal se complementa con el espectro femoral de referencia, la válvula y el atlas anatómico 3D verificado del proyecto.

## Secuencias y optimización

| Clip | Original | MP4 local | Duración y cuadros |
|---|---|---|---|
| Válvula poplítea | GIF CC BY-SA 3.0 | H.264, 560 × 416 | 0,7 s · 7 cuadros |
| Coaptación yugular | OGV CC BY 2.0 | H.264, 640 × 480 | 6,0 s · 90 cuadros |
| Safena B-flow | GIF CC0 | H.264, 494 × 234 | 2,75 s · 55 cuadros |

No se añadieron cuadros, se invirtió la secuencia ni se modificó la velocidad. B-flow recibió únicamente un borde negro de un píxel a derecha e inferior para obtener dimensiones pares. Las miniaturas corresponden a cuadros reales. La compresión H.264/JPEG tiene pérdida; no se presenta como datos cuantitativos originales ni como material diagnóstico de paciente actual.

## Procedencia y licencias

Se verificaron fichas individuales de Wikimedia Commons mediante su API `imageinfo/extmetadata` y el texto completo del artículo original de Lønnebakken et al. (2009, doi:10.1186/1476-7120-7-14). El artículo y sus figuras declaran CC BY 2.0 y consentimiento escrito para publicación de imágenes. Las tres figuras se descargaron del servicio oficial de PMC mediante la estructura actual `PMC2667400.1`; se conservaron metadatos y XML de licencia en la carpeta de investigación.

Fuentes principales:

- [Lønnebakken et al., artículo, pies de figura, consentimiento y derechos](https://link.springer.com/article/10.1186/1476-7120-7-14).
- [Documentación oficial de acceso a conjuntos PMC](https://pmc.ncbi.nlm.nih.gov/tools/pmcaws/). La API OA/FTP antigua dejó de operar en agosto de 2026; se usó su distribución cloud actual.
- Fichas individuales y enlaces de licencia de los 10 recursos Commons: en `public/media/clinical-v3/ATTRIBUTION.md` y en el manifiesto por archivo.

No se incorporaron imágenes con licencia NC/ND, archivos de licencia ambigua, capturas de fabricantes ni fotografías de paciente sin contexto suficiente de autorización personal. Las fotografías Commons de examen de pie se revisaron, pero no se publicaron. El PW portal y Power carotídeo abiertos se excluyeron del banco final al conseguir ejemplos femorales más pertinentes. Tampoco se incorporaron ilustraciones como si fueran capturas ecográficas reales.

## Verificación realizada

- Importación JavaScript válida y 13 IDs únicos.
- Todas las rutas locales, miniaturas y originales referidos existen.
- Todas las imágenes se decodifican; las dimensiones y SHA-256 coinciden con el manifiesto.
- Todos los conceptos son IDs existentes de `visualCurriculum.js`.
- Tres MP4 decodificables H.264 con tiempos y número de cuadros comprobados frente a las fuentes.
- Inspección visual: `output/visual-v3-research/contact-sheet-final.jpg`; cuadros de válvula y compresión en la misma carpeta. Los archivos de trabajo no forman parte de la aplicación publicada.

No se modificaron componentes, navegación ni pruebas de la aplicación. La publicación y revisión de uso en interfaz corresponden a la integración principal.
