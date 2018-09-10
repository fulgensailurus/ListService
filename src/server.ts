import 'reflect-metadata';
import koa from 'koa';
import koaRouter from 'koa-router';
import dotenv from 'dotenv';
dotenv.config();

import config from './config';
import { createConnection, Connection } from 'typeorm';

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const app = new koa();

// app.use(async () => {
//   createConnection(config.typeorm.connection).then(async (connection: Connection) => {
//     console.log(connection);
//   });
// });

const router = new koaRouter();

router.get('/list', async (ctx) => {
  ctx.body = [
    'milk',
    'bread',
    'eggs',
  ];
});

app.use(router.routes());
app.listen(HTTP_PORT, () => {
  console.log(`HTTP server listening on port ${HTTP_PORT}`);
});
