# Aula visual IMF · Eco-Doppler y mapeo venoso

Aplicación educativa estática para médicos que comienzan en ultrasonido. La experiencia prioriza demostraciones, adquisiciones publicadas y manipulación de controles.

## Experiencia 3.0

- Recorrido visual de doce etapas y 37 momentos, desde preparación hasta informe y cartografía.
- 34 conceptos con 144 microescenas, cortes, gráficas, comparaciones y secuencias de objetos.
- Laboratorio acústico 3D: propagación, transductor, cristales, gel, tejidos, foco y recepción.
- Seis interacciones/artefactos y demostración de uso prudente y ergonomía.
- 19 referencias auténticas (16 imágenes y 3 vídeos), con región, licencia, normalidad o patología identificadas.
- Imagen real junto al modelo; ampliación, reproducción lenta y avance por fotogramas.
- Atlas derecho por capas y contexto postural completo para posición y apoyos.
- Ecógrafo didáctico B, color, PW y Power, con controles causales y medición ilustrativa.
- Cartografía de tres caras, símbolos, medidas e informe, con exportación SVG/JSON/PDF.

No hay cuestionarios, preguntas al alumno, calificaciones ni bloqueos por respuestas. La explicación extensa y las fuentes se consultan a demanda.

## Fundamento y créditos

El consenso latinoamericano estandariza representación cartográfica. La adquisición se apoya además en las guías identificadas de AIUM, ESVS y SVS/AVF/AVLS. El programa no acredita competencia clínica ni sustituye adquisición supervisada.

- [Diseño y límites de esta versión](docs/visual-learning-v3.md)
- [Matriz clínica](docs/consensus-evidence.md)
- [Referencias auténticas](docs/media-visual-v3.md)
- [Anatomía: procedencia y licencia](docs/visual-assets-3d.md)
- [Licencias de software y activos](THIRD_PARTY_NOTICES.txt)

Las mallas adaptadas de Z-Anatomy/BodyParts3D conservan CC BY-SA 4.0. El paciente postural es una ilustración contextual: no un modelo clínico de cuerpo completo.

## Desarrollo y publicación

Requiere Node compatible con Vite 7. Instalación: npm ci. Desarrollo: npm run dev. Verificación técnica: npm test. Construcción: npm run build.

El resultado dist/ es portable a Hostinger: subir su contenido a public_html. No requiere servidor Node, base de datos ni credenciales. Las rutas usan fragmentos # y los activos usan direcciones relativas.

Para GitHub Pages, ejecutar node scripts/prepare-pages.mjs después de construir. Publicar main, carpeta /docs. Los documentos de evidencia se conservan al preparar esa carpeta.

Los ejercicios se guardan localmente en el navegador. No introducir datos identificables de pacientes en los ejercicios o informes.
