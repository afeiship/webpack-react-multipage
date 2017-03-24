const webpack = require('webpack');
const assetsWebpackPlugin = require('assets-webpack-plugin');

module.exports = {
  output: {
    path: './dist/vendors',
    filename: '[name].[hash].js',
    library: '[name]_library'
  },
  entry: {
    bundle: [
      'react',
      'react-dom',
      'next-js-core2'
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: './dist/vendors/manifest.json',
      name: '[name]_library',
      context: __dirname,
    }),
    new assetsWebpackPlugin({
      filename: 'bundle-config.json',
      path: './dist/vendors'
    }),
  ]
};
