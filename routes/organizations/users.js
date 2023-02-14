const express = require('express');
const router  = express.Router();

const organizationHelper = require('../../db/queries/organizations');

router.get("/:orgId/users", (req, res) => {
  const orgId = req.params.orgId;
  return organizationHelper.getOrganizationsUsersById(orgId)
    .then(rows => res.json(rows))
    .catch(err => res.json({ error: err}));
});

router.delete('/:orgId/users', (req, res) => {
  const orgId = req.params.orgId;
  const { userId } = req.body;

  return organizationHelper.removeUser(userId, orgId)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
