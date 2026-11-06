---
name: ensenar-mapeo-venoso
description: Mantener y ampliar la plataforma educativa IMF de Eco-Doppler y mapeo venoso superficial del miembro inferior, con trazabilidad clínica, simulaciones causales y cartografía del consenso latinoamericano.
---

# Enseñar mapeo venoso en el Aula IMF

El público conoce flebología y comienza en ultrasonido. Priorizar preparación, rastreo, maniobras, registro e informe hasta una cartografía reproducible. Las explicaciones físicas y la botonología deben servir a esa competencia.

Antes de modificar reglas médicas o cartográficas, leer `docs/consensus-evidence.md` en la raíz de este proyecto y consultar la fuente primaria correspondiente. El consenso de 2023 regula representación; no atribuirle un protocolo completo de adquisición. Las guías complementarias se identifican por separado. Consultar `docs/resource-audit.md` para valorar activos y `docs/media-credits.md` al integrar media.

Mantener estas distinciones:

- Ganancia de recepción no es potencia acústica. Color Doppler depende del haz y de su escala; los colores del mapa codifican condición.
- Un vaso sin color no equivale a trombosis. Una sola imagen no identifica todo un circuito. El sistema profundo se evalúa aunque no se represente en el mapa superficial.
- Los umbrales de reflujo dependen del segmento y de la guía; no usar 1 s para todo el sistema profundo ni diámetro aislado como diagnóstico.
- Conservar las tres caras, unidades, referencias anatómicas y plano fascial del consenso. La línea ondulada codifica epifascial, no tortuosidad por sí sola.
- Ofrecer equivalencias GSV/VSM y SSV/VSP; explicar la actualización ASV de 2024 al mostrar la tabla histórica AAGSV.

Para un nuevo control o caso: proponer una predicción, mostrar una consecuencia visible, explicar el mecanismo y evaluar una decisión. Diferenciar datos demostrados, supuestos del caso, esquema original y adquisición clínica real. Registrar la licencia de cada activo antes de distribuirlo. No incorporar datos identificables de pacientes.

La arquitectura actual es React/Vite estático, Three.js con carga diferida y progreso local. Preservar portabilidad a Hostinger y rutas relativas. Ejecutar `npm test` y `npm run build` después de cambios funcionales y revisar las pantallas afectadas. Publicar solo dentro del alcance autorizado en la conversación actual.

Cada etapa de metodología debe acompañar la acción con una demostración visual: secuencia controlable, relación paciente–mano–sonda–pantalla y contraste entre error y corrección. Mantener una guía rápida y una regla explícita para detenerse, repetir o documentar una limitación. Usar 3D para posición y orientación; cortes y trazados para interpretar el efecto; esquemas de evidencia para mapa e informe. La animación no debe introducir una regla clínica que no esté en el texto y su fuente.

Al ampliar el recorrido, actualizar `src/data/methodology.js` y su trazabilidad en `docs/methodology-evidence.md`. Verificar cobertura de las 12 etapas, correspondencia entre errores y sus escenas, controles de pausa/pasos/teclado y reducción de movimiento. Los ejemplos de error deben estar rotulados y no registrar una práctica correcta. Un barrido observado en el programa no acredita una exploración realizada en un paciente.

Para explicaciones visuales, conservar las cuatro representaciones coordinadas de `src/data/visualCurriculum.js`. Cada control debe cambiar geometría, señal o gráfico; no basta cambiar el rótulo. Validar los parámetros contextuales (giro, cámara, postura, nivel y metadatos) por separado de los parámetros Doppler. El modelo anatómico comparte transformación entre capas y preserva atribución CC BY-SA 4.0. Revisar `docs/visual-renewal.md` y la matriz visual antes de ampliar el sistema.
