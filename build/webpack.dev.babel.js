import webpack from 'webpack';
import $ from './webpack.base.babel';
import webpackMerge from 'webpack-merge';
import webpackEntries from 'webpack-entries';
import config from './webpack.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nx from 'next-js-core2';
import pkgConfig from '../config.json';

const entry = webpackEntries(pkgConfig.entry.development);
let plugins = [new webpack.HotModuleReplacementPlugin()];


nx.each(entry, function (name) {
  if (name.indexOf('index') > -1) {
    plugins.push(
      new HtmlWebpackPlugin(
        nx.mix(config.htmlWebpackOptions, {
          filename: name + '.html',
          template: name + '.ejs',
          chunks: [pkgConfig.vendorName, name]
        })
      )
    );
  }
});

export default webpackMerge($, {
  entry,
  output: config.output,
  plugins,
  devtool: '#source-map',
  devServer: config.devServer
});