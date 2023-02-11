
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

const getOrganizationByName = (name) => {
  return db.query('SELECT * FROM organizations WHERE organizations.org_name = $1;', [name])
    .then(data => {
      return data.rows;
    });
};


module.exports = {
  getOrganizations,
  getOrganizationByName
};
