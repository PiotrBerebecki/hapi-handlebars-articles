const tape = require('tape');
const server = require('./../src/server');


tape('server - home route - check if the database results are displayed', (t) => {
  const options = {
    url: '/',
    method: 'GET',
  };

  server.inject(options, (res) => {
    console.log('===== process.env.NODE_ENV', process.env.NODE_ENV);
    console.log('===== res.payload shoud have I love to create', res.payload);
    t.ok(res.payload.indexOf('I love to create') !== -1, 'should contain db response');
    t.end();
  });
});
