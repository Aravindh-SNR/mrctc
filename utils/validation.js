// Validate fields in incoming http requests

const Joi = require('@hapi/joi');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Common fields for both registration and login

const validateUser = {
    email: Joi.string().required().trim().regex(emailRegex),
    password: Joi.string().required().trim().min(1),
    userType: Joi.string().required().valid('customer', 'admin')
};

// Add a train

const addTrain = Joi.object({
    name: Joi.string().required().trim().min(1),
    stations: Joi.array().items(
        Joi.string().trim().min(1)
    ).required().length(2).unique(),
    price: Joi.number().required().min(1)
});

// Set the price of a train ticket

const setPrice = Joi.object({
    price: Joi.number().required().min(1)
});

// User Registration

const register = Joi.object({
    name: Joi.string().required().trim().min(1),
    ...validateUser
});

// User Login

const login = Joi.object(validateUser);

// Add ticket to cart

const addTicketToCart = Joi.object({
    trainId: Joi.string().required(),
    passengers: Joi.array().items(
        Joi.object({
            name: Joi.string().required().trim().min(1),
            gender: Joi.string().required().valid('M', 'F'),
            age: Joi.number().required().min(0)
        })
    ).required().min(1)
});

// Validate request params for setting the price of a train ticket, and buying/cancelling a ticket

const idParam = Joi.object({
    id: Joi.string().required()
});

module.exports = { addTrain, setPrice, register, login, addTicketToCart, idParam };