import webpack from 'webpack';
import $ from './webpack.base.babel';
import webpackMerge from 'webpack-merge';
import config from './webpack.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const devEnties = $.baseEntries;
const nx = require('next-js-core2');
let devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
];


nx.each(devEnties, function (name) {
  if (name.indexOf('index') > -1) {
    let plugin = new HtmlWebpackPlugin(
      nx.mix(config.htmlWebpackOptions, {
        filename: name + '.html',
        template: name + '.jade',
        chunks: [config.vendorName, name]
      })
    );
    devPlugins.push(plugin);
  }
});

export default webpackMerge($, {
  entry: devEnties,
  output: config.output,
  plugins: devPlugins,
  devtool: '#source-map',
  devServer: config.devServer
});