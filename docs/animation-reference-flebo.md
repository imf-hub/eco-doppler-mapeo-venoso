# Referencia de calidad: Flebo Animaciones

Referencia incorporada el 6 de noviembre de 2026 por indicación del propietario. Se revisaron la guía de futuras animaciones, la skill propia, las guías de arquitectura/calidad/experiencia/visor y el motor compartido de **FLEBO ANIMACIONES**. Esta integración es de criterios y patrones de construcción; no afirma que se hayan migrado sus modelos o implementado nuevas animaciones en esta revisión.

## Base confirmada en ambos proyectos

| Área | Flebo Animaciones | Aula de mapeo venoso |
| --- | --- | --- |
| Ejecución | JavaScript y Three.js r128 global | React/Vite y Three.js r186 modular, comprobado en la dependencia instalada |
| Anatomía | Superficies y mecanismos procedurales, con registro semántico de piezas | Anatomía GLB de referencia Z-Anatomy/BodyParts3D y modelos procedurales complementarios |
| Movimiento | Deformación de buffers, flujo, separación de capas y cámara amortiguada | Valvas deformables, eritrocitos bicóncavos instanciados, desplazamiento de flujo continuo y fase compartida entre representaciones |
| Apariencia | Materiales, luz y superficies editables | Materiales físicos, iluminación de entorno, luces direccionales y control de exposición |
| Exploración | Selección de piezas, aislamiento, separación y etiquetas priorizadas | Rotación, acercamiento, vistas de cámara, selector de regiones, capas y corte por nivel |

La biblioteca de ejecución ya existe aquí. El trabajo para mejorar el realismo debe centrarse en forma, inserciones, conexiones, deformación, orientación, rótulos y consecuencias visibles. No se justifica cambiar de motor por el nombre de una herramienta.

## Patrones que se adoptan como referencia

1. **Geometría editable y por capas.** Conservar topología y coordenadas comunes. Una inserción, etiqueta o detalle debe permanecer unido a su estructura durante cualquier transformación. Separar capas es una ayuda didáctica, no una deformación fisiológica.
2. **Movimiento causal.** La valva cambia con el estado que se explica; el flujo sigue la luz y conserva continuidad. Distinguir escala ilustrativa de medida real. No añadir partículas, brillos u órbitas sin función docente.
3. **Exploración semántica.** Poder identificar una estructura, verla aislada y devolverla al conjunto. Mantener alternativa con selector/teclado y diferenciar un toque de un arrastre al incorporar selección sobre la malla.
4. **Cámara que conserva orientación.** Situar el conjunto, acercarse al foco y dejar observar. Las transiciones deben ser interrumpibles y respetar movimiento reducido; evitar saltos que dificulten reconocer anterior, medial y posterior.
5. **Rótulos legibles.** Priorizar la estructura activa y evitar superposiciones. Ocultar una etiqueta por falta de espacio exige conservar acceso a su nombre por otra vía.
6. **Rendimiento como parte de la calidad.** Reutilizar geometría/materiales, instanciar objetos repetidos, actualizar buffers y detener trabajo fuera de pantalla. Medir en escritorio y móvil antes de afirmar mejoras de rendimiento.
7. **Tiempo controlable.** Pausa y recorrido manual deben mostrar el mismo estado para la misma fase. Cámara, guion, mecanismo y usuario deben tener una autoridad explícita para evitar que dos animaciones escriban sobre la misma propiedad.

## Aplicación prioritaria al aprendizaje de mapeo

| Necesidad del médico | Construcción visual que interesa reforzar | Criterio de aceptación |
| --- | --- | --- |
| Relacionar piel, fascia y vaso | Corte y capas separables con referencias comunes | La misma vena conserva identidad y conexiones al girar, cortar y volver al conjunto |
| Colocar la sonda | Paciente, mano, marcador y plano de imagen coordinados | El giro/inclinación de la sonda produce el plano y la señal correspondientes |
| Comprender valvas y reflujo | Inserciones conservadas, coaptación visible y trayectorias continuas | Se distinguen apertura, cierre, separación patológica y dirección del flujo sin depender del párrafo |
| Seguir un circuito | Selección e identificación de cada conexión superficial/perforante/profunda | La exploración conserva origen, recorrido y desembocadura; no inventa continuidad al cambiar de vista |
| Trasladar el hallazgo al mapa | Anatomía → corte/señal → marca sobre plantilla original | La marca usa el motor compartido del consenso y mantiene sigla, plano, condición, medidas y referencia |

Prioridades detectadas por inspección del código actual: las vistas de cámara de `ConceptVolumeScene.jsx` se asignan de forma inmediata; su selector localiza regiones, pero no ofrece el contrato completo de selección/aislamiento sobre mallas de Flebo Animaciones. La separación didáctica y la priorización de etiquetas son patrones para futuras mejoras específicas, con revisión visual antes de presentarlos como implementados.

## Compatibilidad, procedencia y límites

Las seis guías 3D referenciadas proceden de **CloudAI-X/threejs-skills**, revisión `0e181866f095b5f06d005133876e926515390d95`, MIT. La guía de composición procede de **anthropics/skills**, revisión `ca45fc496a3436251f191354091d557da31c15b5`, Apache-2.0. El registro local de Flebo Animaciones conserva sus licencias. Son instrucciones para producir y revisar; no son librerías anatómicas ni validación médica.

Antes de reutilizar código o modelos de otro proyecto, revisar su archivo completo, autoría, licencia, dependencias y contratos de limpieza. No copiar el motor global r128 dentro de la escena r186. Los patrones se adaptan a la versión real de destino. Las atribuciones de las mallas Z-Anatomy/BodyParts3D y de las figuras del consenso se mantienen.

Blender/glTF, glTF Transform, Remotion y React Three Fiber/drei quedan como opciones para necesidades concretas. No se incorporan ni se declaran instaladas por figurar en la referencia. Consultar sus fuentes oficiales y condiciones vigentes antes de adoptarlas.

Prevalecen las decisiones de esta web: **sin cuestionarios, puntuaciones ni bloqueos por respuestas**; poco texto en la escena; subpáginas por paso; originales del consenso identificados; esquema, adquisición real y anotación docente diferenciados. El aspecto realista no debe atribuir precisión anatómica, acústica o hemodinámica que el modelo no demuestra.

## Fuentes revisadas dentro del proyecto de referencia

- `GUIA_PARA_FUTURAS_ANIMACIONES.md`
- `skills/flebo-animaciones/SKILL.md` y `skills/external/README.md`
- `docs/animacion/ARQUITECTURA.md`, `CALIDAD.md`, `EXPERIENCIA_INTERACTIVA.md`, `SKILLS_Y_HERRAMIENTAS.md`
- `docs/UX_UI_VISOR.md`
- `assets/app.js`: `make3D`, `rbcGeometry`, `wall3D` y contratos de selección, aislamiento y separación

La fuente clínica y las convenciones cartográficas siguen siendo las de `consensus-evidence.md` y `consensus-conformance-audit.md`. Esta referencia cambia la exigencia de construcción visual, no los lineamientos médicos.
