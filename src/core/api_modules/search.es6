export default {
  search(query, channels = true, videos = true, tvshows = true) {
    const version = 2;
    const module = 'search';
    const method = 'GET';
    const action = '';
    const params = {
      query,
      channels: (channels === true) ? 1 : 0,
      videos: (videos === true) ? 1 : 0,
      tvshows: (tvshows === true) ? 1 : 0,
    };
    return this.exec(method, version, module, action, params, true);
  },
};
