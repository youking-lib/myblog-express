var mongoose = require('mongoose'),

    ObjectId = mongoose.Schema.Types.ObjectId

var ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        blocks: Array,
        entityMap: {
            type: Object,
            default: {}
        }
    },
    author: {
        type: String,
        ref: 'Users',
        default: 'whistleyz'
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
    keywords: [{
        type: ObjectId,
        ref: 'Keywords'
    }]
})

ArticleSchema.pre('save', (next) => {
    this.meta = {}
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

module.exports = mongoose.model('Articles', ArticleSchema)
