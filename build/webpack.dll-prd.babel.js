import path from 'path';
import webpack from 'webpack';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import pkg from '../package.json';

export default {
  output: {
    path: './dist/vendors',
    filename: '[name].[hash].js',
    library: '[name]_library'
  },
  entry: {
    vendors: pkg.config.dllVendors
  },
  plugins: [
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
  ]
};


