import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import ErrorHandler from './utils/errorHandler';
import { ErrorMiddleware } from './middlewares/errorMiddleware';
import logger from './config/logger';
import { swaggerSetup } from './config/swaggerSetup';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import projectAssociationRoutes from './routes/projectassociationRoutes';

const app: Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

swaggerSetup(app);

/**
 * @swagger
 * /api/v1/health-check:
 *   get:
 *     tags:
 *      - Health Check
 *     description: Health check endpoint
 *     responses:
 *       200:
 *         description: API is working
 */
app.get('/api/v1/health-check', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      message: 'API is working',
    });
  } catch (error) {
    logger.error('Error in health check', error);
    return next(new ErrorHandler('API is not working', 500));
  }
});

// Routes Declaration
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/associations', projectAssociationRoutes);

// Middleware to handle errors
app.use(ErrorMiddleware);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new ErrorHandler(`Route ${req.originalUrl} not found`, 404));
});

export default app;
