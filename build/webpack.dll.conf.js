const webpack = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');

module.exports = {
  output: {
    path: './dist/vendors',
    filename: '[name].[hash].js',
    library: '[name]_library'
  },
  entry: {
    vendors: [
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
    new AssetsWebpackPlugin({
      filename: 'bundle-config.json',
      path: './dist/vendors'
    }),
  ]
};
