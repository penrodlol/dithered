import { DIFUSSION_MAPS, MATRICIES, TYPES } from '@/libs/data';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  dither: defineAction({
    accept: 'form',
    input: z.object({
      ditheringType: z.enum(TYPES),
      diffusionMap: z.enum(DIFUSSION_MAPS).optional(),
      matrixSize: z.enum(MATRICIES).optional(),
      useColorPalette: z.coerce.boolean().optional(),
      colorPalette: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).optional(),
      image: z
        .instanceof(File)
        .refine((file) => ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)),
    }),
    handler: async (data) => {},
  }),
};

async function applyErrorDiffusionDithering() {}
async function applyOrderedDithering() {}
