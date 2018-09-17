var moment = require('moment');
module.exports = {
  NODE_ENV: '"production"',
  BUILD_DATE: '"' + moment().format('YYYYMMDDHHmm') + '"',
}
