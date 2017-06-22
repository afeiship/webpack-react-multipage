const path = require('path');
const argv = require('yargs').argv;
const CDN_ASSETS_URL = '';
const env = argv.config.indexOf('prod.conf') > -1 ? 'prod' : 'dev';
const dllPath = env === 'dev' ? '/dist' : '..';
const publicPath = env === 'dev' ? '/' : '../';
const bundleConfig = require('../dist/vendors/bundle-config.json');
const vendors = `${CDN_ASSETS_URL}${dllPath}/vendors/${bundleConfig.vendors.js}`;

module.exports = {
  vendorName: 'vendors/common',
  spa:false,
  // baseEntryPath:'src/modules/**/index.js',
  baseEntryPath:[
    'src/modules/virtualed-list/index.js',
    // 'src/modules/blank-module/index.js',
    // 'src/modules/route1/index.js',
    // 'src/modules/router2/index.js',
  ],
  htmlWebpackOptions: {
    hash: 6,
    inject:false,
    data: {
      cdn_ionicons: 'http://cdn.bootcss.com/ionicons/2.0.1/css/ionicons.css',
      vendors: vendors
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
    publicPath
  }
};
