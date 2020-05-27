const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const read = require('./config/method.config.js').read;
const htmlplugin = require('./config/method.config.js').htmlplugin;

const DIST = '../dxj-portal';
var commonJs = ['whatwg-fetch','babel-polyfill',"js/libs/autosize.js"];

const pluginsText = new Date().toLocaleString() + '\n\r * built `dongxingjiPortal`';

const EXE_NAME = process.env.EXE_NAME || '';

var entryFiles = {};
var entryHtmls = [];
read('js/page','.js',(name,pathObj)=>{
    // 暂不开放js/page 文件夹包文件，如有需求请联系zhe-he
    entryFiles[name] = `js/page/${pathObj.base}`;
});
read(`html/${EXE_NAME}`,'.html',(name,pathObj,filePath)=>{
    let rePath = path.relative(__dirname,filePath);
entryHtmls.push(htmlplugin(rePath,name));
});

// filter
if(EXE_NAME){
    let entryFilter = [];
    let entryResult = {};
    for (var i = 0; i < entryHtmls.length; i++) {
        let opt = entryHtmls[i].options;
        if (opt) {
            let tpl = opt.template;
            let reDir = new RegExp('^html[\\/\\\\]'+EXE_NAME+'[\\/\\\\]([\\w-]+)\\.html$','g');
            if (reDir.test(tpl)) {
                entryFilter.push(RegExp.$1);
            }else{
                entryHtmls.splice(i,1);
                i--;
            }
        }
    }
    Object.keys(entryFiles).forEach((item)=>{
        if (entryFilter.indexOf(item)!=-1) {
        entryResult[item] = entryFiles[item];
    }
});
    entryFiles = entryResult;
}

Object.assign(entryFiles,{
    // 自定义
    vendor: commonJs
});

/*
 entryHtmls.push( htmlplugin('自定义页面名','上述自定义的name') );
 */

var loaders = [
    {loader: 'css-loader'},
    {
        loader: 'postcss-loader',
        options: {
            config: 'config/postcss.config.js'
        }
    }
];
module.exports = {
    entry: entryFiles,
    output: {
        publicPath: '../',
        path: path.resolve(__dirname, DIST),
        filename: 'js/[name].js',
        //chunkFilename: 'js/[name].js'
    },
    // 插件项
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common","vendor"],
            minChunks: 3            //
        }),
        new ExtractTextPlugin('css/[name].css'),
        new CopyWebpackPlugin([
            {from: 'images/tmp/**/*'},
            {from: 'js/data/page/**/*'}
        ])
    ].concat(entryHtmls),
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude:/(node_modules|libs|components|videojs-contrib-hls\.js)/,
                use: [
                    {
                        loader:'babel-loader?compact=false',
                        options: {presets: [["es2015", { "modules": false }]]}
                    }
                    
                ]
            },
            {test: /\.tsx?$/,exclude:/(node_modules)/,use:['ts-loader']},
            {
                test: /\.css$/,
                include:/components/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{loader: "css-loader"}]
                })
            },
            {
                test: /\.css$/,
                exclude:/node_modules|components/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: loaders
                })
            },
            {
                test: /\.(scss|sass)$/,
                exclude:/node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: loaders.concat({loader: 'sass-loader'})
                })
            },
            {
                test: /\.less$/,
                exclude:/node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: loaders.concat({loader: 'less-loader'})
                })
            },
            {
                test: /\.vue$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            preserveWhitespace: false,
                            postcss: [autoprefixer({browsers: ['last 9 versions']})],
                            loaders: {
                                // 'ts': 'vue-ts-loader',
                                'js': 'babel-loader?presets[]=es2015'
                            }
                        }
                    }
                ]
            },
            {test: /\.(json|data)$/,exclude:/node_modules/,use: ['json-loader']},
            {test: /\.(txt|md)$/,exclude:/node_modules/,use: ['raw-loader']},
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude:/node_modules|tmp|new_index/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            publicPath: '../',
                            limit: 8192,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                include:/tmp|new_index/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 1,
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff2?|svg|eot)$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            publicPath: '../',
                            limit: 1,
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    // 其他配置
    resolve: {
        modules: [
            process.cwd(),
            "node_modules"
        ],
        extensions: ['.ts','.js','.vue'],
        alias: {
            // "zepto": 			'js/libs/zepto.min.js',
            "jquery": 			'js/libs/jquery.min.js',
            "vue": 				  'js/libs/vue.common.js',
            //"vue1": 			  'js/libs/vue.min.js',
            "swiper": 			'js/libs/swiper.min.js',
            "lazysizes": 	'js/libs/lazysizes.min.js',
            //"dataFormat": 	'js/modules/dataFormat.js',
            //"cookie":      'js/modules/cookie.js',
            //"method": 			'js/modules/method.js',
            //"vueFilter": 	'js/modules/vueFilter.js',
            "pop-layer": 	'js/modules/pop-layer.vue',
            "loading":     "js/modules/loading.vue",
            "nativeA": 		'js/data/inter.js',
            "headerNav":   'js/modules/headerNav.vue',
            "headerOpacityNav" :  'js/modules/headerOpacityNav.vue',
            //"luckDraw":    'js/modules/luckDraw.vue',
            //"js-base64": 	'js/libs/base64.min.js'
            "webworkify": 'webworkify-webpack-dropin',
            "fastclick": "js/libs/fastclick.js",
            "axiosServer":   'js/modules/axiosServer.js'
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            preserveComments: false,
            mangle: false
        }),
        new webpack.BannerPlugin(pluginsText)
    ])
} else {
    
    /*module.exports.module.rules.unshift({
     test: /\.(js|vue)$/,
     exclude: /lib|components/,
     loader: "eslint-loader",
     options: {
     configFile:  path.resolve(__dirname, 'config/.eslintrc')
     },
     enforce: 'pre'
     })*/
}