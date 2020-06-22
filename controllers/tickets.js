const Ticket = require('../models/ticket');
const Train = require('../models/train');
const pricing = require('../seed/pricing.json');

// Get history of bookings

const getBookingHistory = async (request, response) => {
    const tickets = await Ticket.find({ customerId: request.decodedToken.id })
        .populate('trainId', { name : 1 })
        .sort({ _id: -1 });
    return response.json(tickets);
};

// Add ticket to cart

const addTicketToCart = async (request, response) => {
    const { trainId, passengers } = request.body;

    // Calculate total ticket cost

    const { price } = await Train.findById(trainId);
    let totalAmount = 0;
    passengers.forEach(passenger => {
        const { gender, age } = passenger;
        if (age < 5) {
            totalAmount += (price * pricing['0-5']);
        } else if (age >= 5 && age < 12) {
            totalAmount += (price * pricing['5-11']);
        } else if (age >= 12 && age < 58) {
            totalAmount += (price * pricing['12-57']);
        } else if (gender === 'F') {
            totalAmount += (price * pricing['58+']);
        } else if (age >= 60) {
            totalAmount += (price * pricing['60+']);
        } else {
            totalAmount += price;
        }
    });

    // Save ticket details in DB with paid as false

    const ticket = new Ticket({
        ...request.body,
        customerId: request.decodedToken.id,
        totalAmount
    });
    const newTicket = await ticket.save();
    return response.status(201).json(newTicket);
};

// Buy ticket, i.e. update paid to true

const buyTicket = async (request, response) => {
    const paidTicket = await Ticket.findByIdAndUpdate(request.params.id, { paid: true }, { new: true })
        .populate('trainId', { name : 1 });
    if (!paidTicket) {
        return response.status(400).json({ error: 'Ticket with the given id does not exist' });
    }
    return response.json(paidTicket);
};

// Cancel ticket

const cancelTicket = async (request, response) => {
    await Ticket.findByIdAndDelete(request.params.id);
    return response.status(204).end();
};

module.exports = { getBookingHistory, addTicketToCart, buyTicket, cancelTicket };