const path    = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cleanCss = require('clean-css');

module.exports = {
  entry: [
    './src/client/index.tsx',
  ],
  output: {
    filename: 'build/bundle.js',
    path: path.join(__dirname, '/docs'),
  },
  devtool: 'source-map',
  plugins: [
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: cleanCss.process,
      cssProcessorOptions: {
        level: 2,
      },
      canPrint: true
    }),
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
        test: /\.tsx?$/,
        loader: [
          'awesome-typescript-loader'
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {loader: 'svg-inline-loader'},
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {loader: 'base64-inline-loader'},
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {
              sourceMap: false,
            }
          },
          {loader: 'postcss-loader', options: {
              sourceMap: false,
            }
          },
          {loader: 'sass-loader', options: {
              sourceMap: false,
              data: ';@import "global.scss";',
              includePaths: [
                path.join(__dirname, 'src/shared/global')
              ]
            }
          },
        ],
      },
    ]
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, './src/shared'),
    },
    extensions: ['.ts', '.tsx', '.js']
  },
};
