import {onAuthStateChanged} from 'firebase/auth';
import {NextFunction, Request, Response} from 'express';

import {auth} from '../configs/firebase';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';

const validate = {
  auth: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) next(new CustomError('Unauthorized', 404));
      // @ts-ignore
      req.user = user;
      next();
    });
  }),
};

export default validate;
