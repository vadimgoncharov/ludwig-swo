const path    = require('path');
const webpack = require('webpack');

const DEV_SERVER_PORT = 3000;
const DEV_SERVER_HOST = '0.0.0.0';

module.exports = {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    `webpack-dev-server/client?http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    './src/client/index.js',
  ],
  output: {
    filename: 'build/bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, '/docs')
  },
  devServer: {
    contentBase: __dirname + '/docs',
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true,
    noInfo: false,
    stats: 'minimal',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

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
            sourceMap: true,
          }},
          {loader: 'sass-loader', options: {
            sourceMap: true,
            data: ';@import "global.scss";',
            includePaths: [
              path.join(__dirname, 'src/shared/global')
            ]
          }},
          {loader: 'postcss-loader', options: {
            sourceMap: true,
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
