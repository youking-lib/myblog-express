var formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    fsUtils = require('../utils/fs'),
    Media = require('../models/Media'),
    async = require('async')

exports.formidable = () => {
    var form = new formidable.IncomingForm()
    return (req, res, next) => {
        form.parse(req, (err, fields, files) => {
            if (err) return next(err)

            req.body.fields = fields
            req.body.files = files
            next()
        })
    }    
}

exports.saveMedia = (data, callback) => {
    async.waterfall([
        // 存入数据库
        function (next) {
            var _media = {
                type: data.type,
                filename: data.filename,
                size: data.size,
                quote: data.quote
            }
            Media
                .create(_media)
                .then(doc => { 
                    var url = doc.get('url')
                    var uid = doc.get('uid')
                    var key = doc.get('key')
                    var res = doc.toObject()
                    res.url = url
                    res.uid = uid
                    res.key = key
                    next(null, res)
                 })
                .catch(err => next(err))
        },
        // 存为文件
        function (mediaDoc, next) {
            var memoryPath = data.memoryPath
            var filename = mediaDoc._id + '-' + mediaDoc.filename
            var folder = path.resolve(__dirname, '../public/media/' + mediaDoc.quote)

            fsUtils.mkdir(folder).then(() => {
                var reader = fs.createReadStream(memoryPath)
                var writer = fs.createWriteStream(folder + '/' + filename)
                reader.pipe(writer)
                reader.on('end', function(){
                    next(null, mediaDoc)
                })
            }).catch(err => next(err))
        }
    ], callback)
}

exports.saveMediaToDb = (data) => {
    
    return Media
        .create(data)
        .then(doc => doc)
}

exports.saveMediaAsFile = (data) => {
    var memoryPath = data.memoryPath
    var filename = data._id + '-' + data.filename
    var folder = path.resolve(__dirname, '../public/media/' + data.quote)

    return fsUtils.mkdir(folder).then(() => {
        
        var reader = fs.createReadStream(memoryPath)
        var writer = fs.createWriteStream(folder + '/' + filename)
        reader.pipe(writer)
        reader.on('end', function(){
            Promise.resolve(data)
        })
    })
    
}