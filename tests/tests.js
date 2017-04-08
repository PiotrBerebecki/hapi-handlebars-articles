const tape = require('tape');
// const server = require('./../src/server');


tape('1', (t) => {
  t.ok(1);
  t.end();
});


// tape('home route - check if the database results are displayed', (t) => {
//   const options = {
//     url: '/',
//     method: 'GET',
//   };
//
//   server.inject(options, (res) => {
//     console.log('===== res.payload', res.payload);
//     t.ok(res.payload.indexOf('LOCAL') !== -1, 'should contain db response');
//     t.end();
//   });
// });
