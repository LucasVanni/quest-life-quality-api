import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import routes from './routes';

import AppError from './errors/AppError';

import './database';

const app = express();
app.use(express.json());

app.use(routes);

app.use(
    (
        err: Error,
        _request: Request,
        response: Response,
        _next: NextFunction,
    ) => {
        if (err instanceof AppError) {
            return response.status(err.StatusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    },
);

export default app;
