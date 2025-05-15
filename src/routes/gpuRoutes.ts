import express from 'express';
import GpuController from '../controllers/gpuController';
import { validateRequestBody } from '../middlewares/validateResquestBody';
import { gpuProductSchema } from '../utils/products/gpuSchema';

const router = express.Router();

router.post('/', validateRequestBody(gpuProductSchema), GpuController.createGpu);
router.get('/', GpuController.getAllGpus);
router.get('/:productId', GpuController.getGpuById);
router.put('/:productId', validateRequestBody(gpuProductSchema), GpuController.updateGpu);
router.delete('/:productId', GpuController.deleteGpu);

export default router;
