const merge = require("webpack-merge");
const baseConfig = require("./base");

module.exports = inEnv => {
  return merge(baseConfig(inEnv));
};
