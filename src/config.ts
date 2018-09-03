import { ConnectionOptions } from 'typeorm';

const config = {
  typeorm: {
    connection: <ConnectionOptions> {
      type: process.env.DB_DIALECT || 'sqlite',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'db.sqlite',
    },
  },
};

export = config;
