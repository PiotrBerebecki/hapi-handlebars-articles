// const server = require('./../src/server');
const tape = require('tape');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// register helper
require('./../src/views/helpers/format-date');


tape('hanbdlebars formatDate helper', (t) => {

  const partial = fs.readFileSync(path.join(__dirname, './../src/views/partials/main.hbs'), 'utf8');
  const template = handlebars.compile(partial);

  const context = {
    articles: [
      {date_posted: '1'},
    ]
  };

  const html = template(context);
  t.ok(html.indexOf('Jan 1, 1970') !== -1, 'should return formatted date');
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
