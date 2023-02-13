
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get("/users", (req, res) => {
  res.render("users");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// get to create a new password
router.get("/new_password", (req, res) => {
  res.render("new_password");
});

module.exports = router;
