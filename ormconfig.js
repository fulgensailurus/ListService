module.exports = {
  type: "sqlite",
  database: process.env.DB_NAME,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/entities/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  } 
};
