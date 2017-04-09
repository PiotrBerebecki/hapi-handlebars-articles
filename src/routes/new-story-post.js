const post = require('./../database/post');


module.exports = {
  method: 'post',
  path: '/new-story',
  config: {auth: 'base'},
  handler: (request, reply) => {

    const newStory = Object.assign({}, request.payload,
      { username: request.auth.credentials.user_username,
        date_posted: Date.now() }
    );

    post.story(newStory, (dbErr, dbRes) => {
      if (dbErr) {
        return reply.view('new-story', {error: dbErr});
      }
      reply.redirect('/');
    });

  }
};
