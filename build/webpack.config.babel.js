import path from 'path';
import {argv} from 'yargs';
import pkg from '../package.json';
const spa = pkg.config.spa;
const env = process.env.NODE_ENV;
const dllPath = env === 'development' ? '/dist' : (spa ? '.' : '..');
const publicPath = env === 'development' ? '/' : (spa ? './' : '../');
const bundleConfig = require('../dist/vendors/bundle-config.json');
const vendors = `${pkg.config.cdnUrl}${dllPath}/vendors/${bundleConfig.vendors.js}`;


export default {
  statisticPath: path.join(__dirname, '../src/components/others/umeng-statistic.html'),
  htmlWebpackOptions: {
    hash: 6,
    inject: true,
    data: {
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
