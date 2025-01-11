import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';
import { Config } from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CatchAsyncError from '../utils/catchAsyncError';
import { User } from '../models';
import logger from '../config/logger';

export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtAccessToken = req.cookies.jwt;

    if (!jwtAccessToken || typeof jwtAccessToken !== 'string') {
      return next(new ErrorHandler('Unauthorized Access Token or Invalid Token', 401));
    }

    const decoded = jwt.verify(jwtAccessToken, Config.JWT_SECRET_KEY as string) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler('Unauthorized or Invalid Token', 400));
    }

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    res.locals.user = user;

    next();
  } catch (error) {
    logger.error('User IsAuthenticated Middleware Catch Error: ', error);
    return next(new ErrorHandler('You are not authorized. Please login first', 500));
  }
});
