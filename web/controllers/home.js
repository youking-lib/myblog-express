var path = require('path')
/**
 * 首页
 */
exports.index = function(req, res){
    res.sendFile(path.resolve(__dirname, '../public/assets/index.html'))
}