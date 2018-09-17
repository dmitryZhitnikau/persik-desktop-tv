import BoomerangCache from 'boomerang-cache';
import Semaphore from 'semaphore-async-await';

const TTL = 6 * 3600;

const cache = BoomerangCache.create('categories', { storage: 'local', encrypt: false });
const lockChannel = new Semaphore(1);
const lockVideo = new Semaphore(1);
const lockGenre = new Semaphore(1);

export default {
  init() {
    this.genresIndex = null;
  },

  reset() {
    this.clear();
  },

  clear() {
    cache.clear();
    this.genresIndex = null;
  },

  async getChannelGenres() {
    await lockChannel.waitFor(5000);
    let channel = cache.get('channel');
    if (!channel) {
      channel = await this.api.categories.getChannel();
      cache.set('channel', channel, TTL);
    }
    lockChannel.release();
    return channel;
  },

  async getVideo() {
    await lockVideo.waitFor(5000);
    let video = cache.get('video');
    if (!video) {
      video = await this.api.categories.getVideo();
      cache.set('video', video, TTL);
    }
    lockVideo.release();
    return video;
  },

  async indexingGenres() {
    this.genresIndex = {};
    let result = await this.categories.getChannelGenres();
    result.forEach((genre) => {
      this.genresIndex[genre.id] = genre.name;
    });

    result = await this.categories.getVideo();
    result.forEach((category) => {
      category.genres.forEach((genre) => {
        this.genresIndex[genre.id] = genre.name;
      });
    });
  },

  async getGenreName(id) {
    await lockGenre.waitFor(5000);
    if (!this.genresIndex) {
      await this.categories.indexingGenres();
    }
    lockGenre.release();
    return this.genresIndex[id];
  },
};
