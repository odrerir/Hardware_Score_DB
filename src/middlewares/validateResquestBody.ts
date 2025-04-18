import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors/validationError';

export const validateRequestBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body) {
      return next(new ValidationError('Request body is required', {}));
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const rawErrors = result.error.flatten().fieldErrors;

      const fieldErrors = Object.entries(rawErrors).reduce(
        (acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        },
        {} as Record<string, string[]>
      );
      return next(new ValidationError('Validation error', fieldErrors));
    }

    req.body = result.data;
    next();
  };
};