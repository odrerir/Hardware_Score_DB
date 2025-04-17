import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/user/:userId', UserController.getUserById);

export default router;
