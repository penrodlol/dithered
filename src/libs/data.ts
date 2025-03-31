export const TYPES = ['Error Diffusion Dithering', 'Ordered Dithering'] as const;
// prettier-ignore
export const DIFUSSION_MAPS = ['Floyd-Steinberg', 'Jarvis-Judice-Ninke', 'Stucki', 'Atkinson', 'Burkes', 'Sierra3', 'Sierra2', 'SierraLite'] as const;
export const MATRIX_SIZES = ['2', '4', '8'] as const;
// prettier-ignore
export const COLOR_PRESETS = {
  labels: ['Black & White', '4-Level Grayscale', '8-Level Grayscale', 'CGA', 'Game Boy', 'Commodore 64', 'Custom'],
  labelsMap: {
    'Black & White': ['#000000', '#ffffff'],
    '4-Level Grayscale': ['#000000', '#555555', '#aaaaaa', '#ffffff'],
    '8-Level Grayscale': ['#000000', '#1c1c1c', '#383838', '#555555', '#717171', '#8d8d8d', '#aaaaaa', '#c6c6c6', '#ffffff'],
    'CGA': ['#000000', '#ff5555', '#55ff55', '#ffff55'],
    'Game Boy': ['#000000', '#555555', '#aaaaaa', '#ffffff'],
    'Commodore 64': ['#000000', '#68372b', '#70a4b2', '#6f3d86', '#588d43', '#352879', '#b8c76f', '#6f4f25', '#433900', '#9a6759', '#444444', '#6c6c6c', '#9ad284', '#6c5eb5', '#959595', '#9a6759'],
    'Custom': [],
  }
};

export const MATRIX_SIZES_MAPPER = {
  '2': [
    [0, 128],
    [192, 64],
  ],
  '4': [
    [0, 128, 32, 160],
    [192, 64, 224, 96],
    [48, 176, 16, 144],
    [240, 112, 208, 80],
  ],
  '8': [
    [0, 128, 32, 160, 8, 136, 40, 168],
    [192, 64, 224, 96, 200, 72, 232, 104],
    [48, 176, 16, 144, 56, 184, 24, 152],
    [240, 112, 208, 80, 248, 120, 216, 88],
    [12, 140, 44, 172, 4, 132, 36, 164],
    [204, 76, 236, 108, 196, 68, 228, 100],
    [60, 188, 28, 156, 52, 180, 20, 148],
    [252, 124, 220, 92, 244, 116, 212, 84],
  ],
};

export const MATRICIES = {
  'Floyd-Steinberg': {
    divisor: 16,
    matrix: [
      { dx: 1, dy: 0, factor: 7 },
      { dx: -1, dy: 1, factor: 3 },
      { dx: 0, dy: 1, factor: 5 },
      { dx: 1, dy: 1, factor: 1 },
    ],
  },
  'Jarvis-Judice-Ninke': {
    divisor: 48,
    matrix: [
      { dx: 1, dy: 0, factor: 7 },
      { dx: 2, dy: 0, factor: 5 },
      { dx: -2, dy: 1, factor: 3 },
      { dx: -1, dy: 1, factor: 5 },
      { dx: 0, dy: 1, factor: 7 },
      { dx: 1, dy: 1, factor: 5 },
      { dx: 2, dy: 1, factor: 3 },
      { dx: -2, dy: 2, factor: 1 },
      { dx: -1, dy: 2, factor: 3 },
      { dx: 0, dy: 2, factor: 5 },
      { dx: 1, dy: 2, factor: 3 },
      { dx: 2, dy: 2, factor: 1 },
    ],
  },
  Stucki: {
    divisor: 42,
    matrix: [
      { dx: 1, dy: 0, factor: 8 },
      { dx: 2, dy: 0, factor: 4 },
      { dx: -2, dy: 1, factor: 2 },
      { dx: -1, dy: 1, factor: 4 },
      { dx: 0, dy: 1, factor: 8 },
      { dx: 1, dy: 1, factor: 4 },
      { dx: 2, dy: 1, factor: 2 },
      { dx: -2, dy: 2, factor: 1 },
      { dx: -1, dy: 2, factor: 2 },
      { dx: 0, dy: 2, factor: 4 },
      { dx: 1, dy: 2, factor: 2 },
      { dx: 2, dy: 2, factor: 1 },
    ],
  },
  Atkinson: {
    divisor: 8,
    matrix: [
      { dx: 1, dy: 0, factor: 1 },
      { dx: 2, dy: 0, factor: 1 },
      { dx: -1, dy: 1, factor: 1 },
      { dx: 0, dy: 1, factor: 1 },
      { dx: 1, dy: 1, factor: 1 },
      { dx: 0, dy: 2, factor: 1 },
    ],
  },
  Burkes: {
    divisor: 32,
    matrix: [
      { dx: 1, dy: 0, factor: 8 },
      { dx: 2, dy: 0, factor: 4 },
      { dx: -2, dy: 1, factor: 2 },
      { dx: -1, dy: 1, factor: 4 },
      { dx: 0, dy: 1, factor: 8 },
      { dx: 1, dy: 1, factor: 4 },
      { dx: 2, dy: 1, factor: 2 },
    ],
  },
  Sierra3: {
    divisor: 32,
    matrix: [
      { dx: 1, dy: 0, factor: 5 },
      { dx: 2, dy: 0, factor: 3 },
      { dx: -2, dy: 1, factor: 2 },
      { dx: -1, dy: 1, factor: 4 },
      { dx: 0, dy: 1, factor: 5 },
      { dx: 1, dy: 1, factor: 4 },
      { dx: 2, dy: 1, factor: 2 },
      { dx: -1, dy: 2, factor: 2 },
      { dx: 0, dy: 2, factor: 3 },
      { dx: 1, dy: 2, factor: 2 },
    ],
  },
  Sierra2: {
    divisor: 16,
    matrix: [
      { dx: 1, dy: 0, factor: 4 },
      { dx: 2, dy: 0, factor: 3 },
      { dx: -2, dy: 1, factor: 1 },
      { dx: -1, dy: 1, factor: 2 },
      { dx: 0, dy: 1, factor: 3 },
      { dx: 1, dy: 1, factor: 2 },
      { dx: 2, dy: 1, factor: 1 },
    ],
  },
  SierraLite: {
    divisor: 4,
    matrix: [
      { dx: 1, dy: 0, factor: 2 },
      { dx: -1, dy: 1, factor: 1 },
      { dx: 0, dy: 1, factor: 1 },
    ],
  },
};
