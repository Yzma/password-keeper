const express = require('express');
const router  = express.Router();

const userHelper = require('../../db/queries/users');

router.get("/invites", (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this

  console.log('userId: ', userId);
  return userHelper.getUsersPendingInvitesById(userId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.patch('/invites', (req, res) => {
  const userId = req.session.userId;  // TODO: Use auth-middleware to handle this
  const { inviteId } = req.body;

  console.log('userId', userId);
  console.log('inviteId', inviteId);

  return userHelper.acceptInvite(userId, inviteId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.delete('/invites', (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this
  const { inviteId } = req.body;

  return userHelper.deleteInvite(userId, inviteId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

module.exports = router;
