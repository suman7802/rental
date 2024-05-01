import express from 'express';

import user from '../controllers/auth';
import validate from '../middlewares/validateAuth';

const authRoute = express.Router();

authRoute.post('/signup', user.create);
authRoute.post('/signin', user.login);
authRoute.get('/google', user.google);

authRoute.use(validate.auth);
authRoute.get('/getprofile', user.getUser);

export default authRoute;
