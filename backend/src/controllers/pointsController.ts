import { Request, Response } from 'express';
import knex from '../database/conection';

class PointsController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      itens,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertdIds = await trx('points').insert(point);

    const point_id = insertdIds[0];

    const pointItens = itens
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx('point_itens').insert(pointItens);

    await trx.commit();

    return res.json({ id: point_id, ...point });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(404).json({
        message: 'point not found',
      });
    }

    const itens = await knex('itens')
      .join('point_itens', 'itens.id', '=', 'point_itens.item_id')
      .where('point_itens.point_id', id)
      .select('itens.title');

    const serializedPoint = {
      ...point,
      imageurl: `http://10.0.0.105:3333/uploads/${point.image}`,
    };

    return res.json({ itens, point: serializedPoint });
  }

  async index(req: Request, res: Response) {
    const { city, uf, itens } = req.query;

    const parseItens = String(itens)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('point_itens', 'points.id', '=', 'point_itens.point_id')
      .whereIn('point_itens.item_id', parseItens)
      .where('points.city', String(city))
      .where('points.uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        imageurl: `http://10.0.0.105:3333/uploads/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }
}

export default PointsController;
