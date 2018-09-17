const fse = require('fs-extra');
const FolderZip = require('folder-zip');
const builder = require('xmlbuilder');
const moment = require('moment');

const output = __dirname + '/dist/persik3.orsay.zip';
const outputWidgetlist = __dirname + '/dist/widgetlist.xml';

async function clean() {
  process.stderr.write('\nClean folder ... ');
  await fse.remove(__dirname + '/src/index.html');
  await fse.remove(__dirname + '/src/static');
  await fse.remove(__dirname + '/src/dicts');
  process.stderr.write('OK');
}

async function copy() {
  process.stderr.write('\nCopy built files from dist ... ');
  await fse.copy(__dirname.replace('/tv/packages/', '/tv/dist/'), __dirname + '/src');
  process.stderr.write('OK');
}

//TODO: не копировать эти файлы на этапе билда
async function clean2() {
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

async function generateWidgetlist() {
  process.stderr.write('\nGenerate widgetlist.xml ... ');
  const stats = fse.statSync(output);
  const fileSizeInBytes = stats.size;

  const hash = moment().format('HHmm');
  const xml = builder.create({
    rsp: {
      '@stat': 'ok',
      list: {
        widget: [
          {
            '@id': `persik${hash}`,
            'title': `Persik 3 [${hash}]`,
            'compression' : {
              '@size': fileSizeInBytes,
              '@type': 'zip'
            },
            'description': "Persik TV App",
            'download': 'http://192.168.0.10/persik3.orsay.zip?v=' + moment().format('YYYYMMDDHHmmss'),
          }
        ]
      }
    }
  });
  fse.writeFileSync(outputWidgetlist, xml.end({ pretty: true}));
  process.stderr.write('OK');
  process.stderr.write('\nSaved to ' + outputWidgetlist);
}

console.log('Packaging Orsay Launcher:');

clean()
  .then(copy)
  .then(clean2)
  .then(zip)
  .then(generateWidgetlist)
  .then(function () {
    console.log('\nAll done');
  });

