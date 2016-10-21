(function() {

  var webpack = require('webpack');
  var path = require('path');
  var $ = require('./webpack.base');
  var config = require('./webpack_config.json');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var entries = require('webpack-entries');
  var webpackEntries = entries(config.appEntries);
  var productPlugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: config.vendorName,
      chunks:Object.keys(webpackEntries)
    }),
    // new PurifyCSSPlugin({
    //   paths: [
    //     'modules/**/*.html'
    //   ],
    //   purifyOptions: {
    //     minify: true,
    //     info: true
    //   }
    // })
  ];

  $.initMultiHtmlWebpackPlugins();

  productPlugins = $.plugins.concat(productPlugins);

  module.exports = {
    entry: $.entry,
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
