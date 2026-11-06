# Aula visual IMF · Eco-Doppler y mapeo venoso

Aplicación educativa estática para médicos que comienzan en ultrasonido. La experiencia prioriza demostraciones, adquisiciones publicadas y manipulación de controles.

## Experiencia 5.0

- Glosario animado con 80 términos: definiciones, mecanismos específicos, controles físicos, observaciones y referencias por término.
- 81 páginas nuevas de glosario, búsqueda por sigla/nombre/definición, índice alfabético y áreas temáticas.
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
