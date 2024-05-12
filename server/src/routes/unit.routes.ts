import express from 'express';

import unit from '../controllers/unit';
import uploadToMemory from '../configs/multer';
import validate from '../middlewares/validateAuth';

const unitRoute = express.Router();

unitRoute.get('/get', unit.getAll); // done in front-end
unitRoute.get('/get/:unitId', unit.getOne);

unitRoute.use(validate.auth);
unitRoute.get('/myunit', unit.get); // done in front-end
unitRoute.delete('/delete/:unitId', unit.delete);
unitRoute.post('/post', uploadToMemory.array('units'), unit.create);
unitRoute.put('/update/:unitId', uploadToMemory.array('units'), unit.update);

export default unitRoute;
