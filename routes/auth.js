const express = require("express");
const router = express.Router();
const app = express();

const users = require("../db/queries/users");
const bcrypt = require("bcryptjs");

const authMiddleware = require("../lib/auth-middleware");


const userDatabase = {
};
app.get("/login", (req, res) => {
  const userID = req.session.id;
  if (userID) {
    res.redirect("/passwords");
  } else {
  res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: usersDatabase[req.session.id],
  };
  const userID = req.session.id;
  const user = urlsForUser(userID, urlDatabase);

  if (!userID) {
    return res.redirect("/login");
  } else {
    const templateVars = {
      urls: urlDatabase,
      user: usersDatabase[req.session.id],
    };
    return res.render("/index", templateVars);
  }
});







// app.get('/login', (req, res) => {
//   const username = req.cookies.user;
//   res.render('passwords', { username });
// });
/////////////////////////////////////////////////////////cookies////////////////////////////////////
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TODO: Create util methods to check

  // if (!isValid(email, password)) {
  //   return res.status(400).json({ error: 'Invalid username or password'});
  // }

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

router.post("/register", (req, res) => {
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

router.post("/logout", (req, res) => {
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
