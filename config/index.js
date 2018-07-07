const path = require('path');

const development = require('./development');
// const test = require('./test');
const production = require('./production');

module.exports = {
    development:development,
    production:production
}[process.env.NODE_ENV || 'development'];