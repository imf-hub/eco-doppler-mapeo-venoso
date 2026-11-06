# Diseño instruccional de la plataforma de mapeo venoso IMF

## Competencia y alcance

El estudiante es médico con conocimientos de flebología y sin formación previa en ultrasonido. Al completar la ruta podrá explicar los fundamentos, justificar los controles del equipo, identificar estructuras en varios planos y elaborar una cartografía de un caso didáctico siguiendo la nomenclatura del consenso latinoamericano. La competencia clínica en pacientes requiere práctica supervisada y evaluación presencial; completar preguntas en una web no acredita destreza de adquisición.

La actividad principal es el **mapeo**, no un atlas decorativo. Distribución orientativa de práctica: fundamentos 12%, controles 15%, reconocimiento anatómico 13%, rastreo y cartografía 60%. Permitir consultar las bases desde cualquier paso del mapeo sin perder el caso ni los datos registrados.

## Ruta de aprendizaje

| Etapa | Qué debe poder hacer el médico | Actividad observable | Evidencia guardada |
| --- | --- | --- | --- |
| 1. Sonido → eco → píxel | Explicar frecuencia, longitud de onda, propagación, reflexión, tiempo de vuelo y atenuación con lenguaje simple | Cambiar frecuencia y profundidad, predecir el efecto y verlo en una escena | Respuestas explicadas a tres predicciones, con posibilidad de volver a intentar |
| 2. Un control, una consecuencia | Relacionar cada ajuste con recepción, procesamiento o presentación | Resolver una imagen demasiado brillante, una vena profunda sin detalle y color fuera de la luz | Ajuste elegido y explicación; no evaluar solo que el deslizador se movió |
| 3. Anatomía que aparece en pantalla | Orientar el marcador, pasar de transversal a longitudinal y distinguir vena/arteria mediante varios indicios | Identificar luz, pared, fascia, compartimento safeno, confluencias y continuidad; explorar compresión | Identificación razonada en esquemas y casos. Rotular como ilustración si no se trata de un clip real |
| 4. Mapeo guiado | Planear adquisición, optimizar imagen, seguir trayectos, documentar anatomía y hemodinámica y producir cartografía | Resolver un caso desde preparación hasta mapa con revisión de errores | Lista de adquisiciones, medidas, trazados y mapa exportable del caso didáctico |

## Interacción causal de los controles

Cada control debe mostrar cuatro cosas: **qué cambia**, **qué se observa**, **por qué ocurre** y **qué hacer con esa información**. El alumno debe predecir antes de revelar la explicación.

| Control / acción | Relación que la interfaz debe representar | Error que debe corregir |
| --- | --- | --- |
| Frecuencia de transmisión | Mayor frecuencia reduce longitud de onda; en general mejora detalle a costa de penetración por atenuación. La resolución no depende de un único parámetro | Creer que “más MHz” siempre mejora cualquier vena |
| Profundidad | Cambia el campo mostrado; mayor recorrido implica mayor tiempo de escucha y puede reducir frecuencia de cuadros | Hacer muy pequeña la vena por mostrar tejido innecesario |
| Ganancia B | Amplificación de señales recibidas, sin aumentar la potencia acústica emitida | Confundir brillo con energía transmitida o con tejido patológico |
| TGC | Compensación de ganancia en profundidad, diferente de una ganancia uniforme | Oscurecer superficial y profundo de la misma forma |
| Foco | Mejor detalle lateral alrededor de la zona focal, según haz y equipo | Colocar foco muy alejado de la estructura objetivo |
| Rango dinámico | Presentación de grises / contraste, sin modificar anatomía | Interpretar todo cambio de contraste como cambio de tejido |
| Ganancia color | Sensibilidad visual y ruido; demasiado alta puede producir blooming | Atribuir color fuera de la luz a una comunicación vascular |
| Escala / PRF | Escala baja ayuda con señales lentas pero favorece aliasing; escala alta puede ocultar flujo lento | Diagnosticar ausencia de flujo por un ajuste inadecuado |
| Filtro de pared | Suprime componentes de baja frecuencia; demasiado alto puede borrar información de flujo lento | Buscar venas lentas con filtro excesivo |
| Ángulo / inclinación | Dependencia del desplazamiento Doppler con coseno del ángulo; a 90° la señal Doppler ideal tiende a cero | Confundir silencio Doppler a 90° con ausencia de circulación |
| Volumen de muestra PW | Define el lugar y extensión interrogados; la posición y tamaño afectan el espectro | Medir sin confirmar que la muestra está dentro de la vena elegida |
| Línea de base / invertir | Cambian presentación; el color y lado del espectro se interpretan respecto al mapa y transductor | “Rojo = arteria, azul = vena” o “todo lo negativo es reflujo” |
| Compresión con transductor | Una vena puede deformarse; la presión también puede colapsar una vena superficial y dificultar su medida | Usar compresión constante mientras se busca medir diámetro o flujo de reposo |

