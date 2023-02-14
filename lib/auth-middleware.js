const users = require("../db/queries/users");

const authMiddleware = (options = {}) => {
  return (req, res, next) => {
    const userCookieId = req.session.userId;
    console.log("USER COOKIES: ", userCookieId);

    if (options.redirect) {
      if (!userCookieId) {
        return res.redirect("/login");
      }
    }

    return users
      .getUserById(userCookieId)
      .then((result) => {
        console.log("auth middleware: ", result[0]);
        console.log("RESULT: ", result);
        req.user = result[0];
        return next();
      })
      .catch((err) => {
        console.log("auth middleware error: ", err);
        return next();
      });
  };
};
module.exports = authMiddleware;
