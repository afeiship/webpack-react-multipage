import webpack from 'webpack';
import $ from './webpack.base.babel';
import webpackMerge from 'webpack-merge';
import config from './webpack.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import nx from 'next-js-core2';
import pkg from '../package.json';

const spa = pkg.config.spa;
const baseEntries = $.baseEntries;
let productEntries = {};
let productPlugins = [];

const sliceKey = function (inKey) {
  return spa ? 'index' : inKey.slice(('src/modules/').length);
};


nx.each(baseEntries, function (key) {
  productEntries[sliceKey(key)] = baseEntries[key];
});


productPlugins = [
  new webpack.optimize.UglifyJsPlugin(pkg.config.uglify),
  new webpack.optimize.CommonsChunkPlugin({
    name: config.vendorName,
    chunks: Object.keys(productEntries)
  })
];

Object.keys(baseEntries).forEach(function (name) {
  if (name.indexOf('index') > -1) {
    let plugin = new HtmlWebpackPlugin(
      nx.mix(config.htmlWebpackOptions, {
        filename: sliceKey(name) + '.html',
        template: name + '.jade',
        minify: false,
        chunks: [config.vendorName, sliceKey(name)]
      })
    );
    productPlugins.push(plugin);
  }
});

productPlugins.push(new HtmlWebpackPugPlugin());

export default webpackMerge($, {
  entry: productEntries,
  output: config.output,
  plugins: productPlugins
});


