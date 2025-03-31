import { MATRIX_SIZES_MAPPER } from '@/libs/data';
import sharp from 'sharp';
import z from 'zod';
import type { schema } from './dither';

export default async function (data: z.infer<typeof schema>) {
  if (!data.matrixSize) throw new Error('Matrix size is required.');

  const width = data.image.info.width;
  const height = data.image.info.height;
  const channels = data.image.info.channels;
  const outputRawData = new Uint8ClampedArray(data.image.data.length);
  const bayerMatrix = MATRIX_SIZES_MAPPER[data.matrixSize];

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const oldR = Number(data.image.data[index]);
      const oldG = Number(data.image.data[index + 1]);
      const oldB = Number(data.image.data[index + 2]);
      const originalAlpha = Number(data.image.data[index + 3]);
      const gray = 0.299 * oldR + 0.587 * oldG + 0.114 * oldB;
      const mapX = x % Number(data.matrixSize);
      const mapY = y % Number(data.matrixSize);
      const threshold = bayerMatrix[mapY]![mapX]!;
      const newColor = gray > threshold ? 255 : 0;
      outputRawData[index] = newColor;
      outputRawData[index + 1] = newColor;
      outputRawData[index + 2] = newColor;
      outputRawData[index + 3] = originalAlpha;
    }

  return sharp(outputRawData, { raw: { width: width, height: height, channels: channels } })
    .png()
    .toBuffer();
}
