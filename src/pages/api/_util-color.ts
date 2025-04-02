import { COLOR_PRESETS } from '@/libs/data';
import z from 'zod';
import type { schema } from './dither';

export function hexToRgb(color: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (!result) return [0, 0, 0];
  return [Number.parseInt(result[1]!, 16), Number.parseInt(result[2]!, 16), Number.parseInt(result[3]!, 16)];
}

export function getNearestColor(r: number, g: number, b: number, data: z.infer<typeof schema>) {
  const colors = (data.colorPalette ?? COLOR_PRESETS.data.blackAndWhite).map((color) => hexToRgb(color));
  let closestColor = hexToRgb(String(colors[0]));
  let closestDistance = Number.MAX_VALUE;

  for (const color of colors) {
    const [pr, pg, pb] = color;
    const distance = Math.sqrt(Math.pow(r - pr, 2) + Math.pow(g - pg, 2) + Math.pow(b - pb, 2));
    if (distance < closestDistance) (closestDistance = distance), (closestColor = color);
  }

  return closestColor;
}
