export const DITHERING_TYPES = ['Ordered Dithering', 'Error Diffusion Dithering'];
export const DITHERING_DIFUSSION_MAPS = ['Floyd-Steinberg', 'Jarvis', 'Stucki', 'Burkes'];
export const DITHERING_MATRICIES = ['2x2', '4x4', '8x8'];

// prettier-ignore
export const COLOR_PRESETS = [
  { label: 'Black & White', colors: ['#000000', '#ffffff'] },
  { label: '4-Level Grayscale', colors: ['#000000', '#555555', '#aaaaaa', '#ffffff'] },
  { label: '8-Level Grayscale', colors: ['#000000', '#1c1c1c', '#383838', '#555555', '#717171', '#8d8d8d', '#aaaaaa', '#c6c6c6', '#ffffff'] },
  { label: 'CGA', colors: ['#000000', '#ff5555', '#55ff55', '#ffff55'] },
  { label: 'Game Boy', colors: ['#000000', '#555555', '#aaaaaa', '#ffffff'] },
  { label: 'Commodore 64', colors: ['#000000', '#68372b', '#70a4b2', '#6f3d86', '#588d43', '#352879', '#b8c76f', '#6f4f25', '#433900', '#9a6759', '#444444', '#6c6c6c', '#9ad284', '#6c5eb5', '#959595', '#9a6759'] },
]
