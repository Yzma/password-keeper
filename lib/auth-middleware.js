
const users = require('../db/queries/users');

const authMiddleware = (options = {}) => {
  return (req, res, next) => {
    const userCookieId = req.session.userId;

    if (options.redirect) {
      if (!userCookieId) {
        return res.redirect(options.redirect);
      }
    }

    return users.getUserById(userCookieId)
      .then(result => {
        console.log('auth middleware: ', result[0]);
        req.user = result[0];
        return next();
      }).catch(err => {
        console.log('auth middleware error: ', err);
        return next();
      });
  };
};
module.exports = authMiddleware;