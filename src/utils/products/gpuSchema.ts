import { z } from 'zod';
import { ProductType } from '../../enums/ProductType';

export const gpuProductSchema = z.object({
  name: z.string().min(1),
  memory: z.string().min(1),
  clock: z.string().min(1),
  releaseDate: z.coerce.date(),
  manufactury: z.string().min(1),
  type: z.literal(ProductType.GPU),
});
