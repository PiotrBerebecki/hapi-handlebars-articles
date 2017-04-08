const get = require('./../database/get');


module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    get.articles((dbErr, articles) => {
      if (dbErr) {
        return reply('index', {error: 'Database error'});
      }

      reply.view('index', {articles});
    });
  }
};
