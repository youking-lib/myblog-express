var logger = require('../libs/logger')

exports.notFound = (req, res, next) => {
    var err = new Error('Not found!')
    err.status = 400
    next(err)
}

exports.error = (err, req, res, next) => {
    logger[err.type || 'system']().error(err)
    err.status = err.status || 500
    res.status(err.status).json({err: err, message: err.message})
}