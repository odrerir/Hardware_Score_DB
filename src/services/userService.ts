import UserModel, { IUser } from '../models/userModel';
import { ConflictError } from '../utils/errors/conflictError';

export default class UserService {
  static async createUser(data: IUser): Promise<IUser> {
    try {
      const user = new UserModel(data);
      return await user.save();
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new ConflictError('Email already exists');
      }
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async getUserById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId).lean().select('-password');
  }

  static async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find().lean().select('-password');
  }

  static async updateUser(userId: string, data: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    }).lean().select('-password');
  }

  static async deleteUser(userId: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(userId).lean().select('-password');
  }
}
