'use strict';
/**
 * Module dependencies
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const apiRoutes = require('./api/api.route');
const port = config.port || 3000;
const app = express();

/**
 * Expose
 */

module.exports = app;


// bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('config', config); 

// Bootstrap routes
app.use('/api', apiRoutes);

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri,{ useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});
mongoose.connection.once('open', () => {
    // listen on port config.port
    app.listen(port, () => {
        console.info(`server started on port ${port}`); 
    });
})

module.exports = app;
