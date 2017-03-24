(function() {
  var ROOT_PATH = require('root-path');
  var config = require('./webpack.config');
  var nx = require('next-js-core2');
  var path = require('path');
  var webpack = require('webpack');
  var entries = require('webpack-entries');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var baseEntries = entries('src/modules/**/*.js');
  var webpackPlugins = [
    new webpack.ProvidePlugin({}),
    new webpack.NoErrorsPlugin(),
    // split vendor js into its own file,
    new ExtractTextPlugin('[name]-[chunkhash:6].css'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/vendors/manifest.json'),
    })
  ];

  module.exports = {
    baseEntries: baseEntries,
    plugins: webpackPlugins,
    // externals: {
    //   'react': 'React',
    //   'react-dom': 'ReactDOM'
    // },
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
        loader: 'html-loader?minimize=false'
      }, {
        test: /\.js|jsx$/,
        loaders: ['react-hot'],
        include: path.join(__dirname, 'js')
      }, {
        test: /\.hbs$/,
        loader: "handlebars"
      }]
    },
    resolve: {
      extensions: ['', '.js', '.scss'],
      alias: {
        node_modules: path.join(__dirname, '../node_modules'),
        bower_components: path.join(__dirname, '../bower_components'),
        components: path.join(__dirname, '../src/components'),
        modules: path.join(__dirname, '../src/modules'),
        images: path.join(__dirname, '../src/assets/images'),
        vendor: path.join(__dirname, '../src/vendor'),
      }
    }
  };

}());
