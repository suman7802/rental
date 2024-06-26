import express from 'express';

import user from '../controllers/user';
import validate from '../middlewares/validateAuth';

const authRoute = express.Router();

authRoute.use(validate.auth);

authRoute.get('/getprofile', user.createOrGet);

export default authRoute;
