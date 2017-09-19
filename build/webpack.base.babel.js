import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ScriptsInjectorPlugin from 'scripts-injector-webpack-plugin';
import {argv} from 'yargs';
import config from './webpack.config.babel';
import pkg from '../package.json';
import {semver, hash} from 'git-version';


export default {
  plugins: [
    new ScriptsInjectorPlugin({path: config.statisticPath}),
    new webpack.ProvidePlugin(pkg.config.providePlugin),
    new webpack.NoErrorsPlugin(),
    // split vendor js into its own file,
    new ExtractTextPlugin(pkg.config.extractCssName),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(pkg.config.dllManifest),
    })
  ],
  node: {
    fs: "empty"
  },
  module: {
    preloaders: [{
      test: /\.scss/,
      loader: 'import-glob-loader'
    }],
    loaders: [
      {
        test: /config\.js$/,
        loader: 'webpack-replace',
        query: {
          replace: [
            {
              from: '__BUILD_VERSION__',
              to: `${semver()}_${hash()}`
            },
            {
              from: '__BUILD_ENV__',
              to: argv.env || 'test'
            }
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass!import-glob-loader')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(ico)$/i,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'img-loader',
        query: {
          enabled: process.env.NODE_ENV === 'production',
          gifsicle: {
            interlaced: false
          },
          mozjpeg: {
            progressive: true,
            arithmetic: false
          },
          optipng: false, // disabled
          pngquant: {
            floyd: 0.5,
            speed: 2
          },
          svgo: {
            plugins: [
              {
                removeTitle: true
              },
              {
                convertPathData: false
              }
            ]
          }
        }
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      },
      {
        test: /\.js|jsx$/,
        loaders: ['react-hot'],
        include: path.join(__dirname, 'js')
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
        query: {
          pretty: true
        }
      }
    ]
  },
  resolve: {
    extensions: pkg.config.extensions,
  }
};

