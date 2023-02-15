const express = require('express');
const router  = express.Router();

const ensureOrganizationMember = require('../../lib/ensure-organization-member');

const organizationHelper = require('../../db/queries/organizations');

router.get("/:orgId/invites", ensureOrganizationMember(), (req, res) => {
  const orgId = req.params.orgId;
  
  return organizationHelper.getOrganizationsPendingInvitesById(orgId)
    .then(rows => {
      console.log('rows: ', rows);
      return res.json(rows);
    })
    .catch(err => res.json(err));
});

router.post('/:orgId/invites', ensureOrganizationMember(), (req, res) => {
  const orgId = req.params.orgId;
  const { userEmail } = req.body;

  return organizationHelper.inviteUserByEmail(orgId, userEmail)
    .then(rows => res.json(rows))
    .catch(err => res.json({ error: err.message }));
});

router.delete('/:orgId/invites', ensureOrganizationMember(), (req, res) => {
  const orgId = req.params.orgId;
  const { inviteId } = req.body;

  return organizationHelper.deleteInvite(orgId, inviteId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

module.exports = router;
