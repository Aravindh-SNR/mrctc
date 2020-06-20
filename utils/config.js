// Export environment variables

require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_PROD_URI
    : process.env.MONGODB_DEV_URI;

const PORT = process.env.PORT;

module.exports = { MONGODB_URI, PORT };