El simulador debe declararse **didáctico y simplificado**. Su función es mostrar relaciones, no sintetizar un diagnóstico ni producir velocidades para usar en pacientes. Power Doppler convencional muestra potencia de señal, no dirección ni una medida directa de velocidad; evitar representarlo como color direccional.

## Estructura de una estación de mapeo

Cada estación presenta: objetivo → posición del paciente y examinador → sitio/posición del transductor → identificación en B → ajustes → maniobra pertinente → registro → traducción al mapa → error frecuente → comprobación. La secuencia clínica y los valores concretos deben venir del documento de consenso revisado por el equipo de contenido, no de este plan general.

El panel de cartografía debe permanecer disponible durante las estaciones. Al seleccionar una estructura en el mapa debe abrirse la evidencia que explica el símbolo: vista, medida, localización, maniobra, resultado y convención. Una flecha sin explicación no es aprendizaje de hemodinámica.

## Práctica y evaluación

**Modo explorar:** sin bloqueo por equivocación. Ofrece ayuda contextual, ejemplos y reinicio de controles.

**Modo guiado:** pide una predicción, permite una acción, muestra el resultado y solicita una decisión. La explicación se revela tras responder, y el alumno puede reintentar con una variación.

**Caso integrador:** entrega hallazgos simulados coherentes y pide construir un mapa completo. La evaluación verifica completitud, estructura seleccionada, lateralidad, nomenclatura, localización, unidades, evidencia y sentido de las convenciones; no reduce todo a una puntuación sin retroalimentación.

Los errores críticos de adquisición se explican separadamente: estudio sin identificación/lateralidad, medida bajo compresión, estructura no confirmada por continuidad, dirección inferida solo por color, diagnóstico por ausencia de color y símbolo de mapa sin dato que lo respalde.

## Accesibilidad y calidad visual

- Contraste suficiente, tipografía legible y textos cortos en el momento de actuar.
- Todos los controles con etiqueta, valor y acceso por teclado; no depender solo de arrastrar un modelo 3D.
- No usar únicamente rojo/azul para comunicar significado. Acompañar con etiquetas, flechas, leyenda y patrón.
- Botón para detener animación y respeto a la preferencia de movimiento reducido.
- Ilustraciones y espectros con ejes, unidades, marcador y referencia de dirección visibles.
- Guardado local explícito; si no hay cuenta ni servidor, comunicar que el avance corresponde a ese navegador.
- Exportación de mapas rotulada como ejercicio didáctico cuando se base en un caso simulado.

## Fuentes y revisión

Separar **norma del consenso**, **principio físico**, **decisión pedagógica** y **caso simulado**. Los textos clínicos deben ofrecer un enlace localizable a la página/sección del consenso. El buscador/glosario debe permitir recuperar la definición sin salir de una estación. No inventar una aprobación del consenso, de una sociedad o del IMF que no se haya documentado.

Referencias instrumentales: [SVM/SVU 2020 — optimización de ondas periféricas](https://journals.sagepub.com/doi/10.1177/1358863X20937665); [ISUOG 2021 — principios Doppler](https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.23698), utilizada solo para principios generales. El protocolo de mapeo debe anclarse al [consenso latinoamericano suministrado](https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf).
