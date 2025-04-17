import UserModel, { IUser } from '../models/userModel';

class UserService {
  static async createUser(data: IUser): Promise<IUser> {
    if (!data.email || !data.password) {
      throw new Error('Email and password are required');
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }

    try {
      const user = new UserModel(data);
      return await user.save();
    } catch (error: any) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async getUserById(userId: string): Promise<IUser | null> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      const user = await UserModel.findById(userId).lean().select('-password');
      
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }
}

export default UserService;
