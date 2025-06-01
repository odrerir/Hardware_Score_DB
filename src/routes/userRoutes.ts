import express from 'express';
import { validateRequestBody } from '../middlewares/validateResquestBody';
import { createUserSchema } from '../utils/users/userDataValidation';
import { UserController } from '../controllers/userController';
import { authenticateJWT }  from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/users', authenticateJWT,  validateRequestBody(createUserSchema), UserController.createUser);
router.get('/users', authenticateJWT, UserController.getAllUsers);
router.get('/users/:userId', authenticateJWT, UserController.getUserById);
router.put('/users/:userId', authenticateJWT, UserController.updateUser);
router.delete('/users/:userId', authenticateJWT, UserController.deleteUser);

export default router;
