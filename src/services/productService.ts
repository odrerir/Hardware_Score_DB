import ProductModel, { IProduct } from '../models/productsModel';
import { ConflictError } from '../utils/errors/conflictError';

export default class ProductService {
  static async createProduct(data: IProduct): Promise<IProduct> {
    try {
      const product = new ProductModel(data);
      return await product.save();
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.name) {
        throw new ConflictError('Product name already exists');
      }
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getProductById(productId: string): Promise<IProduct | null> {
    try {
      const product = await ProductModel.findById(productId).lean();
      return product;
    } catch (error: any) {
      throw new Error('Error fetching product: ' + error.message);
    }
  }
}
