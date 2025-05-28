import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFavorite extends Document {
  userId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

const FavoriteSchema = new Schema<IFavorite>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, {
  versionKey: false,
});

const FavoriteModel: Model<IFavorite> = mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export default FavoriteModel;
