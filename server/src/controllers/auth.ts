import {NextFunction, Request, Response} from 'express';

import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import authentication from '../services/auth.service';

const user = {
  create: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {email, password} = req.body;

      return await authentication
        .signup(email, password)
        .then(async (user) => {
          if (user.code === 'auth/email-already-in-use') {
            res.status(409).json({message: 'Email already exists'});
          } else if (user.code === 'auth/weak-password') {
            res
              .status(422)
              .json({message: 'weak password, minium 6 character long'});
          } else {
            const newUser = await prisma.user.create({
              data: {
                uid: user.uid,
                email: user.email!,
              },
            });

            res.status(201).json({
              data: {
                newUser,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
              },
              message: 'Registration successful',
            });
          }
        })
        .catch((error) => {
          throw new CustomError(error.message, 400);
        });
    }
  ),

  login: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    await authentication
      .signIn(email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        const refreshToken = userCredential.user.refreshToken;
        const idToken = await userCredential.user.getIdToken();

        const fetchUser = await prisma.user.findUnique({
          where: {uid},
        });

        if (!fetchUser) throw new CustomError('User not found', 404);

        res.status(200).json({user: fetchUser, refreshToken, idToken});
      })
      .catch((error) => {
        throw new CustomError(error.message, 400);
      });
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
