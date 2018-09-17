import 'babel-polyfill';
import registerPromiseWorker from 'promise-worker/register';
import Epg from '@/core/Epg';

Epg.setIndexedDB(indexedDB, IDBKeyRange);
const epg = Epg.getInstance();

export default function myWorker() {
  registerPromiseWorker((message) => {
    const method = message.method;
    const args = message.args;
    return epg[method](...args);
  });
}
