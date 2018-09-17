import PromiseWorker from 'promise-worker';
import work from 'webworkify-webpack';
import IEpgReader from './IEpgReader';

const epgWorker = work(require.resolve(('./EpgWorker')));
const promiseEpgWorker = new PromiseWorker(epgWorker);

class EpgReaderWebWorker extends IEpgReader {
  //eslint-disable-next-line
  postMessage(method, args) {
    return promiseEpgWorker.postMessage({ method, args });
  }
  async openDb(...args) {
    return this.postMessage('openDb', args);
  }
  async close() {
    return this.postMessage('close', []);
  }
  async getNextTvshows(...args) {
    return this.postMessage('getNextTvshows', args);
  }
  async getPrevTvshows(...args) {
    return this.postMessage('getPrevTvshows', args);
  }
  async getTvshowsByDate(...args) {
    return this.postMessage('getTvshowsByDate', args);
  }
  async getTvshowById(...args) {
    return this.postMessage('getTvshowById', args);
  }
  async getTvshowsRange(...args) {
    return this.postMessage('getTvshowsRange', args);
  }
  async getVideoById(...args) {
    return this.postMessage('getVideoById', args);
  }
  async getDatesByChannelId(...args) {
    return this.postMessage('getDatesByChannelId', args);
  }
}

export default EpgReaderWebWorker;
