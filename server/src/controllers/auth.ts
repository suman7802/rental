import {NextFunction, Request, Response} from 'express';

import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import authentication from '../services/auth.service';

const user = {
  create: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {email, password} = req.body;
      const user = await authentication.signup(email, password);

      const newUser = await prisma.user.create({
        data: {
          uid: user.uid,
          email: user.email!,
        },
      });

      res.status(201).json(newUser);
    }
  ),

  login: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    const userCredential = await authentication.signIn(email, password);

    const uid = userCredential.user.uid;
    const refreshToken = userCredential.user.refreshToken;
    const idToken = await userCredential.user.getIdToken();

    const fetchUser = await prisma.user.findUnique({
      where: {uid},
    });

    if (!fetchUser) throw new CustomError('User not found', 404);

    res.status(200).json({user: fetchUser, refreshToken, idToken});
  }),

  google: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {token, user} = await authentication.signInWithGoogle();
      console.log(token);
      res.status(200).send(user);
    }
  ),

  getUser: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;

      const fetchUser = await prisma.user.findUnique({
        where: {uid: user?.uid},
      });

      if (!fetchUser) throw new CustomError('User not found', 404);
      res.status(200).json(fetchUser);
    }
  ),
};

export default user;
