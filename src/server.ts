import 'reflect-metadata';
import koa from 'koa';
import koaRouter from 'koa-router';
import dotenv from 'dotenv';

dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const app = new koa();
const router = new koaRouter();

router.get('/list', async (ctx) => {
  ctx.body = [
    'milk',
    'bread',
    'eggs',
  ];
});

app.use(router.routes());
app.listen(HTTP_PORT);
