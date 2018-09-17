const fs = require('fs');
const fse = require('fs-extra');
const fsep = require('fs-extra-promise').useFs(fse);
const { execute } = require('../../../utils');
const glob = require("glob");

const bins = [
  '/opt/webOS_TV_SDK/CLI/bin/ares',
  '/webOS_SDK/bin/ares',
  '/usr/local/share/webOS_TV_SDK/CLI/bin/ares',
];

async function fileExists(path) {
  try {
    await fsep.access(path, fs.constants.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}

async function clean() {
  process.stderr.write('\nClean folder ... ');
  await fse.remove(__dirname + '/src/index.html');
  await fse.remove(__dirname + '/src/static');
  await fse.remove(__dirname + '/src/dicts');
  const files = [
    ...glob.sync(__dirname + '/src/*.css'),
    ...glob.sync(__dirname + '/dist/*.ipk'),
  ];
  for (let i = 0; i < files.length; i += 1) {
    await fse.remove(files[i]);
  }
  process.stderr.write('OK');
}

async function copy() {
  process.stderr.write('\nCopy built files from dist ... ');
  await fse.copy(__dirname.replace('/tv/packages/', '/tv/dist/'), __dirname + '/src');
  process.stderr.write('OK');
}

//TODO: не копировать эти файлы на этапе билда
async function cleanSrc() {
  process.stderr.write('\nRemove unused files ... ');
  await fse.remove(__dirname + '/src/dicts');
  process.stderr.write('OK');
}



async function build() {
  let ARES_CLI;
  for (let i=0; i < bins.length; i += 1) {
    let path = bins[i];
    process.stderr.write('\nTry ' + path + ' ... ');
    let exists = await fileExists(path);
    if (exists) {
      process.stderr.write(' OK');
      ARES_CLI = path;
      break;
    } else {
      process.stderr.write(' non exists');
    }
  }

  if (ARES_CLI) {
    console.log('\nAres CLI:', ARES_CLI);

    const AP = `${ARES_CLI}-package`;
    const DIR = __dirname;

    process.stderr.write('\nPackaging ... ');
    await execute(`${AP} -o ${DIR}/dist ${DIR}/src`);
    process.stderr.write(' OK');

  } else {
    throw new Error('\nAres CLI not found');
  }
}


console.log('Packaging WebOS Standalone:');

clean()
  .then(copy)
  .then(cleanSrc)
  .then(build)
  .then(function () {
    console.log('\nAll done');
  });

