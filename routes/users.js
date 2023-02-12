/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});


router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  console.log("Got body:", req.body);
  res.sendStatus(200);
});

router.post("/register", (req, res) => {
  console.log("Got body:", req.body);
  res.sendStatus(200);
});


// get to create a new password
router.get("/new_password", (req, res) => {
  res.render("new_password");
});
// post to create a new password
router.post("/new_password", (req, res) => {
  console.log("Got body:", req.body);
  res.sendStatus(200);
});

module.exports = router;
