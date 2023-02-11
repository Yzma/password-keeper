
const express = require('express');
const router  = express.Router();

const users = require('../db/queries/users');

router.post('/login', (req, res) => {
  res.send();
});

router.post('/logout', (req, res) => {
  res.session.id = null;
  res.redirect('/');
});

// Debug route - Quickly get user information depending on the users cookie
router.get('/me', (req, res) => {
  const userId = req.session.id;
  if (!userId) {
    return res.send('You are not logged in.');
  }

  return users._getMyInfo(userId)
    .then(result => res.send(result))
    .catch(err => {
      console.log('Error fetching my info: ', err);
      return res.send('Error fetching user data. Check console for error.');
    });
});

module.exports = router;
