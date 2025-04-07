import sharp from 'sharp';
import z from 'zod';
import { getNearestColor } from './_util-color';
import type { schema } from './dither';

export default async function (data: z.infer<typeof schema>) {
  if (!data.algorithm.divisor) throw new Error('Divisor is required.');

  const width = data.image.info.width;
  const height = data.image.info.height;
  const channels = data.image.info.channels;
  const { matrix, divisor } = data.algorithm;
  const outputBuffer = Buffer.alloc(data.image.data.length);
  const redChannel = new Array(width * height) as [number, number, number];
  const greenChannel = new Array(width * height) as [number, number, number];
  const blueChannel = new Array(width * height) as [number, number, number];

  for (let i = 0; i < width * height; i++) {
    redChannel[i] = Number(data.image.data[i * channels]);
    greenChannel[i] = Number(data.image.data[i * channels + 1]);
    blueChannel[i] = Number(data.image.data[i * channels + 2]);
  }

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const pixelIndex = index * channels;

      if (channels === 4 && data.image.data[pixelIndex + 3] === 0) {
        outputBuffer[pixelIndex] = 0;
        outputBuffer[pixelIndex + 1] = 0;
        outputBuffer[pixelIndex + 2] = 0;
        outputBuffer[pixelIndex + 3] = 0;
        continue;
      }

      const r = Number(redChannel[index]);
      const g = Number(greenChannel[index]);
      const b = Number(blueChannel[index]);
      const newColor = getNearestColor(r, g, b, data);
      const errorR = r - newColor[0];
      const errorG = g - newColor[1];
      const errorB = b - newColor[2];

      outputBuffer[pixelIndex] = newColor[0];
      outputBuffer[pixelIndex + 1] = newColor[1];
      outputBuffer[pixelIndex + 2] = newColor[2];
      outputBuffer[pixelIndex + 3] = Number(data.image.data[pixelIndex + 3]);

      for (let i = 0; i < matrix.length; i++)
        for (let j = 0; j < matrix[i]!.length; j++) {
          if (matrix[i]![j] === 0) continue;

          const nx = x + j - Math.floor(matrix[i]!.length / 2);
          const ny = y + i;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const neighborIndex = (ny * width + nx) as 0 | 1 | 2;
            if (Number(data.image.data[neighborIndex * channels + 3]) === 0) continue;

            redChannel[neighborIndex] += (errorR * Number(matrix[i]![j])) / divisor;
            greenChannel[neighborIndex] += (errorG * Number(matrix[i]![j])) / divisor;
            blueChannel[neighborIndex] += (errorB * Number(matrix[i]![j])) / divisor;
          }
        }
    }

  return sharp(outputBuffer, { raw: { width, height, channels } }).png().toBuffer();
}
