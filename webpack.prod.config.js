const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/client/index.js',
  ],
  output: {
    filename: 'build/bundle.js',
    path: path.join(__dirname, '/docs'),
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {
            sourceMap: false,
          }},
          {loader: 'sass-loader', options: {
            sourceMap: false,
            data: ';@import "global.scss";',
            includePaths: [
              path.join(__dirname, 'src/shared/global')
            ]
          }},
          {loader: 'postcss-loader', options: {
            sourceMap: false,
          }},
        ],
      },
    ]
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, './src/shared'),
    }
  },
};
