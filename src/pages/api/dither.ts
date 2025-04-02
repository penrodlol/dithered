import * as data from '@/libs/data';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import z from 'zod';
import applyErrorDiffusionDithering from './_type-error-diffusion';
import applyOrderedDithering from './_type-ordered';

const image = z
  .instanceof(File)
  .refine((file) => ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type))
  .transform(async (file) => Buffer.from(await file.arrayBuffer()))
  .transform(async (buffer) => sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true }));
const ditheringType = z.enum(data.TYPES);
const diffusionMap = z.enum(data.ERROR_DIFFUSION.keys).optional();
const matrixSize = z.enum(data.ORDERED.keys).optional();
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

  const image =
    safeFormData.data.ditheringType === 'Error Diffusion Dithering'
      ? await applyErrorDiffusionDithering(safeFormData.data)
      : await applyOrderedDithering(safeFormData.data);

  return new Response(image, { headers: { 'Content-Type': 'application/json' } });
};
