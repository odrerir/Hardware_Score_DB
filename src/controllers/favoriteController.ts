import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors/appError';
import { z } from 'zod';

import FavoriteService from '../services/favoriteService';
import { objectIdSchema } from '../utils/favorite/favoriteSchema';

export default class FavoriteController {

  static async getFavoriteByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;

    try {
      objectIdSchema.parse(userId);

      const favorite = await FavoriteService.getFavoritesByUserId(userId);

      if (!favorite) {
        return next(new AppError('Favorite not found', 404));
      }

      res.status(200).json(favorite);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format', 400));
      }
      next(error);
    }
  }

  static async addProductToFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, products } = req.body;

    try {
      objectIdSchema.parse(userId);
      products.forEach((productId: string) => objectIdSchema.parse(productId));

      const favorite = await FavoriteService.addProductToFavorite(userId, products);

      res.status(201).json(favorite);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format', 400));
      }
      next(error);
    }
  }


  static async deleteFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, productId } = req.params;

    try {
      objectIdSchema.parse(userId);
      objectIdSchema.parse(productId);

      const deleted = await FavoriteService.deleteFavorite(userId, productId);

      if (!deleted) {
        return next(new AppError('Favorite product not found', 404));
      }

      res.status(204).send();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format', 400));
      }
      next(error);
    }
  }
}
