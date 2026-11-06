# Renovación de explicaciones visuales — 6 de noviembre de 2026

Referencia adicional del propietario: [Flebo Animaciones y sus criterios de construcción](animation-reference-flebo.md). Se adopta como comparación para anatomía editable, mecanismos, cámara, selección y claridad espacial; el documento distingue lo que ya existe aquí de las capacidades que requieren una nueva implementación.

La actualización sustituye el laboratorio de una sola onda, el atlas anatómico procedural y el muñeco de adquisición por un sistema de representaciones relacionadas. Está dirigido al médico que conoce flebología y comienza en ultrasonido. La finalidad es comprender una acción y su consecuencia antes de trasladarla a práctica supervisada.

## Qué se integra

- 34 conceptos con volumen, corte/señal, relaciones gráficas y comparación. Son 136 propósitos de vista, no 136 vídeos ni adquisiciones clínicas.
- Relación explícita con las diez lecciones, las doce etapas del mapeo y los trece controles del ecógrafo didáctico. Las 37 comprobaciones de metodología se conservan.
- Anatomía derecha de Z-Anatomy/BodyParts3D adaptada por IMF: 143 mallas entre las cuatro capas. Vasos, piel/fascia y huesos se cargan al entrar al volumen anatómico; músculo es opcional. Se conservan coordenadas comunes, procedencia y CC BY-SA 4.0.
- Transductor lineal con arreglo de elementos, campo focal, ondas ampliadas, partículas del medio, eritrocitos, valvas conceptuales, cruce fascial, región de muestra PW y panel de recepción. Las valvas procedurales son esquemas originales; no forman parte de las mallas anatómicas fuente.
- Rotación de cámara, selección de GSV/VSM, unión safenofemoral, SSV/VSP y sistema profundo; capas, rótulos y corte por nivel. La cámara no cambia la lateralidad.
- Pausa, recorrido manual, velocidad, ampliación, vistas simultáneas de corte y gráfico y preferencia de movimiento reducido. Las fases se comparten entre representaciones; no hay reproducción automática de las explicaciones.
- Gráficas y sonogramas sintéticos originales con ejes, unidades y límites. Cada concepto enlaza al menos dos referencias gráficas primarias; las figuras ajenas sin licencia de redistribución se consultan en su origen.

## Recursos profesionales utilizados

| Recurso | Aplicación |
| --- | --- |
| [Three.js](https://github.com/mrdoob/three.js) y sus componentes oficiales | GLB, cámara orbital, geometría, materiales físicos, iluminación, etiquetas y renderizado WebGL. |
| [Motion para React](https://motion.dev/docs/react-use-animation-frame) · [repositorio y licencia](https://github.com/motiondivision/motion) | Reloj compartido, visibilidad y preferencia de movimiento reducido. La librería está instalada y utilizada. |
| [Animate e Improve Animations de Emil Kowalski](https://github.com/emilkowalski/skills) | Auditoría escrita, movimiento con propósito, pausas, controles estables y respeto a la accesibilidad. Instalados en el entorno de trabajo. |
| [Z-Anatomy](https://github.com/LluisV/Z-Anatomy) y [BodyParts3D/DBCLS, Japón](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html) | Reutilización del conjunto anatómico licenciado existente del IMF. Véanse [procedencia y límites](visual-assets-3d.md). |
| [IAEA](https://www.iaea.org/publications/8841/diagnostic-radiology-physics), [OMS](https://www.who.int/publications/i/item/9789241547451), [Lee et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC5381851/), [Necas](https://pmc.ncbi.nlm.nih.gov/articles/PMC5024873/) | Física, anatomía y referencias gráficas. Elaboración de nuevos esquemas originales, sin copiar sus figuras. |
| [Consenso latinoamericano](https://meriteamwork.org/wp-content/uploads/2024/07/Consenso-Mapa-venoso-ESPANOL.pdf), AIUM y SVS/AVF/AVLS | Cartografía y adquisición diferenciadas, conforme a la [matriz clínica existente](consensus-evidence.md). |

Se estudiaron alternativas de animación y materiales; no se añaden motores que dupliquen capacidades ya cubiertas por Three.js/Motion. No se utiliza GSAP ni se afirma haberlo integrado. No se necesitan servicios de pago para reproducir estas escenas.

## Verificación y límites

Las pruebas automáticas verifican física simplificada, muestreo, persistencia, cobertura del currículo, conservación de archivos anatómicos y recorridos de sonda. La revisión del navegador comprueba composición, cámaras, capas, controles, comparación, reproducción y tamaños de pantalla. El plan de ejecución conserva las decisiones y la evidencia de revisión.

No hay validación experimental acústica ni hemodinámica del simulador, y no se atribuye una revisión clínica independiente a esta actualización. La presión es una variable ilustrativa sin calibración de fuerza. El atlas no contiene todas las variantes. La geometría de referencia, las imágenes clínicas acreditadas y las escenas conceptuales se identifican por separado. El progreso educativo no acredita competencia clínica independiente.

Las correcciones de contraste no alteran la potencia acústica; un filtro puede eliminar información de flujo lento; el Power convencional no codifica dirección. Un corte o color aislados no demuestran identidad, continuidad, trombosis o reflujo. Estas distinciones se preservan en las escenas y el texto.

### Resultado técnico de esta entrega

Construcción 2.0.0 completada y 40 pruebas automáticas aprobadas. Se recorrieron en el navegador los cuatro modos de los 34 conceptos y los 37 momentos de metodología, sin errores de ejecución durante esas revisiones finales. Se verificó escritorio a 1440 × 1000 y teléfono simulado a 390 × 844; no se probó un dispositivo físico. La auditoría de formas cubrió las 68 vistas de corte/gráfico entre extremos y escenarios A/B. La publicación distribuye el mismo resultado estático preparado para Hostinger.
