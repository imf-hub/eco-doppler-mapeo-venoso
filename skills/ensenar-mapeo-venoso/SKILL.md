---
name: ensenar-mapeo-venoso
description: Mantener y ampliar la plataforma educativa IMF de Eco-Doppler y mapeo venoso superficial del miembro inferior, con trazabilidad clínica, simulaciones causales y cartografía del consenso latinoamericano.
---

# Enseñar mapeo venoso en el Aula IMF

## Referencia visual compartida

Por indicación del propietario, consultar `docs/animation-reference-flebo.md` al crear o mejorar escenas. Adopta los patrones comprobados de Flebo Animaciones: estructuras editables, inserciones coherentes, deformación continua, selección/aislamiento, separación didáctica de capas, cámara interrumpible, rótulos priorizados y recursos reutilizados. La web actual usa Three.js r186 modular; el motor de referencia usa r128 global. Adaptar patrones sin mezclar motores ni copiar dependencias implícitamente. Leer solo las guías externas pertinentes y conservar procedencia/licencias al reutilizar recursos. El documento distingue capacidades existentes y mejoras pendientes; no afirmar una migración por haber incorporado estas instrucciones. Mantener la prohibición de cuestionarios establecida más abajo.

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

Cada etapa de metodología debe acompañar la acción con una demostración visual: secuencia controlable, relación paciente–mano–sonda–pantalla y contraste entre error y corrección. Mantener una guía rápida y una regla explícita para detenerse, repetir o documentar una limitación. Usar 3D para posición y orientación; cortes y trazados para interpretar el efecto; esquemas de evidencia para mapa e informe. La animación no debe introducir una regla clínica que no esté en el texto y su fuente.

Al ampliar el recorrido, actualizar `src/data/methodology.js` y su trazabilidad en `docs/methodology-evidence.md`. Verificar cobertura de las 12 etapas, correspondencia entre errores y sus escenas, controles de pausa/pasos/teclado y reducción de movimiento. Los ejemplos de error deben estar rotulados y no registrar una práctica correcta. Un barrido observado en el programa no acredita una exploración realizada en un paciente.

Para explicaciones visuales, conservar las cuatro representaciones coordinadas de `src/data/visualCurriculum.js`. Cada control debe cambiar geometría, señal o gráfico; no basta cambiar el rótulo. Validar los parámetros contextuales (giro, cámara, postura, nivel y metadatos) por separado de los parámetros Doppler. El modelo anatómico comparte transformación entre capas y preserva atribución CC BY-SA 4.0. Revisar `docs/visual-renewal.md` y la matriz visual antes de ampliar el sistema.

Preferencia explícita del usuario (6-XI-2026): NO cuestionarios, preguntas, tests de alumno, puntuaciones ni bloqueos de avance por respuestas. Enseñar con demostraciones visuales y manipulación libre. La pantalla principal contiene el objeto/imagen y una sola frase de acción; la explicación extensa y las fuentes quedan en consulta desplegable. Cada recurso debe ilustrar el concepto concreto. Las adquisiciones reales conservan región, autoría, licencia y contexto patológico; nunca se presentan escenas sintéticas como fotografías clínicas. Esta preferencia sustituye las antiguas instrucciones de evaluar decisiones en la UI. Las pruebas técnicas del software se conservan para mantenimiento.


## Organización del mapeo (preferencia explícita, noviembre de 2026)

La metodología se publica en páginas independientes, con ruta de etapas y subpáginas por maniobra. Usar estaciones visuales con escena exterior, paciente, mano/transductor, plano anatómico, señal, referencias reales pertinentes y registro. No agrupar toda la enseñanza en una tarjeta ni ocultar las representaciones esenciales detrás de pestañas. Mantener texto breve y contextual, sin cuestionarios ni calificaciones. Las imágenes publicadas no se sustituyen por esquemas ni se cambian de región o contexto.


## Glosario y precisión de los mecanismos

