const Joi = require('@hapi/joi');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Common fields for both registration and login

const validateUser = {
    email: Joi.string().required().trim().regex(emailRegex),
    password: Joi.string().required().trim().min(1),
    userType: Joi.string().required().valid('customer', 'admin')
};

// Common fields for both adding passengers and buying tickets

const validatePassengers = {
    passengers: Joi.array().items(Joi.object({
        name: Joi.string().required().trim().min(1),
        gender: Joi.string().required().valid('M', 'F'),
        age: Joi.number().required()
    })).required()
};

// Validate request body for adding a train

const addTrain = Joi.object({
    name: Joi.string().required().trim().min(1),
    stations: Joi.array().items(Joi.string().trim().min(1)).required().length(2).unique(),
    price: Joi.number().required()
});

// Validate request body for setting the price of a train ticket

const setPrice = Joi.object({
    name: Joi.string().required().trim().min(1),
    price: Joi.number().required()
});

// Validate request body for registration

const register = Joi.object({
    name: Joi.string().required().trim().min(1),
    ...validateUser
});

// Validate request body for login

const login = Joi.object(validateUser);

// Validate request body for adding passengers

const addPassengers = Joi.object(validatePassengers);

// Validate request body for ticket purchase

const buyTicket = Joi.object({
    trainId: Joi.string().required(),
    ...validatePassengers
});

module.exports = { addTrain, setPrice, register, login, addPassengers, buyTicket };