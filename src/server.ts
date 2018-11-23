import dotenv from 'dotenv';
import app from './app';
import { createConnection } from 'typeorm';
dotenv.config();

const HTTP_PORT = parseInt(process.env.HTTP_PORT || '3000', 10);

(async () => {
  await createConnection();
  try {
    await app.listen(HTTP_PORT, '0.0.0.0');
    console.log(`HTTP server listening on port ${HTTP_PORT}`);
  } catch (err) {
    console.error(err);
  }
})();
