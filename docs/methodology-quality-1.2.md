# Calidad de metodología y secuencias · versión 1.2

Revisión: 6 de noviembre de 2026. Objetivo: enseñar a un médico que comienza en ultrasonido a preparar al paciente, colocar y mover el transductor, reconocer errores, obtener evidencia y representar un mapa de forma sistemática.

## Cambios aplicados

- Las 12 etapas del mapeo incorporan 37 momentos visuales. Cada uno relaciona acción, resultado observable, error frecuente, corrección y pregunta de razonamiento.
- Preparación: objetivo, lado, alcance, explicación, apoyo, descarga y tolerancia. Se distingue la evaluación de reflujo de los objetivos que pueden requerir otras posiciones.
- Transductor: marcador y convención de pantalla, gel/contacto, giro centrado en B, inclinación del haz, presión y recuperación del vaso. El giro y la inclinación se enseñan por separado.
- Paciente/mano/sonda 3D junto a secciones originales. El esquema profundo no se etiqueta como GSV; la perforante muestra continuidad a través de fascia. Mapa e informe usan demostraciones documentales.
- Reproducción, pausa, anterior/siguiente, recorrido manual de la corrección y ampliación con desplazamiento interno. Los fotogramas siguen disponibles con reducción de movimiento.
- Guías rápidas por etapa, reglas para detenerse y corregir, vista conjunta e impresión. PDF descargable de tres páginas con las 12 guías y fuentes.
- Las comprobaciones visuales se conservan en el progreso. Registrar una etapa requiere completarlas, revisar acciones y responder la comprobación final. Ver una animación no registra una respuesta correcta.
- El entrenador libre indica la siguiente acción. Solo registra niveles de barrido con preparación apropiada, B, eje corto y contacto ligero. Saltar entre dos extremos ya no satisface continuidad; cambiar la preparación reinicia la práctica correspondiente.

## Diagnóstico y correcciones durante la revisión

| Hallazgo | Corrección |
| --- | --- |
| El taller libre podía confundirse con una metodología ordenada | Se añadieron secuencias por objetivo, guía rápida, regla de detención y transferencia al recorrido. |
| La extensión entre dos posiciones no demostraba niveles intermedios del esquema | Se comprueba cobertura de niveles; se probaron tanto el salto de extremos como el recorrido progresivo. |
| El giro longitudinal podía confundirse con orientar el haz | Se separaron un momento de giro centrado en B y otro de orientación Doppler. |
| La transición podía rotularse correcta antes de terminar la acción | El estado intermedio se muestra como «corrigiendo», hasta alcanzar el final. |
| Los cursores ilustrados podían subestimar el intervalo al quedar dentro del flujo retrógrado | Se fijaron en los cruces basales del ejemplo: 2.00 y 2.85 s; se añadió una comprobación matemática. |
| Una escena de cursores podía perder la provocación en el 3D y conservarla en el espectro | La comparación conserva la provocación; solo cambia el momento medido. |
| Dos componentes del recorrido compartían una clave interna | Se diferenciaron sus identificadores y se revisó de nuevo la navegación. |
| Los rótulos pequeños del esquema podían ser difíciles de leer en móvil | Se añadió ampliación vectorial y desplazamiento dentro de la figura, sin desbordar la página. |

## Verificación realizada

- 23 pruebas automatizadas correctas: integridad del currículo, fuentes, estados visuales, postura, ángulo, cobertura, comprobaciones, señal Doppler, medición, mapa y recuperación.
- Revisión en navegador de los 37 momentos, con su estado de error y su estado corregido; no se encontraron momentos sin la representación correspondiente en este recorrido.
- Reproducción de corrección comprobada desde inicio a final. Pausa y recorrido manual mediante teclado/controles. La reproducción no se contabiliza como respuesta.
- Posición: tres comprobaciones respondidas, recuperación de su avance al abrir el recorrido y registro de etapa condicionado a acciones y pregunta final.
- Taller: dos extremos insuficientes; recorrido por niveles más compresión/liberación, eje largo, inclinación y PW completado en el esquema.
- Escritorio 1440 × 1000, formato intermedio 900 × 900 y móvil emulado 390 × 844. Guías, taller y ampliación se comprobaron sin desbordamiento horizontal de página. No se ensayó un teléfono físico.
- PDF final de tres páginas generado con la misma función de exportación del aula, renderizado e inspeccionado. No se probó una impresión física.
- Compilación de producción y paquete estático para Hostinger actualizados. La publicación se verifica después de desplegar.

Las capturas y el registro de cobertura de esta revisión se conservan en `output/quality/methodology-1.2/` de la copia de trabajo. No incluyen datos de pacientes.

## Fundamento y límites

Consulte [la evidencia de metodología](methodology-evidence.md), [la matriz del consenso](consensus-evidence.md) y [la revisión clínica](quality-clinical-review.md). El consenso regula representación; AIUM y SVS/AVF/AVLS complementan adquisición. Los gráficos son originales, conceptuales y se identifican como tales. El espectro representa aumento distal y liberación; la comparación textual con Valsalva no convierte la traza en esa maniobra.

La herramienta enseña a reconocer y corregir situaciones frecuentes; no garantiza ausencia de errores ni evalúa por sí sola la destreza manual o la validez de un estudio en pacientes. Su eficacia con alumnos, su validación institucional y la competencia clínica requieren evaluación humana y práctica supervisada.
