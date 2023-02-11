
const express = require('express');
const router  = express.Router();

router.post('/login', (req, res) => {
  res.send();
});

router.post('/logout', (req, res) => {
  res.send();
});

// Debug route - Quickly get user information depending on the users cookie
router.get('/me', (req, res) => {
  res.send();
});

module.exports = router;
