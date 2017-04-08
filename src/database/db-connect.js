const { Pool } = require('pg');
const url = require('url');


const env = require('env2');


if (process.env.NODE_ENV === 'testing') {
  env('config-test.env');
} else {
  env('config.env');
}


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL missing from .env file');
}


const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');


const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.MAX_CONNECTIONS || 10,
  user: username,
  password: password,
  ssl: params.hostname !== 'localhost'
};


module.exports = new Pool(options);
