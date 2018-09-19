import 'reflect-metadata';
import { createConnection } from 'typeorm';
import koa from 'koa';
import koaRouter from 'koa-router';
import dotenv from 'dotenv';
import items from './routes/items';
import koaBodyparser from 'koa-bodyparser';
dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const app = new koa();

const router = new koaRouter();

app.use(koaBodyparser());
router.use('/items', items.routes(), items.allowedMethods());
app.use(router.routes());

createConnection().then(async (connection) => {
  app.listen(HTTP_PORT, () => {
    console.log(`HTTP server listening on port ${HTTP_PORT}`);
  });
});
