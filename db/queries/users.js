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
  // return db.query(`SELECT organization_passwords.*, organization_password_tags.name AS tag_name
  //   FROM organization_passwords
  //   JOIN organization_password_tags ON organization_passwords.organization_id = organization_password_tags.organization_id
  //   WHERE organization_passwords.organization_id = $1;`, [organizationId])

  return db.query(`SELECT user_passwords.*, user_password_tags.name AS tag_name
  FROM user_passwords
  LEFT JOIN user_password_tags ON user_password_tags.id = user_passwords.user_id
  WHERE user_passwords.user_id = $1;`, [userId])
    .then(data => {
      return data.rows;
    });
};

// TODO: These functions are duplicate, move them into a seperate function and call the same one for both users and organizations
const insertPassword = (userId, websiteName, username, password, tagId) => {
  return db.query(`INSERT INTO user_passwords(website_name, username, password, userId, tag_id) VALUES($1, $2, $3, $4, $5) RETURNING *;`, [websiteName, username, password, userId, tagId])
    .then(data => {
      return data.rows;
    });
};

const deletePassword = (userId, passwordId) => {
  return db.query(`DELETE FROM user_passwords WHERE userId = $1 AND id = $2 RETURNING *;`, [userId, passwordId])
    .then(data => {
      return data.rows;
    });
};

const updatePassword = (userId, passwordId, websiteName, username, password, tagId) => {
  return db.query(`UPDATE user_passwords SET
      website_name = COALESCE(NULLIF($3, E''), website_name),
      username = COALESCE(NULLIF($4, E''), username),
      password = COALESCE(NULLIF($5, E''), password),
      tag_id = COALESCE(CAST(NULLIF($6, E'') AS INTEGER), tag_id)
    WHERE userId = $1 AND id = $2 RETURNING *;`
  , [userId, passwordId, websiteName, username, password, tagId])
    .then(data => {
      return data.rows;
    });
};


// TODO: Test this, this was implemented without testing with seed data
const getUsersOrganizationsById = (userId) => {
  return db.query(`SELECT organizations.org_name
    FROM organizations
    LEFT JOIN users_organizations ON users_organizations.organization_id = organizations.id
    LEFT JOIN users ON users.id = users_organizations.user_id
    WHERE organizations.owner_id = $1;`, [userId])
    .then(data => {
      return data.rows;
    });
};

const deleteInvite = (userId, inviteId) => {
  return db.query('DELETE FROM invites WHERE invites.user_id = $1;', [userId])
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

const getAllUserTags = (userId) => {
  return db.query('SELECT * FROM user_password_tags WHERE user_id = $1', [userId])
    .then(data => {
      return data.rows;
    });
};

const createUserTag = (userId, name) => {
  return db.query('INSERT INTO user_password_tags(user_id, name) VALUES($1, $2) RETURNING *', [userId, name])
    .then(data => {
      return data.rows;
    });
};

const deleteUserTagByName = (userId, name) => {
  return db.query('DELETE FROM user_password_tags WHERE user_id = $1 AND name = $2 RETURNING *', [userId, name])
    .then(data => {
      return data.rows;
    });
};

const deleteUserTagById = (userId, tagId) => {
  return db.query('DELETE FROM user_password_tags WHERE user_id = $1 AND id = $2 RETURNING *', [userId, tagId])
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
  insertPassword,
  deletePassword,
  updatePassword,
  getUsersOrganizationsById,
  getUsersPendingInvitesById,
  getAllUserTags,
  createUserTag,
  deleteUserTagById,
  deleteUserTagByName,
  deleteInvite
};
