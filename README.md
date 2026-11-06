# Aula IMF · Eco-Doppler y Mapeo Venoso

Plataforma educativa en español para médicos con formación en flebología que comienzan en ultrasonido. El recorrido central conduce desde la preparación hasta la cartografía superficial y perforante del miembro inferior.

## Contenido funcional

- 10 lecciones de fundamentos con preguntas y laboratorio de ondas.
- Ecógrafo didáctico original: modo B, color, PW y Power; ganancia, profundidad, frecuencia, foco, TGC, rango dinámico, escala/PRF, filtro, ángulo, presión, persistencia y volumen de muestra.
- Anatomía 3D procedural original: siete estructuras, selección, sistemas, orientación y correlación de planos.
- 12 etapas de mapeo con acciones, errores, comprobaciones y fuentes localizables.
- Cartografía de tres caras: trazos, condiciones, anotaciones, perforantes, medidas e informe de práctica. Exportación SVG/JSON e impresión a PDF.
- 6 casos ficticios con 18 preguntas, retroalimentación y rúbrica docente.
- 26 términos, 17 códigos de representación y dos recursos clínicos CC0 con contexto y créditos.

## Fundamento clínico

El [consenso latinoamericano](https://pubmed.ncbi.nlm.nih.gov/36892521/) estandariza la **representación cartográfica**. La adquisición se apoya adicionalmente en AIUM, ESVS y SVS/AVF/AVLS. Véase [la matriz de evidencia](docs/consensus-evidence.md).

El simulador muestra relaciones causales simplificadas; no es un motor acústico validado ni un equipo médico. La finalización de ejercicios no certifica competencia clínica. La revisión clínica institucional y la práctica supervisada son necesarias antes de integrar esta herramienta en un programa formal. Los dos recursos clínicos reales se distinguen de las escenas sintéticas.

## Ejecutar y construir

Node.js 22.12 o posterior compatible con Vite 7.

```sh
npm ci
npm run dev
npm test
npm run build
```

`dist/` contiene una aplicación estática portable. No requiere servidor Node, base de datos, cuenta de usuario ni credenciales para funcionar. Las rutas usan fragmentos `#`, por lo que no necesita reglas de reescritura.

```sh
node scripts/prepare-pages.mjs
```

Este último comando copia el resultado a `docs/` para GitHub Pages, conservando los documentos de evidencia. Configuración Pages: rama `main`, carpeta `/docs`. El proceso de construcción es local; una publicación posterior debe volver a construir y actualizar esa carpeta.

## Hostinger

Subir **el contenido de `dist/`** a `public_html/` o a una subcarpeta del dominio. También se entrega un ZIP listo para alojar. Consulta [la guía de instalación](docs/hostinger.md). No se requiere WordPress ni un plan con Node.js.

## Datos y conservación

El progreso y la cartografía se conservan en `localStorage` del navegador; no se sincronizan entre dispositivos. Pueden exportarse para conservar una copia. No introducir información identificable de pacientes. El repositorio no incluye los PDF privados ni los archivos de investigación descargados.

## Estructura y mantenimiento

- `src/data/`: contenido docente, evidencia, casos y manifiesto de media.
- `src/components/`: simulación, anatomía, recorrido, casos y cartografía.
- `tests/`: unidades físicas, Nyquist, escape de texto y coherencia del currículo.
- `docs/resource-audit.md`: selección de 17 recursos internacionales y sus licencias.
- `docs/media-credits.md`: procedencia de los dos archivos clínicos incorporados.
- `skills/ensenar-mapeo-venoso/`: instrucciones reutilizables para mantener esta plataforma.

React, Vite, Three.js y Lucide conservan sus licencias. Los avisos se distribuyen en `THIRD_PARTY_NOTICES.txt`. La licencia de una biblioteca no convierte el consenso o los libros de consulta en contenido de libre redistribución. Los documentos externos se enlazan desde su fuente.
