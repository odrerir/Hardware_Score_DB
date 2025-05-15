import express from 'express';
import ProductsController from '../controllers/productsController';

const router = express.Router();

router.get('/', ProductsController.getAllProducts);
router.get('/:productId', ProductsController.getProductById);
router.put('/:productId', ProductsController.updateProductById);
router.delete('/:productId', ProductsController.deleteProductById);

export default router;
