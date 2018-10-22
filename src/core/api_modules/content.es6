export default {
  getChannels() {
    const version = 2;
    const method = 'GET';
    const module = 'content';
    const action = 'channels';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },

  getVideos(filter, sort, order, offset = 0, size = 20) {
    const version = 2;
    const module = 'content';
    const method = 'GET';
    const action = 'videos';
    const params = Object.assign({}, filter, { sort, order, offset, size });
    return this.exec(method, version, module, action, params, true);
  },

  getVideo(id) {
    const version = 2;
    const module = 'content';
    const method = 'GET';
    const action = 'video';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  getTvshow(id) {
    const version = 2;
    const module = 'content';
    const method = 'GET';
    const action = 'tvshow';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  getChannel(id) {
    const version = 2;
    const module = 'content';
    const method = 'GET';
    const action = 'channel';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  getPerson(id) {
    const version = 2;
    const module = 'content';
    const method = 'GET';
    const action = 'person';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  getBanners() {
    const version = 2;
    const module = 'content';
    const method = 'GET';
    const action = 'banners2';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },
};
