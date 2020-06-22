const ticketRouter = require('express').Router();
const validator = require('express-joi-validation').createValidator({ passError: true });
const validationSchemas = require('../utils/validation');
const { authenticateCustomer } = require('../utils/middleware');
const ticketController = require('../controllers/tickets');

// Get history of bookings

ticketRouter.get(
    '/',
    authenticateCustomer,
    ticketController.getBookingHistory
);

// Add ticket to cart

ticketRouter.post(
    '/',
    authenticateCustomer,
    validator.body(validationSchemas.addTicketToCart),
    ticketController.addTicketToCart
);

// Buy ticket

ticketRouter.put(
    '/:id',
    authenticateCustomer,
    validator.params(validationSchemas.idParam),
    ticketController.buyTicket
)

// Cancel ticket

ticketRouter.delete(
    '/:id',
    authenticateCustomer,
    validator.params(validationSchemas.idParam),
    ticketController.cancelTicket
);

module.exports = ticketRouter;