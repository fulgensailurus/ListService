import { List } from '../entities/List';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import httpStatus from 'http-status';

const getLists = async (_: any, reply: FastifyReply<ServerResponse>) => {
  const lists = await List.find();
  reply.send(lists);
};

const getList = async (request: any, reply: FastifyReply<ServerResponse>) => {
  const list = await List.findOne(request.params.id);
  if (!list) {
    return reply.code(httpStatus.NOT_FOUND).send();
  }

  reply.send(list);
};

const createList = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const list = List.create(request.body);

  try {
    await list.save();
    reply
      .code(httpStatus.CREATED)
      .send(list);
  } catch (err) {
    reply
      .code(httpStatus.BAD_REQUEST)
      .send({ error: 'boohoo!' });
  }
};

const editList = async (request: FastifyRequest<IncomingMessage>,
                        reply: FastifyReply<ServerResponse>) => {
  const list = await List.findOne(request.params.id);
  if (!list) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  List.merge(list, request.body);
  await list.save();
  reply
    .code(httpStatus.OK)
    .send(list);
};

const deleteList = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const list = await List.findOne(request.params.id);
  if (!list) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  await List.delete(list);
  reply
    .code(httpStatus.OK)
    .send(list);
};

export = function (fastify: FastifyInstance, _: any, next: any) {
  fastify.get('/', getLists);
  fastify.get('/:id', getList);
  fastify.post('/', createList);
  fastify.put('/:id', editList);
  fastify.delete('/:id', deleteList);

  next();
};
