// Schema definition for Train

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const trainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stations: [String],
    price: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

// Ensure train name is unique
trainSchema.plugin(uniqueValidator, { message: 'Train {VALUE} already exists in the database.' });

module.exports = mongoose.model('Train', trainSchema);