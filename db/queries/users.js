const bcrypt = require('bcryptjs');

const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// TODO: Don't use. This will be removed later on. For now it's only used in the /auth/me route to get debug info.
const _getMyInfo = (userId) => {
  return db.query('SELECT * FROM users WHERE users.id = $1;', [userId])
    .then(data => {
      return data.rows;
    });
};

const getUserById = (userId) => {
  return db.query('SELECT id, email FROM users WHERE users.id = $1;', [userId])
    .then(data => {
      return data.rows;
    });
};

/*
Expecting: {
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
    return db.query('INSERT INTO users(email, password) VALUES($1, $2) RETURNING *', [data.email, hash])
      .then(data => data.rows);
  });
};

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE users.email = $1;', [email])
    .then(data => {
      return data.rows;
    });
};

// TODO: Come back to this later on once tags are implemented.
// We need to JOIN the table to actually get the tags names instead of just their IDs.
const getUsersPasswordsById = (userId) => {
  return db.query(`SELECT *
    FROM user_passwords
    WHERE user_passwords.user_id = $1;`, [userId])
    .then(data => {
      return data.rows;
    });
};

// TODO: Test this, this was implemented without testing with seed data
const getUsersOrganizationsById = (userId) => {
  return db.query(`SELECT organizations.org_name
    FROM organizations
    JOIN users_organizations ON users_organizations.organization_id = organizations.id
    JOIN users ON users.id = users_organizations.user_id
    WHERE users.id = $1;`, [userId])
    .then(data => {
      return data.rows;
    });
};

const getUsersPendingInvitesById = (userId) => {
  return db.query('SELECT * FROM invites WHERE invites.user_id = $1;', [userId])
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getUsers,
  _getMyInfo,
  getUserById,
  insertUser,
  getUserByEmail,
  getUsersPasswordsById,
  getUsersOrganizationsById,
  getUsersPendingInvitesById
};
