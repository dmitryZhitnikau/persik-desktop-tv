export default {
  getTvshows(channels = [], ts = 0, skip = 0, limit = 10000, from = null, to = null) {
    return this.exec('GET', 2, 'epg', 'tvshows', { channels, ts, skip, limit, from, to }, true);
  },

  getPersons(ts = 0, skip = 0, limit = 10000) {
    return this.exec('GET', 2, 'epg', 'persons', { ts, skip, limit }, true);
  },

  getVideos(ts = 0, skip = 0, limit = 10000) {
    return this.exec('GET', 2, 'epg', 'videos', { ts, skip, limit }, true);
  },
};
