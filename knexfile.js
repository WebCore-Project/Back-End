// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/vacations.db3'
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: './database/seeds'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
    seeds: './database/seeds'
  },
};
