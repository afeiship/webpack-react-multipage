(function(){

  const webpack = require('webpack');
  const AssetsWebpackPlugin = require('assets-webpack-plugin');
  const argv = require('yargs').argv;
  const env = process.env.NODE_ENV;
  const nx = require('next-js-core2');
  const NxDllPackage = require('next-dll-package');
  const package = require('../package');
  let vendors = package.config['dll-vendors'];

  // common vendors(can be minifed by uglify lodaer:)
  let plugins = [
    new webpack.DllPlugin({
      path: './dist/vendors/manifest.json',
      name: '[name]_library',
      context: __dirname,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    }),
    new AssetsWebpackPlugin({
      filename: 'bundle-config.json',
      path: './dist/vendors'
    })
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
