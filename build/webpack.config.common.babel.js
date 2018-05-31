// shared config (dev and prod)
import webpack from 'webpack';
import {resolve, join} from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import webpackEntries from 'webpack-entries';
// import ScriptsInjectorPlugin from 'scripts-injector-webpack-plugin';
import {argv} from 'yargs';
import config from '../config.json';
import glob from 'glob';
// import {hash, semver} from "git-version";
import nx from 'next-js-core2';


const argEnv = argv.env || 'dev';


export default {
  entry: {
    'blank-module': resolve(__dirname, '../src/modules/blank-module/index.js'),
    'test-module': resolve(__dirname, '../src/modules/test-module/index.js'),
    'my-module': resolve(__dirname, '../src/modules/my-module/index.js'),
  },
  context: resolve(__dirname),
  output: {
    publicPath: config[argEnv].publicPath,
    filename: '[name]/scripts/[name]-[hash:6].bundle.js',
    path: resolve(__dirname, '../dist'),
    chunkFilename: '[id]-[hash:6].js',
    // minify: false,
  },
  resolve: {
    alias: {
      assets: resolve(__dirname, '../src/assets'),
      images: resolve(__dirname, '../src/assets/images'),
      styles: resolve(__dirname, '../src/assets/styles'),
      components: resolve(__dirname, '../src/components'),
      views: resolve(__dirname, '../src/components/views'),
      interceptors: resolve(__dirname, '../src/components/interceptors'),
      services: resolve(__dirname, '../src/components/services'),
      scripts: resolve(__dirname, '../src/components/scripts'),
      mixins: resolve(__dirname, '../src/components/mixins'),
      modals: resolve(__dirname, '../src/components/modals'),
    },
    extensions: ['.js', '.json', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
        include: [
          resolve(__dirname, "../src"),
          resolve(__dirname, "../node_modules/mixin-decorator"),
          resolve(__dirname, "../node_modules/react-dynamic-router")
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-hot-loader', 'css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: 'import-glob-loader',
        enforce: "pre"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-hot-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(mp3|mp4)$/i,
        loader: 'url-loader',
        options: {
          name: 'assets/medias/[name]-[hash:4].[ext]',
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          name: 'assets/images/[name]-[hash:4].[ext]',
          limit: 8192
        }
      },
      {
        test: /\.(woff|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          name: 'assets/fonts/[name]-[hash:4].[ext]',
          limit: 8192
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: 6,
      inject: true,
      template: resolve(__dirname, `../src/modules/blank-module/index.ejs`),
      filename: resolve(__dirname, `../dist/blank-module/index.html`),
      favicon: resolve(__dirname, '../src/assets/images/favicon.ico'),
      title: 'Hot Module Replacement',
      libs: config[argEnv].libs,
      chunks: ['assets/vendors', 'blank-module']
    }),
    new HtmlWebpackPlugin({
      hash: 6,
      inject: true,
      template: resolve(__dirname, `../src/modules/test-module/index.ejs`),
      filename: resolve(__dirname, `../dist/test-module/index.html`),
      favicon: resolve(__dirname, '../src/assets/images/favicon.ico'),
      title: 'Hot Module Replacement',
      libs: config[argEnv].libs,
      chunks: ['assets/vendors', 'test-module']
    }),
    new HtmlWebpackPlugin({
      hash: 6,
      inject: true,
      template: resolve(__dirname, `../src/modules/my-module/index.ejs`),
      filename: resolve(__dirname, `../dist/my-module/index.html`),
      favicon: resolve(__dirname, '../src/assets/images/favicon.ico'),
      title: 'Hot Module Replacement',
      libs: config[argEnv].libs,
      chunks: ['assets/vendors', 'my-module']
    }),
    // new ScriptsInjectorPlugin({
    //   replacer: '<!--APP_LOADER-->',
    //   path: resolve(__dirname, '../src/components/others/app-loader.html')
    // }),
    new ExtractTextPlugin('[name]/styles/[name]-[hash].css'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: resolve(__dirname, '../dist/assets/vendors/manifest.json')
    }),
    new AddAssetHtmlPlugin([
      {
        includeSourcemap: false,
        filepath: resolve(__dirname, '../dist/assets/vendors/vendors.*.js'),
        outputPath: "assets/vendors",
        publicPath: `${config[argEnv].publicPath}assets/vendors`
      }
    ]),

    //ProvidePlugins:
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      nx: 'next-js-core2',
      mixin: 'mixin-decorator',
    }),

    // build optimization plugins
    new webpack.LoaderOptionsPlugin({
      options: {
        img: {
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
      }
    }),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false
  },
};
