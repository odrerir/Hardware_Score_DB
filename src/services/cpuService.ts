import { ProductType } from '../enums/ProductType';
import ProductModel from '../models/productsModel';
import { IProduct } from '../models/productsModel';

export default class CpuService {
  static async createCpu(data: IProduct) {
    data.type = ProductType.CPU;
    const cpu = new ProductModel(data);
    return cpu.save();
  }

  static async getCpuById(cpuId: string) {
    return ProductModel.findById(cpuId).lean();
  }

  static async getAllCpus() {
    return ProductModel.find({ type: 'CPU' }).lean();
  }

  static async updateCpu(cpuId: string, data: Partial<IProduct>) {
    return ProductModel.findByIdAndUpdate(
      cpuId,
      data,
      {
        new: true
      }
    );
  }

  static async deleteCpu(cpuId: string) {
    return ProductModel.findByIdAndDelete(cpuId);
  }
}
