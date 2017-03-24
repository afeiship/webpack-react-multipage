const path = require('path');
const dllName = require(path.join(__dirname, '../dist/vendors/manifest.json')).name;
const yargs = require('yargs');
const env = yargs.argv.config.indexOf('prod.conf')>-1 ? 'prod' :'dev';


console.log(env);

console.log(
  env==='dev' ? '/dist/vendors/'+ dllName +'.js' : '/vendors/'+ dllName +'.js'
);
module.exports = {
  vendorName: 'vendors/vendor',
  htmlWebpackOptions: {
    hash: 6,
    data: {
      'cdn_react': 'http://cdn.bootcss.com/react/15.4.1/react.min.js',
      'cdn_react_dom': 'http://cdn.bootcss.com/react/15.4.1/react-dom.min.js',
      'dll': env==='dev' ? '/dist/vendors/'+ dllName +'.js' : '/vendors/'+ dllName +'.js'
    },
    // minify: false
  },
  devServer:{
    port:8899,
    hot: true,
    stats: 'errors-only',
    proxy: {
      '/helper': {
          //target: 'http://train.dcpai.cn:80',
        target: 'http://192.168.10.253:80',
        pathRewrite: { '^/helper': '/helper' },
        changeOrigin: true
      }
    }
  },
  output:{
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash:6].js',
    chunkFilename: '[id]-[hash:6].js',
    minify: false,
    publicPath: '/'
  }
};
