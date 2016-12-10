(function() {

  var path = require('path');
  var webpack = require('webpack');
  var $ = require('./webpack.base');
  var config = require('./webpack.config.js');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var nx = require('next-js-core2');
  var hotReloadEntries = {};
  var hotReloadPlugins = [
    new webpack.HotModuleReplacementPlugin()
  ];

  nx.each($.webpackEntries,function(name,path) {
    if (name.indexOf('index') > -1) {
      var plugin = new HtmlWebpackPlugin({
        filename: name+ '.html',
        template: name + '.html',
        inject: true,
        hash: 5,
        chunks: [config.vendorName, name]
      });
      $.plugins.push(plugin);
    }
  })

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
