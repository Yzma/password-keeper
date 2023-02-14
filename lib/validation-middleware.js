const { validationResult } = require('express-validator');

const validationMiddleware = (schema) => {
  return (req, res, next) => {

    const test = schema.map(e => e.run(req));
    console.log('TESTING', test);

    Promise.allSettled(test)
      .then((values) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log('GOT ERRORS:', errors);
          return res.status(400).json({ errors: errors.array() });
        }
        console.log('VALUES: ', values);
        return next();
      }).catch(err => {
        console.log('Error validating: ', err);
        return res.status(400).json({ errors: 'Could not validate schema' });
      });
  };
};

module.exports = {
  validationMiddleware
};
