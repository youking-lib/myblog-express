var Timeline = require('../models/Timeline'),
    moment = require('moment'),
    async = require('async')

exports.query = (req, res, next) => {
    var _query = req.query || {}
    
    Timeline
        .find(_query)
        .then(docs => {
            res.status(200).json({data: docs})
        })
        .catch(err => next(err))
}

exports.create = (req, res, next) => {
    var today = moment().starOf('day')
    var record = {
        title: req.body.title, 
        type: 'custom'
    }

    _createTimeline(record, function(err, doc){
        if (err) return next(err)

        res.status(200).json({data: doc})
    })
}

exports.autoCreate = function (data) {
    return new Promise((resolve, reject) => {
        _createTimeline(data, function(err, doc){
            if (err) return reject(err)
            resolve(doc)            
        })
    })
}

function _createTimeline (record, done) {
    var today = moment().startOf('day').toISOString()

    async.waterfall([
        function(callback){
            Timeline
                .findOne({date: {$gte: today}})
                .then(doc => {
                    callback(null, doc)
                })
                .catch(err => callback(err))
        },
        function(doc, callback){
            if (doc) {
                doc
                    .update({$push: {records: record}})
                    .then(doc => {
                        callback(null, doc)
                    })
                    .catch(err => callback(err))
            } else {
                var newRecord = new Timeline({
                    records: [record]
                })
                newRecord
                    .save(doc => callback(null, doc))
                    .catch(err => callback(err))
            }
        }
    ], function(err, doc){
        done(err, doc)
    })
}