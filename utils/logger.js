// Log info statements when the node environment is development

const info = (...args) => {
    process.env.NODE_ENV === 'development' && console.log(...args);
};

// Log error statements

const error = (...args) => {
    console.error(...args);
};

module.exports = { info, error };