const authUser = require('./../database/auth-user');
const bcrypt = require('bcrypt');

module.exports = {
  method: 'POST',
  path: '/login-post',
  handler: (request, reply) => {
    const { username, password } = request.payload;

    authUser(username, (authErr, dbUser) => {
      if (authErr) {
        return reply.view('index', {error: authErr});
      }

      bcrypt.compare(password, dbUser.password, (compareErr, isAuthenticated) => {
        if (compareErr) {
          return reply.view('index', {error: 'Sorry, we cannot verify your account at the moment'});
        }

        if (isAuthenticated) {
          request.cookieAuth.set({user_first_name: dbUser.user_first_name, user_avatar_url: dbUser.user_avatar_url});
          return reply.redirect('/');
        } else {
          return reply.view('index', {error: 'Sorry, the password did not match'});
        }

      });
    });
  }
};
