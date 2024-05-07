import {NextFunction, Request, Response} from 'express';

import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import uploadMedia from '../configs/cloudinary';
import CustomError from '../errors/customError';
import createOrGetUser from '../utils/createOrGetUser';
import convertStringToFloat from '../utils/stringToFloat';

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

      const fetchedUser = await prisma.user.findMany({
        where: whereClause,
        select: {
          bio: true,
          name: true,
          email: true,
          phone: true,
          profile: true,
          verified: true,

          Unit: {
            select: {
              id: true,
              name: true,
              Image: true,
              type: true,
            },
          },

          Favorites: {
            select: {
              business: {
                select: {
                  id: true,
                  name: true,
                  profile: true,
                  verified: true,
                },
              },
            },
          },
        },
      });
      if (!fetchedUser) return next(new CustomError('User not found', 404));

      res.status(200).json(fetchedUser);
    }
  ),

  update: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {uid} = res.locals.user;

      const user = await prisma.user.findUnique({where: {uid}});
      if (!user) throw new CustomError(`Not Found`, 404);

      if (user?.verified === 'verified')
        throw new CustomError(`Forbidden due to kwc approved`, 403);

      const {bio, phone, name, latitude, longitude} = req.body;

      let updateData: any = {
        bio: bio ?? user.bio,
        phone: phone ?? user.phone,
        name: name ? name.toLowerCase() : user.name,
      };

      if (latitude || longitude) {
        updateData.latitude = req.body.latitude
          ? convertStringToFloat(req.body.latitude)
          : user.latitude;
        updateData.longitude = req.body.longitude
          ? convertStringToFloat(req.body.longitude)
          : user.longitude;
      }

      if (req.file)
        updateData.profile = await uploadMedia(req.file, uid, 'profile');

      const updatedUser = await prisma.user.update({
        where: {uid},
        data: updateData,
        select: {
          bio: true,
          name: true,
          email: true,
          phone: true,
          profile: true,
          verified: true,
        },
      });

      res.status(200).json(updatedUser);
    }
  ),

  addRemoveFavorite: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {uid} = res.locals.user;
      const business = req.params.id;

      const businessExists = await prisma.user.findUnique({
        where: {id: Number(business)},
      });
      if (!businessExists) throw new Error('Business does not exist');

      const favoriteExists = await prisma.favorite.findFirst({
        where: {userId: uid, businessId: businessExists.uid},
      });

      if (favoriteExists) {
        await prisma.favorite.delete({where: {id: favoriteExists.id}});
        res.status(200).send('Favorite removed');
      } else {
        await prisma.favorite.create({
          data: {userId: uid, businessId: businessExists.uid},
        });
        res.status(201).send('Favorite added');
      }
    }
  ),

  verify: asyncCatch(async (req: Request, res: Response) => {
    const {id} = res.locals.user;

    if (!req.file || Object.keys(req.file).length === 0)
      throw new CustomError(`GovID Not Found`, 404);

    const verified = await prisma.user.findUnique({where: {id}});

    if (verified?.verified === 'verified')
      throw new CustomError(`Already Verified`, 400);

    let govIdUrl;
    if (req.file) govIdUrl = await uploadMedia(req.file, id, 'govId');

    const updatedModel = await prisma.user.update({
      where: {id},
      data: {govId: govIdUrl},
    });

    const requiredFields = [
      'name',
      'email',
      'govId',
      'phone',
      'profile',
      'latitude',
      'longitude',
    ];

    const missingFields = requiredFields.filter(
      (field) => !updatedModel[field as keyof typeof updatedModel]
    );

    if (missingFields.length > 0)
      throw new CustomError(`Missing Fields: ${missingFields.join(', ')}`, 400);

    await prisma.user.update({
      where: {id},
      data: {verified: 'requested'},
    });

    res.status(202).send('Verification Requested');
  }),
};

export default user;
