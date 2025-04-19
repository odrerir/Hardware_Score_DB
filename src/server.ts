import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
