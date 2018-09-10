module.exports = {
  type: "sqlite",
  database: process.env.DB_NAME,
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities"
  } 
};
