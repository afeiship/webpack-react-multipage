(function () {
  const config = require('./webpack.config');
  const nx = require('next-js-core2');
  const path = require('path');
  const fs = require('fs');
  const webpack = require('webpack');
  const entries = require('webpack-entries');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const ScriptsInjectorPlugin = require('scripts-injector-webpack-plugin').default;
  const gitInfo = require('git-info');
  const baseEntries = entries(config.baseEntryPath);
  const devVersionRE = /([\d.]+)/g;
  const argv = require('yargs').argv;
  const argEnv = argv.env || 'test';
  const gitDevVersion = (gitInfo.currentBranch().match(devVersionRE) || [])[0] || '1.0.0';
  const argVersion = (argEnv === 'test') ? gitDevVersion + gitInfo.shortHash() : gitDevVersion;

  //webpack-dashboard
  // const Dashboard = require('webpack-dashboard');
  // const DashboardPlugin = require('webpack-dashboard/plugin');
  // const dashboard = new Dashboard();

  const webpackPlugins = [
    new ScriptsInjectorPlugin({
      path: path.join(__dirname,'../src/components/others/umeng-statistic.html')
    }),
    new webpack.ProvidePlugin({
      nx: 'next-js-core2',
      Q: 'q',
      React: 'react',
      ReactDOM: 'react-dom',
      mixin:'mixin-decorator',
      autobind: 'autobind-decorator'
    }),
    new webpack.NoErrorsPlugin(),
    // split vendor js into its own file,
    new ExtractTextPlugin('[name]-[chunkhash:6].css'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/vendors/manifest.json'),
    })
    // new DashboardPlugin(dashboard.setData)
  ];

  module.exports = {
    baseEntries: baseEntries,
    plugins: webpackPlugins,
    // externals: {
    //   'react': 'React',
    //   'react-dom': 'ReactDOM'
    // },
    node: {
      fs: "empty"
    },
    module: {
      preloaders: [{
        test: /\.scss/,
        loader: 'import-glob-loader'
      }],
      loaders: [{
        test:/config\.js$/,
        loader: 'webpack-replace',
        query: {
          replace: [
            {
              from: '__BUILD_VERSION__',
              to: argVersion
              // to: gitInfo.currentBranch().match(devVersionRE)[0],
            },
            {
              from:'__BUILD_ENV__',
              to:argEnv
            }
          ]
        }
      },{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass!import-glob-loader')
      }, {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader?limit=8096&name=images/[name].[ext]'
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8096&name=fonts/[name].[ext]'
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader?minimize=false'
      }, {
        test: /\.js|jsx$/,
        loaders: ['react-hot'],
        include: path.join(__dirname, 'js')
      }, {
        test: /\.jade$/,
        loader: 'jade-loader?pretty=true'
      }]
    },
    resolve: {
      extensions: ['', '.js', '.scss'],
      alias: {
        node_modules: path.join(__dirname, '../node_modules'),
        bower_components: path.join(__dirname, '../bower_components'),
        components: path.join(__dirname, '../src/components'),
        modules: path.join(__dirname, '../src/modules'),
        images: path.join(__dirname, '../src/assets/images'),
        vendor: path.join(__dirname, '../src/vendor'),
      }
    }
  };

}());
