(function(){

  const webpack = require('webpack');
  const AssetsWebpackPlugin = require('assets-webpack-plugin');
  const argv = require('yargs').argv;
  const env = process.env.NODE_ENV;
  const nx = require('next-js-core2');
  const NxDllPackage = require('next-dll-package');
  const package = require('../package');
  // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  let vendors = package.config['dll-vendors'];


  // common vendors(can be minifed by uglify lodaer:)
  let plugins = [
    new webpack.DllPlugin({
      path: './dist/vendors/manifest.json',
      name: '[name]_library',
      context: __dirname,
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new AssetsWebpackPlugin({
      filename: 'bundle-config.json',
      path: './dist/vendors'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin(/React/),
    new webpack.IgnorePlugin(/ReactDOM/),
    // new BundleAnalyzerPlugin()
  ];

  //for dev/prd env:
  // vendors = vendors.concat( NxDllPackage.get('react') );
  env === 'development' && plugins.splice(1,1);

  module.exports = {
    output: {
      path: './dist/vendors',
      filename: '[name].[hash].js',
      library: '[name]_library'
    },
    entry: {
      vendors: vendors
    },
    plugins: plugins
  };


}());
