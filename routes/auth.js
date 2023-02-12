
const express = require('express');
const router  = express.Router();

const users = require('../db/queries/users');
const bcrypt = require('bcryptjs');

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TODO: Create util methods to check

  // if (!isValid(email, password)) {
  //   return res.status(400).json({ error: 'Invalid username or password'});
  // }

  // TODO:
  // Cleanup
  // Figure out if we want to use bcrypt here or somewhere else (user helper, utils)
  return users.getUserByEmail(email)
    .then(result => result[0]) // TODO: Change this so the result isn't an array of rows
    .then(user => {

      return bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.json({ error: 'Error validating user' });
        }

        if (!result) {
          return res.json({ error: 'Invalid credentials' });
        }

        req.session.userId = user.id;
        return res.redirect('/users');
      });

    }).catch((err) => {
      console.log('Error logging in: ', err);
      return res.send('Invalid login');
    });
});

router.post('/logout', (req, res) => {
  req.session.userId = null;
  return res.redirect('/users/login');
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
