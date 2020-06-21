// Schema definition for ticket/transaction

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    trainId: {
        type: mongoose.Types.ObjectId,
        ref: 'Train'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    passengers: [
        {
            name: { type: String },
            gender: { type: String },
            age: { type: Number }
        }
    ]
}, {
    toJSON: {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);