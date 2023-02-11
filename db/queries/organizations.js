
const db = require('../connection');

const getOrganizations = () => {
  return db.query('SELECT * FROM organizations;')
    .then(data => {
      return data.rows;
    });
};

// TODO: We have to do multiple queries here:
// 1: Insert into the organizations tables
// 2: Insert into the users_organizations table
// Since we have to insert multiple times, implement 'COMMIT' so we can rollback the table if something goes wrong
const insertOrganization = (ownerId, name) => {
  return db.query('INSERT INTO organizations(owner_id, org_name) VALUES($1, $2) RETURNING *', [ownerId, name])
    .then(data => {
      return data.rows;
    });
};

// TODO: Better error handling? Since the organization or user might not exist
// This also needs to be done with SQL commiting since we need to execute multiple queries when adding a user to an organization.
// 1: Insert the user into the organization
// 2: Remove the invite row
const addUser = (userId, organizationId) => {
  return db.query('INSERT INTO users_organizations(user_id, organization_id) VALUES($1, $2) RETURNING *', [userId, organizationId])
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

// TODO: Test this, this was implemented without testing with seed data
const getOrganizationsUsersById = (organizationId) => {
  return db.query(`SELECT users.id, users.username, users.email
    FROM users
    JOIN users_organizations ON users_organizations.user_id = users.id
    JOIN organizations ON organizations.id = users_organizations.organization_id
    WHERE organizations.id = $1;`, [organizationId])
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


module.exports = {
  getOrganizations,
  insertOrganization,
  addUser,
  getOrganizationByName,
  getOrganizationsPasswordsById,
  getOrganizationsUsersById,
  getOrganizationsPendingInvitesById
};
