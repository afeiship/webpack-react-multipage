import path from 'path';
import webpack from 'webpack';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import pkgConfig from '../config.json';

export default {
  output: {
    path: './dist/vendors',
    filename: '[name].[hash].js',
    library: '[name]_library'
  },
  entry: {
    vendors: pkgConfig.dllVendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, pkgConfig.dllManifest),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin(pkgConfig.uglify),
    new AssetsWebpackPlugin({
      filename: 'bundle-config.json',
      path: './dist/vendors'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.IgnorePlugin(/React/),
    // new webpack.IgnorePlugin(/ReactDOM/),
  ]
};


