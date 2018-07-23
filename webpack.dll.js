const {vendors} = require('./config');
const {loaders, plugins, configs, inputs, outputs} = require('webpack-app-kits');


module.exports = {
  mode: 'production',
  output: outputs.dll(),
  plugins: [
    plugins.dll()
  ],
  externals: configs.externals.react(),
  entry: inputs.dll({vendors})
};
