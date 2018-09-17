
var argv = require('minimist')(process.argv.slice(2));
const appBackend = argv.backend? argv.backend : 'persik';
const appTarget = argv.target? argv.target : 'browser';
const appType = argv.type? argv.type : 'web';

require(__dirname + `/../packages/${appBackend}/${appTarget}/${appType}/package.js`);