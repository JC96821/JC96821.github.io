const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../public/index.html'),
        cdn: {
            js: [
                'https://unpkg.com/react@16/umd/react.development.js',
                'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
                'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.0/echarts.min.js'
            ]
        },
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    }),
    new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
        chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, '../../public/static'),
                to: path.resolve(__dirname, '../../dist/static')
            }
        ]
    })
];