const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const cookieAuthModule = require('hapi-auth-cookie');
const contextCredentials = require('hapi-context-credentials');

const routes = require('./routes');
const handlebars = require('./handlebars');


const server = new hapi.Server();


server.connection({
  port: process.env.PORT || 3000
});


server.register([vision, inert, cookieAuthModule, contextCredentials], err => {
  if (err) {
    throw err;
  }

  server.auth.strategy('base', 'cookie', 'optional', {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'hapi-handlebars-articles-app',
    isSecure: false, // set to false to make it work on localhost
    ttl: 24 * 60 * 60 * 1000
  });

  server.route(routes);
  server.views(handlebars);

});


module.exports = server;
