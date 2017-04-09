const get = require('./../database/get');


module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    get.stories((dbErr, stories) => {
      if (dbErr) {
        return reply.view('index', {error: 'Database error'});
      }
      reply.view('index', {stories});
    });
  }
};
