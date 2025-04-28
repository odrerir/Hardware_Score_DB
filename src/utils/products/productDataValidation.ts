import mongoose from 'mongoose';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório')
    .max(150, 'Nome muito longo')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s']+$/, 'Nome contém caracteres inválidos'),

  core: z
    .string()
    .trim(),

  clock: z
    .string()
    .trim(),

  tdp: z
    .string()
    .trim(),

  releaseDate: z
    .date(),

  manufactury: z
    .string()
    .trim(),

  type: z.enum([
    'CPU',
    'GPU',
  ]),

});

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId format',
});