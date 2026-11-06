# Laboratorio visual claro · rediseño 7.0

Petición: sustituir la apariencia editorial por un laboratorio interactivo con motion graphics, volumen y controles cercanos al objeto. Referencia visual inspeccionada: [MotionSites](https://motionsites.ai/), el 6 de noviembre de 2026. Se adapta la jerarquía visual y la invitación a explorar; la identidad, las ilustraciones y el contenido médico siguen siendo propios del IMF o de sus fuentes identificadas.

## Diagnóstico de la experiencia anterior

Captura actual de la ruta principal: `output/quality/lab-v8/01-antes.png`. La primera pantalla mostraba un titular editorial y una ilustración estática; el movimiento y sus controles quedaban en páginas posteriores. Ocho accesos competían en dos líneas sobre el escenario. En la metodología, varios bloques de lectura precedían a la demostración. Las referencias del consenso eran fieles, pero su consulta exigía recorrer tablas apiladas.

## Dirección aplicada

- Base blanco frío `#f4f7fa`, panel blanco `#ffffff`, tinta `#172c37`, línea `#dce5eb`, acento IMF `#9f244b`, acento de interacción `#087f8c`.
- DM Sans para controles/lectura y Manrope para títulos breves, conservando los tipos ya usados.
- Navegación lateral compacta, cabecera ligera, escenario 3D dominante y consola junto al efecto. El móvil conserva el mismo orden: objeto, controles, continuación.
- La portada es un banco de trabajo: válvulas, compresión, ángulo Doppler y anatomía con geometría y corte ligados al mismo parámetro/fase. El control modifica el mecanismo; no es decorativo.
- La metodología pone primero la demostración; las explicaciones extensas y las fuentes quedan en consultas desplegables. Se conservan rutas independientes y referencias de cada maniobra.
- El consenso ofrece un visor de tablas originales y una aplicación del símbolo contigua. La consulta sigue usando imágenes originales y el motor cartográfico compartido.
- Movimiento para selección, cambio de estado y orientación. No hay desplazamiento forzado, cursores sustituidos ni animación que impida accionar un control.

Se mantienen pausa, fase manual, teclado, movimiento reducido, atribuciones y las distinciones médicas documentadas. Las imágenes ecográficas conservan su fondo de adquisición; el marco de la aplicación y los escenarios espaciales usan modo claro. No se incluyen preguntas de alumno ni puntuaciones.

## Referencias de construcción

Se consultaron `frontend-design` de Anthropic, las guías de movimiento de Emil Kowalski, las Web Interface Guidelines de Vercel y la referencia local Flebo Animaciones. Se conserva el motor Three.js/Motion existente. Las guías informan decisiones de construcción; no son una certificación del producto.

La revisión funcional y visual se registra en la carpeta de calidad de esta entrega; las reglas médicas, símbolos, medidas y nomenclatura siguen remitiendo a `consensus-conformance-audit.md`.

La cámara interpola una órbita alrededor del foco y se interrumpe al iniciar la manipulación. El primer encuadre, la restauración y el movimiento reducido son inmediatos. Se añadieron sombras suaves en los modelos procedurales y se ajustó la luz para conservar el volumen sobre fondo claro. La portada no ejecuta una órbita decorativa continua.
