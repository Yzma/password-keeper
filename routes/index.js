
const express = require("express");
const router = express.Router();

const authMiddleware = require('../lib/auth-middleware');

// TODO: Change auth-middleware to redirect to login page on routes that are meant to be protected

router.get('/', [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('index', templateVars);
});

router.get("/users", [authMiddleware()], (req, res) => {
  console.log('/users user: ', req.user);
  const templateVars = {
    user: req.user
  };
  res.render("users", templateVars);
});

router.get("/login", [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render("login", templateVars);
});

// get to create a new password
router.get("/new_password", [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render("new_password", templateVars);
});

router.get('/share_password', [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('share_password', templateVars);
});

router.get('/orgs', [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('orgs', templateVars);
});
module.exports = router;
