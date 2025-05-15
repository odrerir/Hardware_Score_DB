import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/productService';
import { objectIdSchema } from '../utils/products/productSchema';
import { z } from 'zod';
import { AppError } from '../utils/errors/appError';

export default class ProductsController {

  static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      next(new AppError('Error fetching products: ' + error.message, 500));
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
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format', 400));
      }
      next(error);
    }
  }

  static async updateProductById(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const updatedProduct = await ProductService.updateProductById(req.params.productId, req.body);
      if (!updatedProduct) {
        return next(new AppError('Product not found', 404));
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }

  static async deleteProductById(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const deleted = await ProductService.deleteProductById(req.params.productId);
      if (!deleted) {
        return next(new AppError('Product not found', 404));
      }
      res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }
}
