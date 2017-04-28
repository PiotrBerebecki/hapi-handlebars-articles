const connect = require('./db-connect');
const hashPassword = require('./../helper-functions/hash-password');


const post = {};


post.story = (newStory, callback) => {
  const sqlQuery = `
    INSERT INTO stories (author_id, title, body, image_url, date_posted)
         VALUES ((SELECT users.id FROM users WHERE users.username = $1), $2, $3, $4, $5)
      RETURNING id;
  `;

  connect.query(sqlQuery,
    [newStory.username, newStory.title, newStory.body, newStory.image_url, newStory.date_posted],
    (err, response) => {
      if (err) { return callback('Sorry, but we cannot connect to the database at the moment'); }
      callback(null, response);
    });
};




post.newUser = ({username, first_name, last_name, avatar_url, password}, callback) => {
  const sqlQuery1 = `
    SELECT username
      FROM users
     WHERE username = $1;
  `;

  connect.query(sqlQuery1, [username], (err, response) => {
    if (err) { return callback('Databasd error'); }
    if (response.rows[0]) { return callback('Sorry, this username is not available'); }

    hashPassword(password, (err, hash) => {
      if (err) { return callback('Sorry, but we have not been able to set up your account'); }

      const sqlQuery2 = `
        INSERT INTO users (username, first_name, last_name, avatar_url, password)
             VALUES ($1, $2, $3, $4, $5);
      `;

      connect.query(sqlQuery2, [username, first_name, last_name, avatar_url, hash], (err) => {
        if (err) { return callback('Database error during saving details'); }
        callback(null, 'New account has been successfully created');
      });
    });
  });
};


module.exports = post;
