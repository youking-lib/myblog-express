var fs = require('fs')

exports.mkdir = (folder) => {
    return new Promise((resolve, reject) => {
        fs.exists(folder, (exists) => {
            exists ? resolve() : fs.mkdir(folder, (err) => {
                if (err) return reject(err)

                resolve()
            })
        })
    })
}