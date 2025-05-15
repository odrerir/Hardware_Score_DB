import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { objectIdSchema } from '../utils/users/userDataValidation';
import { z } from 'zod';
import { AppError } from '../utils/errors/appError';

export class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error: any) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    try {
      objectIdSchema.parse(userId);
      const user = await UserService.getUserById(userId);
      if (!user) return next(new AppError('User not found', 404));
      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format', 400));
      }
      next(error);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    try {
      objectIdSchema.parse(userId);
      const updatedUser = await UserService.updateUser(userId, req.body);
      if (!updatedUser) return next(new AppError('User not found', 404));
      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format', 400));
      }
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    try {
      objectIdSchema.parse(userId);
      const deletedUser = await UserService.deleteUser(userId);
      if (!deletedUser) return next(new AppError('User not found', 404));
      res.status(204).send(); // sucesso sem conteúdo
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format', 400));
      }
      next(error);
    }
  }
}
