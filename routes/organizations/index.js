
const express = require('express');
const router  = express.Router();

const organizationsHelper = require('../../db/queries/organizations');

const invites = require('./invites');
const passwords = require('./passwords');
const tags = require('./tags');
const users = require('./users');

router.get("/", (req, res) => {
  return organizationsHelper.getOrganizations()
    .then(result => {
      return res.json(result);
    });
});

// TODO: POST / - Creates a new organization
router.post('/', (req, res) => {
  const { orgName } = req.body;
  const userId = req.session.userID; // TODO: Use auth-middleware to handle this

  if (!userId || !orgName) {
    return res.json({ error: `Invalid userId(${userId}) or orgName(${orgName})` });
  }

  return organizationsHelper.insertOrganization(userId, orgName)
    .then(result => {
      return res.json(result);
    })
    .catch(err => { // TODO: Change this so we don't give the DB error
      return res.json({ error: err.detail });
    });
});

// TODO: UPDATE /{org_id} - Updates information about the organization
router.patch('/:org_id', (req, res) => {
  return res.send('Should UPDATE /organizations/{orgId}/');
});

router.use('/:orgId/invites', invites);
router.use('/:orgId/passwords', passwords);
router.use('/:orgId/tags', tags);
router.use('/:orgId/users', users);

module.exports = router;
