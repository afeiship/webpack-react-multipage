(function() {

  var path = require('path');
  var webpack = require('webpack');
  var $ = require('./webpack.base');
  var webpackMerge = require('webpack-merge')
  var config = require('./webpack.config.js');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var devEnties = $.baseEntries;
  var nx = require('next-js-core2');
  var devPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ];

  nx.each(devEnties,function(name) {
    if (name.indexOf('index') > -1) {
      var plugin = new HtmlWebpackPlugin(
        nx.mix(config.htmlWebpackOptions,{
          filename: name+ '.html',
          template: name + '.ejs',
          chunks: [config.vendorName, name]
        })
      );
      devPlugins.push(plugin);
    }
  });

  module.exports =webpackMerge($,{
    entry:devEnties,
    output: config.output,
    plugins: devPlugins,
    devtool: '#source-map',
    devServer: config.devServer
  });


}());
