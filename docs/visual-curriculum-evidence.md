# Currículo de referencias visuales · 34 conceptos

Revisión: 6 de noviembre de 2026. `src/data/visualCurriculum.js` contiene 34 conceptos, 136 propósitos de vista, enlaces a fuentes gráficas primarias y correspondencias con las diez lecciones, doce etapas y trece controles del simulador. El archivo describe el objetivo docente de cada representación; no afirma que el renderizador reproduzca física acústica o hemodinámica validada.

## Cuatro preguntas visuales por concepto

1. **Volumen:** dónde están objeto, tejido, flujo, haz o información y cómo se relacionan en el espacio.
2. **Sección:** qué se observa al cortar ese volumen o seleccionar una región; no equivale a una adquisición real.
3. **Gráfico:** qué variable depende de otra, qué eje se mide y qué información puede perderse.
4. **Comparación:** qué cambia al modificar una variable conservando las demás condiciones del ejemplo.

No se cuentan cuatro copias del mismo dibujo con rótulos distintos. Los propósitos especifican tareas diferentes: onda/oscilación local/curva temporal/frecuencia; vaso y haz/proyección/coseno/ángulos; contacto/sección/área/presión; volumen valvular/sección/ciclo/comparación de fases; adquisición/documentos/matriz/concordancia. La implementación debe comprobar esta distinción visualmente.

## Fuentes primarias y referencias gráficas

| Fuente | Localizador y utilidad | Condición de integración |
| --- | --- | --- |
| [IAEA, Diagnostic Radiology Physics](https://www.iaea.org/publications/8841/diagnostic-radiology-physics) | Capítulos 12–13: propagación, transductor, haz, formación de imagen, procesamiento y Doppler. Su página oficial identifica edición 2014 y 251 figuras. | Enlaces de estudio; no se copian páginas ni figuras. Los diagramas del aula son elaboraciones originales. |
| [OMS, Manual of diagnostic ultrasound, vol. 1](https://www.who.int/publications/i/item/9789241547451) | Manual oficial de 2011; introducción a física, instrumentos e imágenes. Segunda referencia gráfica para fundamentos y recepción/procesamiento. | Enlazar la edición oficial. El repositorio IRIS mostró 403 durante una apertura; no se afirma lectura completa desde esa ruta en esta revisión. |
| [Necas, dúplex de insuficiencia venosa](https://pmc.ncbi.nlm.nih.gov/articles/PMC5024873/) | Técnica, optimización y figuras de posición/manobra/flujo; DOI 10.1002/j.2205-0140.2010.tb00178.x, número de noviembre de 2010. | Referenciar; no reutilizar imágenes sin comprobar su licencia específica. |
| [AIUM, examen venoso periférico](https://doi.org/10.1002/jum.70049), [índice oficial](https://www.aium.org/resources/practice-parameters/peripheral-venous) | Revisión 2024 publicada en 2026; técnica, registros, equipo, posición y límites. | Las reglas complementan adquisición y no se atribuyen al consenso cartográfico. |
| [SVS/AVF/AVLS, parte II](https://pmc.ncbi.nlm.nih.gov/articles/PMC11523430/) | Apartados 1.3–1.4: umbrales por segmento, provocación, rastreo, compresión, registros espectrales y mediciones. | La búsqueda recuperó el texto original indexado; una apertura directa de PMC mostró control de navegador. |
| [Lee et al., anatomía y abordajes](https://pmc.ncbi.nlm.nih.gov/articles/PMC5381851/) | Fig. 2: coaptación/válvulas; figs. 3–5: profundo y ventanas; figs. 6–8: GSV/SSV y compartimento; figs. 9–10: perforantes y conexiones; suplementos: ejemplos dinámicos. | Artículo CC BY-NC 3.0 según el original. Enlace de consulta, sin redistribuir figuras dentro de la web. Fuente histórica de anatomía, no autoridad única para nomenclatura ASV de 2024 ni protocolo contemporáneo completo. |
| [Consenso latinoamericano, PDF español](https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf) | pp. 1–2: plantillas/alcance; pp. 3–6: códigos; pp. 7–8: medidas/referencias; pp. 9–12: ampliaciones. | Enlazar al titular. Ilustraciones originales del aula; no duplicar sus figuras como media sin permiso. |
| [Imagen clínica femoral](https://commons.wikimedia.org/wiki/File:Ultrasonography_of_deep_vein_thrombosis_of_the_femoral_vein_-annotated.jpg) | Ya incluida y acreditada en el proyecto; caso patológico que permite distinguir anatomía B, color y contexto. | Conservar rótulo de caso patológico y créditos existentes. No usarla como vena normal ni como diagnóstico por ausencia de color aislada. |
| [Clip clínico B-flow](https://commons.wikimedia.org/wiki/File:B-flow_ultrasonography_of_venous_reflux.gif) | Ya incluido y acreditado; dirección y respuesta descritas por su fuente. | B-flow es una modalidad diferente del Doppler. No presentarlo como Power, color o PW ni medir reflujo solo desde el GIF. |

## Controles y semántica de los parámetros

Las escalas y comparaciones son valores de escena. No se convierten en presets universales, fuerzas clínicas ni decisiones terapéuticas. El renderizador debe interpretar cada parámetro por concepto y familia:

- En `angle`, el ángulo es haz–flujo. En `orientation`, la misma clave técnica representa giro del transductor; en `position`, inclinación del apoyo; en `anatomy`/`cartography`, vista de cámara. No aplicar la ecuación Doppler a estos últimos controles.
- En `continuity`, la clave técnica `depth` es nivel porcentual del recorrido y no centímetros de profundidad acústica.
- En `documentation`, la clave técnica `gain` representa proporción de campos identificados del ejemplo y no amplificación de recepción. Un 100% documental no implica precisión clínica.
- Las comparaciones no siempre significan malo/bueno. `deep` compara sin/con compresión y `valves` compara fases; ambos pares tienen propósitos legítimos. El rótulo debe conservar su significado.
- `valves` ilustra apertura/coaptación y no clasifica un paciente. Si se representa retorno sostenido atravesando valvas que coaptan por completo, la animación enseñaría una relación contradictoria y debe corregirse.
- `power` no puede usar dirección rojo/azul, valor de velocidad por naranja o aliasing direccional convencional.
- Ganancia/TGC/rango dinámico/persistencia son recepción o presentación; no deben aumentar visualmente la energía acústica emitida.
- `reflux` mantiene diferenciadas Valsalva y aumento distal/liberación. La duración se mide en el tiempo; un cambio de ángulo puede impedir detectar la señal, pero no debe alterar por sí solo la duración física inventada de un evento.
- Las medidas del consenso conservan transversal con pared, mm para diámetro, cm para distancias y referencias explícitas. No medir a partir de la escala del muñeco.

## Límites

Los enlaces aportan contexto gráfico verificable, sin asumir que una licencia de artículo permite redistribuir cualquier imagen o malla. Los 34 conceptos son una cobertura docente, no 34 sistemas físicos validados. Las escenas requieren revisión de correspondencia con sus textos, y el aprendizaje requiere práctica supervisada con ecógrafo, pacientes y variantes reales. La revisión no acredita competencia ni elimina toda posibilidad de equivocación.
