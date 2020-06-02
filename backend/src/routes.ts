import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ ok: 'tudo funcionando' });
});

export default routes;
