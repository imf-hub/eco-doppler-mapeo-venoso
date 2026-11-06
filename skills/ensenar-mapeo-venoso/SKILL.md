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
