(function() {

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
      'src/modules/tiny-virtual-list/index.js',
      'src/modules/virtualed-collection/index.js',
      // 'src/modules/blank-module/index.js',
      // 'src/modules/route1/index.js',
      // 'src/modules/router2/index.js',
    ],
    htmlWebpackOptions: {
      hash: 6,
      inject:false,
      data: {
        VERSION:'1.0.0',
        cdn_ionicons: 'http://cdn.bootcss.com/ionicons/2.0.1/css/ionicons.css',
        vendors: vendors
      }
    },
    devServer: {
      port: 80,
      hot: true,
      host: 'train-h5.dcpai.cn',
      stats: 'errors-only',
      proxy: {
        '/weipai': {
          target: 'http://139.196.57.60:8082',
          changeOrigin: true
        },
        '/shanggu': {
          target: 'http://train-h5.dcpai.cn:80',
          pathRewrite: {'^/shanggu': '/src/modules'},
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

}());
