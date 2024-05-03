import {NextFunction, Request, Response} from 'express';

import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';

const user = {
  getUser: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;

      // const fetchUser = await prisma.user.findUnique({
      //   where: {uid: user?.uid},
      // });

      // if (!fetchUser) throw new CustomError('User not found', 404);
      // res.status(200).json(fetchUser);

      console.log(user);
      res.status(200).json(user);
    }
  ),
};

export default user;
