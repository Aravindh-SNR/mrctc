const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const trainRouter = require('./routers/trainRouter');
const ticketRouter = require('./routers/ticketRouter');
const userRouter = require('./routers/userRouter');

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

// Register middlewares before handling requests

app.use(cors());
app.use(express.json());
app.use(middleware.extractToken);

// Handle requests

app.use('/api/trains', trainRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/users', userRouter);

// Middlewares for unknown routes and error handling

app.use(middleware.unknownEndpoint);
app.use(middleware.handleErrors);

module.exports = app;