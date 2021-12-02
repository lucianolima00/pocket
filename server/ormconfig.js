module.exports = {
  "type": process.env.TYPEORM_CONNECTION,
  "host": process.env.TYPEORM_HOST,
  "port": process.env.TYPEORM_PORT,
  "username": process.env.TYPEORM_USERNAME,
  "password": process.env.TYPEORM_PASSWORD,
  "database": process.env.TYPEORM_DATABASE,
  "entities": [process.env.TYPEORM_ENTITIES],
  "subscribers": [process.env.TYPEORM_SUBSCRIBERS],
  "migrations": [process.env.TYPEORM_MIGRATIONS],
  "cli": {
    "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR,
    "entitiesDir": process.env.TYPEORM_ENTITIES_DIR,
    "subscribersDir": process.env.TYPEORM_SUBSCRIBERS_DIR,
  }
}