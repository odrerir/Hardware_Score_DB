import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/productService';
import { objectIdSchema } from '../utils/products/productDataValidation';
import { z } from 'zod';
import { AppError } from '../utils/errors/appError';

export default class ProductsController {
  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error: any) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { productId } = req.params;
    try {
      objectIdSchema.parse(productId);

      const product = await ProductService.getProductById(productId);

      if (!product) {
        return next(new AppError('Product not found', 404));
      }

      res.status(200).json(product);
    } catch (error: any) {
      console.log(error);
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }
}
