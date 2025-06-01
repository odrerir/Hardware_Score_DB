import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors/appError';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

export const authenticateJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Token não fornecido', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return next(new AppError('Token inválido', 403));
  }
};
