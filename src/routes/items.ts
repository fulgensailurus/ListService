import koaRouter from 'koa-router';
const router = new koaRouter();

router.get('/list', async (ctx) => {
  ctx.body = [
    'Cheese',
    'Salmon',
    'Fristi',
  ];
});

export = router;
