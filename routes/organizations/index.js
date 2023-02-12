
const express = require('express');
const router  = express.Router();

const invites = require('./invites');
const passwords = require('./passwords');
const tags = require('./tags');
const users = require('./users');

router.get("/", (req, res) => {
  res.send('/organizations');
});

// TODO: POST / - Creates a new organization
router.post('/', (req, res) => {
  res.send();
});

// TODO: UPDATE /{org_id} - Updates information about the organization
router.patch('/:org_id', (req, res) => {
  res.send();
});

router.use('/:org_id/invites', invites);
router.use('/:org_id/passwords', passwords);
router.use('/:org_id/tags', tags);
router.use('/:org_id/users', users);

module.exports = router;
