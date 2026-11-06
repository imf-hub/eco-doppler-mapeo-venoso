# 001 — Reconstruir las explicaciones visuales médicas

- Estado: IMPLEMENTADO Y PROBADO
- Base: 4e93432
- Prioridad: alta
- Propósito del movimiento: explicación y correspondencia espacial. Los controles frecuentes y el texto clínico permanecen estables.

## Diagnóstico confirmado

`MethodologyGuide.jsx` ofrece una sola ilustración por momento y reutiliza un muñeco procedural. `PhysicsLab.jsx` dibuja un único trazo y una flecha; no permite observar varias representaciones del mecanismo. Los conceptos de botonología no abren una explicación visual propia. Esta base es insuficiente para el nivel visual solicitado por el usuario.

## Resultado requerido

34 conceptos con cuatro vistas de propósito diferente: volumen, corte/imagen, gráfico y comparación. Incorporar el conjunto anatómico derecho licenciado de Z-Anatomy/BodyParts3D del atlas IMF, conservando coordenadas y créditos. Crear volúmenes didácticos de ondas, transductor, campo acústico, vena/valvas y conexiones fasciales. No presentar los volúmenes conceptuales como adquisiciones reales.

## Ejecución

1. Preparar mallas con manifiesto y comprobar finitud, coordenadas y licencia.
2. Construir componentes `ConceptVolumeScene`, `ScientificDiagram`, `VisualExplainer` y `VisualAtlas` bajo `src/components/visual/`.
3. Vincular las diez lecciones, las doce etapas y los trece controles del simulador. Mantener evaluaciones y guardado.
4. Crear reloj compartido con pausa, recorrido manual, velocidad, reproducción fuera de foco detenida y reducción de movimiento. Motion coordina estado/pestañas; las visualizaciones científicas se calculan a partir de parámetros.
5. Ampliación de gráficos y fuentes gráficas primarias por concepto. No copiar imágenes sin licencia.
6. Probar relaciones matemáticas, cobertura de contenidos, móvil, controles, cámaras/capas y carga diferida. Revisar en navegador y publicar la misma construcción.

## Criterios de movimiento y alcance

Interfaces con transform/opacity y transiciones de 160–200 ms, curva de salida `cubic-bezier(0.23,1,0.32,1)`. La reproducción explicativa puede durar más para lectura; se controla y pausa. No usar rebotes decorativos ni transiciones de diseño que oculten cambios clínicos. No cambiar nomenclatura, criterios de reflujo o símbolos al mejorar materiales/efectos.

## Verificación

`npm test`, `npm run build`, comprobación visual de todos los tipos de vista, atlas anatómico, ondas, señal Doppler y cartografía. Observar error/corrección y comparar parámetros antes/después. Confirmar pausa en pestaña oculta, controles accesibles y ausencia de desbordamiento en móvil. La aceptación visual exige un salto perceptible de detalle y más de una representación del mismo concepto.

## Resultado de la revisión

- 40 pruebas automáticas aprobadas y construcción 2.0.0 completada.
- Navegador: 34 conceptos con volumen cargado, un corte, un gráfico y dos escenarios de comparación; 37 momentos de metodología con ejemplo de error identificado.
- Auditoría de las 68 vistas de corte/gráfico: cambios de formas entre extremos y A/B, excluyendo textos.
- Revisados selección de SSV, músculos diferidos, rótulos, corte por nivel, Power en el taller y ampliación móvil a 390 × 844 sin desbordamiento de página.
- Eliminados cambios de rótulo sin consecuencia gráfica y discontinuidades de partículas al invertir flujo. Preservadas las diferencias entre ganancia y potencia, giro e inclinación y cartografía y color Doppler.
- No se realizó una validación clínica independiente ni una prueba en teléfono físico. La entrega sigue siendo una herramienta educativa para práctica supervisada.
