import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import PointsController from './controllers/pointsController';
import ItensController from './controllers/itensController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointController = new PointsController();
const itensController = new ItensController();

routes.get('/itens', itensController.index);

routes.post('/point', upload.single('image'), pointController.create);
routes.get('/point', pointController.index);
routes.get('/point/:id', pointController.show);

export default routes;
