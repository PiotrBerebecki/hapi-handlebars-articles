const connect = require('./db-connect');


const authUser = (username, callback) => {
  const sqlQuery = `
    SELECT u.first_name AS user_display_name, u.password, u.avatar_url AS user_avatar_url
      FROM users as u
     WHERE u.username = $1;
  `;

  connect.query(sqlQuery, [username], (dbErr, dbResponse) => {
    if (dbErr || !dbResponse.rows[0]) {
      return callback(dbErr ? 'Database error, sorry' : 'User not found');
    }

    callback(null, dbResponse.rows[0]);
  });
};


module.exports = authUser;
