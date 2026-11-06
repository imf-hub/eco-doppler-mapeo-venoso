# Revisión clínica y docente de calidad — Aula IMF

Fecha: 6 de noviembre de 2026. Alcance: revisión documental de los datos docentes, coherencia de los casos y reglas del consenso. No es una certificación ni una validación clínica del software, de la anatomía o del aprendizaje de sus usuarios. Las recomendaciones de interfaz se comunican al responsable del proyecto y se deben comprobar después de implementarlas.

## Dictamen

La base documental diferencia correctamente la representación cartográfica de la adquisición dúplex. Los umbrales de reflujo se atribuyen a SVS/AVF/AVLS y distinguen los segmentos profundos. La primera versión, sin embargo, dependía demasiado de lectura y preguntas de reconocimiento: el alumno podía responder bien sin demostrar cómo obtener una captura interpretable, seguir un circuito o producir un informe concordante.

Para este público, la calidad requiere conectar una acción de la mano, un cambio de imagen, una comprobación y una decisión de documentación. Una animación no basta si su resultado puede enseñar una relación falsa.

## Hallazgos y correcciones

| Prioridad | Hallazgo | Corrección aplicada en datos / criterio de aceptación |
| --- | --- | --- |
| Alta | La secuencia de reflujo podía hacer pensar que todas las maniobras se interpretan después de liberar compresión | Se separan Valsalva y aumento distal. El alumno debe identificar el momento de la maniobra y medir flujo retrógrado, no duración del esfuerzo. |
| Alta | “Femoral común, femoral y poplítea” sin especificar segmentos podía reforzar una exploración de puntos aislados | Se explicitan femoral proximal/media/distal y el alcance del protocolo. No se presenta la revisión de reflujo como exclusión completa de TVP. |
| Alta | Cada paso carecía de un producto observable de adquisición | Se añadió `acquisition` a las 12 etapas: paciente, transductor, pantalla, captura, calidad y siguiente decisión. Son instrucciones educativas originales que deben acompañarse de práctica supervisada. |
| Alta | El modelo de color y el espectro genérico no pueden representar por sí solos toda la evidencia de cada viñeta | Los casos conservan sus datos explícitos y el rótulo de escena genérica. Se recomienda parametrizar duración, segmento y maniobra si el simulador se usa para resolver un caso. |
| Alta | Power Doppler puede confundirse con color sin dirección si ambos tienen el mismo comportamiento visual | Se aclara en la lección que el Power convencional representa potencia y no presenta el aliasing direccional típico del color. La implementación debe comprobar esta distinción. |
| Media | Toda la sección de fundamentos remitía visualmente a IAEA incluso cuando trataba seguridad o técnica venosa | Se añadió `sourceIds` por lección y entradas específicas AIUM y técnica dúplex. La interfaz debe usar estas fuentes en lugar de un único enlace fijo. |
| Media | El enlace directo de ESVS redirigió a una pantalla de acceso durante esta revisión | Se sustituyó en los datos por su DOI persistente. El acceso al texto completo puede depender del editor; el enlace institucional de la guía también queda identificado más abajo. |
| Media | El término de ASV debe convivir con la tabla histórica del consenso | Se conservan AAGSV en su contexto de 2023 y ASV como actualización terminológica de 2024. No se trata ASV automáticamente como tributaria epifascial. |

## Reglas cartográficas comprobadas

El [PDF español del consenso](https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf) se volvió a leer y cotejar en esta revisión. Localizadores: páginas 1–2, plantilla de tres caras y venas a representar; páginas 3–6, colores, trazos y símbolos; páginas 7–8, medidas y referencias; páginas 9–12, ampliaciones.

Se confirma el uso de caras anteroexterna, anterointerna y posterior por miembro; se pueden agregar ampliaciones inguinal y poplítea. El mapa acompaña el informe y no representa de forma completa el sistema profundo. El diámetro para esta cartografía es transversal e incluye pared. Las unidades y referencias de altura deben permanecer explícitas. Estas convenciones no deben confundirse con la barra de color del ecógrafo ni con otros protocolos de medición.

