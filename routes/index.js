
const express = require("express");
const router = express.Router();

const users = require('../db/queries/users');
const organizations = require('../db/queries/organizations');

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
  if (!req.user) {
    return res.redirect('/login');
  }

  return users.getUsersPasswordsById(req.user.id)
    .then(passwords => {
      const templateVars = {
        user: req.user,
        passwords: passwords
      };
      return res.render("users", templateVars);
    }).catch(err => {
      console.log('error loading /users', err);
    });
});

router.get("/passwords/new_password", [authMiddleware({ redirect: '/login' })], (req, res) => {
  return users.getAllUserTags(req.user.id)
    .then(passwords => {
      const templateVars = {
        user: req.user,
        tags: passwords
      };
      return res.render("new_password", templateVars);
    }).catch(err => {
      console.log('error loading /users', err);
    });
});

// Organization Routes

// TODO: Do we need this?
router.get('/orgs', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const templateVars = {
    user: req.user
  };
  res.render('orgs', templateVars);
});

router.get('/orgs/:orgId/passwords', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const orgId = req.params.orgId;
  return organizations.getOrganizationById(orgId)
    .then(data => {
      return organizations.getAllOrganizationTags(orgId)
        .then(tags => {
          const templateVars = {
            user: req.user,
            org: data,
            tags: tags
          };
          return res.render('orgs', templateVars);
        });
    }).catch(err => {
      console.log('error loading /users', err);
    });
});

router.get('/orgs/:orgId/new_password', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const orgId = req.params.orgId;
  return organizations.getOrganizationById(orgId)
    .then(data => {
      return organizations.getOrganizationsPasswordsById(orgId)
        .then(passwords => {
          const templateVars = {
            user: req.user,
            org: data,
            passwords: passwords
          };
          return res.render('orgs', templateVars);
        });
    }).catch(err => {
      console.log('error loading /users', err);
    });
});

router.get('/orgs/:orgId/share_password', [authMiddleware({ redirect: '/login' })], (req, res) => {
  const orgId = req.params.orgId;
  return organizations.getOrganizationById(orgId)
    .then(data => {
      const templateVars = {
        user: req.user,
        org: data
      };
      return res.render('share_password', templateVars);
    }).catch(err => {
      console.log('error loading /users', err);
    });
});

module.exports = router;
