import path from 'path';
import webpack from 'webpack';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import pkg from '../package.json';

const env = process.env.NODE_ENV;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// common vendors(can be minifed by uglify lodaer:)
let plugins = [
  new webpack.DllPlugin({
    path: path.resolve(__dirname, pkg.config.dllManifest),
    name: '[name]_library'
  }),
  new webpack.optimize.UglifyJsPlugin(pkg.config.uglify),
  new AssetsWebpackPlugin({
    filename: 'bundle-config.json',
    path: './dist/vendors'
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // new webpack.IgnorePlugin(/React/),
  // new webpack.IgnorePlugin(/ReactDOM/),
  // new BundleAnalyzerPlugin()
];

//for dev/prd env:
env === 'development' && plugins.splice(1, 1);

export default {
  output: {
    path: './dist/vendors',
    filename: '[name].[hash].js',
    library: '[name]_library'
  },
  entry: {
    vendors: pkg.config.dllVendors
  },
  plugins
};

