var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')
var prodConfig = Object.create(baseConfig);
// var CompressionPlugin = require("compression-webpack-plugin");
prodConfig.devtool = 'source-map'
prodConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    // 解决重复引用组件的问题
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
        //comments: false,        //去掉注释
        compressor: {
            unused: true,
            drop_console: true,
            drop_debugger: true,
            dead_code: true,
            properties: false,
            screw_ie8: true,
            warnings: false
        },
        minimize: true
    })
)

// 异步加载的分包 loader
prodConfig.module.postLoaders.push({
    test: /\.(js|jsx)-lazy$/,
    exclude: /node_modules/,
    loader: 'bundle-loader?lazy&name=[name]!es3ify-loader'
})

module.exports = prodConfig
