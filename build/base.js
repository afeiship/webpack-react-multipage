const config = require('./config');
const {argv} = require('yargs');
const {libs, publicPath, entries} = config[argv.env];
const {loaders, plugins, configs, inputs, outputs} = require('webpack-app-kits');
const mode = config[argv.env];
require('next-flatten');


module.exports = {
  mode,
  entry: inputs.mpa({entries}),
  output: outputs.mpa({publicPath}),
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
      plugins.moduleConcatenation(),
      plugins.multipleHtml({entries, libs}),
      plugins.extractText(),
      plugins.dllRefrence({publicPath}),
      plugins.loaderOptions({mode}),
      plugins.provide(),
    ]
  )
};