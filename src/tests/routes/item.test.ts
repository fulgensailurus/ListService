import dotenv from 'dotenv';

import { createConnection, Connection } from 'typeorm';
import app from '../../app';
import supertest from 'supertest';
import httpStatus from 'http-status';

beforeAll(() => {
  dotenv.config({ path: '.env.test' });
});

describe('item routes', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await app.ready();
  });

  afterAll(async () => {
    await connection.close();
    await app.close(() => {});
  });

  describe('GET items', () => {
    it('Should return a list of items', async () => {
      const { body } = await supertest(app.server)
        .get('/items')
        .expect(httpStatus.OK);

      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(0);
    });

    it('Should return 1 item after insertion', async () => {
      await supertest(app.server)
        .post('/items')
        .send({ name: 'banana' })
        .expect(httpStatus.CREATED);

      const { body } = await supertest(app.server)
        .get('/items')
        .expect(httpStatus.OK);

      expect(body).toHaveLength(1);
      expect(body[0]).toHaveProperty('name', 'banana');
    });
  });
});
