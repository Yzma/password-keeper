const express = require('express');
const router  = express.Router();

const usersHelper = require('../../db/queries/users');

router.get("/passwords", (req, res) => {
  const userId = req.session.userID; // TODO: Use auth-middleware to handle this

  return usersHelper.getUsersPasswordsById(userId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.post('/passwords', (req, res) => {
  const userId = req.session.userID; // TODO: Use auth-middleware to handle this

  return usersHelper.insertPassword(orgId, websiteName, username, password, tagId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.delete('/passwords', (req, res) => {
  const orgId = req.params.orgId;
  const { passwordId } = req.body;

  return usersHelper.deletePassword(orgId, passwordId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.patch('/passwords', (req, res) => {
  const orgId = req.params.orgId;
  const { passwordId, websiteName, username, password, tagId } = req.body;
 
  return usersHelper.updatePassword(orgId, passwordId, websiteName, username, password, tagId)
    .then(rows => res.json(rows))
    .catch(err => {
      console.log('error: ', err);
      return res.json(err);
    });
});

module.exports = router;
