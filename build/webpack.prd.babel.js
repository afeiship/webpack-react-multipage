import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import webpackEntries from 'webpack-entries';
import nx from 'next-js-core2';
import pkg from '../package.json';
import config from './webpack.config.babel';
import $ from './webpack.base.babel';


const entry = webpackEntries(pkg.config.entry.production);
let productEntries = {};
let productPlugins = [ new HtmlWebpackPugPlugin() ];

const sliceKey = function (inKey) {
  return pkg.config.spa ? 'index' : inKey.slice(('src/modules/').length);
};


nx.each(entry, function (key) {
  productEntries[sliceKey(key)] = entry[key];
});


productPlugins = [
  new webpack.optimize.UglifyJsPlugin(pkg.config.uglify),
  new webpack.optimize.CommonsChunkPlugin({
    name: pkg.config.vendorName,
    chunks: Object.keys(productEntries)
  })
];

Object.keys(entry).forEach(function (name) {
  if (name.indexOf('index') > -1) {
    productPlugins.push(
      new HtmlWebpackPlugin(
        nx.mix(config.htmlWebpackOptions, {
          filename: sliceKey(name) + '.html',
          template: name + '.ejs',
          minify: false,
          chunks: [
            pkg.config.vendorName,
            sliceKey(name)
          ]
        })
      )
    );
  }
});

export default webpackMerge($, {
  entry: productEntries,
  output: config.output,
  plugins: productPlugins
});


