var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')
var prodConfig = Object.create(baseConfig)

prodConfig.devtool = 'source-map'
prodConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
	
    new webpack.optimize.UglifyJsPlugin({
        compress: {
		  warnings: false,
		  drop_console: false,
		}
    })
)

// 异步加载的分包 loader


module.exports = prodConfig
