import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import items from './routes/items';
import fastify from 'fastify';
dotenv.config();

const HTTP_PORT = parseInt(process.env.HTTP_PORT || '3000', 10);
const app = fastify({
  logger: true,
});

app.register(items, { prefix: '/items' });

createConnection().then(async (connection) => {
  try {
    await app.listen(HTTP_PORT);
    console.log(`HTTP server listening on port ${HTTP_PORT}`);
  } catch (err) {
    console.error(err);
  }
});
