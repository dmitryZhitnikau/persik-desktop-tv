export default {
  getChannel(id, bitrate = 600) {
    const version = 1;
    const method = 'GET';
    const module = 'stream';
    const action = 'channel';
    const params = {
      id,
      bitrate,
    };
    return this.exec(method, version, module, action, params, true);
  },

  getTvshow(id) {
    const version = 1;
    const method = 'GET';
    const module = 'stream';
    const action = 'show';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },

  getVideo(id) {
    const version = 1;
    const method = 'GET';
    const module = 'stream';
    const action = 'video';
    const params = {
      id,
    };
    return this.exec(method, version, module, action, params, true);
  },
};
