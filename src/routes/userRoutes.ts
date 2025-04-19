import express from 'express';
import { validateRequestBody } from '../middlewares/validateResquestBody';
import { createUserSchema } from '../utils/users/userDataValidation';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/users', validateRequestBody(createUserSchema), UserController.createUser);
router.get('/user/:userId', UserController.getUserById);

export default router;
