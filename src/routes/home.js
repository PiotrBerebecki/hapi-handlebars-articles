const get = require('./../database/get');


module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    get.articles((dbErr, articles) => {
      // console.log('===== request.auth.credentials', request.auth.credentials);
      if (dbErr) {
        return reply.view('index', {error: 'Database error'});
      }
      reply.view('index', {articles});
    });
  }
};
