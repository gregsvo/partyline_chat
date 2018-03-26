const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxy = require('./server/webpack-dev-proxy');

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body',
  }),
];

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.js'),
  },
  context: path.join(__dirname, './src'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  mode: 'development',

  devtool: 'source-map',
  plugins: basePlugins,

  devServer: {
    historyApiFallback: { index: '/' },
    proxy: proxy(),
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      { test: /\.js$/, use: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.(woff|woff2|ttf|eot)$/, loader: 'url-loader?prefix=font/&limit=5000' },
    ],
  },
};
