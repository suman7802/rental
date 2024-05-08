import {NextFunction, Request, Response} from 'express';

import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import {uploadMultipleMedia} from '../configs/cloudinary';
import CustomError from '../errors/customError';
import convertStringToFloat from '../utils/stringToFloat';
import {RentalCategory} from '@prisma/client';

const post = {
  create: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {uid} = res.locals.user;
      const files = req.files as Express.Multer.File[];
      const {title, description, longitude, latitude, rent, category} =
        req.body;

      if (!title || !description || !longitude || !latitude || !rent)
        return next(new CustomError('missing required fields', 400));

      if (!files || files.length === 0)
        return next(new CustomError('No files uploaded', 400));

      const rentFloat = convertStringToFloat(rent);
      const latitudeFloat = convertStringToFloat(latitude);
      const longitudeFloat = convertStringToFloat(longitude);

      const uploadedMedia = await uploadMultipleMedia(files, uid, category);

      const mediaData = uploadedMedia.map((media) => ({
        url: media.url,
        isActive: true,
      }));

      const unit = await prisma.unit.create({
        data: {
          User: {connect: {uid}},
          title,
          description,
          rent: rentFloat,
          latitude: latitudeFloat,
          longitude: longitudeFloat,
          category: category as RentalCategory,
          Media: {create: mediaData},
        },
      });

      res.status(201).json(unit);
    }
  ),

  update: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {uid} = res.locals.user;
      const {unitId} = req.params;
      const files = req.files as Express.Multer.File[];

      const {
        rent,
        title,
        category,
        latitude,
        longitude,
        removeMedia,
        description,
      } = req.body;

      if (!title || !description || !longitude || !latitude || !rent)
        return next(new CustomError('missing required fields', 400));

      const rmMedia = JSON.parse(removeMedia);
      const rentFloat = convertStringToFloat(rent);
      const latitudeFloat = convertStringToFloat(latitude);
      const longitudeFloat = convertStringToFloat(longitude);

      const uploadedMedia = await uploadMultipleMedia(files, uid, category);

      const mediaData = uploadedMedia.map((media) => ({
        url: media.url,
        isActive: true,
      }));

      if (rmMedia && rmMedia.length > 0) {
        await prisma.media.updateMany({
          where: {id: {in: rmMedia}, unit: parseInt(unitId)},
          data: {isActive: false},
        });
      }

      const unit = await prisma.unit.update({
        where: {id: parseInt(unitId)},
        data: {
          title,
          description,
          rent: rentFloat,
          latitude: latitudeFloat,
          longitude: longitudeFloat,
          category: category as RentalCategory,
          Media: {create: mediaData},
        },
      });

      res.status(200).json(unit);
    }
  ),
};

export default post;
