require('./check-versions')()

var argv = require('minimist')(process.argv.slice(2));
process.env.APP_TARGET = argv.target? argv.target : 'browser';
process.env.APP_TYPE = argv.type? argv.type : 'web';
process.env.APP_BACKEND = argv.backend? argv.backend : 'persik';
process.env.BUILD_NUMBER = argv.buildnumber? argv.buildnumber : 'N/A';

process.env.NODE_ENV = 'production'

const platforms = require('./platforms');

process.env.BROWSERSLIST = platforms.getBrowserList(process.env.APP_TARGET, process.env.APP_TYPE);

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
