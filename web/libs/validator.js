var validator = require('express-validator'),
    _ = require('lodash')

module.exports = function(){
    return validator({
        errorFormatter: (param, message, value) => {
            return {
                param: param,
                message: message,
                value: value
            }
        },
        customValidators: {
            isString: (value) => { _.isString(value) },
            isObject: (value) => { _.isObject(value) },
            isArray: (value) => { _.isAarray },
            isEmail: (value) => { /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) }
        }
    })
}