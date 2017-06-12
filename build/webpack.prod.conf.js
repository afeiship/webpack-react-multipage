(function() {

  const webpack = require('webpack');
  const path = require('path');
  const $ = require('./webpack.base');
  const webpackMerge = require('webpack-merge');
  const config = require('./webpack.config');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
  const nx = require('next-js-core2');
  const baseEntries = $.baseEntries;
  let productEntries = {};
  let productPlugins = [];
  let sliceLength = config.spa ? 4 : 12;
  

  nx.each(baseEntries,function(key){
    productEntries[key.slice(sliceLength)] = baseEntries[key];
  });

  productPlugins = [
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
          filename: name.slice(sliceLength) + '.html',
          template: name + '.jade',
          minify: false,
          chunks: [config.vendorName, name.slice(sliceLength)]
        })
      );
      productPlugins.push(plugin);
    }
  });
  productPlugins.push( new HtmlWebpackPugPlugin() );

  module.exports =webpackMerge($, {
    entry: productEntries,
    output: config.output,
    plugins: productPlugins
  });


}());
