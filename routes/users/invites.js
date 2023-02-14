const express = require('express');
const router  = express.Router();

const userHelper = require('../../db/queries/users');
const organizationHelper = require('../../db/queries/organizations');

router.get("/invites", (req, res) => {
  const userId = req.session.userID; // TODO: Use auth-middleware to handle this
  
  return userHelper.getUsersPendingInvitesById(userId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

// router.patch('/invites', (req, res) => {
//   const userId = req.session.userID; // TODO: Use auth-middleware to handle this
//   const { inviteId } = req.body;

//   return organizationHelper.addUser(userId, inviteId)
//     .then(rows => res.json(rows))
//     .catch(err => res.json(err));
// });

router.delete('/invites', (req, res) => {
  const orgId = req.params.orgId;
  const { inviteId } = req.body;

  return userHelper.deleteInvite(orgId, inviteId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

module.exports = router;
