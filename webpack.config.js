require('@feizheng/next-flatten');
require('@feizheng/next-values');

module.exports = (inEnv) => {
  const { NODE_ENV } = process.env;
  return require(`./build/webpack.${NODE_ENV}.js`)(inEnv);
};
