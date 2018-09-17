import Epg from '@/core/Epg';
import IEpgReader from './IEpgReader';

class EpgReaderDefault extends IEpgReader {
  constructor() {
    super();
    this.epg = Epg.getInstance();
  }
  //eslint-disable-next-line
  openDb() {
    // epg already opened
  }
  //eslint-disable-next-line
  close() {

  }
  getNextTvshows(...args) {
    return this.epg.getNextTvshows(...args);
  }
  getPrevTvshows(...args) {
    return this.epg.getPrevTvshows(...args);
  }
  getTvshowsByDate(...args) {
    return this.epg.getTvshowsByDate(...args);
  }
  getTvshowById(...args) {
    return this.epg.getTvshowById(...args);
  }
  getTvshowsRange(...args) {
    return this.epg.getTvshowsRange(...args);
  }
  getVideoById(...args) {
    return this.epg.getVideoById(...args);
  }
  getDatesByChannelId(...args) {
    return this.epg.getDatesByChannelId(...args);
  }
}

export default EpgReaderDefault;
