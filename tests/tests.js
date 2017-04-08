const tape = require('tape');

const server = require('./../src/server');


tape('1', (t) => {
  t.ok(1);
  t.end();
});


tape('check the route with invalid url', (t) => {
  const options = {
    url: '/',
    method: 'GET',
  };


  server.inject(options, (res) => {
    console.log('res', res.payload);
    t.end();
  });
});
