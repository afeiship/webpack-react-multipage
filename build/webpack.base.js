(function() {
  var ROOT_PATH = require('root-path');
  var config = require('./webpack.config');
  var nx = require('next-js-core2');
  var path = require('path');
  var webpack = require('webpack');
  var entries = require('webpack-entries');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var webpackEntries = entries('src/modules/**/*.js');
  var webpackPlugins = [
    new webpack.ProvidePlugin({}),
    new webpack.NoErrorsPlugin(),
    // split vendor js into its own file,
    new ExtractTextPlugin('[name]-[hash:5].css')
  ];

  var processedEntries={};

  for (var key in webpackEntries) {
    if (webpackEntries.hasOwnProperty(key)) {
      processedEntries[key.slice(12)]=webpackEntries[key];
    }
  }

  module.exports = {
    webpackEntries: webpackEntries,
    processedEntries:processedEntries,
    plugins: webpackPlugins,
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
      }, {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader?limit=8096&name=images/[name].[ext]'
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8096&name=fonts/[name].[ext]'
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }, {
        test: /\.js|jsx$/,
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
        include: path.join(__dirname, 'js')
      }]
    },
    resolve: {
      extensions: ['', '.js', '.scss'],
      alias: {
        bower_components: path.join(__dirname, '../bower_components')
      }
    }
  };

}());
