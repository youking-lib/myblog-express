var Media = require('../models/Media'),
    Upload = require('../libs/upload')

exports.query = (req, res, next) => {
    req.checkQuery({
        type: {},
        quote: {
            optional: true,
            isString: {
                errorMessage: 'quote 必须为字符串'
            }
        }
    })

    var query = req.query
    Media
        .find(query)
        .then(media => {
            res.status(200).json({data: media})
        })
        .catch(err => {
            err.type = 'database'
            next(err)
        })
}

exports.create = (req, res, next) => {
    var file = req.body.files.file
    if(!file) {
        return res.status(400).end()
    }
    var fileData = {
        type: file.type,
        filename: file.name,
        size: file.size,
        memoryPath: file.path,
        quote: req.body.fields.quote
    }
    
    Upload.saveMedia(fileData, (err, data) => {
        if (err) return res.status(500).end()

        res.status(200).json({data: data})
    })
}

exports.del = (req, res, next) => {
    var _id = req.params._id
    req.checkParams({
        _id: {
            notEmpty: {
                errorMessage: 'id 不存在哦'
            }
        }
    })
    req.getValidationResult().then(errs => {
        if (!errs.isEmpty()){
            return res.status(400).end()
        }
    })
    Media
        .findByIdAndRemove(_id)
        .then(doc => res.status(200).json({status: 'success'}))
        .catch(err => {
            err.type = 'database'
            next(err)
        })
}