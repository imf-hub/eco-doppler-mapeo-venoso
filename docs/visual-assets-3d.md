# Activos anatómicos para la renovación visual 3D

Revisión de procedencia: 6 de noviembre de 2026. Esta entrega prepara mallas anatómicas reutilizables; no certifica exactitud clínica ni añade una simulación acústica.

## Selección y archivos

Se inspeccionó la carpeta del atlas anatómico del IMF, `atlas-z-anatomy/assets/z-anatomy/`, versión `2026.10.29-uniones2`. Sus GLB ya son una selección del miembro inferior **derecho** y parte de la pelvis. Por ello no se recortó ni reconstruyó otra pierna, ni se sustituyeron estructuras por primitivas geométricas.

Los archivos se copiaron sin modificar sus buffers ni su geometría a `public/media/anatomy-v2/`:

| Archivo | Bytes | Mallas | Función |
| --- | ---: | ---: | --- |
| vascular.glb | 3,618,576 | 50 | Venas, arterias y complementos anatómicos IMF |
| surface.glb | 812,620 | 30 | Regiones de superficie y fascia |
| bones.glb | 738,240 | 33 | Referencias esqueléticas |
| muscles.glb | 2,781,936 | 30 | Capa muscular opcional y diferida |

El conjunto inicial de tres capas suma **5,169,436 bytes**. Con músculo opcional, **7,951,372 bytes**. No requiere Draco ni Meshopt: son GLB estándar sin extensiones de compresión. La reutilización de la selección existente evita volver a procesar decenas de megabytes de FBX. La capa muscular no debe bloquear la entrada.

`anatomy-assets.json` contiene archivos, tamaños, SHA-256, licencias, estructuras, coordenadas, fuentes, límites y cámaras sugeridas. `anatomy-landmarks.json` contiene perfiles de contorno y anclas ya existentes; no son mediciones de un paciente del aula.

## Coordenadas y lateralidad

Los nombres originales terminan en `r`, y el manifiesto fuente describe la selección derecha. Las transformaciones están horneadas en los buffers: traslación editorial fuente `[9,0,3]`, sin escala ni rotación adicionales. La comprobación del índice del atlas fuente identifica:

- `+Y`: proximal / altura editorial desde la planta.
- `+X`: medial del miembro derecho.
- `+Z`: anterior.

Las cuatro capas comparten espacio. No centrar ni escalar cada una de forma independiente. Para normalizar la escena, agruparlas primero y aplicar una única traslación/escala al grupo.

Límites conjuntos de las tres capas iniciales:

- mínimo: `[-9.184698, -0.038237, -11.834404]`.
- máximo: `[15.142612, 106.773148, 17.564737]`.
- centro: `[2.978957, 53.367455, 2.865167]`.

Las anclas incluyen SFJ `[4.938626,85.35,7.811438]`, GSV/VSM `[5.187275,67,5.869763]`, SSV/VSP `[1.052699,32,-7.164612]` y poplítea `[1.330839,47,-2.549412]`. Son referencias de navegación del modelo, no localizaciones universales.

## Licencia y atribución

Se volvió a consultar la [licencia primaria de Z-Anatomy](https://github.com/LluisV/Z-Anatomy/blob/PC-Version/LICENSE), que identifica CC BY-SA 4.0 y acredita a Lluís Vinent Juanico, Gauthier Kervyn y colaboradores. La fuente de FBX está identificada en [Resources/Models/FBX](https://github.com/LluisV/Z-Anatomy/tree/PC-Version/Resources/Models/FBX).

Los créditos locales de la adaptación IMF identifican selección, conversión FBX→GLB, transformación rígida, divisiones editoriales, complementos y uniones, y distribuyen esas adaptaciones bajo **CC BY-SA 4.0**. Se conserva ese régimen para estas copias. `CREDITOS-FUENTE.txt` preserva el crédito histórico íntegro; `ATTRIBUTION.txt` añade la procedencia de esta entrega y los enlaces de licencia.

La base BodyParts3D conserva atribución a The Database Center for Life Science (DBCLS), Japón. La [licencia primaria actual de BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html), actualizada el 27-02-2025, declara CC BY 4.0. Esa actualización de la base **no se usa para relicenciar** las adaptaciones de Z-Anatomy/IMF: aquí se mantienen CC BY-SA 4.0 y sus créditos. Los créditos históricos de la selección fuente mencionan CC BY-SA 2.1 Japón y no se eliminan.

La licencia se aplica a estas mallas y sus adaptaciones. No se presenta como licencia automática de todas las bibliotecas o todo el código web. Mostrar un crédito accesible en el visor y conservar los archivos de atribución junto a los activos.

## Validación técnica y límites anatómicos

Se cargaron las cuatro capas mediante `GLTFLoader.parseAsync` de Three.js. Se comprobaron nombres, metadatos `kind`, buffers de posiciones finitos y límites en espacio mundial. Resultado: **143 mallas**, sin posiciones no finitas; límites consistentes entre el análisis del GLB y `Box3`.

La geometría vascular contiene 39 mallas venosas y 11 arteriales. No son 39 venas individuales completas: algunas representan grupos o ramas. Las venas tibiales/fibulares no duplican todas las venas acompañantes. No hay válvulas en la fuente.

Los complementos IMF —safena anterior, Giacomini, arqueada posterior, obturatriz y perforantes seleccionadas— se identifican como adaptaciones, no como mallas originales de Z-Anatomy. Quince conexiones tienen uniones adaptadas en la versión fuente. La forma de una unión o una malla no acredita todas las variantes ni permite clasificar competencia.

La piel está compuesta por regiones y la fascia por superficies parciales. No tratar sus mallas como una segmentación clínica cerrada. Las escenas de válvulas, deformación, compresión o propagación que se añadan deben rotularse como modelos conceptuales propios y mantenerse diferenciadas del atlas.

La comprobación técnica no sustituye una inspección visual del visor final, una revisión docente ni el rastreo anatómico en pacientes.
