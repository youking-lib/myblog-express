const path = require('path')
const fs = require('fs')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')

const config = require('./webpack.config.js')
const webpackConfig = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']
const PORT = process.env.PORT || 7878
const proxyTable = config.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: 'minimal',
    quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: console.log
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)


const staticPath = webpackConfig.output.publicPath
app.use(staticPath, express.static('./static'))

devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + 'http://localhost:' + PORT)
})

var server = app.listen(PORT)

module.exports = {
    close: function(){ server.close }
}




