const express = require('express');
const router  = express.Router();

const ensureOrganizationMember = require('../../lib/ensure-organization-member');

const organizationHelper = require('../../db/queries/organizations');

router.get("/:orgId/tags", ensureOrganizationMember(), (req, res) => {
  const orgId = req.params.orgId;
  const { userId } = req.body;

  return organizationHelper.getAllOrganizationTags(orgId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.post('/:orgId/tags', ensureOrganizationMember(), (req, res) => {
  const orgId = req.params.orgId;
  const { name } = req.body;

  return organizationHelper.createOrganizationTag(orgId, name)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.delete('/:orgId/tags', ensureOrganizationMember(), (req, res) => {
  const orgId = req.params.orgId;
  const { name } = req.body;

  return organizationHelper.deleteOrganizationTag(orgId, name)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});
module.exports = router;
