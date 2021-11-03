const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');

const base = require('./webpack.base.config');

const glob = require('glob');

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const config = merge(base, {
    entry: {
        app: './entry-client.js'
    },
    resolve: {
        alias: {
            'create-api': './create-api-js'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "initial",
                    minSize: 1,
                    priority: 0,
                    minChunks: 2, // 同时引用了2次才打包
                },
                // 打包第三方库的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    priority: 10,
                    minChunks: 2, // 同时引用了2次才打包
                }
            }
        },
        runtimeChunk: {name: 'manifest'} // 用来分离运行时的代码
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"',
            'process.env.DEBUG_API': '"true"'
        }),
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin()
    ]
})

module.exports = config;
