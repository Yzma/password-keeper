
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
  return res.send('Should UPDATE /organizations/{org_id}/');
});

router.use('/:org_id/invites', invites);
router.use('/:org_id/passwords', passwords);
router.use('/:org_id/tags', tags);
router.use('/:org_id/users', users);

module.exports = router;
