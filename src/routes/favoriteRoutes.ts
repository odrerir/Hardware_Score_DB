import express from 'express';
import { validateRequestBody } from '../middlewares/validateResquestBody';
import FavoriteController from '../controllers/favoriteController';
import { favoriteSchema } from '../utils/favorite/favoriteSchema';

const router = express.Router();

router.post('/', validateRequestBody(favoriteSchema), FavoriteController.addProductToFavorite);
router.get('/:userId', FavoriteController.getFavoriteByUserId);
router.delete('/:userId/:productId', FavoriteController.deleteFavorite);

export default router;
