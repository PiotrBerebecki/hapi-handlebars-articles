if (process.env.NODE_ENV === 'testing') {
  require('./server.test.js');
}

require('./handlebars.test.js');
