// Recursos clínicos públicos seleccionados; los casos y modos conservan el contexto de sus fuentes.
export const clinicalMedia = [
  {
    id: 'bflow-safena-reflujo',
    title: 'Safena magna: flujo y reflujo en B-flow',
    mode: 'B-flow · clip real',
    type: 'image',
    animated: true,
    src: './media/b-flow-reflujo-safena.gif',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:B-flow_ultrasonography_of_venous_reflux.gif',
    author: 'Mikael Häggström',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    description: 'Caso publicado de reflujo valvular de safena magna cerca de la rodilla. La fuente describe avance hacia la izquierda durante compresión y retorno hacia la derecha al descomprimir.',
    limitation: 'B-flow visualiza el movimiento de sangre mediante una técnica distinta del Doppler. No es Doppler color, power ni un espectro PW; el clip no permite medir por sí solo el tiempo de reflujo. La fuente refiere un aneurisma trombosado distal en este caso.',
  },
  {
    id: 'color-femoral-tvp',
    title: 'Región femoral: anatomía y Doppler color',
    mode: 'B + Doppler color · imagen real',
    type: 'image',
    animated: false,
    src: './media/doppler-color-femoral-tvp.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ultrasonography_of_deep_vein_thrombosis_of_the_femoral_vein_-annotated.jpg',
    author: 'Mikael Häggström',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    description: 'Ejemplo publicado de trombosis venosa profunda en un segmento femoral derecho. La anotación original identifica arteria femoral, vena femoral común, vena femoral profunda y segmento subsartorial de la vena femoral.',
    limitation: 'Es un caso patológico, no un ejemplo de vena normal. Ausencia de color aislada no confirma trombosis: se requiere el examen completo y optimizar ajustes. Rojo y azul representan dirección respecto al transductor según el mapa, no la identidad de arteria o vena. La vena femoral pertenece al sistema profundo.',
  },
];

export const media = clinicalMedia;
export default clinicalMedia;
