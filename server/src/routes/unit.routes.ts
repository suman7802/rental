import express from 'express';

import unit from '../controllers/unit';
import uploadToMemory from '../configs/multer';
import validate from '../middlewares/validateAuth';

const unitRoute = express.Router();

unitRoute.use(validate.auth);

unitRoute.post('/post', uploadToMemory.array('units'), unit.create);

export default unitRoute;
