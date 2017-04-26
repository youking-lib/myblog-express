var mongoose = require('mongoose'),
    sha1 = require('../utils/sha1'),
    bcrypt = require('bcryptjs')


var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: ''
        // match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
    website: {
        type: String,
        trim: true,
        lowercase: true
    },
    // > 10 超级管理员
    // < 1  黑名单
    level: {
        type: Number,
        default: 1
    }
})

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

UserSchema.pre('save', function (next) {
    console.log(1)
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    sha1.hash(this.password).then((hash) => {
        this.password = hash

        next()
    })
})


module.exports = mongoose.model('Users', UserSchema)