## Adquisición y fuentes primarias

1. **SVS / AVF / AVLS, guía 2023, parte II:** [texto original en PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11523430/), apartados 1.3–1.4; fundamento en [parte I, DOI](https://doi.org/10.1016/j.jvsv.2022.09.004). La lectura de PMC mostró un control de acceso automatizado en un intento; los apartados se contrastaron mediante el texto indexado de la publicación y las copias oficiales de sociedades. Los criterios temporales que ya contiene la web son consistentes con la guía. Las recomendaciones son específicas de su contexto y no son reglas terapéuticas automáticas.
2. **AIUM, revisión 2024, publicación impresa enero 2026:** [DOI 10.1002/jum.70049](https://doi.org/10.1002/jum.70049), [registro institucional](https://www.aium.org/resources/practice-parameters/peripheral-venous), [PMID 40955146](https://pubmed.ncbi.nlm.nih.gov/40955146/). Se verificó la correspondencia de título, revisión y año. El texto primario indexado confirma técnica y registros en la sección “Venous Insufficiency: Lower Extremity”. No se asumió que la etiqueta de la revisión equivaliera a su fecha de publicación.
3. **ESVS 2022:** [DOI persistente](https://doi.org/10.1016/j.ejvs.2021.12.024), [página institucional de la guía](https://esvs.org/guideline/chronic-venous-disease-of-lower-limbs/). Se mantiene como complemento. El PDF directo usado anteriormente redirigió a login; no se afirma en esta revisión haber podido reabrir el texto íntegro desde esa ruta.
4. **Nomenclatura ASV:** [declaración primaria de 2024, PMID 38008181](https://pubmed.ncbi.nlm.nih.gov/38008181/). La equivalencia histórica facilita interpretar el consenso sin perpetuar la idea de una mera rama tributaria.
5. **Física y técnica:** [IAEA, Diagnostic Radiology Physics](https://www.iaea.org/publications/8841/diagnostic-radiology-physics), capítulo de ultrasonido; [Necas, técnica dúplex venosa](https://doi.org/10.1002/j.2205-0140.2010.tb00178.x). La física conceptual no valida un modelo de propagación o una simulación hemodinámica.

## Revisión de los seis casos

Los casos distinguen errores técnicos, reflujo segmentario, criterios por vaso, variación de SSV, perforante de reentrada y exploración limitada. No contienen una recomendación de tratamiento ni un paciente real. Sus respuestas son coherentes con los datos declarados. En el caso de 0.8 s, “no superar el umbral femoral” no equivale a asegurar normalidad clínica de toda la extremidad; la medición se interpreta dentro del resto del examen.

La galería identifica un caso femoral con TVP y un clip de B-flow. Este último no se denomina Doppler. Ninguno sustituye ejemplos adquiridos con compresión normal y registros espectrales de una exploración completa. Si se amplía la galería, preservar licencia, anatomía, maniobra y diagnóstico de origen, y evitar reutilizar un caso patológico como “normal”.

## Comprobaciones que debe completar la publicación

- Verificar que cada control visible modifica la variable declarada y que los signos de la pantalla no contradicen su explicación.
- Distinguir compresión sobre la vena de compresión distal para aumento.
- Mostrar orientación, plano y nivel; pedir recuperar el eje cuando se pierde una estructura.
- Registrar evidencia del caso, unidades, referencias y limitaciones en el producto final.
- Revisar el mapa e informe con un docente; no conceder “experto” por completar pantallas.

La adopción como programa formal necesita revisión por docentes clínicos del IMF, evaluación práctica con pacientes y seguimiento de errores de los alumnos. Esta revisión documental por sí sola no demuestra competencia ni validez diagnóstica.
