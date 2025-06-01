import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { AppError } from '../utils/errors/appError';
import { generateToken } from '../utils/auth/jwt';

export class AuthController {

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return next(new AppError('Invalid email or password', 401));
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return next(new AppError('Invalid email or password', 401));
      }

      const token = generateToken({ id: user._id, email: user.email });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new AppError('Email já está em uso', 400));
      }

      const user = new User({ name, email, password });
      await user.save();

      const token = generateToken({ id: user._id, email: user.email });
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
}