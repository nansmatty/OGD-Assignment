import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';

interface CustomError extends Error {
  statusCode?: number;
  keyValue?: Record<string, string | number | boolean>;
  path?: string;
}

interface SequelizeError extends Error {
  name: string;
  errors?: Array<{ message: string; path: string; value: string | number | boolean }>;
  keyValue?: Record<string, string | number | boolean>;
}

export const ErrorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    const error: CustomError = err;
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal Server Error';

    // Sequelize Validation Error
    if (error.name === 'SequelizeValidationError' && (error as SequelizeError).errors) {
      const message = `Validation Error: ${(error as SequelizeError).errors!.map((e) => e.message).join(', ')}`;
      err = new ErrorHandler(message, 400);
    }

    // Sequelize Unique Constraint Error
    if (error.name === 'SequelizeUniqueConstraintError' && (error as SequelizeError).errors) {
      const message = `Duplicate value entered for field(s): ${(error as SequelizeError).errors!.map((e) => e.path).join(', ')}`;
      err = new ErrorHandler(message, 400);
    }

    // Sequelize Database Error
    if (error.name === 'SequelizeDatabaseError') {
      const message = `Database Error: ${error.message}`;
      err = new ErrorHandler(message, 500);
    }

    // Invalid JWT Token
    if (error.name === 'JsonWebTokenError') {
      const message = `Invalid Token`;
      err = new ErrorHandler(message, 400);
    }

    // Expired JWT Token
    if (error.name === 'TokenExpiredError') {
      const message = `Token Expired`;
      err = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    // If the error is not an instance of Error, send a generic internal server error
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
