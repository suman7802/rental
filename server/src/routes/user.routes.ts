import express from 'express';

import user from '../controllers/auth';
import uploadToMemory from '../configs/multer';
import validate from '../middlewares/validateAuth';

const userRoute = express.Router();
userRoute.get('/profile', user.getProfile);

userRoute.use(validate.auth);
userRoute.put('/update', uploadToMemory.single('profile'), user.update);

export default userRoute;
