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
  const { userEmail } = req.body;

  return organizationHelper.inviteUserByEmail(orgId, userEmail)
    .then(rows =>  {
      console.log('rows: ', rows);
      return res.json(rows);
    })
    .catch(err =>  {
      console.log('Error (/:orgId/invites)', err);
      return res.json({ error: 'User not found' });
    });
});

router.delete('/:orgId/invites', (req, res) => {
  const orgId = req.params.orgId;
  const { inviteId } = req.body;

  return organizationHelper.deleteInvite(orgId, inviteId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

module.exports = router;
