const webpack = require('atool-build/lib/webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = function(webpackConfig, env) {
  webpackConfig.output.path = path.join(__dirname, '../web/public/assets')
  webpackConfig.output.publicPath = '/public/assets/'
  webpackConfig.output.filename = '[name]-[hash].js'


  webpackConfig.module.loaders.push({
    test: /\.ejs$/,
    loader: 'ejs-loader'
  })

  // 分离静态资源
  webpackConfig.externals = webpackConfig.externals || {}
  webpackConfig.externals.React = 'React'

  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    "libraryName": "antd",
    "style": true
  }])
 
  webpackConfig.plugins.unshift(new HTMLWebpackPlugin({
    template: './index.ejs',
    inject: true,
  }))


  webpackConfig.resolve.alias = webpackConfig.resolve.alias || {}
  webpackConfig.resolve.alias.components = path.join(__dirname, './src/components')

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });
  
  return webpackConfig;
};
