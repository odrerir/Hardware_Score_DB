import { ProductType } from '../enums/ProductType';
import { Schema, Document } from 'mongoose';

export default interface IProduct extends Document {
  productId: string;
  name: string;
  core: string;
  clock: string;
  tdp: string;
  realeaseDate: Date;
  manufactury: string;
  type: ProductType;
}

const ProdutSchema: Schema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    core: { type: String, required: true },
    clock: { type: String, required: true },
    realeaseDate: { type: Date, required: true },
    manufactury: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
