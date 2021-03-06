const { loaders, plugins, configs, inputs, outputs, utils } = require('@feizheng/webpack-app-kits');
const config = require('./config');

module.exports = (inEnv) => {
  const mode = process.env.NODE_ENV;
  const { libs, publicPath, entries } = config[mode || 'production'];

  return {
    mode,
    entry: inputs.mpa({ entries }),
    context: __dirname,
    output: outputs.mpa({ publicPath }),
    resolve: {
      alias: configs.alias(),
      extensions: configs.extensions()
    },
    module: {
      rules: nx.flatten([
        loaders.babel(),
        loaders.environment({ mode }),
        loaders.css(),
        loaders.sass(),
        loaders.mp34(),
        loaders.image(),
        loaders.font()
      ])
    },
    externals: configs.externals.react(),
    optimization: configs.optimization(),
    performance: configs.performance(),
    plugins: nx.flatten([
      plugins.progressBar(),
      plugins.minCssExtract(),
      plugins.semver({ mode }),
      plugins.define({ mode }),
      plugins.moduleConcatenation(),
      plugins.multipleHtml({ entries, libs }),
      plugins.dllRefrence({ publicPath }),
      plugins.loaderOptions({ mode }),
      plugins.provide()
    ])
  };
};
