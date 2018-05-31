const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const config = require('./config');
const {argv} = require('yargs');
const {libs, publicPath, entries} = config[argv.env];
const nx = require('next-js-core2');
const webpackEntries = require('webpack-entries');

const entry = {};
const htmlPlugins = nx.map(webpackEntries(entries), (key, value) => {
  const entryKey = key.slice(12, -6);
  entry[entryKey] = value;
  return new HtmlWebpackPlugin({
    libs,
    hash: 6,
    inject: true,
    template: resolve(__dirname, `${key}.ejs`),
    filename: resolve(__dirname, `dist/${entryKey}.html`),
    chunks: ['assets/vendors', 'assets/commons', entryKey]
  })
});


module.exports = {
  mode: config[argv.env],
  entry,
  output: {
    filename: '[name]/scripts/[name]-[hash:6].bundle.js',
    path: resolve(__dirname, 'dist'),
    chunkFilename: '[id]-[hash:6].js',
  },
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets'),
      images: resolve(__dirname, 'src/assets/images'),
      styles: resolve(__dirname, 'src/assets/styles'),
      components: resolve(__dirname, 'src/components'),
      views: resolve(__dirname, 'src/components/views'),
      interceptors: resolve(__dirname, 'src/components/interceptors'),
      services: resolve(__dirname, 'src/components/services'),
      scripts: resolve(__dirname, 'src/components/scripts'),
      mixins: resolve(__dirname, 'src/components/mixins'),
      modals: resolve(__dirname, 'src/components/modals'),
    },
    extensions: ['.js', '.json', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
        include: [
          resolve(__dirname, "src"),
          resolve(__dirname, "node_modules/mixin-decorator"),
          resolve(__dirname, "node_modules/react-dynamic-router")
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
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new ExtractTextPlugin('assets/styles/[name]-[hash].css'),
    //ProvidePlugins:
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      nx: 'next-js-core2',
      mixin: 'mixin-decorator'
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: resolve(__dirname, 'dist/assets/vendors/manifest.json')
    }),
    ...htmlPlugins,
    new AddAssetHtmlPlugin([
      {
        includeSourcemap: false,
        filepath: resolve(__dirname, 'dist/assets/vendors/vendors.*.js'),
        outputPath: "assets/vendors",
        publicPath: `${publicPath}assets/vendors`
      }
    ]),
  ]
};
