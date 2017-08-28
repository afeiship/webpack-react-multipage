import path from 'path';
import {argv} from 'yargs';
import pkg from '../package.json';

const CDN_ASSETS_URL = '';
const env = argv.config.indexOf('prod.conf') > -1 ? 'prod' : 'dev';
const dllPath = env === 'dev' ? '/dist' : '..';
const publicPath = env === 'dev' ? '/' : '../';
const bundleConfig = require('../dist/vendors/bundle-config.json');
const vendors = `${CDN_ASSETS_URL}${dllPath}/vendors/${bundleConfig.vendors.js}`;

export default {
  vendorName: 'vendors/common',
  spa: false,
  // baseEntryPath:'src/modules/**/index.js',
  baseEntryPath: [
    'src/modules/test-fragment/index.js',
    // 'src/modules/tiny-virtual-list/index.js',
    // 'src/modules/virtualed-collection/index.js',
    // 'src/modules/blank-module/index.js',
    // 'src/modules/route1/index.js',
    // 'src/modules/router2/index.js',
  ],
  htmlWebpackOptions: {
    hash: 6,
    inject: false,
    data: {
      cdn_ionicons: 'http://cdn.bootcss.com/ionicons/2.0.1/css/ionicons.css',
      vendors: vendors
    }
  },
  devServer: pkg.config.devServer,
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash:6].js',
    chunkFilename: '[id]-[hash:6].js',
    minify: false,
    publicPath
  }
};
