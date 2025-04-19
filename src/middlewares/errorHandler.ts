import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors/validationError';  // Importando o erro personalizado
import { ConflictError } from '../utils/errors/conflictError';
import { AppError } from '../utils/errors/appError';

export function errorHandler(err: Error | any, req: Request, res: Response, next: NextFunction): void {
  console.error(err); //TODO: Implement a proper logging system
  
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ message: err.message, errors: err.details });
    return;
  }

  if (err instanceof ConflictError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal Server Error' });
}
