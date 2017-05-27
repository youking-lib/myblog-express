var mongoose = require('mongoose'),
    config = require('../config/database'),
    logger = require('./logger')


mongoose.Promise = global.Promise

var hasConnected = false

exports.init = () => {
    _test()
        .then(() => _connect())
        .then(() => console.log('Success to connect to mongodb.'))
        .catch(err => {
            logger.database().error('Failed to connect to mongodb: \n' + err.message)
        })
}

/**
 * 测试数据库的连接
 */
exports.test = _test

/**
 * 连接数据库
 */
exports.connect = _connect

function _test() {
    var db = mongoose.createConnection()

    return db.open(config.host, config.database, config.port, config.options)
        .then(() => {
            db.close()
        })
        .catch((err) => {
            err.type = 'database'
            return Promise.reject(err)
        })
}

function _connect() {
    return mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.database, config.options)
        .catch(err => {
            err.type = 'database'
            return Promise.reject(err)
        })
}
