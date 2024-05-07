import {NextFunction, Request, Response} from 'express';

import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import uploadMedia from '../configs/cloudinary';
import CustomError from '../errors/customError';
import createOrGetUser from '../utils/createOrGetUser';

const user = {
  createOrGet: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user;

      const fetchedUser = await createOrGetUser(user);
      if (!fetchedUser)
        return next(new CustomError('user create/fetch problem', 500));

      res.status(200).json(fetchedUser);
    }
  ),

  getProfile: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id: rawId, name: rawName} = req.query;

      const id = Number(rawId);
      const name =
        typeof rawName === 'string' ? rawName.toLowerCase() : undefined;

      const whereClause: any = {};
      if (!isNaN(id)) whereClause.id = id;
      if (name) whereClause.name = {contains: name, mode: 'insensitive'};

      const fetchedUser = await prisma.user.findFirst({where: whereClause});
      if (!fetchedUser) return next(new CustomError('User not found', 404));

      res.status(200).json(fetchedUser);
    }
  ),

  update: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = res.locals.user;

      const verifiedUser = await prisma.user.findUnique({
        where: {id},
      });

      if (!verifiedUser) throw new CustomError(`Not Found`, 404);

      if (verifiedUser?.verified === 'verified')
        throw new CustomError(`Forbidden due to kwc approved`, 403);

      let profileUrl = verifiedUser.profile;
      if (req.file) profileUrl = await uploadMedia(req.file, id, 'profile');

      const updatedUser = await prisma.user.update({
        where: {id},

        data: {
          profile: profileUrl,
          bio: req.body.bio ?? verifiedUser.bio,
          phone: req.body.phone ?? verifiedUser.phone,
          latitude: req.body.latitude ?? verifiedUser.latitude,
          name: req.body.name.toLowerCase() ?? verifiedUser.name,
          longitude: req.body.longitude ?? verifiedUser.longitude,
        },

        select: {
          bio: true,
          name: true,
          email: true,
          govId: true,
          phone: true,
          profile: true,
          verified: true,
        },
      });

      res.status(200).json(updatedUser);
    }
  ),
};

export default user;
