const fse = require('fs-extra');
const FolderZip = require('folder-zip');
const glob = require("glob");

const output = __dirname + '/dist/persik3.browser.web.zip';

async function clean() {
  process.stderr.write('\nClean folder ... ');
  await fse.remove(__dirname + '/src/index.html');
  await fse.remove(__dirname + '/src/static');
  await fse.remove(__dirname + '/src/dicts');
  const files = [
    ...glob.sync(__dirname + '/src/*.css'),
    ...glob.sync(__dirname + '/dist/*.zip'),
  ];
  for (let i = 0; i < files.length; i += 1) {
    await fse.remove(files[i]);
  }

  process.stderr.write('OK');
}

async function copy() {
  process.stderr.write('\nCopy built files from dist ... ');
  await fse.copy(__dirname.replace('/packages/', '/dist/'), __dirname + '/src');
  process.stderr.write('OK');
}

//TODO: не копировать эти файлы на этапе билда
async function cleanSrc() {
  process.stderr.write('\nRemove unused files ... ');
  await fse.remove(__dirname + '/src/dicts');
  process.stderr.write('OK');
}


function zip() {
  process.stderr.write('\nZip files ... ');
  return new Promise((resolve, reject) => {
    const options = {
      excludeParentFolder: true,
    };
    const zip = new FolderZip();
    zip.zipFolder(__dirname + '/src', options, function () {
      zip.writeToFile(output, function () {
        process.stderr.write('OK');
        process.stderr.write('\nSaved to ' + output);
        resolve();
      });
    });
  });
}

console.log('Packaging Browser Web:');

clean()
  .then(copy)
  .then(cleanSrc)
  .then(zip)
  .then(function () {
    console.log('\nAll done');
  });

