(function() {

  let webpack = require('webpack');
  let path = require('path');
  let $ = require('./webpack.base');
  let webpackMerge = require('webpack-merge');
  let config = require('./webpack.config');
  let ExtractTextPlugin = require('extract-text-webpack-plugin');
  let HtmlWebpackPlugin = require('html-webpack-plugin');
  let nx = require('next-js-core2');
  let baseEntries = $.baseEntries;
  let productEntries = {};
  let productPlugins = [];

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
      let plugin = new HtmlWebpackPlugin(
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
