import { Item } from '../entities/Item';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import httpStatus from 'http-status';

const getItems = async (_: any, reply: FastifyReply<ServerResponse>) => {
  const items = await Item.find();
  reply.send(items);
};

const getItem = async (request: any, reply: FastifyReply<ServerResponse>) => {
  const item = await Item.findOne(request.params.id);
  if (!item) {
    return reply.code(httpStatus.NOT_FOUND).send();
  }

  reply.send(item);
};

const createItem = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const item = Item.create(request.body);
  if (item.name === undefined) {
    return reply
      .code(httpStatus.BAD_REQUEST)
      .send();
  }

  try {
    await item.save();
    reply
      .code(httpStatus.CREATED)
      .send(item);
  } catch (err) {
    reply
      .code(httpStatus.BAD_REQUEST)
      .send({ error: 'boohoo!' });
  }
};

const editItem = async (request: FastifyRequest<IncomingMessage>,
                        reply: FastifyReply<ServerResponse>) => {
  const item = await Item.findOne(request.params.id);
  if (!item) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  Item.merge(item, request.body);
  await item.save();
  reply
    .code(httpStatus.OK)
    .send(item);
};

const deleteItem = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const item = await Item.findOne(request.params.id);
  if (!item) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  await Item.delete(item);
  reply
    .code(httpStatus.OK)
    .send(item);
};

export = function (fastify: FastifyInstance, _: any, next: any) {
  fastify.get('/', getItems);
  fastify.get('/:id', getItem);
  fastify.post('/', createItem);
  fastify.put('/:id', editItem);
  fastify.delete('/:id', deleteItem);

  next();
};
