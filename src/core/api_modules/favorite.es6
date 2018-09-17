export default {
  getChannels() {
    const version = 2;
    const module = 'favorite';
    const method = 'GET';
    const action = 'channels';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },

  getVideos() {
    const version = 2;
    const module = 'favorite';
    const method = 'GET';
    const action = 'videos';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },

  getTvshows() {
    const version = 2;
    const module = 'favorite';
    const method = 'GET';
    const action = 'tvshows';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },

  addChannel(id) {
    const version = 2;
    const module = 'favorite';
    const method = 'POST';
    const action = 'channel';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  addVideo(id) {
    const version = 2;
    const module = 'favorite';
    const method = 'POST';
    const action = 'video';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  addTvshow(id) {
    const version = 2;
    const module = 'favorite';
    const method = 'POST';
    const action = 'tvshow';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  removeChannel(id) {
    const version = 2;
    const module = 'favorite';
    const method = 'DELETE';
    const action = 'channel';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  removeVideo(id) {
    const version = 2;
    const module = 'favorite';
    const method = 'DELETE';
    const action = 'video';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  removeTvshow(id) {
    const version = 2;
    const module = 'favorite';
    const method = 'DELETE';
    const action = 'tvshow';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },
};
