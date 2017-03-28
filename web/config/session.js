var session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose')

module.exports = {
    secret: 'fsblog',
    resave: false,
    name: 'blogSessionId',
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: { 
        httpOnly: false
    }
}