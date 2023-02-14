const express = require('express');
const router  = express.Router();

const usersHelper = require('../../db/queries/users');

router.get("/tags", (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this

  return usersHelper.getAllUserTags(userId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.post('/tags', (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this
  const { name } = req.body;

  return usersHelper.createUsernTag(userId, name)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.delete('/tags', (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this
  const { name } = req.body;

  return usersHelper.deleteUserTag(userId, name)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

module.exports = router;
