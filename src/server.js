const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');

const routes = require('./routes');
const handlebars = require('./handlebars');


const server = new hapi.Server();


server.connection({
  port: process.env.PORT || 3000
});


server.register([vision, inert], err => {
  if (err) {
    throw err;
  }

  server.route(routes);
  server.views(handlebars);

});


module.exports = server;
