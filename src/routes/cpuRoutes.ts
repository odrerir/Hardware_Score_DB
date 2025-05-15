import express from 'express';
import CpuController from '../controllers/cpuController';
import { validateRequestBody } from '../middlewares/validateResquestBody';
import { cpuProductSchema } from '../utils/products/cpuSchema';

const router = express.Router();

router.post('/', validateRequestBody(cpuProductSchema), CpuController.createCpu);
router.get('/', CpuController.getAllCpus);
router.get('/:productId', CpuController.getCpuById);
router.put('/:productId', validateRequestBody(cpuProductSchema), CpuController.updateCpu);
router.delete('/:productId', CpuController.deleteCpu);

export default router;
