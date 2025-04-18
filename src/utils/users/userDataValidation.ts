import mongoose from 'mongoose';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome muito longo')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, 'Nome contém caracteres inválidos'),

  email: z
    .string()
    .trim()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .max(100, 'Email muito longo'),

  password: z
    .string()
    .trim()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(100, 'A senha é muito longa')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    ),
});

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId format',
});