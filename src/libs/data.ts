export const TYPES = ['Error Diffusion Dithering', 'Ordered Dithering'] as const;

// prettier-ignore
export const ERROR_DIFFUSION = {
  keys: ['floydSteinberg', 'jarvisJudiceNinke', 'stucki', 'atkinson', 'burkes', 'sierra2', 'sierra3', 'sierraLite'],
  mapper: [{ key: 'floydSteinberg', label: 'Floyd-Steinberg' }, { key: 'jarvisJudiceNinke', label: 'Jarvis-Judice-Ninke' }, { key: 'stucki', label: 'Stucki' }, { key: 'atkinson', label: 'Atkinson' }, { key: 'burkes', label: 'Burkes' }, { key: 'sierra2', label: 'Sierra2' }, { key: 'sierra3', label: 'Sierra3' }, { key: 'sierraLite', label: 'Sierra Lite' }],
  data: {
    floydSteinberg: { divisor: 16, matrix: [[0, 0, 7], [3, 5, 1]] },
    jarvisJudiceNinke: { divisor: 48, matrix: [[0, 0, 0, 7, 5], [3, 5, 7, 5, 3], [1, 3, 5, 3, 1]] },
    stucki: { divisor: 42, matrix: [[0, 0, 0, 8, 4], [2, 4, 8, 4, 2], [1, 2, 4, 2, 1]] },
    atkinson: { divisor: 8, matrix: [[0, 0, 1, 1], [1, 1, 1, 0], [0, 1, 0, 0]] },
    burkes: { divisor: 32, matrix: [[0, 0, 0, 8, 4], [2, 4, 8, 4, 2]] },
    sierra2: { divisor: 16, matrix: [[0, 0, 0, 4, 3], [1, 2, 3, 2, 1]] },
    sierra3: { divisor: 32, matrix: [[0, 0, 0, 5, 3], [2, 4, 5, 4, 2], [0, 2, 3, 2, 0]] },
    sierraLite: { divisor: 4, matrix: [[0, 0, 2], [1, 1, 0]] },
  },
} as const;

// prettier-ignore
export const ORDERED = {
  keys: ['2', '4', '8'],
  mapper: [{ key: '2', label: '2x2' }, { key: '4', label: '4x4' }, { key: '8', label: '8x8' }],
  data: {
    '2': { matrix: [[0, 2], [3, 1]] },
    '4': { matrix: [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]] },
    '8': { matrix: [[0, 32,  8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22], [3, 35, 11, 43, 1, 33,  9, 41], [51, 19, 59, 27, 49, 17, 57, 25], [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]] },
  },
} as const;

// prettier-ignore
export const COLOR_PRESETS = {
  mapper: [{ key: 'blackAndWhite', label: 'Black & White' }, { key: 'fourLevelGrayscale', label: '4-Level Grayscale' }, { key: 'eightLevelGrayscale', label: '8-Level Grayscale' }, { key: 'cga', label: 'CGA' }, { key: 'gameBoy', label: 'Game Boy' }, { key: 'commodore64', label: 'Commodore 64' }, { key: 'custom', label: 'Custom' }],
  data: {
    blackAndWhite: ['#000000', '#ffffff'],
    fourLevelGrayscale: ['#000000', '#555555', '#aaaaaa', '#ffffff'],
    eightLevelGrayscale: ['#000000', '#1c1c1c', '#383838', '#555555', '#717171', '#8d8d8d', '#aaaaaa', '#c6c6c6', '#ffffff'],
    cga: ['#000000', '#ff5555', '#55ff55', '#ffff55'],
    gameBoy: ['#000000', '#555555', '#aaaaaa', '#ffffff'],
    commodore64: ['#000000', '#68372b', '#70a4b2', '#6f3d86', '#588d43', '#352879', '#b8c76f', '#6f4f25', '#433900', '#9a6759', '#444444', '#6c6c6c', '#9ad284', '#6c5eb5', '#959595', '#9a6759'],
    custom: [],
  },
} as const;
