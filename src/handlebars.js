module.exports = {
  engines: {
    hbs: require('handlebars')
  },
  relativeTo: __dirname,
  path: 'views',
  layout: 'default',
  layoutPath: 'views/layouts',
  partialsPath: 'views/partials',
  helpersPath: 'views/helpers',
};
