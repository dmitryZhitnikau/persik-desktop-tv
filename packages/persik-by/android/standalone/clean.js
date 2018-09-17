const fse = require('fs-extra');
const glob = require("glob");

async function clean() {
  process.stderr.write('\nClean cordova folder ... ');
  await fse.remove(__dirname + '/cordova/node_modules');
  await fse.remove(__dirname + '/cordova/platforms');
  await fse.remove(__dirname + '/cordova/plugins');
  await fse.remove(__dirname + '/cordova/package.json');
  await fse.remove(__dirname + '/cordova/package-lock.json');

  await fse.remove(__dirname + '/cordova/www/index.html');
  await fse.remove(__dirname + '/cordova/www/static');
  await fse.remove(__dirname + '/cordova/www/dicts');
  const files = [
    ...glob.sync(__dirname + '/cordova/www/*.css'),
    ...glob.sync(__dirname + '/dist/*.apk'),
  ];
  for (let i = 0; i < files.length; i += 1) {
    await fse.remove(files[i]);
  }
  process.stderr.write('OK');
}
console.log('Clean Android Standalone:');

clean()
  .then(function () {
    console.log('\nAll done');
  });

