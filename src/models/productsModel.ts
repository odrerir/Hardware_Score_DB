import mongoose, { Schema, Document } from 'mongoose';
import {ProductType} from '../enums/ProductType';

export interface IProduct extends Document {
  name: string;
  clock: string;
  releaseDate: Date;
  manufactury: string;
  type: ProductType;
  core?: string;
  tdp?: string;
  memory?: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, unique: true },
  clock: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  manufactury: { type: String, required: true },
  type: { type: String, enum: Object.values(ProductType), required: true },
  core: { type: String },
  tdp: { type: String },
  memory: { type: String },
}, {
  versionKey: false,
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
