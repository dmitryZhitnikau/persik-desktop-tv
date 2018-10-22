import BoomerangCache from 'boomerang-cache';
import memoryCache from 'memory-cache';
import Semaphore from 'semaphore-async-await';
import BatchRequestChannel from '@/backend/persik/helpers/BatchRequestChannel';
import BatchRequestVideo from '@/backend/persik/helpers/BatchRequestVideo';
import BatchRequestTvshow from '@/backend/persik/helpers/BatchRequestTvshow';
//eslint-disable-next-line
import Epg from '@core/Epg';

const TTL = 6 * 3600;

const cache = BoomerangCache.create('content', { storage: 'local', encrypt: false });
const epg = Epg.getInstance();
const lockChannels = new Semaphore(1);

export default {
  init() {
    this.batchRequestChannel = new BatchRequestChannel(this.api);
    this.batchRequestVideo = new BatchRequestVideo(this.api);
    this.batchRequestTvshow = new BatchRequestTvshow(this.api);
  },

  reset() {
    this.clear();
  },

  clear() {
    cache.clear();
    this.batchRequestChannel.clear();
    this.batchRequestVideo.clear();
    this.batchRequestTvshow.clear();
  },

  async getChannels() {
    let channels = cache.get('channels');
    if (!channels) {
      const res = await this.api.content.getChannels();
      channels = res.channels;
      cache.set('channels', channels, TTL);
    }
    return channels;
  },

  getVideos(...args) {
    return this.api.content.getVideos(...args);
  },

  getVideo(id) {
    const intId = parseInt(id, 10);
    return this.batchRequestVideo.getItem(intId);
  },

  async getTvshow(id) {
    let tvshow;
    try {
      tvshow = await epg.getTvshowById(id);
    } catch (e) {
      console.log(e);
    }
    if (!tvshow) {
      tvshow = this.batchRequestTvshow.getItem(id);
    }
    return tvshow;
  },

  async getChannel(id) {
    const intId = parseInt(id, 10);
    await lockChannels.acquire();
    let channel;
    try {
      let channels = memoryCache.get('channels');
      if (channels === null) {
        channels = await this.content.getChannels();
        memoryCache.put('channels', channels, 10000);
      }
      channel = channels.find((x) => x.channel_id === intId);
    } catch (e) {
      console.error(e);
    }
    lockChannels.release();
    if (!channel) {
      channel = await this.batchRequestChannel.getItem(intId);
    }
    return channel;
  },

  getPerson(...args) {
    return this.api.content.getPerson(...args);
  },

  getBanners() {
    return this.api.content.getBanners();
  },

};
