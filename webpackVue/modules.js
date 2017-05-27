/**
    该文件将 webpack.config.js 里的 entry/output 配置抽离
*/
fs=require('fs');
var path = require('path')
var rootPath = path.dirname(__dirname)

module.exports=getConfigs; 

function getConfigs(pathBase,filters,isProduction){ 
    var filenames=fs.readdirSync(path.join(__dirname,'../',pathBase,'src/js/')).filter(function(dirname){
            return /\.js[x]?$/.test(dirname)&& (!filters||filters.length==0||filters.indexOf(dirname.split('.')[0])>-1);
        })
    var filename= '[name].js';
    var chunkFilename = '[name].min.js';
    if(isProduction){
        var filename= '[name].[hash].js';
        var chunkFilename = '[name].[hash].min.js';
        // var publicPath = ''
        // var publicPath = ''
    }

    var configs={
        entry:{},
        output: {
            path:path.join(path.join(__dirname,'../',pathBase,'dist/js')),
            filename: filename,
            chunkFilename: chunkFilename,
            publicPath : "./js/"
        }
    };

    filenames.forEach(function(filename){
        configs.entry[filename.split('.')[0]]=path.join(__dirname,'../',pathBase,'src/js/',filename);
    })
    return configs;
}