import express from 'express';

const app = express();

app.get('/user', (req, res) => {
  res.json({
    ok: 'ta funcionado',
  });
});

app.listen(3333);
