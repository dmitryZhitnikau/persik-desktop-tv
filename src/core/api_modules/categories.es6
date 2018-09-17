export default {
  getChannel() {
    const version = 2;
    const module = 'categories';
    const method = 'GET';
    const action = 'channel';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },

  getVideo() {
    const version = 2;
    const module = 'categories';
    const method = 'GET';
    const action = 'video';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },
};
