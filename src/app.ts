import 'reflect-metadata';
import fastify from 'fastify';
import items from './routes/items';
import lists from './routes/lists';
import purchases from './routes/purchases';

const app = fastify({
  logger: process.env.NODE_ENV !== 'test' || Boolean(process.env.FORCE_LOGGING),
});

app.register(items, { prefix: '/items' });
app.register(lists, { prefix: '/lists' });
app.register(purchases, { prefix: '/purchases' });

export = app;
