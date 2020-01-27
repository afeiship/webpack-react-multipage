const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = inEnv => {
  return merge(baseConfig(inEnv));
};
