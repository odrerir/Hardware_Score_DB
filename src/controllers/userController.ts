import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { objectIdSchema } from '../utils/users/userDataValidation';
import { z } from 'zod';
import { AppError } from '../utils/errors/appError';

class UserController {
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

      if (!user) {
        return next(new AppError('User not found', 404));
      }
      
      res.status(200).json(user);
    } catch (error: any) {
      console.log(error);
      if (error instanceof z.ZodError) {
        return next(new AppError('Invalid ObjectId format'));
      }
      next(error);
    }
  }
}

export default UserController;