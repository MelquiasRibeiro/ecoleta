import express from 'express';

import PointsController from './controllers/pointsController';
import ItensController from './controllers/itensController';

const routes = express.Router();
const pointController = new PointsController();
const itensController = new ItensController();

routes.get('/itens', itensController.index);

routes.post('/point', pointController.create);
routes.get('/point', pointController.index);
routes.get('/point/:id', pointController.show);

export default routes;
