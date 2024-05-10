import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import admin from '../configs/firebase';

const validate = {
  auth: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    const decodedToken = jwt.decode(idToken!) as {exp: number};
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (!decodedToken) throw new CustomError('Invalid token', 401);
    if (decodedToken?.exp < currentTimeInSeconds)
      throw new CustomError('Token expired', 401);

    admin
      .auth()
      .verifyIdToken(idToken!)
      .then((decodedToken) => {
        res.locals.user = decodedToken;
        next();
      });
  }),
};

export default validate;
