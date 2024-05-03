import {NextFunction, Request, Response} from 'express';
import admin from 'firebase-admin';

import asyncCatch from '../errors/catchAsync';
import firebaseConfig from '../configs/firebase';

admin.initializeApp(firebaseConfig);

const validate = {
  auth: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    admin
      .auth()
      .verifyIdToken(idToken!)
      .then((decodedToken) => {
        res.locals.user = decodedToken;
        next();
      });
  }),
};

export default validate;
