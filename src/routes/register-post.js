const post = require('./../database/post');


module.exports = {
  method: 'POST',
  path: '/register-post',
  handler: (request, reply) => {
    const newUser = {
      username: request.payload.username,
      first_name: request.payload.first_name,
      last_name: request.payload.last_name,
      password: request.payload.password,
      avatar_url: request.payload.avatar_url,
    };

    post.newUser(newUser, (err, res) => {
      if (err) {
        return reply.view('index', {error: err});
      }

      request.cookieAuth.set({
        user_username: newUser.username,
        user_first_name: newUser.username,
        user_avatar_url: newUser.avatar_url,
      });
      reply.redirect('/');
    });
  }
};
