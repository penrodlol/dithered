import { ORDERED } from '@/libs/data';
import sharp from 'sharp';
import z from 'zod';
import { getNearestColor } from './_util-color';
import type { schema } from './dither';

export default async function (data: z.infer<typeof schema>) {
  if (!data.matrixSize) throw new Error('Matrix size is required.');

  const width = data.image.info.width;
  const height = data.image.info.height;
  const channels = data.image.info.channels;
  const outputBuffer = Buffer.alloc(data.image.data.length);
  const matrixSize = Number(data.matrixSize);
  const bayerMatrix = ORDERED.data[data.matrixSize].matrix;
  const normalizedMatrix: number[][] = [];

  for (let i = 0; i < matrixSize; i++) {
    normalizedMatrix[i] = [];
    for (let j = 0; j < matrixSize; j++) normalizedMatrix[i]![j] = bayerMatrix[i]![j]! / (matrixSize * matrixSize);
  }

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const threshold = Number(normalizedMatrix[y % matrixSize]![x % matrixSize]);
      const r = Math.max(0, Math.min(255, Number(data.image.data[index]) + (threshold * 255 - 128)));
      const g = Math.max(0, Math.min(255, Number(data.image.data[index + 1]) + (threshold * 255 - 128)));
      const b = Math.max(0, Math.min(255, Number(data.image.data[index + 2]) + (threshold * 255 - 128)));
      const newColor = getNearestColor(r, g, b, data);

      outputBuffer[index] = newColor[0];
      outputBuffer[index + 1] = newColor[1];
      outputBuffer[index + 2] = newColor[2];
      outputBuffer[index + 3] = data.image.data[index + 3]!;
    }

  return sharp(outputBuffer, { raw: { width, height, channels } }).png().toBuffer();
}
