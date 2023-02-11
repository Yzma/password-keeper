
const db = require('../connection');

const getOrganizations = () => {
  return db.query('SELECT * FROM organizations;')
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getOrganizations
};
