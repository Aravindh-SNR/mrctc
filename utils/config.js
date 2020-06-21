// Export environment variables

require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_PROD_URI
    : process.env.MONGODB_DEV_URI;

const PORT = process.env.PORT;

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;

module.exports = { MONGODB_URI, PORT, TOKEN_SECRET, ADMIN_PASSCODE };