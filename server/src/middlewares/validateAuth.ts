import {NextFunction, Request, Response} from 'express';

import auth from '../configs/firebase';
import asyncCatch from '../errors/catchAsync';

const validate = {
  auth: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
  }),
};

export default validate;
