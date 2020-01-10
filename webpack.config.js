module.exports = inEnv => {
  const { mode, type } = inEnv;
  return require(`./build/webpack.${type || mode}.js`)(inEnv);
};
