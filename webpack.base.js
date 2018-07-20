const config = require('./config');
const {argv} = require('yargs');
const {libs, publicPath, entries} = config[argv.env];
const {loaders, plugins, configs} = require('webpack-app-kits');
const mpaEntries = require('webpack-mpa-entries');
const mode = config[argv.env];
require('next-flatten');


module.exports = {
  mode,
  entry: mpaEntries(entries, null, {absolute: true}),
  output: {
    publicPath,
    filename: '[name]/[name]-[hash].js'
  },
  resolve: {
    alias: configs.alias(),
    extensions: configs.extensions()
  },
  module: {
    rules: nx.flatten(
      [
        loaders.babel(),
        loaders.css(),
        loaders.sass(),
        loaders.mp34(),
        loaders.image(),
        loaders.font(),
      ]
    ),
  },
  externals: configs.externals.react(),
  optimization: configs.optimization(),
  performance: configs.performance(),
  plugins: nx.flatten(
    [

      plugins.multipleHtml({entries, libs}),
      plugins.extractText(),
      plugins.dllRefrence({publicPath}),
      plugins.loadersOptions({mode}),
      plugins.provide(),
    ]
  )
};