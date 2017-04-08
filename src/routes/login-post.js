module.exports = {
  method: 'POST',
  path: '/login-post',
  handler: (request, reply) => {
    
    reply.view('index');
  }
};
