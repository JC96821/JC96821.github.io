
module.exports = [
    {
        test: /\.(jpe?g|png|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                }
            }
        ]
    },
    {
        test: /\.(mp4|mp3|wav|flac)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'media/[name].[hash:8].[ext]'
                        }
                    }
                }
            }
        ]
    }
];