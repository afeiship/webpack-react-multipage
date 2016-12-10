(function() {

  var webpack = require('webpack');
  var path = require('path');
  var $ = require('./webpack.base');
  var config = require('./webpack.config.js');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var entries = require('webpack-entries');
  var webpackEntries = entries(config.appEntries);
  var productPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: config.vendorName,
      chunks:Object.keys($.processedEntries)
    })
  ];

  $.initMultiHtmlWebpackPlugins();

  productPlugins = $.plugins.concat(productPlugins);

  module.exports = {
    entry: $.processedEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name]-[hash:6].js',
      chunkFilename: '[id]-[hash:6].js',
      minify: false,
      publicPath: '/'
    },
    plugins: productPlugins,
    module: $.module,
    vue: $.vue,
    babel: $.babel,
    resolve: $.resolve
  };


}());
