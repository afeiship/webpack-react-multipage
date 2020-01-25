require("@feizheng/next-flatten");
require("@feizheng/next-values");


module.exports = inEnv => {
  const { mode, type } = inEnv;
  return require(`./build/webpack.${type || mode}.js`)(inEnv);
};
