import { MATRICIES } from '@/libs/data';
import sharp from 'sharp';
import z from 'zod';
import type { schema } from './dither';

export default async function (data: z.infer<typeof schema>) {
  if (!data.diffusionMap) throw new Error('Diffusion map is required.');

  const width = data.image.info.width;
  const height = data.image.info.height;
  const channels = data.image.info.channels;

  const workingData = new Float32Array(data.image.data.length);
  for (let i = 0; i < data.image.data.length; i++) workingData[i] = Number(data.image.data[i]);

  const outputRawData = new Uint8ClampedArray(data.image.data.length);
  const { matrix: diffusionMatrix, divisor } = MATRICIES[data.diffusionMap];

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const oldR = Number(workingData[index]);
      const oldG = Number(workingData[index + 1]);
      const oldB = Number(workingData[index + 2]);
      const originalAlpha = Number(workingData[index + 3]);
      const gray = 0.299 * oldR + 0.587 * oldG + 0.114 * oldB;
      const newColor = gray > 127.5 ? 255 : 0;
      const error = gray - newColor;

      outputRawData[index] = newColor;
      outputRawData[index + 1] = newColor;
      outputRawData[index + 2] = newColor;
      outputRawData[index + 3] = originalAlpha;

      for (const step of diffusionMatrix) {
        const neighborX = x + step.dx;
        const neighborY = y + step.dy;
        if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
          const neighborIdx = (neighborY * width + neighborX) * channels;
          const errorFraction = error * (step.factor / divisor);

          workingData[neighborIdx] = Number(workingData[neighborIdx]) + errorFraction;
          workingData[neighborIdx + 1] = Number(workingData[neighborIdx + 1]) + errorFraction;
          workingData[neighborIdx + 2] = Number(workingData[neighborIdx + 2]) + errorFraction;
        }
      }
    }

  return sharp(outputRawData, { raw: { width: width, height: height, channels: channels } })
    .png()
    .toBuffer();
}
