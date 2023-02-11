const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
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
  // TODO: Implement me
};


module.exports = { getUsers };
