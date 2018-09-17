const { exec } = require('child_process');

function execute(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        process.stderr.write(`\nExec '${cmd}' error:\n${error}`);
        process.stderr.write(`\n${stdout}`);
        process.stderr.write(`\n${stderr}`);
        reject();
      } else {
        /* if (cmd.match(/cordova/)) {
          process.stderr.write(`\n${stdout}`);
          process.stderr.write(`\n${stderr}`);
        }*/
        resolve(stdout);
      }
    });
  });
}

module.exports = { execute }
