import { ProductType } from '../enums/ProductType';
import ProductModel from '../models/productsModel';
import { IProduct } from '../models/productsModel';

export default class GpuService {
  static async createGpu(data: IProduct) {
    data.type = ProductType.GPU;
    const gpu = new ProductModel(data);
    return gpu.save();
  }

  static async getGpuById(gpuId: string) {
    return ProductModel.findById(gpuId).lean();
  }

  static async getAllGpus() {
    return ProductModel.find({ type: 'GPU' }).lean();
  }

  static async updateGpu(gpuId: string, data: Partial<IProduct>) {
    return ProductModel.findByIdAndUpdate(gpuId, data, {
      new: true,
      runValidators: true, });
  }

  static async deleteGpu(gpuId: string) {
    return ProductModel.findByIdAndDelete(gpuId);
  }
}
