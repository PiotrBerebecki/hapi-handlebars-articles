const bcrypt = require('bcrypt');


module.exports = (str, callback) => {
  bcrypt.hash(str, 10, callback);
};
