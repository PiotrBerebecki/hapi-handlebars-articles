const connect = require('./db-connect');


const get = {};



get.articles = (callback) => {

  const sqlQuery = `
    SELECT * FROM articles
  `;

  connect.query(sqlQuery, (err, response) => {
    if (err) { return callback(err); }
    callback(null, response.rows);
  });

};



module.exports = get;
