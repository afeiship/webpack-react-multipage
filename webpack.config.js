require('babel-core/register');

module.exports = (inEnv) => {
  const {mode, local} = inEnv;
  const _mode = local ? 'local' : mode;
  return require(`./build/webpack.${_mode}.js`).default(inEnv);
};
