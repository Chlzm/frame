/**
    该文件将 webpack.config.js 里的 entry/output 配置抽离
*/
fs=require('fs');
var path = require('path')
var rootPath = path.dirname(__dirname)
var vacationLibPath = path.join(rootPath, 'scripts/core')
var vacationAppPath = path.join(rootPath, 'scripts/core')

// 打包每个页面 js 的配置

// var pageConfigs = {
//     transfer :{
//         entry :{
            
//         },
//         output: {
//             path: 'transfer/app/dest/js',
//             filename: '[name].min.js'
//             ,
//             chunkFilename: '[id].[chunkhash].js'
//         },
//     },
//     mall :{
//         entry : './mall/pc/src/js/index-worldwide.js',
//         output: {
//             path: 'mall/pc/dest/js',
//             filename: 'index-worldwide.min.js',
//             chunkFilename: 'index/[name].[chunkhash].js'
//         },
//     },
// }

// // 打包库的配置
// var libConfigs = {
//     vendor: {
//         entry: './lib/index',
//         output: {
//             path: vacationLibPath,
//             filename: '[name].js',
//             libraryTarget: 'umd'
//         },
//         resolve: {
//             extensions: ['', '.js', '.jsx'],
//             root: rootPath,
//             alias: {
//                 'react': path.join(rootPath, 'lib/react-lite.common'),
//                 'react-dom': path.join(rootPath, 'lib/react-lite.common')
//             }
//         },
//         /*
//          自定义的特殊字段，当打包方式为 production 生产模式时
//          将 productionConfig 的 key/value 合并到 webpackConfig
//          注意：它会覆盖之前的配置
//         */
//         productionConfig: {
//             resolve: {
//                 extensions: ['', '.js', '.jsx'],
//                 root: rootPath,
//                 alias: {
//                     'react': path.join(rootPath, 'lib/react-lite.common'),
//                     'react-dom': path.join(rootPath, 'lib/react-lite.common')
//                 }
//             }
//         }
//     },
//     search_lib: {
//         entry: './lib/search_lib',
//         output: {
//             path: vacationLibPath,
//             filename: '[name].js',
//             libraryTarget: 'umd'
//         }
//     }
// }

// 为 lib 打上标记
// Object.keys(libConfigs).forEach(function(moduleName) {
//     libConfigs[moduleName].isLib = true
// })
// module.exports = Object.assign({}, libConfigs, pageConfigs)

module.exports=getConfigs; 

function getConfigs(pathBase,filters,isProduction){ 
    var filenames=fs.readdirSync(path.join(__dirname,'../',pathBase,'src/js/')).filter(function(dirname){            
            return /\.js[x]?$/.test(dirname)&& (!filters||filters.length==0||filters.indexOf(dirname.split('.')[0])>-1);
        })
    var configs={
        entry:{},
        output: {
            path:path.join(path.join(__dirname,'../',pathBase,'dist','js')),
            filename: '[name].min.js',
            chunkFilename : '[name].min.js',
            //publicPath : "/hotel/pc/dest/js/"
            publicPath : "./js/"
        }
    };
    // if(!isProduction){
    //     configs['devServer']={            
    //         inline: true,
    //         contentBase: path.join(__dirname,'../',pathBase,'dest'),
    //         port: 4000
    //     }
    // }
    filenames.forEach(function(filename){
        configs.entry[filename.split('.')[0]]=path.join(__dirname,'../',pathBase,'src/js/',filename);
    })
    
    return configs;
}