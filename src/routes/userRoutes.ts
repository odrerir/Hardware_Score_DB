import express from 'express';
import { validateRequestBody } from '../middlewares/validateResquestBody';
import { createUserSchema } from '../utils/users/userDataValidation';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.post('/users', validateRequestBody(createUserSchema), UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

export default router;
