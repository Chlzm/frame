var path=require('path');
require('./start');
var [p1,p2,taskName,...fileNames] = process.argv;
var moduleName = taskName.split(':')[0];
var mode = taskName.split(':')[1]
console.log(taskName,fileNames);
if (!moduleName) {
    throw new Error('expect a moduleName of modules.js file')
}

if (!mode) {
    throw new Error('expect a mode, it must be one of ["dev", "prod"]')
}
var webpack = require('webpack')
var modules = require('./webpack/modules')
var configMode=mode==='prod'?'prod':'dev';
var webpackConfig = require('./webpack/webpack.config.' + configMode)
// 是否生产模式
var isProduction = mode === 'prod';
runWebpack(webpackConfig,isProduction);

function runWebpack(baseConfig, isProduction) {
    var config = Object.create(baseConfig)
    var basePath=path.join.apply(path,moduleName.split('-'))
    var moduleConfig = modules(basePath,fileNames,isProduction)
    var outputType = typeof moduleConfig.output

    // merge moduleConfit to config
    Object.assign(config, moduleConfig)
    // handle entry
    config.entry = {}
    config.entry = moduleConfig.entry

    // handle output
    if (outputType === 'string') {
        config.output = {}
        config.output.path = moduleConfig.output
    } else if (outputType === 'object') {
        config.output = Object.assign({}, config.output, moduleConfig.output)
    }
	
    // handle productionConfig
    if (isProduction) {
		basePath = basePath.replace(/\\/,'/');
        config.output.publicPath = `https://ceair-resource.oss-cn-shanghai.aliyuncs.com/${basePath}/js/`;
    }

    return new Promise(function(resolve, reject) {
        var count = 0
        var compiler=webpack(config, function(err, stats) {
            if (err) {
                reject(err)
            }
            if (!stats) {
                return
            }
            var info = stats.toString({
                // output options
                colors: true,
                chunks: false,
                cached: true
            })
            console.log(info)
            if (count === 0) {
                resolve(info)
            } else {
                console.log('change times: ' + count)
            }
            count += 1
        })

    })
}
