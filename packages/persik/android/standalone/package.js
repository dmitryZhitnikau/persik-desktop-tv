const fse = require('fs-extra');
const { execute } = require('../../../utils');
const glob = require("glob");

const OUTPUT_X86 = __dirname + '/dist/persik3.android.x86.apk';
const OUTPUT_ARM = __dirname + '/dist/persik3.android.armv7.apk';

async function clean() {
  process.stderr.write('\nClean folder ... ');
  await fse.remove(__dirname + '/cordova/www/index.html');
  await fse.remove(__dirname + '/cordova/www/static');
  await fse.remove(__dirname + '/cordova/www/dicts');
  const files = [
    ...glob.sync(__dirname + '/cordova/www/*.css'),
    ...glob.sync(__dirname + '/dist/*.apk'),
    ...glob.sync(__dirname + '/cordova/platforms/android/build/outputs/apk/*.apk'),
  ];
  for (let i = 0; i < files.length; i += 1) {
    await fse.remove(files[i]);
  }
  process.stderr.write('OK');
}

async function copy() {
  process.stderr.write('\nCopy built files from dist ... ');
  await fse.copy(__dirname.replace('/tv/packages/', '/tv/dist/'), __dirname + '/cordova/www');
  process.stderr.write('OK');
}

//TODO: не копировать эти файлы на этапе билда
async function cleanSrc() {
  process.stderr.write('\nRemove unused files ... ');
  await fse.remove(__dirname + '/cordova/www/dicts');
  process.stderr.write('OK');
}

async function build() {
  process.chdir(__dirname + '/cordova');
  process.stderr.write('\nPrepare ... ');
  await execute('cordova prepare');
  process.stderr.write(' OK');

  process.stderr.write('\nPackaging ... ');
  await execute('cordova build --release');
  process.stderr.write(' OK');

  process.stderr.write('\nCopy package to dist ... ');
  await fse.copy(__dirname + '/cordova/platforms/android/build/outputs/apk/android-armv7-release.apk', OUTPUT_ARM);
  await fse.copy(__dirname + '/cordova/platforms/android/build/outputs/apk/android-x86-release.apk', OUTPUT_X86);
  process.stderr.write(' OK');
}

console.log('Packaging Android Standalone:');

clean()
  .then(copy)
  .then(cleanSrc)
  .then(build)
  .then(function () {
    console.log('\nAll done');
  });

