const express = require('express');
const router  = express.Router();

const usersHelper = require('../../db/queries/users');
const invites = require('./invites');
const passwords = require('./passwords');
const tags = require('./tags');

router.get("/", (req, res) => {
  return usersHelper.getUsers()
    .then(result => {
      return res.json(result);
    });
});

router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  return usersHelper.getUserById(userId)
    .then(result => {
      return res.json(result);
    });
});

router.use('/', invites);
router.use('/', passwords);
router.use('/', tags);

module.exports = router;
