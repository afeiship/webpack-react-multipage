(function() {

  var path = require('path');
  var webpack = require('webpack');
  var $ = require('./webpack.base');
  var config = require('./webpack.config.js');
  $.initMultiHtmlWebpackPlugins();

  var hotReloadEntries = {};
  var hotReloadPlugins = [
    new webpack.HotModuleReplacementPlugin()
  ];

  hotReloadPlugins = hotReloadPlugins.concat($.plugins);

  module.exports = {
    entry: $.webpackEntries,
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name].js',
      chunkFilename: '[id].js',
      minify: false,
      publicPath: '/'
    },
    plugins: hotReloadPlugins,
    module: $.module,
    vue: $.vue,
    babel: $.babel,
    resolve: $.resolve,
    devtool: '#source-map',
    devServer: {
      hot: true
    }
  };


}());
