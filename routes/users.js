
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
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
