import BoomerangCache from 'boomerang-cache';
import moment from 'moment';

const TTL = 6 * 3600;

const cache = BoomerangCache.create('favorite', { storage: 'local', encrypt: false });

export default {
  init() {
  },

  reset() {
    this.clear();
  },

  clear() {
    cache.clear();
  },

  async getChannels() {
    if (!this.authorized) {
      return [];
    }
    let channels = cache.get('channels');
    if (!channels) {
      const res = await this.api.favorite.getChannels();
      channels = res.channels;
      cache.set('channels', channels, TTL);
    }
    return channels;
  },

  async getVideos() {
    if (!this.authorized) {
      return [];
    }
    let videos = cache.get('videos');
    if (!videos) {
      const res = await this.api.favorite.getVideos();
      videos = res.videos;
      cache.set('videos', videos, TTL);
    }
    return videos;
  },

  async getTvshows() {
    if (!this.authorized) {
      return [];
    }
    let tvshows = cache.get('tvshows');
    if (!tvshows) {
      const res = await this.api.favorite.getTvshows();
      tvshows = res.tvshows;
      cache.set('tvshows', tvshows, TTL);
    }
    return tvshows;
  },

  async addChannel(id) {
    if (!this.authorized) {
      return;
    }
    let channels = await this.favorite.getChannels() || [];
    if (!channels.find(x => x.channel_id === id)) {
      channels = [{
        channel_id: id,
        added_time: moment().unix(),
      }, ...channels];
    }
    cache.set('channels', channels, TTL);
    this.api.favorite.addChannel(id);
  },

  async addVideo(id) {
    if (!this.authorized) {
      return;
    }
    let videos = await this.favorite.getVideos() || [];
    if (!videos.find(x => x.video_id === id)) {
      videos = [{
        video_id: id,
        added_time: moment().unix(),
      }, ...videos];
    }
    cache.set('videos', videos, TTL);
    this.api.favorite.addVideo(id);
  },

  async addTvshow(id) {
    if (!this.authorized) {
      return;
    }
    let tvshows = await this.favorite.getTvshows() || [];
    if (!tvshows.find(x => x.tvshow_id === id)) {
      tvshows = [{
        tvshow_id: id,
        added_time: moment().unix(),
      }, ...tvshows];
    }
    cache.set('tvshows', tvshows, TTL);
    this.api.favorite.addTvshow(id);
  },

  async removeChannel(id) {
    if (!this.authorized) {
      return;
    }
    let channels = await this.favorite.getChannels() || [];
    channels = channels.filter(x => x.channel_id !== id);
    cache.set('channels', channels, TTL);
    this.api.favorite.removeChannel(id);
  },

  async removeVideo(id) {
    if (!this.authorized) {
      return;
    }
    let videos = await this.favorite.getVideos() || [];
    videos = videos.filter(x => x.video_id !== id);
    cache.set('videos', videos, TTL);
    this.api.favorite.removeVideo(id);
  },

  async removeTvshow(id) {
    if (!this.authorized) {
      return;
    }
    let tvshows = await this.favorite.getTvshows() || [];
    tvshows = tvshows.filter(x => x.tvshow_id !== id);
    cache.set('tvshows', tvshows, TTL);
    this.api.favorite.removeTvshow(id);
  },
};

