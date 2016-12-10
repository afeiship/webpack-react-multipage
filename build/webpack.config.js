module.exports = {
  vendorName: 'vendor/vendor',
  devPort: 8082,
  appEntries: './modules/**/*.js',
  htmlWebpackOptions: {
    hash: 6,
    data: {
      'cdn_react': 'http://cdn.bootcss.com/react/15.4.1/react.min.js',
      'cdn_react_dom': 'http://cdn.bootcss.com/react/15.4.1/react-dom.min.js',
    },
    minify: false
  }
};
