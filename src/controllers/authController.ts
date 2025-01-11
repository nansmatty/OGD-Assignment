import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import ErrorHandler from '../utils/errorHandler';
import bcrypt from 'bcryptjs';
import { generateJwtToken } from '../utils/generateJwtToken';
import { Config } from '../config';
import CatchAsyncError from '../utils/catchAsyncError';
import logger from '../config/logger';

// User Register Controller

export const userRegister = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!(name || email || password)) {
      return next(new ErrorHandler('All fields are required', 400));
    }

    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({ name, email, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });

    if (!createUser) {
      return next(new ErrorHandler('Something went wrong while resgistering user', 500));
    }

    res.status(201).json({
      message: 'User registered successfully. Please login!',
    });
  } catch (error) {
    logger.error('User Register Catch Error ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime.', 500));
  }
});

// User Login Controller

export const userLogin = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      return next(new ErrorHandler('All fields are required', 400));
    }

    const checkUser = await User.findOne({ where: { email } });

    if (!checkUser) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    generateJwtToken(checkUser, 200, res);
  } catch (error) {
    logger.error('User Login Catch Error', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime.', 500));
  }
});

// User Logout Controller

export const userLogout = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .clearCookie('jwt', {
        httpOnly: true,
        secure: Config.NODE_ENV === 'production' ? true : false,
      })
      .json({
        message: 'User logged out successfully',
      });
  } catch (error) {
    logger.error('User Logout Catch Error', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime.', 500));
  }
});
