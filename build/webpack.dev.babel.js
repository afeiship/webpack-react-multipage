import webpack from 'webpack';
import $ from './webpack.base.babel';
import webpackMerge from 'webpack-merge';
import webpackEntries from 'webpack-entries';
import config from './webpack.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nx from 'next-js-core2';
import pkg from '../package.json';

const entry = webpackEntries(pkg.config.entry.development);
let devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
];

nx.each(entry, function (name) {
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
  entry,
  output: config.output,
  plugins: devPlugins,
  devtool: '#source-map',
  devServer: config.devServer
});