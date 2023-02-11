
const db = require('../connection');

const getOrganizations = () => {
  return db.query('SELECT * FROM organizations;')
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
  getOrganizations
};
