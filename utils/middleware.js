const authentication = require('./authentication');
const User = require('../models/user');
const logger = require('./logger');

// Extract token from request headers and attach it to the request object

const extractToken = (request, response, next) => {
    const { authorization } = request.headers;
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.split(' ')[1];
    }
    next();
};

// Verify that token belongs to a user of type 'customer'

const authenticateCustomer = async (request, response, next) => {
    const decodedToken = authentication.verify(request.token);
    const user = await User.findById(decodedToken.id);
    if (!(user && user.userType === 'customer')) {
        return response.status(401).json({ error: 'Access denied' });
    }
    request.decodedToken = decodedToken;
    next();
};

// Verify that token belongs to a user of type 'admin'

const authenticateAdmin = async (request, response, next) => {
    const decodedToken = authentication.verify(request.token);
    const user = await User.findById(decodedToken.id);
    if (!(user && user.userType === 'admin')) {
        return response.status(401).json({ error: 'Access denied' });
    }
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'Unknown endpoint' });
};

const handleErrors = (error, request, response, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).json({ error: 'Incorrect id format' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'Invalid token' });
    }

    logger.error(error.message);
    next(error);
};

module.exports = {
    extractToken,
    authenticateCustomer,
    authenticateAdmin,
    unknownEndpoint,
    handleErrors
};