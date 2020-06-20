// Schema definition for Customer

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
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
            delete returnedObject.passwordHash;
        }
    }
});

// Ensure email of customer is unique
customerSchema.plugin(uniqueValidator, { message: 'The email {VALUE} already exists.' });

module.exports = mongoose.model('Customer', customerSchema);