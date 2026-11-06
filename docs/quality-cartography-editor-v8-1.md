# Editor cartográfico 8.1 · revisión de la práctica

6 noviembre 2026. El propietario observó trazos presentes al iniciar la práctica y solicitó herramientas laterales con selección directa, como en aplicaciones de dibujo.

## Diagnóstico

La base MERIT suministrada está vacía de trayectos venosos. El constructor 8.0 cargaba automáticamente el modelo de almacenamiento local; ese modelo podía ser el ejemplo ficticio previamente cargado. La vista de inicio no distinguía recuperación y práctica nueva. El cambio entre controles de creación/selección también cambiaba el espacio disponible y desplazaba el lienzo.

## Correcciones

- Inicio en blanco sin escritura inicial en almacenamiento. La copia anterior se ofrece para recuperación explícita y se distingue con un estado visible. El nuevo trabajo conserva una copia previa antes de sustituirla. Recuperar, borrar y nuevo mapa admiten deshacer.
- Ejemplo resuelto en un visor de solo lectura, con aviso visible. Abrirlo/cerrarlo no copia trayectos, no modifica el modelo y no guarda el ejemplo como trabajo propio.
- Escritorio: herramientas y lista de elementos a la izquierda, lienzo al centro e inspector a la derecha. No hay selectores desplegables en el editor. Botones de condición con color y nombre; botones de plano con muestra del trazo; identificaciones frecuentes y entrada libre de texto.
- Lienzo de dimensiones estables, con ampliación y desplazamiento interno. El cambio de herramienta, condición y selección no mueve su posición. El borrador muestra su estado y requiere confirmación explícita; confirmar lo convierte en un solo elemento, sin duplicación.
- En móvil se alternan herramientas, lienzo y hallazgo. Los controles conservan confirmación, cancelación, selección y borrado. El formulario del informe permanece fuera del lienzo.
- La cara editada excluye mediante máscara de visualización partes de las impresiones vecinas. No se reescala ni desplaza el sistema de coordenadas; los PNG/PDF originales y el motor de exportación permanecen intactos. Las líneas grises/negras impresas se identifican como referencias originales, no hallazgos del alumno.
- Punteado no asigna por sí solo aplasia o ablación. El usuario escoge expresamente la condición. Cambiar una condición incompatible actualiza la convención de trazo; cambiar de trazo puede dejar la condición pendiente para evitar una clasificación automática.

El patrón de herramientas, lienzo, lista de elementos e inspector contextual toma como referencia la [documentación de interfaz de Sketch](https://www.sketch.com/docs/interface-and-settings/the-mac-app-interface/the-inspector/). Se revisaron también las [guías de interfaz de Vercel](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md): controles semánticos, etiquetas, foco visible, teclado, estados vacíos y recuperación de acciones.

## Verificación

72 pruebas automatizadas, incluidas seis nuevas sobre apertura vacía con copia previa, recuperación del esquema anterior, lectura de copias dañadas, independencia de mapas vacíos y coherencia entre condición y trazo. Se conservan las pruebas físicas, de fuentes y de exportación.

Navegador: cero hallazgos al abrir; opciones laterales sin desplegables; medición del rectángulo SVG antes/después de cambiar de herramienta sin variación. Perforante confirmada, recuperada después de recargar, borrada y deshecha. Ejemplo abierto/cerrado manteniendo el número de elementos del ejercicio. Trayecto de dos puntos confirmado sin borrador residual ni duplicación; recoloreado desde el inspector sin añadir elementos.

A 360 px se recorrió herramientas → condición → lienzo → colocar perforante → confirmar. Sin desbordamiento horizontal; pie de página después del contenido. No se introducen nuevas reglas de adquisición ni diagnóstico clínico.

Fuentes cartográficas: PDF español pp. 3–6; tabla V del artículo de Bottini et al., 2023, DOI 10.23736/S0392-9590.23.04991-X. El mapa es complementario al informe; esta revisión funcional no acredita adquisición clínica ni competencia del alumno.
