var log4js = require('log4js'),
    config = require('../config/log4js')

log4js.configure(config)

module.exports = {
    access: () => {
        return log4js.connectLogger(log4js.getLogger('access'), { level: 'auto', format: ':method :url'})
    },

    system: () => {
        return log4js.getLogger('system')
    },

    database: () => {
        return log4js.getLogger('database')
    }
}