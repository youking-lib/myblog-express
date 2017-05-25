var mongoose = require('mongoose')

var MediaSchema = new mongoose.Schema({
    // 媒体类型
    type: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    size: {
        type: Number,
        required: true
    },
    // 类别
    // -- picture-wall 照片墙
    quote: {
        type: String,
        required: true
    }
}, {
    toJSON: {virtuals: true},
    id: false
})

MediaSchema.virtual('url').get(function() {
    return 'http://localhost:3000/public/media/' + this.quote + '/' + this._id + '-' + this.filename
})

MediaSchema.virtual('uid').get(function() {
    return this._id;
})

MediaSchema.virtual('key').get(function() {
    return this._id;
})

module.exports = mongoose.model('Media', MediaSchema)