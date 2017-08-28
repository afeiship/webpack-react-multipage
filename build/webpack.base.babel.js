import config from './webpack.config.babel';
import path from 'path';
import webpack from 'webpack';
import entries from 'webpack-entries';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ScriptsInjectorPlugin from 'scripts-injector-webpack-plugin';
import gitInfo from 'git-info';
import {argv} from 'yargs';
import pkg from '../package.json';

const baseEntries = entries(config.baseEntryPath);
const devVersionRE = /([\d.]+)/g;
const argEnv = argv.env || 'test';
const gitDevVersion = (gitInfo.currentBranch().match(devVersionRE) || [])[0] || '1.0.0';
const argVersion = (argEnv === 'test') ? gitDevVersion + gitInfo.shortHash() : gitDevVersion;


const plugins = [
  new ScriptsInjectorPlugin({path: config.statisticPath}),
  new webpack.ProvidePlugin(pkg.config.providePlugin),
  new webpack.NoErrorsPlugin(),
  // split vendor js into its own file,
  new ExtractTextPlugin('[name]-[chunkhash:6].css'),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('../dist/vendors/manifest.json'),
  })
];

export default {
  baseEntries,
  plugins,
  node: {
    fs: "empty"
  },
  module: {
    preloaders: [{
      test: /\.scss/,
      loader: 'import-glob-loader'
    }],
    loaders: [{
      test: /config\.js$/,
      loader: 'webpack-replace',
      query: {
        replace: [
          {
            from: '__BUILD_VERSION__',
            to: argVersion
          },
          {
            from: '__BUILD_ENV__',
            to: argEnv
          }
        ]
      }
    }, {
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

