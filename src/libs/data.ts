export const TYPES = ['Ordered Dithering', 'Error Diffusion Dithering'];
export const DIFUSSION_MAPS = ['Floyd-Steinberg', 'Jarvis', 'Stucki', 'Burkes'];
export const MATRICIES = ['2x2', '4x4', '8x8'];
export const COLOR_PRESETS = {
  labels: ['Black & White', '4-Level Grayscale', '8-Level Grayscale', 'CGA', 'Game Boy', 'Commodore 64', 'Custom'],
  // prettier-ignore
  labelsMap: {
    'Black & White': ['#000000', '#ffffff'],
    '4-Level Grayscale': ['#000000', '#555555', '#aaaaaa', '#ffffff'],
    '8-Level Grayscale': ['#000000', '#1c1c1c', '#383838', '#555555', '#717171', '#8d8d8d', '#aaaaaa', '#c6c6c6', '#ffffff'],
    'CGA': ['#000000', '#ff5555', '#55ff55', '#ffff55'],
    'Game Boy': ['#000000', '#555555', '#aaaaaa', '#ffffff'],
    'Commodore 64': ['#000000', '#68372b', '#70a4b2', '#6f3d86', '#588d43', '#352879', '#b8c76f', '#6f4f25', '#433900', '#9a6759', '#444444', '#6c6c6c', '#9ad284', '#6c5eb5', '#959595', '#9a6759'],
    'Custom': [],
  },
};
