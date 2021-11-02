const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name]-[chunkhash].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            'components': path.resolve(__dirname, '../src/components')
        },
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 3 versions']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.json/,
                use: 'json-loader'
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: 'warning'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        // new CleanWebpackPlugin({}),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin()
    ]
}