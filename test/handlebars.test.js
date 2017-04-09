const tape = require('tape');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// register handlebars helper
require('./../src/views/helpers/format-date');


tape('handlebars - formatDate helper', (t) => {
  const partial = fs.readFileSync(path.join(__dirname, './../src/views/partials/home-main.hbs'), 'utf8');
  const template = handlebars.compile(partial);

  const context = {
    stories: [
      {date_posted: '1'},
    ]
  };

  const html = template(context);
  t.ok(html.indexOf('Jan 1, 1970') !== -1, 'should render formatted date');
  t.end();
});


tape('handlebars - render display name of authors of all stories', (t) => {
  const partial = fs.readFileSync(path.join(__dirname, './../src/views/partials/home-main.hbs'), 'utf8');
  const template = handlebars.compile(partial);

  const context = {
    stories: [
      {author_display_name: 'Grey Kitty'},
      {author_display_name: 'Orange Cat'},
    ]
  };

  const html = template(context);
  t.ok(html.indexOf('Grey Kitty') !== -1, `should render ${context.stories[0].author_display_name}`);
  t.ok(html.indexOf('Orange Cat') !== -1, `should render ${context.stories[1].author_display_name}`);
  t.end();
});
