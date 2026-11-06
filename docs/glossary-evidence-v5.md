# Glosario animado de Eco-Doppler

La versión 5 añade 80 términos con páginas independientes, definiciones breves, mecanismos animados, observaciones, una variable manipulable, confusiones frecuentes y referencias por término. El índice permite búsqueda por nombre, sigla y definición, filtrado por área y recorrido alfabético. No se incorporan preguntas de evaluación ni calificaciones.

## Propósito de las animaciones

Cada término identifica un mecanismo específico. Los dibujos comparten primitivas gráficas, pero el movimiento y el control representan la relación correspondiente: oscilación local, propagación, interfaces, pulsos, haz, recepción, muestreo, flujo o interpretación de índices. Cambiar un rótulo sin alterar objetos o señal no cuenta como demostración.

Las escalas espaciales y temporales se amplían para permitir observación. Los ejemplos y números del modelo no son preajustes de ecógrafo, mediciones de paciente ni umbrales universales. La reducción de movimiento conserva acceso manual a los instantes y al control de la variable.

## Fuentes y supuestos

- [IAEA, Diagnostic Radiology Physics](https://www.iaea.org/publications/8841/diagnostic-radiology-physics), capítulos 12 y 13: ondas, interfaces, pulsos, transductores, haz, formación de imagen, Doppler y artefactos.
- [OMS, Manual of Diagnostic Ultrasound](https://www.who.int/publications/i/item/9789241547451), y [terminología AIUM](https://aium.s3.amazonaws.com/resourceLibrary/rut.pdf): nomenclatura y mecanismos básicos.
- [AIUM, revisión periférica 2024](https://doi.org/10.1002/jum.70049), y [SVS/AVF/AVLS](https://pmc.ncbi.nlm.nih.gov/articles/PMC11523430/): técnica y contexto venoso.
- [AIUM, uso clínico prudente](https://www.aium.org/resources/official-statements/view/prudent-clinical-use-and-safety-of-diagnostic-ultrasound), [índices de salida](https://doi.org/10.1002/jum.15159), y [FDA](https://www.fda.gov/radiation-emitting-products/medical-imaging/ultrasound-imaging): exposición, ALARA y límites de los modelos de TI/MI.

La velocidad de 1540 m/s es una hipótesis de modelos de tejido blando, no un valor universal de todo medio. El campo cercano D²/(4λ) corresponde a un pistón circular ideal. La refracción compara medios hipotéticos y explicita su relación de velocidades. Las fórmulas de reflexión/transmisión distinguen presión de intensidad. La potencia relativa y amplitud de presión se relacionan mediante raíz cuadrada bajo las condiciones asumidas.

La PRF y la frecuencia de la portadora son distintas; el tiempo de ida/vuelta limita el pulso único en vuelo. Nyquist, aliasing y desplazamiento de línea de base conservan sus significados. La corrección angular compara un ángulo real declarado con otro introducido. Las escenas Doppler usan un haz oblicuo coherente con la proyección y las muestras se alinean con ese haz. El flujo no se detiene porque θ llegue a 90°.

El ejemplo respiratorio se identifica como miembro inferior y conserva la relación anatómica entre inspiración y descenso diafragmático. Las señales venosas son inventadas y no permiten diagnosticar por un patrón aislado. La duración de reflujo se mide sobre la señal, con interpretación por segmento y protocolo.

## Revisión y límites

Se verifica cobertura de 80 mecanismos, validez de coordenadas y respuesta visual de controles y tiempo mediante 720 estados. Las relaciones físicas tienen comprobaciones numéricas de mantenimiento. La revisión bibliográfica y de coherencia de los dibujos no constituye validación clínica independiente ni acreditación de destreza del alumno.

La aplicación conserva adquisiciones publicadas como referencias independientes del modelo. Los controles no alteran esas imágenes. Para algunos conceptos espaciales se conserva una representación 3D con controles separados y explícitos.

El archivo `src/data/glossaryContent.js` contiene los localizadores de referencia por término. La construcción genera 81 entradas HTML de glosario, además de las 50 de metodología. Los archivos relativos se verifican para publicación bajo subdirectorios y portabilidad a Hostinger.
