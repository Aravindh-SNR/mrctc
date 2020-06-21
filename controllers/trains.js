const Train = require('../models/train');

// Get list of trains

const getTrains = async (request, response) => {
    const trains = await Train.find();
    return response.json(trains);
};

// Add a train

const addTrain = async (request, response) => {
    const train = new Train(request.body);
    const newTrain = await train.save();
    return response.status(201).json(newTrain);
};

// Update price of train ticket

const setPrice = async (request, response) => {
    const { price } = request.body;
    const updatedTrain = await Train.findByIdAndUpdate(request.params.id, { price }, { new: true });
    return response.json(updatedTrain);
};

module.exports = { getTrains, addTrain, setPrice };