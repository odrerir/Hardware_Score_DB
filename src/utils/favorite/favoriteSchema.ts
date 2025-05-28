import { z } from 'zod';
import mongoose from 'mongoose';

export const favoriteSchema = z.object({
  userId: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid User ObjectId format',
    }),

  products: z.array(
    z.string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Product ObjectId format',
    })
  ),
});

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId format',
});