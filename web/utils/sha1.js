var bcrypt = require('bcryptjs')

// 加盐强度
var rounds = 10

/**
 * genSalt
 */
exports.hash = (value) => {
    return bcrypt.genSalt(rounds).then(salt => {
        return bcrypt.hash(value, salt)
    })
}

/**
 * check
 */
exports.compare = (value, hash) => {
    return bcrypt.compare(value, hash)
}

/**
 * genSaltSync
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
exports.hashSync = (value) => {

    var salt = bcrypt.genSaltSync(rounds)
    return bcrypt.hashSync(value, salt)
}