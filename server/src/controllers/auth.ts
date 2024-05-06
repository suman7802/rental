import {NextFunction, Request, Response} from 'express';

import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';

import createOrGetUser from '../utils/createOrGetUser';

const user = {
  createOrGet: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user;
      const fetchedUser = await createOrGetUser(user);
      res.status(200).json(fetchedUser);
    }
  ),
};

export default user;
