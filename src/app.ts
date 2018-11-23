import 'reflect-metadata';
import fastify from 'fastify';
import items from './routes/items';

const app = fastify({
  logger: process.env.NODE_ENV !== 'test' || Boolean(process.env.FORCE_LOGGING),
});

app.register(items, { prefix: '/items' });

export = app;
