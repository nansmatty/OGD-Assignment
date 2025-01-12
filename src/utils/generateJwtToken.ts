import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserAttributes } from '../models/UserModel';
import { Config } from '../config';

interface ICookieOptions {
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
  expires?: Date;
  maxAge?: number;
}

export const generateJwtToken = (user: UserAttributes, statusCode: number, res: Response) => {
  const token = jwt.sign({ id: user.id }, Config.JWT_SECRET_KEY as string, {
    expiresIn: Config.JWT_EXPIRES_IN,
  });

  const jwtCookieExpiresIn = Config.JWT_COOKIE_EXPIRES_IN ? parseInt(Config.JWT_COOKIE_EXPIRES_IN, 10) : 7;

  const cookieOptions: ICookieOptions = {
    expires: new Date(Date.now() + jwtCookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: Config.NODE_ENV === 'production' ? true : false,
    sameSite: 'none',
  };

  res
    .status(statusCode)
    .cookie('jwt', token, cookieOptions)
    .json({
      status: 'success',
      message: 'User Login Successfully',
      data: {
        jwt: token,
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
};
