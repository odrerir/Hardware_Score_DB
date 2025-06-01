import userModel from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

export class AuthService {
  static async login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error('Credenciais inválidas');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token };
  }

  static async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ email, password: hashedPassword });
    await user.save();
    return user;
  }
}