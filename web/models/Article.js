var mongoose = require('mongoose'),
    
    ObjectId = mongoose.Schema.Types.ObjectId

var ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'Users',
        required: true,
    },
    meta: {
        createAt: {
            type: Date,
            required: true,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    },
    keywords: [{
        type: ObjectId,
        ref: 'Keywords'
    }]
})



module.exports = mongoose.model('Articles', ArticleSchema)