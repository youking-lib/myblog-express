var Router = require('express').Router(),
    api = require('./api'),
    Home = require('../controllers/home')

/* GET home page. */
Router.get('/', Home.index)

// api
Router.use('/api/v1', api)


module.exports = Router;
