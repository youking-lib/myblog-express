var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var TimelineSchema = new Schema({
    // article || custom
    records: [{
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        quoteId: {
            type: Schema.ObjectId,
            ref: 'Articles',
        }
    }],
    date: {
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Timeline', TimelineSchema)