import mongoose from 'mongoose';
import { z } from 'zod';
import { cpuProductSchema } from './cpuSchema';
import { gpuProductSchema } from './gpuSchema';
import { ProductType } from '../../enums/ProductType';

export const generalProductSchema = z.union([cpuProductSchema, gpuProductSchema]);

export function getProductSchema(type: ProductType) {
  return type === ProductType.CPU ? cpuProductSchema : gpuProductSchema;
}

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId format',
});