var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack')
const platforms = require('./platforms');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
var appTarget = process.env.APP_TARGET;
var appType = process.env.APP_TYPE;
var appBackend = process.env.APP_BACKEND;

const babelOptions = platforms.getBabelOptions(appTarget, appType);


module.exports = {
  entry: {
    app: `./src/persik/platform/modules/${appTarget}/${appType}/main.es6`
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.es6', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@core': resolve('src/core')
    }
  },
  module: {
    noParse: /assets\/dicts\//,
    rules: [
      {
        test: /\.(es6|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(js|es6)$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('../core/src'),
          resolve('node_modules/delay'),
          resolve('node_modules/p-defer'),
        ],
        options: babelOptions,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/(.*)APP_BACKEND(\.*)/, function(resource) {
      resource.request = resource.request.replace(/APP_BACKEND/, `${appBackend}`);
    }),
    new webpack.NormalModuleReplacementPlugin(/(.*)APP_TARGET_TYPE(\.*)/, function(resource) {
      resource.request = resource.request.replace(/APP_TARGET_TYPE/, `${appTarget}/${appType}`);
    }),
    new webpack.NormalModuleReplacementPlugin(/(.*)APP_TARGET(\.*)/, function(resource) {
      resource.request = resource.request.replace(/APP_TARGET/, `${appTarget}`);
    }),
    new webpack.NormalModuleReplacementPlugin(/(.*)APP_TYPE(\.*)/, function(resource) {
      resource.request = resource.request.replace(/APP_TYPE/, `${appType}`);
    }),
    /* new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
      { from: 'src/assets/dicts', to: 'dicts' },
    ], {
      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      copyUnmodified: true
    }) */
  ],
  node: {
    fs: "empty"
  }
}
