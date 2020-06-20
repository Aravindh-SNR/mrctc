const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');

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

// Instantiate Express App

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;