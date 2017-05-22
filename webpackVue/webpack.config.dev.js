var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')
var devConfig = Object.create(baseConfig)

//devConfig.debug = true
devConfig.watch = true
devConfig.devtool = 'source-map'

module.exports = devConfig
