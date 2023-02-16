const { userSchema } = require('../lib/validation-schemas');
const { validationMiddleware } = require('../lib/validation-middleware');

const express = require('express');
const router  = express.Router();

const users = require('../db/queries/users');
const bcrypt = require('bcryptjs');

const authMiddleware = require('../lib/auth-middleware');


router.post("/login", validationMiddleware(userSchema), (req, res) => {
  const { email, password } = req.body;

  // TODO:
  // Cleanup
  // Figure out if we want to use bcrypt here or somewhere else (user helper, utils)
  return users
    .getUserByEmail(email)
    .then((result) => result[0]) // TODO: Change this so the result isn't an array of rows
    .then((user) => {
      return bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.json({ error: "Error validating user" });
        }

        if (!result) {
          return res.json({ error: "Invalid credentials" });
        }

        req.session.userId = user.id;
        return res.redirect("/passwords");
      });
    })
    .catch((err) => {
      console.log("Error logging in: ", err);
      return res.send("Invalid login");
    });
});

router.post('/register', validationMiddleware(userSchema), (req, res) => {

  const { email, password } = req.body;
  console.log("EMAIL:", email);
  console.log(password);
  users
    .insertUser({ email, password })
    .then((result) => result[0]) // TODO: Change this so the result isn't an array of rows
    .then((user) => {
      console.log("USER:", user);
      req.session.userId = user.id;
      return res.redirect("/passwords");
    })
    .catch((err) => {
      console.log("Error logging in: ", err);
      return res.send("Invalid login");
    });
});

router.post('/logout', (req, res) => {

  req.session.userId = null;
  return res.redirect("/login");
});

// Debug route - Quickly get user information depending on the users cookie
router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send("You are not logged in.");
  }

  return users
    ._getMyInfo(userId)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log("Error fetching my info: ", err);
      return res.send("Error fetching user data. Check console for error.");
    });
});

router.get("/testmiddleware", [authMiddleware()], async (req, res) => {
  console.log("testing middle", req.user);
  return res.json({ response: req.user });
});

module.exports = router;
