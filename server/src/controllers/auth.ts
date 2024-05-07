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
      if (!fetchedUser) return next(new CustomError('user create/fetch problem', 500));

      res.status(200).json(fetchedUser);
    }
  ),

  getProfile: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id: rawId, name: rawName} = req.query;

      const id = Number(rawId);
      const name = typeof rawName === 'string' ? rawName.toLowerCase() : undefined;

      const whereClause: any = {};
      if (!isNaN(id)) whereClause.id = id;
      if (name) whereClause.name = {contains: name, mode: 'insensitive'};

      const fetchedUser = await prisma.user.findFirst({where: whereClause});
      if (!fetchedUser) return next(new CustomError('User not found', 404));

      res.status(200).json(fetchedUser);
    }
  ),
};

export default user;
