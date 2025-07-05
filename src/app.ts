import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

export default app;
