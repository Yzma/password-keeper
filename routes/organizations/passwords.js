const express = require('express');
const router  = express.Router();

const ensureOrganizationMember = require('../../lib/ensure-organization-member');
const organizationHelper = require('../../db/queries/organizations');

// TODO:
router.get("/:orgId/passwords", ensureOrganizationMember(), (req, res) => {
  const orgId = req.params.orgId;
  const { userId } = req.body; //const userId = req.session.userId;
  
  return organizationHelper.getOrganizationsPasswordsById(orgId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.post('/:orgId/passwords', (req, res) => {
  const orgId = req.params.orgId;
  const { websiteName, username, password, tagId } = req.body;

  return organizationHelper.insertPassword(orgId, websiteName, username, password, tagId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.delete('/:orgId/passwords', (req, res) => {
  const orgId = req.params.orgId;
  const { passwordId } = req.body;

  return organizationHelper.deletePassword(orgId, passwordId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.patch('/:orgId/passwords', (req, res) => {
  const orgId = req.params.orgId;
  const { passwordId, websiteName, username, password, tagId } = req.body;
 
  return organizationHelper.updatePassword(orgId, passwordId, websiteName, username, password, tagId)
    .then(rows => res.json(rows))
    .catch(err => {
      console.log('error: ', err);
      return res.json(err);
    });
});

module.exports = router;
