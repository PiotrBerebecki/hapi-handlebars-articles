const bcrypt = require('bcrypt');

bcrypt.hash(process.argv[2], 10, (err, hash) => {
  console.log(hash); // eslint-disable-line no-console
});
