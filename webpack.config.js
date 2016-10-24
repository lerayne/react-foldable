/**
 * Created by M. Yegorov on 2016-10-24.
 */
// basic imports
var webpack = require('webpack');
var path = require('path');
var cmdArgs = require('minimist')(process.argv.slice(2));

// env variables
var NODE_ENV = process.env.NODE_ENV || cmdArgs.NODE_ENV || 'production';
var DEV = (NODE_ENV === 'development');
var PROD = (NODE_ENV === 'production');

//main webpack configuration
module.exports = {
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.min.js', '.jsx']
    },

    entry: path.join(__dirname, 'src', 'index.jsx'),

    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'react-foldable.js'
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel?cacheDirectory'
            },
            {
                test: /.css$/i,
                loader: 'style!css?localIdentName=[name]-[local]--[hash:base64:5]'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: PROD,
            mangle: PROD,
            comments: DEV,
            compress: {
                warnings: false
            }
        })
    ]
};
