import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cpuRoutes from './routes/cpuRoutes';
import gpuRoutes from './routes/gpuRoutes';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/', userRoutes);
app.use('/products', productRoutes);
app.use('/products/cpu', cpuRoutes);
app.use('/products/gpu', gpuRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
