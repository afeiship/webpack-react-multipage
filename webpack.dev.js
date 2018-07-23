const merge = require('webpack-merge');
const base = require('./webpack.base');
const config = require('./config');
const {loaders, plugins, configs, inputs, outputs} = require('webpack-app-kits');

module.exports = (env, options) => {
  const {port, proxy} = config;
  return merge(base, {
    mode: 'development',
    devtool: configs.devtool(),
    plugins:[
      plugins.hotModuleReplacement()
    ],
    devServer: configs.devServer({
      stats: 'errors-only',
      port,
      proxy,
    })
  });
};
