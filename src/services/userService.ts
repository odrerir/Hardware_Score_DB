import UserModel, { IUser } from '../models/userModel';
import { ConflictError } from '../utils/errors/conflictError';

class UserService {
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
    try {
      const user = await UserModel.findById(userId).lean().select('-password');
      return user;
    } catch (error: any) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }
}

export default UserService;
