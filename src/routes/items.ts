import { Item } from '../entities/Item';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

const getItems = async (_: any, reply: FastifyReply<ServerResponse>) => {
  const items = await Item.find();
  reply.send(items);
};

const createItem = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const item = Item.create(request.body);
  if (item.name === undefined) {
    reply
      .code(400)
      .send();
    return;
  }

  try {
    await item.save();
    reply
      .code(201)
      .send(item);
  } catch (err) {
    reply
      .code(400)
      .send({ error: 'boohoo!' });
  }
};

const editItem = async (request: FastifyRequest<IncomingMessage>,
                        reply: FastifyReply<ServerResponse>) => {
  const item = await Item.findOne(request.params.id);
  if (!item) {
    reply
      .code(404)
      .send();
    return;
  }

  Item.merge(item, request.body);
  await item.save();
  reply
    .code(200)
    .send(item);
};

const deleteItem = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const item = await Item.findOne(request.params.id);
  if (!item) {
    reply
      .code(404)
      .send();
    return;
  }

  await Item.delete(item);
  reply
    .code(200)
    .send(item);
};

export = function (fastify: FastifyInstance, _: any, next: any) {
  fastify.get('/', getItems);
  fastify.post('/', createItem);
  fastify.put('/:id', editItem);
  fastify.delete('/:id', deleteItem);

  next();
};
