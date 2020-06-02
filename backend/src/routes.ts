import express from 'express';
import knex from './database/conection';


const routes = express.Router();

routes.get('/itens', async (req, res) => {
const itens =   await knex('itens').select('*')
const serializedItens = itens.map(item=>{
  return {
    title: item.title,
    imageurl:`http://localhost:3333/uploads/${item.image}`
  }
});
 return res.json(serializedItens);
});

export default routes;
