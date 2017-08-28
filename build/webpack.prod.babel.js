import webpack from 'webpack';
import $ from './webpack.base.babel';
import webpackMerge from 'webpack-merge';
import config from './webpack.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import nx from 'next-js-core2';


const baseEntries = $.baseEntries;
let productEntries = {};
let productPlugins = [];
let sliceLength = config.spa ? 4 : 12;


nx.each(baseEntries, function (key) {
  productEntries[key.slice(sliceLength)] = baseEntries[key];
});

productPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: false
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: config.vendorName,
    chunks: Object.keys(productEntries)
  })
];

Object.keys(baseEntries).forEach(function (name) {
  if (name.indexOf('index') > -1) {
    let plugin = new HtmlWebpackPlugin(
      nx.mix(config.htmlWebpackOptions, {
        filename: name.slice(sliceLength) + '.html',
        template: name + '.jade',
        minify: false,
        chunks: [config.vendorName, name.slice(sliceLength)]
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


