import UAParser from 'ua-parser-js';
import compareVersions from 'compare-versions';
import EpgReaderWebWorker from './EpgReaderWebWorker';
import EpgReaderDefault from './EpgReaderDefault';

let instance;

class EpgReader {
  constructor() {
    throw new Error('The instance of EpgReader must be obtained by EpgReader.getInstance() method');
  }

  static getInstance() {
    if (!instance) {
      const parser = new UAParser();
      const result = parser.getResult();
      if (result.browser.name.match(/^Chrom/i)
        // отключаем Web Workers в глючной WebOS
        && !result.ua.match(/Web0S/i) && !result.ua.match(/WebOS/i)
        // удаляем 4-ый блок из версии "65.0.3325.162" -> "65.0.3325"
        && compareVersions(result.browser.version.replace(/\.\d+$/, ''), '37.0.0') >= 0
      ) {
        console.log('EpgReader will use Web Worker');
        instance = new EpgReaderWebWorker();
      } else {
        instance = new EpgReaderDefault();
      }
    }
    return instance;
  }
}

export default EpgReader;
