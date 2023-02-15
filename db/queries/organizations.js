
const db = require('../connection');
const { getUserByEmail } = require('./users');

const getOrganizations = () => {
  return db.query('SELECT * FROM organizations;')
    .then(data => {
      return data.rows;
    });
};

const renameOrganization = (organizationId, newName) => {
  return db.query('UPDATE organizations SET org_name = $1 WHERE id = $2 RETURNING *;', [newName, organizationId])
    .then(data => {
      return data.rows;
    });
};

// TODO: We have to do multiple queries here:
// 1: Insert into the organizations tables
// 2: Insert into the users_organizations table
// TODO: Return something other than the commands COMMIT or ROLLBACK data
const insertOrganization = (ownerId, name) => {
  return db.query('BEGIN')
    .then(result => db.query('INSERT INTO organizations(owner_id, org_name) VALUES($1, $2) RETURNING *', [ownerId, name])
      .then(result => {
        return db.query('INSERT INTO users_organizations(user_id, organization_id) VALUES($1, $2) RETURNING *', [ownerId, result.rows[0].id]);
      })).then(rows => db.query('COMMIT'))
    .catch(err => {
      console.error('insertOrganization error: ', err);
      return db.query('ROLLBACK');
    });
};

// TODO: Better error handling? Since the organization or user might not exist
// This also needs to be done with SQL commiting since we need to execute multiple queries when adding a user to an organization.
// 1: Insert the user into the organization
// 2: Remove the invite row
// TODO: Return something other than the commands COMMIT or ROLLBACK data
const addUser = (userId, organizationId) => {
  return db.query('BEGIN')
    .then(result => db.query('INSERT INTO users_organizations(user_id, organization_id) VALUES($1, $2) RETURNING *', [userId, organizationId])
      .then(result => {
        return db.query('DELETE FROM invites WHERE user_id = $1 AND organization_id = $2', [userId, organizationId]);
      })).then(rows => db.query('COMMIT'))
    .catch(err => {
      console.error('addUser error: ', err);
      return db.query('ROLLBACK');
    });
};

const removeUser = (userId, organizationId) => {
  return db.query('DELETE FROM users_organizations WHERE organization_id = $1 AND user_id = $2 RETURNING *;', [organizationId, userId])
    .then(data => {
      return data.rows;
    });
};

const getOrganizationByName = (name) => {
  return db.query('SELECT * FROM organizations WHERE organizations.org_name = $1;', [name])
    .then(data => {
      return data.rows;
    });
};

const getOrganizationById = (organizationId) => {
  return db.query('SELECT * FROM organizations WHERE organizations.id = $1;', [organizationId])
    .then(data => {
      return data.rows;
    });
};


// TODO: Come back to this later on once tags are implemented.
// We need to JOIN the table to actually get the tags names instead of just their IDs.
// Returns the Organizations passwords by the Organization ID
const getOrganizationsPasswordsById = (organizationId) => {
  return db.query(`SELECT *
    FROM organization_passwords
    WHERE organization_passwords.organization_id = $1;`, [organizationId])
    .then(data => {
      return data.rows;
    });
};

const insertPassword = (organizationId, websiteName, username, password, tagId) => {
  return db.query(`INSERT INTO organization_passwords(website_name, username, password, organization_id, tag_id) VALUES($1, $2, $3, $4, $5) RETURNING *;`, [websiteName, username, password, organizationId, tagId])
    .then(data => {
      return data.rows;
    });
};

const deletePassword = (organizationId, passwordId) => {
  return db.query(`DELETE FROM organization_passwords WHERE organization_id = $1 AND id = $2 RETURNING *;`, [organizationId, passwordId])
    .then(data => {
      return data.rows;
    });
};

