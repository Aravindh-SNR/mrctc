const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const logger = require('./logger');

// Generate password hash

const hash = async password => {
    try {
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        return passwordHash;
    } catch (error) {
        logger.error('Error hashing password:', error.message);
        return null;
    }
};

// Compare password

const compare = async (password, passwordHash) => {
    try {
        const match = await bcrypt.compare(password, passwordHash);
        return match;
    } catch (error) {
        logger.error('Error comparing password:', error.message);
        return false;
    }
}

module.exports = { hash, compare };