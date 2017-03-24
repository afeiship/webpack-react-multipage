(function() {

  var webpack = require('webpack');
  var path = require('path');
  var $ = require('./webpack.base');
  var webpackMerge = require('webpack-merge')
  var config = require('./webpack.config');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var nx = require('next-js-core2');
  var baseEntries = $.baseEntries;
  var productEntries = {};
  var productPlugins = [];


  nx.each(baseEntries,function(key){
    productEntries[key.slice(12)] = baseEntries[key];
  });

  productPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: config.vendorName,
      chunks: Object.keys(productEntries)
    })
  ];


  Object.keys(baseEntries).forEach(function(name) {
    if (name.indexOf('index') > -1) {
      console.log(name);
      var plugin = new HtmlWebpackPlugin(
        nx.mix(config.htmlWebpackOptions,{
          filename: name.slice(12) + '.html',
          template: name + '.ejs',
          chunks: [config.vendorName, name.slice(12)]
        })
      );
      productPlugins.push(plugin);
    }
  });

  module.exports =webpackMerge($, {
    entry: productEntries,
    output: config.output,
    plugins: productPlugins
  });


}());
