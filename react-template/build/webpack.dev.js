const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const WebpackConfig = require('./webpack.config');

module.exports = WebpackMerge.merge(WebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 3000
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
});