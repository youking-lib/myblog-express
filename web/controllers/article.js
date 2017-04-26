var Article = require('../models/article')

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
            next(err)
        })
}

/**
 * 发表文章
 */
exports.create = (req, res, next) => {
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
        Article
            .create(req.body)
            .then(doc => {
                res.status(200).send({data: doc})
            })
            .catch(err => next(err))
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