const updatePassword = (orgId, passwordId, websiteName, username, password, tagId) => {
  return db.query(`UPDATE organization_passwords SET
      website_name = COALESCE(NULLIF($3, E''), website_name),
      username = COALESCE(NULLIF($4, E''), username),
      password = COALESCE(NULLIF($5, E''), password),
      tag_id = COALESCE(CAST(NULLIF($6, E'') AS INTEGER), tag_id)
    WHERE organization_id = $1 AND id = $2 RETURNING *;`
  , [orgId, passwordId, websiteName, username, password, tagId])
    .then(data => {
      return data.rows;
    });
};

// TODO: Test this, this was implemented without testing with seed data
const getOrganizationsUsersById = (organizationId) => {
  return db.query(`SELECT users.id, users.email
    FROM users
    JOIN users_organizations ON users_organizations.user_id = users.id
    JOIN organizations ON organizations.id = users_organizations.organization_id
    WHERE organizations.id = $1;`, [organizationId])
    .then(data => {
      return data.rows;
    });
};

const getAllOrganizationTags = (organizationId) => {
  return db.query('SELECT * FROM organization_password_tags WHERE organization_id = $1', [organizationId])
    .then(data => {
      return data.rows;
    });
};

const createOrganizationTag = (organizationId, name) => {
  return db.query('INSERT INTO organization_password_tags(organization_id, name) VALUES($1, $2) RETURNING *', [organizationId, name])
    .then(data => {
      return data.rows;
    });
};

const deleteOrganizationTagByName = (organizationId, name) => {
  return db.query('DELETE FROM organization_password_tags WHERE organization_id = $1 AND name = $2 RETURNING *', [organizationId, name])
    .then(data => {
      return data.rows;
    });
};

const deleteOrganizationTagById = (organizationId, tagId) => {
  return db.query('DELETE FROM organization_password_tags WHERE organization_id = $1 AND id = $2 RETURNING *', [organizationId, tagId])
    .then(data => {
      return data.rows;
    });
};

const inviteUserByEmail = async(organizationId, email) => {
  const user = await getUserByEmail(email);
  if (user.length === 0) {
    throw new Error('User not found in database');
  }

  const userInOrg = await db.query('SELECT id FROM users_organizations WHERE user_id = $1 AND organization_id = $2', [user[0].id, organizationId]);
  if (userInOrg.rowCount > 0) {
    throw new Error('User already in org');
  }

  return db.query('INSERT INTO invites(user_id, organization_id) VALUES($1, $2) RETURNING *', [user[0].id, organizationId])
    .then(res => res.rows[0])
    .catch(err => {
      console.log(err);
      
      if (err.code === '23505') {
        throw new Error('User already invited');
      }

      throw new Error('Invalid org');
      
    });
};

const inviteUser = (organizationId, userId) => {
  return db.query('INSERT INTO invites(user_id, organizationId) VALUES($1, $2) RETURNING *', [userId, organizationId])
    .then(data => {
      return data.rows;
    });
};

const deleteInvite = (organizationId, inviteId) => {
  return db.query('DELETE FROM invites WHERE organization_id = $1 AND invites.id = $2 RETURNING *', [organizationId, inviteId])
    .then(data => {
      return data.rows;
    });
};

const getOrganizationsPendingInvitesById = (organizationId) => {
  return db.query('SELECT * FROM invites WHERE invites.organization_id = $1;', [organizationId])
    .then(data => {
      return data.rows;
    });
};

const getOrganizationsPasswordsFrontend = (organizationId) => {
  return db.query('SELECT * FROM invites WHERE invites.organization_id = $1;', [organizationId])
    .then(data => {
      return data.rows;
    });
};


module.exports = {
  getOrganizations,
  renameOrganization,
  insertOrganization,
  addUser,
  removeUser,
  getOrganizationByName,
  getOrganizationById,
  getOrganizationsPasswordsById,
  insertPassword,
  deletePassword,
  updatePassword,
  getAllOrganizationTags,
  createOrganizationTag,
  deleteOrganizationTagByName,
  deleteOrganizationTagById,
  getOrganizationsUsersById,
  inviteUserByEmail,
  inviteUser,
  deleteInvite,
  getOrganizationsPendingInvitesById
};
