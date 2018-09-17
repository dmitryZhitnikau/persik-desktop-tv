const fs = require('fs');
const fse = require('fs-extra');
const fsep = require('fs-extra-promise').useFs(fse);
const { execute } = require('../../../utils');
const glob = require("glob");

const FolderZip = require('folder-zip');
const builder = require('xmlbuilder');
const moment = require('moment');

const OUTPUT_WGT = 'tv-by-persik.tizen.wgt';
const DIR = __dirname;

const HOME = process.env['HOME'];
const tizenBin = [
  HOME + '/tizen-studio/tools/ide/bin/tizen',
  '/tizen-sdk/tools/ide/bin/tizen',
];

function fileExists(path) {
  try {
    fs.accessSync(path, fs.constants.R_OK);
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
    ...glob.sync(__dirname + '/dist/*.wgt'),
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
  const CERT_FILE = 'persikby.p12';
  const CERT_PASS = 'persikby';
  const SEC_PROFILE = 'persikby';

  let TIZEN_CLI;
  for (let i=0; i<tizenBin.length; i += 1) {
    let path = tizenBin[i];
    process.stderr.write('\nTry ' + path + ' ... ');
    let exists = fileExists(path);
    if (exists) {
      process.stderr.write(' OK');
      TIZEN_CLI = path;
      break;
    } else {
      process.stderr.write(' non exists');
    }
  }

  if (TIZEN_CLI) {
    console.log('\nTizen CLI:', TIZEN_CLI);

    process.stderr.write('\nClean secure profiles ... ');
    if (TIZEN_CLI.startsWith('/tizen-sdk/')) {
      const profilesPath = '/tizen-sdk-data/ide/keystore/profiles.xml';
      let profilesExists = fileExists(profilesPath);
      if (!profilesExists) {
        const profilesDir = require('path').dirname(profilesPath);
        let dirExists = fileExists(profilesDir);
        if (!dirExists) {
          fs.mkdirSync(profilesDir);
        }
        fse.writeFileSync(profilesPath, '<?xml version="1.0" encoding="UTF-8" standalone="no"?><profiles version="3.0"></profiles>');
      }
    }

    try {
      await execute(`${TIZEN_CLI} security-profiles remove -n ${SEC_PROFILE}`);
    } catch (e) {}
    process.stderr.write(' OK');

    process.stderr.write('\nAdd secure profile ... ');
    await execute(`${TIZEN_CLI} security-profiles add -n ${SEC_PROFILE} -a ${DIR}/keystore/${CERT_FILE} -p ${CERT_PASS}`);
    process.stderr.write(' OK');

    process.stderr.write('\nBuilding ... ');
    await execute(`${TIZEN_CLI} build-web -e .gitignore -- ${DIR}/src`);
    process.stderr.write(' OK');

    process.stderr.write('\nPackaging ... ');
    await execute(`${TIZEN_CLI} package -t wgt -s ${SEC_PROFILE}  -- ${DIR}/src/.buildResult`);
    process.stderr.write(' OK');

    process.stderr.write('\nCopy package to dist ... ');
    await fse.copy(__dirname + '/src/.buildResult/TV BY Persik.wgt', __dirname + `/dist/${OUTPUT_WGT}`);
    process.stderr.write(' OK');

  } else {
    throw new Error('\nTizen CLI not found');
  }
}

console.log('Packaging Tizen Standalone:');

clean()
  .then(copy)
  .then(cleanSrc)
  .then(build)
  .then(function () {
    console.log('\nAll done');
  });

