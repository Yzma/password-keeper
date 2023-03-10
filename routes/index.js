const express = require("express");
const router = express.Router();
const users = require("../db/queries/users");
const organizations = require("../db/queries/organizations");
const authMiddleware = require("../lib/auth-middleware");
const ensureOrganizationMember = require("../lib/ensure-organization-member");

// TODO: Change auth-middleware to redirect to login page on routes that are meant to be protected

router.get("/", [authMiddleware()], (req, res) => {
  const templateVars = {
    user: req.user,
  };
  res.render("index", templateVars);
});

router.get("/login", [authMiddleware()], (req, res) => {
  if (req.user) {
    return res.redirect("/passwords");
  }
  const templateVars = {
    user: null,
  };
  return res.render("login", templateVars);
});

// User Routes

router.get(
  "/passwords",
  [authMiddleware({ redirect: "/login" })],
  (req, res) => {
    return users
      .getUsersPasswordsById(req.user.id)
      .then((passwords) => {
        const templateVars = {
          user: req.user,
          passwords: passwords,
          org: null
        };
        return res.render("passwords", templateVars);
      })
      .catch((err) => {
        console.log("error loading /users", err);
      });
  }
);

router.get(
  "/passwords/edit_password/:passwordId",
  [authMiddleware({ redirect: "/login" })],
  (req, res) => {
    const passwordId = req.params.passwordId;
    console.log('req.user.id', req.user.id);
    console.log('passwordId', passwordId);
    return users
      .getUserPasswordById(req.user.id, passwordId)
      .then((passwords) => {

        if (!passwords || passwords.length === 0) {
          return res.redirect('/passwords');
        }

        return users.getAllUserTags(req.user.id).then(tags => {
          const templateVars = {
            user: req.user,
            password: passwords,
            tags: tags
          };

          console.log(tags);
  
          return res.render("edit_password", templateVars);
        });
      })
      .catch((err) => {
        console.log("error loading /users", err);
      });
  }
);

router.get(
  "/invites",
  [authMiddleware({ redirect: "/login" })],
  (req, res) => {
    return users
      .getUsersPendingInvitesById(req.user.id)
      .then((invites) => {
        const templateVars = {
          user: req.user,
          invites: invites
        };
        return res.render("user_invites", templateVars);
      })
      .catch((err) => {
        console.log("error loading /users", err);
      });
  }
);

router.get(
  "/passwords/new_password",
  [authMiddleware({ redirect: "/login" })],
  (req, res) => {
    return users
      .getAllUserTags(req.user.id)
      .then((passwords) => {
        const templateVars = {
          user: req.user,
          tags: passwords,
        };
        return res.render("new_password", templateVars);
      })
      .catch((err) => {
        console.log("error loading /users", err);
      });
  }
);

// Organization Routes

router.get("/orgs", [authMiddleware({ redirect: "/login" })], (req, res) => {
  return users
    .getUsersOrganizationsById(req.user.id)
    .then((data) => {
      const templateVars = {
        user: req.user,
        orgs: data,
      };
      res.render("organizations", templateVars);
    })
    .catch((err) => {
      console.log("error loading /users", err);
    });
});

router.get(
  "/orgs/:orgId/passwords",
  [ensureOrganizationMember({ redirect: '/login' }), authMiddleware({ redirect: "/login" })],
  (req, res) => {
    const orgId = req.params.orgId;
    return organizations
      .getOrganizationById(orgId)
      .then((data) => {
        return organizations
          .getOrganizationsPasswordsById(orgId)
          .then((passwords) => {
            const templateVars = {
              user: req.user,
              org: data,
              passwords: passwords,
            };
            return res.render("passwords", templateVars);
          });
      })
      .catch((err) => {
        console.log("error loading /users", err);
      });
  }
);

router.get(
  "/orgs/:orgId/passwords/new_password",
  [ensureOrganizationMember({ redirect: '/login' }), authMiddleware({ redirect: "/login" })],
  (req, res) => {
    const orgId = req.params.orgId;
    return organizations
      .getOrganizationById(orgId)
      .then((data) => {
        return organizations.getAllOrganizationTags(orgId).then((tags) => {
          const templateVars = {
            user: req.user,
            org: data,
            tags: tags,
          };
          return res.render("new_password", templateVars);
        });
      }).catch(err => {
        console.log('error loading /users', err);
      });
  });

router.get('/orgs/:orgId/invites', [ensureOrganizationMember({ redirect: '/login' }), authMiddleware({ redirect: '/login' })], (req, res) => {
  const orgId = req.params.orgId;
  return organizations.getOrganizationById(orgId)
    .then(data => {
      return organizations.getOrganizationsPendingInvitesById(data[0].id)
        .then(invites => {
          const templateVars = {
            user: req.user,
            org: data[0],
            invites: invites
          };
          return res.render('organization_invites', templateVars);
        });
    }).catch(err => {
      console.log('error loading /users', err);
    });
});

module.exports = router;
