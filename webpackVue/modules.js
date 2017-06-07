/**
    该文件将 webpack.config.js 里的 entry/output 配置抽离
*/
fs=require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var rootPath = path.dirname(__dirname)

module.exports=getConfigs; 

function getConfigs(pathBase,filters,isProduction){ 
console.log(pathBase)
    var filenames=fs.readdirSync(path.join(__dirname,'../',pathBase,'src/js/')).filter(function(dirname){
		return /\.js[x]?$/.test(dirname)&& (!filters||filters.length==0||filters.indexOf(dirname.split('.')[0])>-1);
	})
		/*
    var filename= '[name].js';
    var chunkFilename = '[name].min.js';
    if(isProduction){
        var filename= '[name].[hash].js';
        var chunkFilename = '[name].[hash].min.js';
        // var publicPath = ''
        // var publicPath = ''
    }
	*/
    var configs={
        entry:{},
		plugins:[],
        output: {
            path:path.join(path.join(__dirname,'../',pathBase,'dist/js/')),
            filename: '[name].js',
            chunkFilename: '[name].min.js',
            publicPath : "./js/"
        }
    };

    filenames.forEach(function(filename){
        configs.entry[filename.split('.')[0]]=path.join(__dirname,'../',pathBase,'src/js/',filename);
		var fName = filename.split('.js')[0];
		configs.plugins.push(
			new HtmlWebpackPlugin({
				filename:'../'+fName+'.html',
				chunks:[fName],
				hash:true,
				template:path.join(__dirname,'../',pathBase,'/layout.html')
			})
		)
		
    })
    return configs;
}