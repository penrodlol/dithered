import { DIFUSSION_MAPS, MATRIX_SIZES, TYPES } from '@/libs/data';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import z from 'zod';

const image = z
  .instanceof(File)
  .refine((file) => ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type))
  .transform(async (file) => Buffer.from(await file.arrayBuffer()))
  .transform(async (buffer) => sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true }));
const ditheringType = z.enum(TYPES);
const diffusionMap = z.enum(DIFUSSION_MAPS).optional();
const matrixSize = z.enum(MATRIX_SIZES).optional();
const useColorPalette = z.coerce.boolean().optional();
const colorPalette = z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).optional();

export const schema = z.object({ image, ditheringType, diffusionMap, matrixSize, useColorPalette, colorPalette });

export const POST: APIRoute = async ({ request }) => {
  const unsafeFormData = await request.formData();
  const safeFormData = await schema.safeParseAsync({
    image: unsafeFormData.get('image'),
    ditheringType: unsafeFormData.get('ditheringType'),
    diffusionMap: unsafeFormData.get('diffusionMap'),
    matrixSize: unsafeFormData.get('matrixSize'),
    useColorPalette: unsafeFormData.get('useColorPalette'),
    colorPalette: unsafeFormData.getAll('colorPalette'),
  });
  if (!safeFormData.success) return new Response(JSON.stringify({}), { status: 400 });
  if (safeFormData.data.image.info.channels !== 4) return new Response(JSON.stringify({}), { status: 400 });

  try {
    switch (safeFormData.data.ditheringType) {
      case 'Error Diffusion Dithering': {
        const ditherImage = await import('./_algorithm.error-diffusion').then((module) => module.default);
        return new Response(await ditherImage(safeFormData.data), { headers: { 'Content-Type': 'application/json' } });
      }
      case 'Ordered Dithering': {
        const ditherImage = await import('./_algorithm.ordered').then((module) => module.default);
        return new Response(await ditherImage(safeFormData.data), { headers: { 'Content-Type': 'application/json' } });
      }
      default:
        return new Response(JSON.stringify({ message: '....' }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: '...' }), { status: 500 });
  }
};
