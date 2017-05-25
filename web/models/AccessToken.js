var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    // 七天
    expiresTime = 7 * 24 * 60 * 60

var AccessToken = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: ObjectId,
        unique: true,
        required: true,
        ref: 'Users'
    },
    createAt: {
        type: Date,
        expires: expiresTime,
        required: true,
        default: Date.now()
    },
})

/**
 * 过期时间
 */
AccessToken.virtual('expires_at').get(function(){
    return new Date(this.createAt.getTime() + expiresTime * 1000)
})

/**
 * 剩余时间
 */
AccessToken.virtual('expires_in').get(function(){
    return Number.parseInt(new Date(this.expires_at - Date.now() / 1000), 10)
})

module.exports = mongoose.model('Tokens', AccessToken)