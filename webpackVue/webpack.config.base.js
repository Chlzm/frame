var webpack = require('webpack')
var path = path = require('path')
var rootPath = path.dirname(__dirname);
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var os = require('os');
var banner = os.userInfo().username + ' modified this file at ' + new Date().toLocaleString();
module.exports = {
    entry: '../test/app/src/main.js',
    output: {
        path: __dirname,
        filename: 'build1.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' },
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    use: ['css-loader','style-loader']
                })
            },{
                test: /\.pug$/,
                use:[{
                    loader:"pug-loader"
                }]
            },{
                test:/\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use:[{
                    loader:"url-loader?limit=30000&name=[name]-[hash].[ext]"
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new webpack.BannerPlugin({
            banner: banner
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'../template.html',
        })
    ]
}