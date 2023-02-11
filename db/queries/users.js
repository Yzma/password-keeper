const bcrypt = require('bcryptjs');

const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

/*
Expecting: {
  username,
  email,
  password
}
TODO: Comment and don't return *. Only return the ID
*/
const insertUser = (data) => {
  // BCrypt doesn't support async hasing with promises, so convert it to one.
  return new Promise((resolve, reject) => {
    bcrypt.hash(data.password, 12, (err, hash) => {
      if (err) return reject(err);
      resolve(hash);
    });
  }).then(hash => {
    return db.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *', [data.username, data.email, hash])
      .then(data => data.rows);
  });
};

const getUserByUsername = (username) => {
  return db.query('SELECT * FROM users WHERE users.username = $1;', [username])
    .then(data => {
      return data.rows;
    });
};

const getUsersPasswordsById = (userId) => {
  // TODO: Implement me
};

const getUsersOrganizationsById = (userId) => {
  // TODO: Implement me
};

const getUsersPendingInvitesById = (userId) => {
  return db.query('SELECT * FROM invites WHERE invites.user_id = $1;', [userId])
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getUsers,
  insertUser,
  getUserByUsername,
  getUsersPasswordsById,
  getUsersOrganizationsById,
  getUsersPendingInvitesById
};
