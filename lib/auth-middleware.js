
const users = require('../db/queries/users');

const authMiddleware = () => {
  return (req, res, next) => {
    const userCookieId = req.session.id;

    if (!userCookieId) {
      return; // TODO: Don't just return, might have to throw an error/redirect to login page
    }

    return users.getUserById(userCookieId)
      .then(result => {
        console.log('auth middleware: ', result);
        req.user = { test: 'user-here' };
        return next();
      }).catch(err => {
        console.log('auth middleware error: ', err);
        return next();
      });
  };
};
module.exports = authMiddleware;