var sha1 = require('./sha1')

/**
 * 生成token
 */
exports.signToken = function(){
    return sha1.hashSync((Math.random() * 100).toString())
}