Cada concepto de Eco-Doppler dispone de una página con animación específica, control causal, observaciones y referencia por término. No simular cobertura cambiando únicamente un título. Distinguir portadora/PRF, presión/intensidad, ganancia/potencia y plano/haz. En figuras Doppler, el signo y la muestra deben ser coherentes con el haz y el flujo; no dibujar señal útil a90° sin explicar el contexto. TI no es temperatura, y MI requiere presión rarefaccional atenuada y frecuencia en las unidades declaradas. Auditar extremos y fases, y conservar pausa y control manual.


## Interfaz de laboratorio · preferencia vigente

El propietario sustituyó la dirección editorial por una web de laboratorio interactivo en modo claro, inspirada en la invitación a explorar de MotionSites. Leer `docs/laboratory-redesign-v8.md`. Priorizar objetos 3D, controles junto al efecto, cortes coordinados, navegación compacta y texto breve. La consulta extensa y las fuentes se despliegan sin perder contenido. Las páginas de maniobra abren en su demostración; la ruta permite explorar etapas. Mantener originales del consenso accesibles y los colores cartográficos sin alteración. Aplicar movimiento con propósito, pausa, control manual, cámara interrumpible y movimiento reducido. El fondo oscuro de una adquisición ecográfica no convierte en oscuro el marco de la web. No volver a la portada editorial ni afirmar mejoras médicas por un cambio de apariencia.

## Enseñanza progresiva y dibujo · preferencia del propietario, 6 noviembre 2026

La entrada a conceptos debe ser un índice jerárquico (capítulos, subtemas, conceptos), con búsqueda directa de Doppler y ganancias. Una lección comienza con nombre y definición breve, continúa con una animación sencilla, después permite modificar un ajuste y relacionarlo con la exploración. Reservar el laboratorio con múltiples vistas y controles para el final, bajo apertura voluntaria. Conservar las animaciones y referencias existentes; no volver a apilarlas como un panel inicial ni sustituir la explicación por botones. La navegación general se despliega a petición en estas páginas.

En consenso y metodología, ofrecer un botón grande para continuar al siguiente paso, con título y posición en la secuencia. Descargar documentos es secundario. El movimiento orienta y respeta reducción de movimiento; no evalúa ni acredita aprendizaje.

En cartografía, editar una cara ampliada, mostrar el símbolo documental original junto a su instrucción y distinguir colocación de confirmación. La perforante requiere un solo punto y Confirmar perforante. Los trayectos requieren dos puntos diferentes y Terminar trayecto; la úlcera un contorno válido. Deben estar visibles cancelar, seleccionar, mover, borrar y deshacer. La tolerancia de selección es de interfaz, no modifica tamaño ni significado del símbolo exportado. No confundir confirmación del dibujo con validación clínica.

## Editor cartográfico lateral · corrección explícita del propietario

En el constructor de dibujo, el propietario solicita paneles laterales, inspirados en aplicaciones de diseño: herramientas y elementos a la izquierda, lienzo estable en el centro e inspector del hallazgo a la derecha. Esta preferencia es específica del dibujo; no cambia la progresión de conceptos. Usar botones visibles para símbolos, condiciones y planos en vez de desplegables. En móvil ofrecer acceso separado a herramientas, lienzo y hallazgo.

Abrir siempre una plantilla vacía. Nunca pintar automáticamente una copia guardada ni un ejemplo resuelto como si fuera el inicio de la práctica. Ofrecer recuperación explícita y rotulada, conservar la copia anterior antes de sustituirla y permitir deshacer. Mostrar el ejemplo en visor de solo lectura, sin incorporarlo al modelo ni guardarlo. Distinguir las referencias impresas de la plantilla de los hallazgos dibujados. Aislar la cara en edición sin desplazar el sistema de coordenadas ni modificar el documento de entrega. Las opciones laterales no deben mover el lienzo al aparecer/desaparecer. Elegir un tipo de trazo no debe clasificar clínicamente una vena.
