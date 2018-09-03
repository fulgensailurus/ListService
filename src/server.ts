import koa from 'koa';
import koaRouter from 'koa-router';

const HTTP_PORT = 3000;
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
