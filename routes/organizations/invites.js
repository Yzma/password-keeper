const express = require('express');
const router  = express.Router();

const organizationHelper = require('../../db/queries/organizations');

router.get("/:orgId/invites", (req, res) => {
  const orgId = req.params.orgId;
  
  return organizationHelper.getOrganizationsPendingInvitesById(orgId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.post('/:orgId/invites', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/invites');
});

router.delete('/:orgId/invites', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/invites');
});

module.exports = router;
