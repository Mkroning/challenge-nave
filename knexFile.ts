const {
  USER,
  HOST,
  PASSWORD,
  DATABASE
} = require('./src/Config/envConfig');

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    },
    migrations: {
      directory: './src/Database/migrations',
    },
    useNullAsDefault: true,
  },
};
