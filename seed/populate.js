const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');
const Train = require('../models/train');
const trainData = require('./data.json');
const logger = require('../utils/logger');

// Connect to MongoDB

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
})
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch(error => {
        logger.error('MongoDB error:', error.message);
    });

// Insert data into DB

mongoose.connection.on('open', async () => {
    for (const train of trainData) {
        const newTrain = new Train(train);
        await newTrain.save();
    }

    logger.info('DB seeded with initial data');
    mongoose.connection.close();
});