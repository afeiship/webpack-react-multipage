const { plugins, configs } = require("@feizheng/webpack-app-kits");
const merge = require("webpack-merge");
const baseConfig = require("./base");
const config = require("./config");

module.exports = inEnv => {
  const { port, proxy } = config;

  return merge(baseConfig(inEnv), {
    devtool: configs.devtool(),
    plugins: [plugins.hotModuleReplacement()],
    devServer: configs.devServer({
      port,
      proxy
    })
  });
};
