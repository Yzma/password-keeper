const express = require('express');
const router  = express.Router();

const usersHelper = require('../../db/queries/users');

router.get("/passwords", (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this

  return usersHelper.getUsersPasswordsById(userId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.post('/passwords', (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this
  const { websiteName, username, password, tagId } = req.body;

  return usersHelper.insertPassword(userId, websiteName, username, password, tagId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.delete('/passwords', (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this
  const { passwordId } = req.body;

  return usersHelper.deletePassword(userId, passwordId)
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
});

router.patch('/passwords', (req, res) => {
  const userId = req.session.userId; // TODO: Use auth-middleware to handle this
  const { passwordId, websiteName, username, password, tagId } = req.body;

  console.log('patch password');
  console.log('passwordId', passwordId);
  console.log('websiteName', websiteName);
  console.log('username', username);
  console.log('password', password);
  console.log('tagId', tagId);

  return usersHelper.updatePassword(userId, passwordId, websiteName, username, password, tagId)
    .then(rows => res.json(rows))
    .catch(err => {
      console.log('error: ', err);
      return res.json(err);
    });
});

module.exports = router;
