import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import admin from '../configs/firebase';

const validate = {
  auth: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // const idToken = req.headers.authorization?.split('Bearer ')[1];

    // const decodedToken = jwt.decode(idToken!) as {exp: number};
    // const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    // if (decodedToken.exp < currentTimeInSeconds)
    //   throw new CustomError('Token expired', 401);

    // admin
    //   .auth()
    //   .verifyIdToken(idToken!)
    //   .then((decodedToken) => {
    //     res.locals.user = decodedToken;
    //     next();
    //   });

    res.locals.user = {
      uid: '7802',
      email: 'suman@gmail.com',
      name: 'suman2',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GhLr',
    };

    next();
  }),
};

export default validate;
