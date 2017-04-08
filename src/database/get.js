const connect = require('./db-connect');


const get = {};


get.articles = (callback) => {

  const sqlQuery = `
    SELECT u.first_name || ' ' || u.last_name AS author_display_name, u.avatar_url as author_avatar_url,
           a.title, a.body, a.date_posted, a.image_url
      FROM articles AS a
           INNER JOIN users AS u
           ON u.id = a.author_id
    ORDER BY a.id DESC
  `;

  connect.query(sqlQuery, (err, response) => {
    if (err) { return callback(err); }
    callback(null, response.rows);
  });

};


module.exports = get;
