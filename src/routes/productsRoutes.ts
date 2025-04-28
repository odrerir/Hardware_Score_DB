import express from 'express';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { createProductSchema } from '../utils/products/productDataValidation';
import ProductsController from '../controllers/productsController';

const router = express.Router();

router.post('/products', validateRequestBody(createProductSchema), ProductsController.createProduct);
router.get('/products/:productId', ProductsController.getProductById);

export default router;
