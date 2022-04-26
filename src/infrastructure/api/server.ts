import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express from 'express';
import 'express-async-errors';

import apiRouter from './api';
import { connectDb } from '../persistence/database';
import logger from 'jet-logger';

const app = express();

if (process.env.NODE_ENV !== 'test') {
    connectDb().then(() => logger.info('Database connected'));
}
/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

app.use('/api', apiRouter);

export default app;
