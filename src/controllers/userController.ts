import { NextFunction, Request, Response } from 'express';
import CatchAsyncError from '../utils/catchAsyncError';
import logger from '../config/logger';
import ErrorHandler from '../utils/errorHandler';
import { User } from '../models';

// Get All Users Controller

export const getAllUsers = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return next(new ErrorHandler('No Users Found', 404));
    }

    return res.status(200).json(users);
  } catch (error) {
    logger.error('Get All Users Catch Error ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime.', 500));
  }
});

// Get User By Id Controller

export const getUserById = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json(user);
  } catch (error) {
    logger.error('Get User By Id Catch Error ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime.', 500));
  }
});
