const {
  loaders,
  plugins,
  configs,
  inputs,
  outputs
} = require("@feizheng/webpack-app-kits");
const { vendors } = require("./config");

module.exports = inEnv => {
  const { mode } = inEnv;
  return {
    mode,
    entry: inputs.dll({ vendors }),
    output: outputs.dll(),
    plugins: [plugins.dll()],
    externals: configs.externals.react()
  };
};
