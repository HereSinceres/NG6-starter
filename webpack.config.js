/* global process */
/* global __dirname */

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'production';//development

module.exports = {
    entry: {
        app: [
            "./client/app/app",
            'webpack/hot/dev-server',//热加载需要这一句http://localhost:8080/webpack-dev-server/bundle
        ],
        login: [
            "./client/login/login",
            'webpack/hot/dev-server',//热加载需要这一句http://localhost:8080/webpack-dev-server/bundle
        ]
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '',
        path: path.resolve(__dirname, 'dist')
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,
    module: {
        loaders: [
            {
                test: /\.js$/, exclude: [/app\/lib/, /node_modules/],
                loader: 'ng-annotate!babel?presets[]=es2015'
            },
            { test: /\.html$/, loader: 'raw' },
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        //手动注入文件
        new HtmlWebpackPlugin({
            chunks: ['login','common'],
            filename: 'login.html',
            template: 'client/login.html',
            inject: 'body',
            hash: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['app',  'common'],
            filename: 'index.html',
            template: 'client/index.html',
            inject: 'body',
            hash: true
        }),

        // Automatically move all modules defined outside of application directory to vendor bundle.
        // If you are using more complicated project structure, consider to specify common chunks manually.
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: "vendor.js",
        //     minChunks: function(module, count) {
        //         return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
        //     }
        // }),  
        new webpack.optimize.CommonsChunkPlugin({
            name: "common" 
        }),
        // Adds webpack HMR support. It act's like livereload,
        // reloading page after webpack rebuilt modules.
        // It also updates stylesheets and inline assets without page reloading.
        new webpack.HotModuleReplacementPlugin()
    ],
    //webpack-dev-server代理
    devServer: {
        contentBase: __dirname + '/client',
        host: 'localhost', // default
        port: 8080,// default
        hot: true,
        historyApiFallback: true // if static file not found, go /index.html
    }
};




if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true,
            },
            mangle: {
                // You can specify all variables that should not be mangled.
                // For example if your vendor dependency doesn't use modules
                // and relies on global variables. Most of angular modules relies on
                // angular global variable, so we should keep it unchanged
                except: ['$super', '$', 'exports', 'require', 'angular']
            }
        })
    );
}


//热加载
// require the original webpack.config.js
// entry push 'webpack/hot/dev-server'  
// plugins push new webpack.HotModuleReplacementPlugin()
// add property devServer: { hot: true }