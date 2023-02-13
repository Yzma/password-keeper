
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  const templateVars = {
    user: null
  };
  res.render('index', templateVars);
});

router.get("/users", (req, res) => {
  const templateVars = {
    user: null
  };
  res.render("users", templateVars);
});

router.get("/login", (req, res) => {
  const templateVars = {
    user: null
  };
  res.render("login", templateVars);
});

// get to create a new password
router.get("/new_password", (req, res) => {
  const templateVars = {
    user: null
  };
  res.render("new_password", templateVars);
});

module.exports = router;
