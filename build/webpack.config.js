const path = require('path');
const argv = require('yargs').argv;
const env = argv.config.indexOf('prod.conf') > -1 ? 'prod' : 'dev';
const dllPath = env === 'dev' ? '/dist' : '';
const bundleConfig = require('../dist/vendors/bundle-config.json');
const vendors = `${dllPath}/vendors/${bundleConfig.vendors.js}`;

module.exports = {
  vendorName: 'vendors/common',
  htmlWebpackOptions: {
    hash: 6,
    data:{
      vendors:vendors
    }
  },
  devServer: {
    port: 8899,
    hot: true,
    stats: 'errors-only',
    proxy: {
      '/helper': {
        //target: 'http://train.dcpai.cn:80',
        target: 'http://192.168.10.253:80',
        pathRewrite: {'^/helper': '/helper'},
        changeOrigin: true
      }
    }
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash:6].js',
    chunkFilename: '[id]-[hash:6].js',
    minify: false,
    publicPath: '/'
  }
};
