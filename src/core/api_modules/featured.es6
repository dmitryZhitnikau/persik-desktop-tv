export default {
  getChannels(size) {
    const version = 2;
    const module = 'featured';
    const method = 'GET';
    const action = 'channels';
    const params = {
      size,
    };
    return this.exec(method, version, module, action, params, true);
  },
  getIndex() {
    const version = 2;
    const module = 'featured';
    const method = 'GET';
    const action = '';
    const params = {
    };
    return this.exec(method, version, module, action, params, true);
  },
};
