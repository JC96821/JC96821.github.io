const path = require('path');
const WebpackMerge = require('webpack-merge');
const WebpackConfig = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compress-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack-merge 合并配置
// copy-webpack-plugin 拷贝静态资源
// optimize-css-assets-webpack-plugin 压缩css
// uglifyjs-webpack-plugin 压缩js

module.exports = WebpackMerge(WebpackConfig, {
    mode: 'production',
    // devtool: 'cheap-module-source-map',
    devtool: false,
    // 优化
    optimization: {
        // 极小化
        minimizer: [
            new UglifyJsPlugin({
                cach: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                }
            }
        }
    },
    plugins: [
        new CompressionWebpackPlugin()
    ]
});