const trainRouter = require('express').Router();
const validator = require('express-joi-validation').createValidator({});
const validationSchemas = require('../utils/validation');
const { authenticateAdmin } = require('../utils/middleware');
const trainController = require('../controllers/trains');

// Get list of trains

trainRouter.get(
    '/',
    trainController.getTrains
);

// Add a train

trainRouter.post(
    '/',
    authenticateAdmin,
    validator.body(validationSchemas.addTrain),
    trainController.addTrain
);

// Update price of train ticket

trainRouter.put(
    '/:id',
    authenticateAdmin,
    validator.params(validationSchemas.idParam),
    validator.body(validationSchemas.setPrice),
    trainController.setPrice
);

module.exports = trainRouter;