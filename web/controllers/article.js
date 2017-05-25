var Article = require('../models/article'),
    Timeline = require('./timeline'),
    async = require('async')

/**
 * 获取文章列表
 */
exports.list = (req, res, next) => {
    var query = req.query || {}

    Article
        .find(query)
        .populate('keywords')
        .lean()
        .then(docs => {
            res.status(200).json({data: docs})
        })
        .catch(err => {
            err.type = 'database'
            next(err)
        })
}

/**
 * 发表文章
 */
exports.create = (req, res, next) => {
    var _id = req.body._id
    delete req.body._id

    req.checkBody({
        title: {
            notEmpty: {
                options: [true],
                errorMessage: '不能没有标题！'
            }
        },
        content: {
            notEmpty: {
                options: [true],
                errorMessage: '内容不能为空啊！'
            }
        }
    })

    req.getValidationResult().then(errs => {
        if (!errs.isEmpty()) {
            return req.status(400).end(errs)
        }
        // 更新文章
        if (_id) {
            (new Article(req.body))
                // .save()
                // .findByIdAndUpdate(_id, {$set: req.body})
                .save(doc => {
                    res.status(200).json({data: doc})
                })
        } 
        // 创建文章
        else {
            async.waterfall([
                function(callback){
                    Article
                        .create(req.body)
                        .then(doc => callback(null, doc))
                        .catch(err => callback(err))
                },
                function(article, callback){
                    var record = {
                        title: article.title,
                        type: 'article',
                        quoteId: article._id
                    }
                    Timeline
                        .autoCreate(record)
                        .then(doc => {
                            callback(null, article)
                        })
                        .catch(err => callback(err))
                }
            ], function(err, article) {
                if(err) return next(err)

                res.status(200).json({data: article})
            })
        }
    })
}

exports.del = (req, res, next) => {
    var _id = req.params._id

    Article
        .findByIdAndRemove(_id, (doc => {
            res.status(200).send({success: '删除成功！'})
        }))
        .catch(err => {
            res.status(400).send(err)
        })
}