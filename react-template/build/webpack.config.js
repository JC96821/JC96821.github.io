const path = require('path');
const plugins = require('./plugins');
const rules = require('./loaders');

// const devMode = process.argv.indexOf('--mode=development') !== -1;

module.exports = {
    mode: 'development',
    target: ['web', 'es5'],
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, '../src/main.tsx')
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    output: {
        filename: '[name].[contenthash].js',
        // publicPath: './',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules
    },
    plugins
}