# Cotejo del código cartográfico · versión 6.1

Revisión: 6 de noviembre de 2026. Fuente principal: Bottini et al., *The First Latin American Consensus on Superficial and Perforating Venous Mapping*. Int Angiol. 2023;42:45–58. DOI [10.23736/S0392-9590.23.04991-X](https://doi.org/10.23736/S0392-9590.23.04991-X). Se cotejaron los PDF y las dos plantillas facilitadas por el propietario en [esta carpeta](https://drive.google.com/drive/folders/1lXUTkjYLXQzfgql9SUTZpMqaRKkvTWiF).

La revisión establece correspondencia documental de las convenciones implementadas. No acredita validación clínica independiente del software ni competencia del alumno. El consenso normaliza la representación superficial y perforante; la metodología de adquisición identifica sus guías complementarias por separado.

| Elemento | Fuente directa | Aplicación revisada |
| --- | --- | --- |
| Seis colores | PDF español p. 3; artículo tabla V, p. 54 | Azul competente, rojo incompetente, gris ablacionada, negro trombosada, verde linfoganglionar, amarillo no vascular no ganglionar. Tabla original visible antes de la aplicación docente. |
| Seis trazos y sus notas | Español pp. 3–4; tabla V | Continuo, ondulante, segmentario, punteado, X negras y bordes negros. Recta/ondulación comunican plano fascial; no morfología real. La nota original se conserva y amplía. |
| Cinco figuras geométricas | Español p. 6; tabla V | Circunferencia vacía, círculo relleno en línea, óvalo, marca quirúrgica perpendicular y cuadriculado de úlcera con contorno. |
| Diecisiete siglas | Español pp. 6–7; artículo tabla VI, p. 55 | Tabla original y transcripción con español, inglés y portugués. AAGSV de 2023 se conserva; ASV de 2024 se explica como actualización separada. |
| Tres caras por lado | Plantillas MERIT derecha e izquierda; artículo figura 2, p. 52 | Bases originales sin redibujar, lateralidad bloqueada tras añadir hallazgos, orden impreso correcto en izquierda, las tres caras siempre en salida. |
| Inclusión y alcance | Español pp. 1–2 | GSV/SSV aun competentes; accesorias/epifasciales patológicas y perforantes participantes en circuitos. Profundo evaluado y descrito; contextual femoral/poplíteo en ampliaciones. |
| Medidas | Español pp. 7–8; artículo figura 4, p. 55 | Diámetro transversal incluyendo pared, mm dentro; longitudes cm dentro; alturas cm con referencia fuera. GSV muslo/pierna, PV al nivel fascial. No se convierten píxeles en centímetros. |
| Ampliaciones | Español pp. 9–12; artículo figuras 5–6, pp. 56–57 | Referencias originales ampliables; edición inguinal y poplítea y exportación sobre las dos zonas de la plantilla. |
| Mapa e informe | Español pp. 1, 7–8 | Mapa acompaña informe e imágenes; no equivale a exploración. Posición, maniobra, límites y registros se conservan en PDF y JSON. |

## Cambios aplicados tras el cotejo

- Se sustituyó el amarillo oscuro por amarillo y se unificaron las seis familias de color en un único módulo. Los RGB se leyeron de los operadores de trazo de la p. 3 del PDF español; el consenso especifica nombres de color, no una norma hexadecimal universal.
- La biblioteca muestra fragmentos del documento real, sin recrear sus dibujos. Cada fragmento apunta a su página completa, con documento descargable. La aplicación de ejemplo usa el mismo motor que el constructor.
- Se retiraron dos dibujos duplicados de símbolos para evitar diferencias entre biblioteca, enseñanza, 3D y exportación. Las marcas X y perpendiculares siguen ahora la tangente local también en trazos oblicuos y verticales.
- Aplasia tiene identificación propia, distinta de competencia. Las contradicciones explícitas entre aplasia, color y mediciones se señalan sin modificar automáticamente los datos importados.
- Cirugía es una marca independiente, sin condición de trombosis. Las marcas antiguas se conservan al recuperar un JSON y se solicita su revisión.
- La úlcera se dibuja con un contorno de al menos tres puntos y cuadrícula negra recortada al contorno. Puede consignarse largo y ancho medidos en cm; las coordenadas son esquemáticas. Se señalan los antiguos marcadores puntuales para corregirlos antes de exportar.
- Los rótulos de estructuras amarillas son negros para permitir lectura sobre fondo blanco. El símbolo conserva amarillo.

## Integridad y límites

`public/media/consenso/provenance.json` registra archivos, tamaños, origen y SHA-256. Los JPEG españoles son renderizados de páginas completas sin retoque; la interfaz recorta el encuadre mediante SVG, conservando disponible la página entera. Las páginas del artículo, plantillas MERIT y notas de copyright se conservan. Los ejemplos superpuestos se identifican como docentes IMF, con datos ficticios. No se declara licencia Creative Commons para los documentos aportados.

Las comprobaciones técnicas cubren conservación de archivos, correspondencia de siglas, geometría, importación, exportación y rutas. No verifican que una medición o diagnóstico de un médico sea correcto. Las convenciones del artículo y las de la leyenda MERIT pueden variar en estilo gráfico; ambas fuentes se muestran identificadas sin presentar una recreación como original.
