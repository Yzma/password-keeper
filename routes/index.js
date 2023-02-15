
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

router.get("/login", [authMiddleware()], (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }

  const templateVars = {
    user: null
  };
  return res.render("login", templateVars);
});

// User Routes

router.get("/passwords", [authMiddleware({ redirect: '/login' })], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render("users", templateVars);
});

router.get("/passwords/new_password", [authMiddleware({ redirect: '/login' })], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render("new_password", templateVars);
});

// Organization Routes

router.get('/orgs', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('orgs', templateVars);
});

router.get('/orgs/:orgId/passwords', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('orgs', templateVars);
});

router.get('/orgs/:orgId/new_password', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('orgs', templateVars);
});

router.get('/orgs/:orgId/share_password', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('share_password', templateVars);
});

module.exports = router;
