const webpack = require('webpack')
const rm = require('rimraf')

const webpackConfig = require('./webpack.config').prod

rm(webpackConfig.output.path, function(err) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw err

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
    })
})