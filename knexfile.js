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
    seeds: './database.seeds'
  },
};
