const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('./config');

// Generate token

const sign = token => jwt.sign(token, TOKEN_SECRET);

// Verify token

const verify = token => jwt.verify(token, TOKEN_SECRET);

module.exports = { sign, verify };