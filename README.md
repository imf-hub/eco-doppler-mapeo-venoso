# Aula visual IMF · Eco-Doppler y mapeo venoso

Aplicación educativa estática para médicos que comienzan en ultrasonido. La experiencia prioriza demostraciones, adquisiciones publicadas y manipulación de controles.

## Editor 8.1 · Lienzo vacío y paneles laterales

El constructor abre una plantilla vacía aunque exista una copia guardada. Recuperar el ejercicio es una acción explícita y muestra su origen. Antes de sustituir una copia previa con el nuevo trabajo se conserva una copia anterior; las acciones de nuevo mapa, recuperación y borrado también admiten deshacer. El ejemplo resuelto se consulta en un visor de solo lectura que no modifica ni guarda el ejercicio.

La distribución de escritorio es herramientas y elementos a la izquierda, lienzo estable al centro e inspector del hallazgo a la derecha. Símbolos, condiciones, planos y nombres frecuentes se eligen mediante botones; no hay selectores desplegables en el área de dibujo. El tamaño del lienzo permanece estable al cambiar de herramienta o confirmar. Hay ampliación, selección por proximidad, movimiento y atajos, con captura de teclas limitada al editor y sin interferir con los campos de texto. En móvil se alternan herramientas, lienzo y hallazgo.

El recorte visual de cada cara aísla las impresiones vecinas sin cambiar las coordenadas de los hallazgos ni los archivos originales. El PDF/SVG de entrega sigue usando la plantilla completa y las cinco regiones del consenso. Las referencias grises o negras impresas se identifican como parte del documento original. Punteado por sí solo no asigna aplasia o ablación: esa condición se elige expresamente.

## Aprendizaje 8.0 · Un concepto a la vez

La entrada de conceptos es un índice jerárquico de siete capítulos, con 80 conceptos y búsqueda que reconoce también «ganancias». Cada lección presenta definición → observación animada → práctica con un ajuste → aplicación a la exploración → laboratorio avanzado opcional al final. Las escenas 3D, cortes, gráficas y referencias previas se conservan. Los enlaces antiguos a conceptos se abren en esta ruta progresiva.

El constructor amplía una cara de la plantilla MERIT a la vez. Todas las herramientas usan borrador y confirmación explícita, incluidas las perforantes de un solo punto. La selección admite proximidad y el centro de la circunferencia; ofrece edición, borrado, arrastre y movimiento con flechas, además de deshacer/rehacer. El símbolo original se muestra junto a la instrucción; las tablas originales están en el constructor y en su sección del consenso. SVG/PDF/impresión esperan a confirmar o cancelar los borradores; JSON conserva los elementos confirmados.

Los siete pasos del consenso y las páginas de adquisición tienen una llamada grande a continuar, con movimiento breve respetando reducción de movimiento. Descargar la plantilla es una acción secundaria. No hay evaluaciones, bloqueos ni acreditaciones automáticas.

### Laboratorio visual conservado

La portada es un banco 3D con válvulas, compresión, ángulo Doppler y anatomía. Volumen y corte comparten ajustes y fase. Navegación compacta, iluminación clara, cámara orbital suave e interrumpible, y metodología centrada en el gesto. Las tablas originales del consenso se consultan en un visor junto a la aplicación del símbolo. El texto de consulta permanece disponible en desplegables, que se abren al imprimir. Se conservan las 139 entradas y los documentos originales. Diseño y revisión: `docs/laboratory-redesign-v8.md`.

## Revisión 6.1 · Fidelidad documental

Tablas originales en español y 17 fragmentos de símbolos tomados del PDF. Paleta compartida, aplasia identificada por separado, marca quirúrgica independiente y úlcera con contorno y cuadriculado. Tabla VI con 17 equivalencias en tres idiomas. Cotejo y límites: `docs/consensus-conformance-audit.md`.

## Experiencia 6.0 · El mapa del consenso

