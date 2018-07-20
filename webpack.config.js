require('babel-core/register');

module.exports = (env) => {
  console.log(env);
  return false;
  // return require(`./build/webpack.config.${env}.babel.js`).default(env);
};
