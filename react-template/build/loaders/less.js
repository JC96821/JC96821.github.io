const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.argv.indexOf('--mode=development') !== -1;

module.exports = [
    {
        test: /\.css$/,
        use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    },
    {
        test: /\.less$/,
        use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader',
            {
                loader: 'style-resources-loader',
                options: {
                    patterns: path.resolve(__dirname, '../../src/common/global.less')
                }
            }
        ]
    },
    {
        test: /\.module.less$/,
        use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: devMode
                            ? '[name]-[hash:8]'
                            : '[path]-[name]-[hash:8]'
                    },
                    sourceMap: true,
                    importLoaders: true,
                    localConvention: 'dashes'
                }
            },
            'postcss-loader',
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }
        ],
        exclude: [/node_modules/]
    }
];