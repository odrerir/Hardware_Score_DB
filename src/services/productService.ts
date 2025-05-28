import ProductModel from '../models/productsModel';
import { IProduct } from '../models/productsModel';

export default class ProductService {
  static async getAllProducts() {
    return ProductModel.find().lean();
  }

  static async getProductById(productId: string) {
    return ProductModel.findById(productId).lean();
  }

  static async updateProductById(productId: string, data: Partial<IProduct>) {
    return ProductModel.findByIdAndUpdate(productId, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteProductById(productId: string) {
    return ProductModel.findByIdAndDelete(productId);
  }
}
