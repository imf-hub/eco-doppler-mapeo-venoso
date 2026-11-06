# Evidencia de las secuencias de metodología

Revisión: 6 de noviembre de 2026. Alcance: preparación, posición, manejo del transductor, adquisición sistemática, reconocimiento de errores y cierre documental. Las 37 secuencias de `src/data/methodology.js` son instrucciones y preguntas originales; no son extractos de una guía ni una validación de resultados educativos.

## Fuentes primarias y localizadores

| Fuente | Localizador comprobado | Regla incorporada |
| --- | --- | --- |
| [AIUM, revisión 2024, volumen 45 de 2026; primera publicación electrónica 16 de septiembre de 2025](https://doi.org/10.1002/jum.70049) | Venous Insufficiency: Lower Extremity, Technique 1–5 y Recording 1–7; Documentation | Evaluación anatómica/funcional, registro y posición en dependencia; identificación de limitaciones. |
| [SVS/AVF/AVLS 2023, parte II](https://pmc.ncbi.nlm.nih.gov/articles/PMC11523430/) | Good Practice Statements 1.4.1–1.4.5; Implementation Remarks 1.3.2 | Posición, provocación por segmento, rastreo hasta origen, imágenes con/sin compresión y registro temporal. |
| [Necas, 2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC5024873/) | Testing for venous incompetence; Fig. 2–3 y discusión de maniobras | Diferencia entre Valsalva y aumento distal; variabilidad de respuesta a posición y ejecución. Apoyo técnico complementario, no nueva regla terapéutica. |
| [Consenso latinoamericano, PDF español](https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf) | pp. 1–2; pp. 3–6; pp. 7–8; pp. 9–12 | Plantillas, códigos, medidas, referencias, limitaciones y ampliaciones. Regula representación, no todo el protocolo de adquisición. |

## Aplicación a los contenidos

**Posición y transductor.** AIUM distingue bipedestación para detectar o excluir reflujo, miembro examinado sin carga y alternativa de Trendelenburg inverso de al menos 45° cuando no es factible estar de pie. Contempla sedestación para superficial y perforantes de pantorrilla. No equipara supino plano con una evaluación de reflujo superficial en dependencia. Los espectros se adquieren en eje largo y los diámetros en transversal. Estas reglas sustentan `posicion`, `equipo` y `diametros`. Apoyo, tolerancia, contacto y recuperación de referencias son su aplicación docente original.

**Secuencia y maniobras.** SVS/AVF/AVLS diferencia provocación de femoral común/SFJ mediante Valsalva o aumento distal y aumento distal en segmentos más distales. Pide rastrear la fuente, documentar compresión y usar cursores sobre la señal. Las secuencias separan presión local para coaptación, contacto ligero para flujo/calibre y aumento distal. No atribuyen estas reglas al consenso cartográfico. Necas contextualiza que la ejecución y la posición modifican la respuesta; no se fijan fuerzas o duraciones universales de maniobra.

**Cartografía y cierre.** El consenso dispone tres caras por miembro, representación también de GSV/SSV normales y canales distintos para condición, plano y símbolo. Su diámetro es transversal, con pared y en mm; longitudes y referencias se expresan en cm. El informe conserva lo no interpretable. Por eso las secuencias de mapa e informe comparan evidencia con representación y no realizan una exploración ficticia adicional.

La etapa de equipo separa ahora un cuarto momento: giro en B sobre el centro del mismo vaso, recuperación de continuidad en eje largo y posterior orientación Doppler como acción diferente. El corte transversal sigue siendo apropiado para sus objetivos; el error mostrado es permanecer oblicuo cuando se pretende obtener eje largo.

## Decisiones de animación que evitan enseñar relaciones falsas

- Cada fotograma contiene un estado correcto y uno de error, además de una corrección y una pregunta. `errorCode` orienta el gráfico hacia el problema concreto.
- Los porcentajes de presión, posición de barrido, rotación e inclinación son controles del esquema. No describen fuerzas clínicas, ángulos obligatorios de la mano, posiciones universales del pie ni un preset de equipo.
- El marcador invertido no es intrínsecamente un error. Lo es no comprobar su correspondencia y conservar rótulos incorrectos; el texto lo declara.
- La animación espectral representa **aumento distal y liberación** con una señal inventada. Valsalva solo se compara en texto y no comparte ese cronograma.
- `profundo` usa una región corporal inguinal como localizador del muñeco. La sección debe mostrar un vaso profundo genérico; no se puede renombrar como femoral una sección de GSV.
- `tributarias/cruce-fascial` requiere un dibujo original de continuidad a través de fascia. Un óvalo aislado o un corte longitudinal safeno no demuestra una perforante.
- Las vistas de mapa/informe representan documentos y su concordancia. No simulan diagnóstico ni validan anatomía de un caso real.
- El modelo solo muestra parte de cada acción. Criterios, límites y decisiones permanecen visibles; ninguna secuencia promete eliminar todas las equivocaciones ni acredita competencia independiente.

## Verificación de acceso y límites

El PDF español se reabrió y se cotejó su texto. Los accesos directos de PMC mostraron un control de navegador; se recuperó el texto original indexado de SVS/AVF/AVLS y Necas mediante búsqueda dirigida. El DOI de AIUM no abrió directamente en esta consulta, pero se recuperó el texto primario indexado del artículo de Wiley y su índice institucional. Se verificaron los apartados citados, sin confundir fecha de revisión con fecha de publicación.

El conjunto necesita evaluación institucional, práctica con ecógrafo y pacientes, y observación docente antes de atribuir competencia clínica a una persona. Este documento registra trazabilidad de contenidos, no certificación del software.
