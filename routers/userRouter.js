const userRouter = require('express').Router();
const validator = require('express-joi-validation').createValidator({});
const validationSchemas = require('../utils/validation');
const userController = require('../controllers/users');

// Register user

userRouter.post(
    '/register',
    validator.body(validationSchemas.register),
    userController.register
);

// Log user in

userRouter.post(
    '/login',
    validator.body(validationSchemas.login),
    userController.login
);

module.exports = userRouter;