
const db = require('../db/connection');

const ensureOrganizationMember = () => {

  return (req, res, next) => {
    const orgId = req.params.orgId;
    const userId = req.session.userId;

    console.log('orgId', orgId);
    console.log('userId', userId);

    return db.query(`SELECT users.id AS userId, organizations.id AS orgId
    FROM users
    JOIN users_organizations ON users_organizations.user_id = users.id
    JOIN organizations ON organizations.id = users_organizations.organization_id
    WHERE organizations.id = $1 AND users.id = $2;`, [orgId, userId])

      .then(data => {
        console.log('DATA: ', data.rows);
        if (data.rows.length > 0) {
          console.log('hello?');
          const row = data.rows[0];
          console.log('ROW: ', row);
          req.user = row.userid;
          req.org = row.orgid;
          return next();
        }
        
        return res.json({ error: "You do not have permission to perform this action" });
      }).catch(err => {
        console.log(err);
        return res.json({ error: err });
      });
  };
};

module.exports = ensureOrganizationMember;