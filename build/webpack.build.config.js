const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${baseWebpackConfig.externals.paths.assets}/css/[name].css`,
        }),
    ],

    module: {
        rules:[
            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, '../postcss.config.js'),
                            },
                        },
                    },
                    'less-loader']
            }
        ]
    }
})

module.exports = new Promise((resolve) => {
    resolve(buildWebpackConfig)
})
