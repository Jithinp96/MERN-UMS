import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
connectDB();

app.get('/', (req, res) => {
    res.send('API running')
});

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at PORT ${port}`));