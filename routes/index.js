
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

router.get("/users/passwords", [authMiddleware()], (req, res) => {
  console.log('THIS IS *******/users/passwords: ', req.user);
  const templateVars = {
    user: req.user
  };
  res.render("passwords", templateVars);
});

router.get("/login", [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render("login", templateVars);
});

router.get("/new_password", [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render("new_password", templateVars);
});

router.get('/orgs', [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('orgs', templateVars);
});

router.get('/invites', [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('invites', templateVars);
});

router.get('/organizations', [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('organizations', templateVars);
});

module.exports = router;
