var webpack = require('webpack')
console.log(__dirname)
var path = path = require('path')
var rootPath = path.dirname(__dirname)
var os = require('os');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var banner = os.userInfo().username + ' modified this file at ' + new Date().toLocaleString();
module.exports = {
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
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
    resolve: {
       /* modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json','less','scss','html','.js-lazy', '.jsx-lazy'],

        // extensions: ['', '.js', '.jsx', '.js-lazy', '.jsx-lazy'],
        root: rootPath,*/
        alias: {
            'base': path.join(__dirname,'../scripts/core/base.js'),
            'basePC': path.join(__dirname,'../scripts/core/base-pc.js'),
            'baseApp': path.join(__dirname,'../scripts/core/base-app.js'),
            // plugin
            'iscroll' : path.join(__dirname,'../scripts/widget/iscroll'),
            'swiper' : path.join(__dirname,'../scripts/widget/swiper'),
            //'datepicker' : path.join(__dirname,'../scripts/widget/datepicker'),
            'wechart' : path.join(__dirname,'../scripts/widget/jweixin-1.0.0'),
            'lazyload' : path.join(__dirname,'../scripts/widget/lazyload'),
            'underscore': path.join(__dirname,'../scripts/widget/underscore'),
            'layerApp' : path.join(__dirname,'../scripts/widget/layer-mobile/layer'),
            'layerAppCss' : path.join(__dirname,'../scripts/widget/layer-mobile/need/layer.css'),
            'layerPc' : path.join(__dirname,'../scripts/widget/layer-pc/layer'),
            'layerPcCss' : path.join(__dirname,'../scripts/widget/layer-pc/skin/layer.css'),
            'layerPc301' : path.join(__dirname,'../scripts/widget/layer301-pc/layer'),
            'layerPcCss301' : path.join(__dirname,'../scripts/widget/layer301-pc/skin/layer.css'),
            'pjax' : path.join(__dirname,'../scripts/widget/pjax'),
            'serialize' : path.join(__dirname,'../scripts/widget/serialize-lazy'),
            'validatePC' : path.join(__dirname,'../scripts/widget/validate-pc-lazy'),
            'serialize1' : path.join(__dirname,'../scripts/widget/serialize'),
            'validatePC1' : path.join(__dirname,'../scripts/widget/validate-pc'),
            'Picker':path.join(__dirname,'../scripts/widget/picker.min.js'),
            'Time':path.join(__dirname,'../scripts/widget/Time.js'),
            'jqueryForm' : path.join(__dirname,'../scripts/widget/jquery-form'),
            'sliderPc' : path.join(__dirname,'../scripts/widget/slider-pc'),
            'datePicker' : path.join(__dirname,'../scripts/widget/datepicker/datepicker'),
            'pagerControlPC' : path.join(__dirname,'../scripts/widget/pagerControl'),
            // template

            // react
            'Modal' : path.join(__dirname,'../node_modules/amazeui-touch/lib/Modal/Modal'),
            'ModalTrigger' : path.join(__dirname,'../node_modules/amazeui-touch/lib/ModalTrigger'),
            'Button' : path.join(__dirname,'../node_modules/amazeui-touch/lib/Button'),

            // util
            'util' : path.join(__dirname,'../scripts/utils/util'),
            'utility_app' : path.join(__dirname,'../scripts/utils/utility_app'),
            'cookieUtils' : path.join(__dirname,'../scripts/utils/cookie'),
            'fetch': path.join(__dirname,'../scripts/utils/util.fetch'),
            'queryString' : path.join(__dirname,'../scripts/utils/util.querystring'),
            'validate':path.join(__dirname,'../scripts/utils/util.validate'),
            'storage':path.join(__dirname,'../scripts/utils/storage'),
            'storage11':path.join(__dirname,'../scripts/utils/util.storage.1.1'),
            'reactUI':path.join(__dirname,'../scripts/widget/react-ui/'),
            'IScroll':path.join(__dirname,'../scripts/widget/react-ui/'),
            'reactCalendar': path.join(__dirname,'../scripts/widget/react-ui/calendar/calendar'),
            'reactStepper': path.join(__dirname,'../scripts/widget/react-ui/stepper/stepper'),
            // less
            'modalLess' : path.join(__dirname,'../node_modules/amazeui/dist/css/amazeui.min.css'),
            // core
            'es5' : path.join(__dirname,'../scripts/core/es5'),
            'layui' : path.join(__dirname,'../scripts/core/layui'),
            'BaseFetch':path.join(__dirname,'../scripts/core/base-fetch'),

            // jquery ui
            'datepickerJs' : path.join(__dirname,'../scripts/widget/jquery-ui/datepicker/jquery-ui.js'),
            'datepickerCss' : path.join(__dirname,'../scripts/widget/jquery-ui/datepicker/jquery-ui.css')
        }
    },
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'jQuery':'window.jQuery',
        'jquery':'window.jQuery',
        'Zepto':'window.Zepto',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new webpack.BannerPlugin({
            banner: banner
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
        }),
    ]
}