
const { body } = require('express-validator');

const userSchema = [
  body('email').isEmail().withMessage('you must provide a valid email').notEmpty().withMessage('email can not be empty'),
  body('password').isLength({ min: 8 }).withMessage('password must be at least 8 chars long')
];

const organizationSchema = [
  body('orgName').isLength({ min: 5 }).withMessage('orgName must be at least 5 chars long').notEmpty().withMessage('orgName can not be empty')
];

const passwordTagSchema = [
  body('name').notEmpty().withMessage('tag name can not be empty')
];

module.exports = {
  userSchema,
  organizationSchema,
  passwordTagSchema
};