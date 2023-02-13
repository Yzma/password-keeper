const express = require('express');
const router  = express.Router();

const organizationHelper = require('../../db/queries/organizations');

router.get("/:orgId/passwords", (req, res) => {
  const orgId = req.params.orgId;
  const { userId } = req.body;

  return organizationHelper.getOrganizationsPasswordsById(orgId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.post('/:orgId/passwords', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/passwords');
});

router.delete('/:orgId/passwords', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/passwords');
});

router.patch('/:orgId/passwords', (req, res) => {
  return res.send('Should UPDATE /organizations/{org_id}/passwords');
});

module.exports = router;
