const connect = require('./db-connect');


const get = {};


get.stories = (callback) => {

  const sqlQuery = `
    SELECT u.first_name || ' ' || u.last_name AS author_display_name, u.avatar_url as author_avatar_url,
           s.title, s.body, s.date_posted, s.image_url
      FROM stories AS s
           INNER JOIN users AS u
           ON u.id = s.author_id
    ORDER BY s.id DESC;
  `;

  console.log('===== process.env.DATABASE_URL in get', process.env.DATABASE_URL);
  console.log('===== process.env.NODE_ENV in get', process.env.NODE_ENV);

  connect.query(sqlQuery, (err, response) => {
    if (err) { return callback(err); }
    callback(null, response.rows);
  });

};


module.exports = get;
