var Keyword = require('../models/Keyword')

/**
 * 创建关键词
 */
exports.create = (req, res, next) => {
    req.checkBody({
        title: {
            notEmpty: {
                options: [true],
                errorMessage: '名称必须有哦！'
            }
        }
    })

    req.getValidationResult().then(errs => {
        if(!errs.isEmpty()) {
            return res.status(400).json(errs)
        }

        Keyword
            .create(req.body)
            .then(doc => {
                res.status(200).send({success: '创建成功！', data: doc})
            })
            .catch(err => res.status(400).send(err))
    })
}

/**
 * 获取关键词列表
 */
exports.list = (req, res, next) => {
    var query = req.query || {}

    Keyword
        .find(query)
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
 * 删除关键词
 */
exports.del = (req, res, next) => {

    var _id = req.params._id

    Keyword
        .findByIdAndRemove(_id)
        .then(doc => {
            res.status(200).send({success: '删除成功!'})
        })
        .catch(err => {
            err.type = 'database'
            next(err)
        })
}



