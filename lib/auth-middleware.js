
const users = require('../db/queries/users');

const authMiddleware = () => {
  return (req, res, next) => {
    const userCookieId = req.session.userId;

    if (!userCookieId) {
      return res.redirect('/users/login');
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