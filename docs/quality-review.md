# Revisión de calidad 1.1 · Aula IMF

Fecha: 6 de noviembre de 2026. Revisión documental, didáctica, visual y de funcionamiento de la plataforma para médicos con formación flebológica que comienzan en ultrasonido. La decisión técnica es **publicable como recurso educativo de práctica supervisada**. La revisión no equivale a validación clínica ni demuestra eficacia educativa en alumnos reales.

## Diagnóstico

La versión inicial ofrecía una base útil, pero permitía confundir lectura con ejecución. El simulador necesitaba distinguir aliasing, ausencia técnica de señal, maniobras y medición. La cartografía tenía riesgos de lateralidad, posicionamiento del puntero, símbolos, pérdida de contexto y recuperación. La anatomía debía conectar mejor la mano con el plano y la pantalla.

## Recorrido auditado y resultado

| Paso del médico | Estado tras la corrección | Evidencia y alcance |
| --- | --- | --- |
| 1. Entrar y entender el objetivo | Corregido | Mayor legibilidad, navegación y peso central de mapeo. Capturas de inicio, laboratorio y cartografía antes de modificar. |
| 2. Comprender sonido y modos | Corregido | Diez lecciones con fuentes específicas. Ganancia de recepción, Power convencional, dirección Doppler y convenciones cartográficas diferenciadas. |
| 3. Corregir una imagen deficiente | Comprobado | Cuatro experimentos: exceso de ganancia, flujo lento, aliasing y presión. Requieren corrección y explicación. PW envuelve frecuencias sobre Nyquist; Power no usa aliasing direccional. Pruebas de condiciones útiles y fallidas. |
| 4. Medir después de la maniobra | Comprobado | Cursores siguen respondiendo con pantalla congelada. Una medición invertida, sin provocación, sin señal o con aliasing no registra el ejercicio. Comprobación manual con cursores 2.00–2.85 s y respuesta razonada. |
| 5. Relacionar anatomía y adquisición | Comprobado con límites | Atlas original de 11 grupos; perforantes y planos locales corregidos. Taller 3D de paciente, apoyo, descarga, barrido, rotación, presión, inclinación y marcador. Secuencia de cuatro relaciones completada manualmente. Esquema conceptual, no reconstrucción de un paciente. |
| 6. Seguir un protocolo de mapeo | Comprobado | Las 12 etapas incluyen paciente, sonda, pantalla, captura, calidad y siguiente decisión. Se separan Valsalva y aumento distal. Se revisan segmentos profundos sin afirmar exclusión completa de TVP mediante puntos aislados. |
| 7. Registrar progreso razonado | Comprobado | Responder correctamente una pregunta no habilita por sí solo una etapa: también exige revisar acciones y registrar. Se probó bloqueo inicial, bloqueo tras solo responder y habilitación tras revisar acciones. El avance pondera fundamentos, prácticas, rastreo, mapeo, cartografía y casos; no acredita competencia clínica. |
| 8. Construir y revisar el mapa | Corregido y probado | Tres plantillas distintas, reflexión por lado y bloqueo de lateralidad al dibujar. Coordenadas mediante transformación inversa SVG. Borradores por cara, ampliación, alternativa de teclado, deshacer/rehacer, recuperación JSON y validación de datos. El caso explicado contiene contexto, medidas y límites; no activa reglas diagnósticas por diámetro. |
| 9. Conservar un producto revisable | Comprobado con límites | SVG incluye tres caras, posición, maniobra, informe y limitaciones. JSON validado y recuperable. PDF con mapa e informe vectorial/registro de medidas; ejemplo final de dos páginas renderizado e inspeccionado. El generador se comprobó también con adaptador de imagen en entorno de prueba; la descarga PDF se activó en navegador. Impresión física no ensayada. |
| 10. Usar móvil, teclado y búsqueda | Comprobado con límites | Vista 390 × 844 sin desbordamiento horizontal en cartografía y mapeo. Ampliación inicial de cara en móvil. Previsualización de señal al ajustar controles. Preguntas con radios nativos, foco de búsqueda y enlaces a la etapa exacta. No es auditoría WCAG completa ni prueba en teléfono físico. |
| 11. Recuperarse de fallos | Corregido | Validación de almacenamiento e importaciones, datos de mapa acotados, escape XML y pantalla de recuperación ante error de interfaz. Se informa cuando el navegador no puede guardar. |
| 12. Preparar publicación | Comprobado en construcción | 16 pruebas automatizadas pasan; compilación de producción correcta. Three.js, taller, atlas y exportación PDF se cargan por demanda. Preparación de Pages elimina únicamente carpetas generadas antiguas; conserva documentos. Paquete estático portable para Hostinger. |

## Fuentes y trazabilidad

- [Revisión clínica detallada](quality-clinical-review.md): maniobras, técnica, umbrales, nomenclatura y referencias primarias.
- [Revisión cartográfica](quality-cartography-review.md): diagnóstico y correcciones del editor.
- [Plan de aceptación](quality-plan.md).
- [Matriz del consenso](consensus-evidence.md), [auditoría de recursos](resource-audit.md) y [créditos de media](media-credits.md).

El consenso latinoamericano respalda las convenciones de representación. La adquisición se atribuye además a AIUM, SVS/AVF/AVLS y ESVS. Los enlaces y sus localizadores están dentro de las lecciones y etapas. No se atribuye al consenso cartográfico todo el contenido técnico complementario.

## Qué sigue requiriendo evaluación humana

Antes de incorporar el aula a un programa formal, un docente institucional debe revisar los ejemplos y observar la ejecución con ecógrafo, pacientes y variantes reales. Los esquemas 3D no reproducen toda la anatomía ni el campo acústico. Solo hay dos recursos clínicos abiertos incorporados; esto no constituye una biblioteca representativa de adquisiciones normales y patológicas. El software detecta integridad documental, no corrección anatómica, hemodinámica ni calidad diagnóstica de un estudio real.

No se realizaron ensayo de eficacia educativa, validación con pacientes, examen práctico de alumnos, auditoría WCAG integral ni instalación en Hostinger. El progreso y los mapas permanecen en el navegador y no se sincronizan entre equipos. La versión pública es educativa; no es un dispositivo médico ni certifica a un explorador experto.

## Reversión y mantenimiento

La versión anterior queda conservada en el historial de GitHub. Para actualizar: revisar fuentes, ejecutar `npm test`, construir, preparar `docs/`, inspeccionar pantallas y exportaciones y comprobar la web publicada. Para Hostinger, conservar el paquete anterior antes de sustituir archivos. No introducir información identificable de pacientes en ejemplos, mapas o capturas.
