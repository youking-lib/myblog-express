var session = require('express-session'),
    config = require('../config/session'),
    mongoose = require('mongoose')

exports.check = () => {
    return (req, res, next) => {
        
        if (!mongoose.connection.name) {
            req.session = 'init'
        } else if (req.session === 'init') {
            delete req.session
        }

        next()
    }
}

exports.init = () => {
    return session(config)
}