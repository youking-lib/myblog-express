const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const runsack = require('rucksack-css')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')

const theme = require('../theme.js')()

const postcssPlugins = () => [
    runsack(),
    autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
]

const baseConfig = {
    // click on the name of the option to get to the detailed documentation
    // click on the items with arrows to show more examples / advanced options

    entry: "./src/index.js", // string | object | array
    // Here the application starts executing
    // and webpack starts bundling

    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, "../web/public/assets"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "bundle.js", // string
        // the filename template for entry chunks

        publicPath: "/public/assets/", // string
        // the url to the output directory resolved relative to the HTML page

        // library: "MyLibrary", // string,
        // the name of the exported library

        // libraryTarget: "umd", // universal module definition
        // the type of the exported library

        /* Advanced output configuration (click to show) */
    },

    module: {
        // configuration regarding modules

        rules: [
            // rules for modules (configure loaders, parser options, etc.)

            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: [
                    /node_modules/
                ],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude
                // - Try to avoid exclude and prefer include

                // issuer: { test, include, exclude },
                // conditions for the issuer (the origin of the import)

                // enforce: "pre",
                // enforce: "post",
                // flags to apply these rules, even if they are overridden (advanced option)

                loader: "babel-loader",
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons
                // see webpack 1 upgrade guide

                options: {
                    presets: [
                        ["env", {
                            modules: "commonjs"
                        }],
                        "react", "stage-0"
                    ],
                    plugins: [
                        ["import", { "libraryName": "antd", "style": true }],
                        // Babel@6 transforms export default as exports.default = 'foo'
                        "add-module-exports",
                        "transform-runtime", 
                    ]
                },
                // options for the loader
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.html$/,

                use: [
                    // apply multiple loaders and options
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
            // css不需要开启css-module功能
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1} },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: postcssPlugins
                            }
                        }
                    ]
                })
            },
            {
                test: /\.module.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]'}  },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: postcssPlugins
                            }
                        }
                    ]
                })
            },
            // less不需要开启css-module功能
            {
                test: function(filepath){
                    return /\.less$/.test(filepath) && !/\.module\.less$/.test(filepath)
                },
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {
                            loader: 'css-loader', 
                            options: { importLoaders: 1} 
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: postcssPlugins
                            }
                        },
                        {
                            loader: 'less-loader', 
                            options: {"modifyVars": theme}
                        }
                    ]
                })
            },
            {
                test: /\.module\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {
                            loader: 'css-loader', 
                            options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]'} 
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: postcssPlugins
                            }
                        },
                        {
                            loader: 'less-loader', 
                            options: {"modifyVars": theme}
                        }
                    ]
                })
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }

            // { oneOf: [ /* rules */ ] },
            // // only use one of these nested rules

            // { rules: [ /* rules */ ] },
            // // use all of these nested rules (combine with conditions to be useful)

            // { resource: { and: [ /* conditions */ ] } },
            // // matches only if all conditions are matched

            // { resource: { or: [ /* conditions */ ] } },
            // { resource: [ /* conditions */ ] },
            // // matches if any condition is matched (default for arrays)

            // { resource: { not: /* condition */ } }
            // // matches if the condition is not matched
        ],

        /* Advanced module configuration (click to show) */
    },

    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)

        // modules: [
        //  "node_modules",
        //  __dirname
        // ],
        // directories where to look for modules

        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions that are used

        alias: {
            // a list of module name aliases

            // "module": "new-module",
            // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

            // "only-module$": "new-module",
            // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"

            "components": path.resolve(__dirname, "../src/components"),
            // "module": path.resolve(__dirname, "app/third/module.js"),
            // alias "module" -> "./app/third/module.js" and "module/file" results in error
            // modules aliases are imported relative to the current context
        },
        /* alternative alias syntax (click to show) */

        /* Advanced resolve configuration (click to show) */
    },

    performance: {
        hints: "warning", // enum
        maxAssetSize: 20000000, // int (in bytes),
        maxEntrypointSize: 40000000, // int (in bytes)
        assetFilter: function(assetFilename) { 
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    devtool: "source-map", // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

    context: path.resolve(__dirname, '../'), // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory

    target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules

    externals: [
        {
            react: 'React',
            // antd: 'antd',
            'react-dom': 'ReactDOM'
        }
    ],
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: "normal",
    // lets you precisely control what bundle information gets displayed

    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api/v1/': 'http://localhost:8080'
        },
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        // ...
    },

    // plugins: [
    //     new ExtractTextPlugin({
    //         filename: 'css/[name]-[hash].css'
    //     }),

    //     new HtmlWebpackPlugin({
    //         template: '../src/index.ejs',
    //         filename: '[name]-[hash].html',
    //         inject: true
    //     }),
        
    //     new FriendlyErrorsPlugin()
    //     // ...
    // ],
    // // list of additional plugins


    /* Advanced configuration (click to show) */
}

// const webpackEntry = ['webpack-hot-middleware/client?noInfo=true&reload=true', baseConfig.entry]
const webpackEntry = ['./build/dev-client', baseConfig.entry]
const devConfig = merge(baseConfig, {
    entry: webpackEntry,
    output: {
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name]-[hash].css',
            allChunks: false,

        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: 'index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ],
    // list of additional plugins
})

const prodConfig = {

}

module.exports = {
    dev: devConfig,
    prod: prodConfig,
    proxyTable: {
        '/api/v1/': 'http://localhost:8080'
    }
}