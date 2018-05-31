const webpack = require('webpack');
const {resolve} = require('path');
const {vendors} = require('./config');
const {argv} = require('yargs');

module.exports = {
  mode: 'production',
  output: {
    path: resolve(__dirname, 'dist/'),
    filename: 'vendors/[name].[chunkhash].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve(__dirname, 'dist/vendors/manifest.json'),
      name: '[name]_library'
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  entry: {
    vendors
  },
};
