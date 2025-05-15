import { Request, Response, NextFunction } from 'express';
import CpuService from '../services/cpuService';
import { objectIdSchema } from '../utils/products/productSchema';
import { AppError } from '../utils/errors/appError';
import { z } from 'zod';

export default class CpuController {
  static async createCpu(req: Request, res: Response, next: NextFunction) {
    try {
      const cpu = await CpuService.createCpu(req.body);
      res.status(201).json(cpu);
    } catch (error) {
      next(error);
    }
  }

  static async getCpuById(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const cpu = await CpuService.getCpuById(req.params.productId);
      if (!cpu) {
        return next(new AppError('CPU not found', 404));
      }
      res.status(200).json(cpu);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }

  static async getAllCpus(req: Request, res: Response, next: NextFunction) {
    try {
      const cpus = await CpuService.getAllCpus();
      res.status(200).json(cpus);
    } catch (error) {
      next(error);
    }
  }

  static async updateCpu(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const updatedCpu = await CpuService.updateCpu(req.params.productId, req.body);
      if (!updatedCpu) {
        return next(new AppError('CPU not found', 404));
      }
      res.status(200).json(updatedCpu);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }

  static async deleteCpu(req: Request, res: Response, next: NextFunction) {
    try {
      objectIdSchema.parse(req.params.productId);
      const deleted = await CpuService.deleteCpu(req.params.productId);
      if (!deleted) {
        return next(new AppError('CPU not found', 404));
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
