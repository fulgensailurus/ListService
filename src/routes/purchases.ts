import { Purchase } from '../entities/Purchase';
import { Item } from '../entities/Item';
import { List } from '../entities/List';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import httpStatus from 'http-status';

const getPurchases = async (_: any, reply: FastifyReply<ServerResponse>) => {
  const purchases = await Purchase.find();
  reply.send(purchases);
};

const getPurchase = async (request: any, reply: FastifyReply<ServerResponse>) => {
  const purchase = await Purchase.findOne(request.params.id);
  console.log(purchase);
  if (!purchase) {
    return reply.code(httpStatus.NOT_FOUND).send();
  }

  reply.send(purchase);
};

const createPurchase = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const purchase = Purchase.create(request.body);

  try {
    await purchase.save();
    reply
      .code(httpStatus.CREATED)
      .send(purchase);
  } catch (err) {
    reply
      .code(httpStatus.BAD_REQUEST)
      .send({ error: err });
  }
};

const editPurchase = async (request: FastifyRequest<IncomingMessage>,
                        reply: FastifyReply<ServerResponse>) => {
  const purchase = await Purchase.findOne(request.params.id);
  if (!purchase) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  Purchase.merge(purchase, request.body);
  await purchase.save();
  reply
    .code(httpStatus.OK)
    .send(purchase);
};

const deletePurchase = async (request: FastifyRequest<IncomingMessage>,
                          reply: FastifyReply<ServerResponse>) => {
  const purchase = await Purchase.findOne(request.params.id);
  if (!purchase) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  await Purchase.delete(purchase);
  reply
    .code(httpStatus.OK)
    .send(purchase);
};

export = function (fastify: FastifyInstance, _: any, next: any) {
  fastify.get('/', getPurchases);
  fastify.get('/:id', getPurchase);
  fastify.post('/', createPurchase);
  fastify.put('/:id', editPurchase);
  fastify.delete('/:id', deletePurchase);

  next();
};
