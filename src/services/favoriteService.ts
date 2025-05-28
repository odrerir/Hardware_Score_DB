import FavoriteModel, { IFavorite } from '../models/favoriteModel';

export default class favoriteService {
  static async createFavorite(data: IFavorite) {
    const favorite = new FavoriteModel(data);
    return favorite.save();
  }

  static async getFavoritesByUserId(userId: string) {
  const favorite = await FavoriteModel.findOne({ userId }).populate('products');
  return favorite ? favorite.products : [];
  }

  static async addProductToFavorite(userId: string, productId: string) {
    return FavoriteModel.findOneAndUpdate(
      { userId },
      { $addToSet: { products: { $each: productId } } },
      { new: true, upsert: true }
    );
  }

  static async deleteFavorite(userId: string, productId: string) {
    return FavoriteModel.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );
  }
}
