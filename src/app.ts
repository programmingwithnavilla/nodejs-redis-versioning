import dotenv from 'dotenv';
import express from 'express';
import { default as userRouter } from './modules/users/user.route';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRouter);

export default app;
