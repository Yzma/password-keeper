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
  const orgId = req.params.orgId;
  const { userId } = req.body;

  return organizationHelper.inviteUser(orgId, userId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.delete('/:orgId/invites', (req, res) => {
  const orgId = req.params.orgId;
  const { inviteId } = req.body;

  return organizationHelper.deleteInvite(orgId, inviteId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

module.exports = router;
