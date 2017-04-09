module.exports = {
  method: 'GET',
  path: '/new-story',
  handler: (request, reply) => {
    if (!request.auth.credentials) {
      return reply.view('index', {authPrompt: true});
    }
    reply.view('new-story');
  }
};
