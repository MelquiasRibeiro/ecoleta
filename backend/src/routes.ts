import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import multerConfig from './config/multer';
import PointsController from './controllers/pointsController';
import ItensController from './controllers/itensController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointController = new PointsController();
const itensController = new ItensController();

routes.get('/itens', itensController.index);

routes.post(
  '/point',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        itens: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  pointController.create,
);
routes.get('/point', pointController.index);
routes.get('/point/:id', pointController.show);

export default routes;
