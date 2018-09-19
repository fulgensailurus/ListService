import koaRouter from 'koa-router';
import { Item } from '../entities/Item';
const router = new koaRouter();

router.get('/', async (ctx) => {
  const items = await Item.find();

  ctx.body = items;
});

router.post('/', async (ctx) => {
  const item = Item.create(ctx.request.body);
  if (item.name === undefined) {
    ctx.status = 400;
    return;
  }

  try {
    await item.save();
    ctx.status = 201;
    ctx.body = item;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'boohoo' };
  }
});

router.put('/:id', async (ctx) => {
  const item = await Item.findOne(ctx.params.id);
  if (!item) {
    ctx.status = 404;
    return;
  }

  Item.merge(item, ctx.request.body);
  await item.save();
  ctx.body = item;
  ctx.status = 200;
});

router.delete('/:id', async (ctx) => {
  const item = await Item.findOne(ctx.params.id);
  if (!item) {
    ctx.status = 404;
    return;
  }

  await Item.delete(item);
  ctx.body = item;
  ctx.status = 200;
});

export = router;
