const {
  loaders,
  plugins,
  configs,
  inputs,
  outputs
} = require("@feizheng/webpack-app-kits");
const { vendors } = require("./config");

module.exports = inEnv => {
  return {
    mode:'production',
    entry: inputs.dll({ vendors }),
    output: outputs.dll(),
    plugins: [
      plugins.progressBar(),
      plugins.clean(),
      plugins.dll(),
    ],
    externals: configs.externals.react()
  };
};
