import { Request, Response, NextFunction } from 'express';
import GpuService from '../services/gpuService';
import { objectIdSchema } from '../utils/products/productSchema';
import { AppError } from '../utils/errors/appError';
import { z } from 'zod';

export default class GpuController {
  static async createGpu(req: Request, res: Response, next: NextFunction) {
    try {
      const gpu = await GpuService.createGpu(req.body);
      res.status(201).json(gpu);
    } catch (error) {
      next(error);
    }
  }

  static async getGpuById(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const gpu = await GpuService.getGpuById(req.params.productId);
      if (!gpu) {
        return next(new AppError('GPU not found', 404));
      }
      res.status(200).json(gpu);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }

  static async getAllGpus(req: Request, res: Response, next: NextFunction) {
    try {
      const gpus = await GpuService.getAllGpus();
      res.status(200).json(gpus);
    } catch (error) {
      next(error);
    }
  }

  static async updateGpu(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const updatedGpu = await GpuService.updateGpu(req.params.productId, req.body);
      if (!updatedGpu) {
        return next(new AppError('GPU not found', 404));
      }
      res.status(200).json(updatedGpu);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }

  static async deleteGpu(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const deleted = await GpuService.deleteGpu(req.params.productId);
      if (!deleted) {
        return next(new AppError('GPU not found', 404));
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
