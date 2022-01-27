const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, encrypted) => {
      if (err) return reject(err);
      resolve(encrypted);
    });
  });
};

exports.matchPassword = async (hash, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
};