Ocho páginas dedicadas al consenso: plantillas originales MERIT de ambos lados, figuras y tablas de origen, nomenclatura, medidas, ampliaciones, construcción e informe. El constructor trabaja sobre la base proporcionada, admite tres caras y dos ampliaciones y exporta SVG/PDF con la plantilla incorporada y el informe del ejercicio. Trazabilidad: `docs/consensus-integration-v6.md`.

## Experiencia 5.0

- Glosario animado con 80 términos: definiciones, mecanismos específicos, controles físicos, observaciones y referencias por término.
- 81 páginas de conceptos, búsqueda por sigla/nombre/definición y sinónimos, índice por capítulos y subtemas.
- Ampliación de láminas, reproducción lenta, pausa y manipulación manual para reducción de movimiento.

- Metodología con una página de ruta, doce páginas de etapa y 37 subpáginas de maniobra; entradas HTML y direcciones independientes.
- Escena exterior, mano y sonda, plano, 3D, imagen publicada, error/corrección y registro en secuencia editorial visible.
- 34 conceptos con 144 microescenas, cortes, gráficas, comparaciones y secuencias de objetos.
- Laboratorio acústico 3D: propagación, transductor, cristales, gel, tejidos, foco y recepción.
- Seis interacciones/artefactos y demostración de uso prudente y ergonomía.
- 23 referencias publicadas, incluidas imágenes ecográficas, fotografías, un esquema anatómico publicado y tres vídeos; con modo, región, licencia y contexto.
- Imagen real junto al modelo; ampliación, reproducción lenta y avance por fotogramas.
- Atlas derecho por capas y contexto postural completo para posición y apoyos.
- Ecógrafo didáctico B, color, PW y Power, con controles causales y medición ilustrativa.
- Cartografía de tres caras, símbolos, medidas e informe, con exportación SVG/JSON/PDF.

No hay cuestionarios, preguntas al alumno, calificaciones ni bloqueos por respuestas. Las páginas de metodología muestran el texto clínico junto a cada ilustración; los fundamentos conservan sus notas ampliables.

## Fundamento y créditos

El consenso latinoamericano estandariza representación cartográfica. La adquisición se apoya además en las guías identificadas de AIUM, ESVS y SVS/AVF/AVLS. El programa no acredita competencia clínica ni sustituye adquisición supervisada.

- [Glosario: fuentes, mecanismos y límites](docs/glossary-evidence-v5.md)
- [Páginas de metodología y límites](docs/methodology-pages-v4.md)
- [Fundamentos visuales](docs/visual-learning-v3.md)
- [Matriz clínica](docs/consensus-evidence.md)
- [Referencias auténticas](docs/media-visual-v3.md)
- [Anatomía: procedencia y licencia](docs/visual-assets-3d.md)
- [Licencias de software y activos](THIRD_PARTY_NOTICES.txt)

Las mallas adaptadas de Z-Anatomy/BodyParts3D conservan CC BY-SA 4.0. El paciente postural es una ilustración contextual: no un modelo clínico de cuerpo completo.

## Desarrollo y publicación

Requiere Node compatible con Vite 7. Instalación: npm ci. Desarrollo: npm run dev. Verificación técnica: npm test. Construcción: npm run build. La construcción genera 50 entradas de metodología y 81 de glosario. Validarlas con node scripts/validate-methodology-pages.mjs y node scripts/validate-glossary-pages.mjs. La auditoría reproducible de los mecanismos se ejecuta con node scripts/audit-glossary-animations.mjs.

El resultado dist/ es portable a Hostinger: subir su contenido a public_html. No requiere servidor Node, base de datos ni credenciales. La metodología y el glosario tienen entradas físicas bajo mapeo/ y glosario/; las demás secciones conservan fragmentos #. Los activos se resuelven desde una base relativa, también en las subpáginas.

Para GitHub Pages, ejecutar node scripts/prepare-pages.mjs después de construir. Publicar main, carpeta /docs. Los documentos de evidencia se conservan al preparar esa carpeta.

Los ejercicios se guardan localmente en el navegador. No introducir datos identificables de pacientes en los ejercicios o informes.
