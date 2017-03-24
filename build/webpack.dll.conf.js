const webpack = require('webpack');
const vendors = [
    'react',
    'react-dom',
    'next-js-core2'
];
module.exports = {
  output: {
    path: './dist/vendors',
    filename: '[name].js',
    library: '[name]'//_library_[hash]
  },
  entry: {
    vendors: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
        path: './dist/vendors/manifest.json',
        name: '[name]',
        context: __dirname,
    }),
  ]
};
