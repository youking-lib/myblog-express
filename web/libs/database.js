var mongoose = require('mongoose'),
    config = require('../config/database')

mongoose.Promise = global.Promise

var hasConnected = false

exports.init = () => {
    return (req, res, next) => {
        if (hasConnected) {
            return next()
        }
        _test()
            .then(_connect)
            .then(() => { hasConnected = true;
                next() })
            .catch((err) => { next(err) })
    }
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

    return db.open(config.host, db.database, db.port, db.options)
        .then(() => {
            db.close()
        })
        .catch((err) => {
            err.type = 'system'
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
