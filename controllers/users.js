const User = require('../models/user');
const crypto = require('../utils/crypto');
const authentication = require('../utils/authentication');
const { ADMIN_PASSCODE } = require('../utils/config');

// Register user

const register = async (request, response) => {
    const { password, userType, passcode } = request.body;

    // Verify passcode if user is trying to register as admin

    if (userType === 'admin' && passcode !== ADMIN_PASSCODE) {
        return response.status(401).json({ error: 'Invalid admin passcode' });
    }

    // Generate password hash

    const passwordHash = await crypto.hash(password);
    request.body.passwordHash = passwordHash;

    // Save new user in DB

    const user = new User(request.body);
    const newUser = await user.save();
    return response.status(201).json(newUser);
};

// Log user in

const login = async (request, response) => {
    const { email, password } = request.body;
    
    // Verify password

    const user = await User.findOne({ email });
    if (!user) {
        return response.status(401).json({ error: 'Invalid email or password.' });
    }

    const match = await crypto.compare(password, user.passwordHash);
    if (!match) {
        return response.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate access token

    const token = authentication.sign({ id: user.id });
    return response.json({ token, user });
};

module.exports = { register, login };