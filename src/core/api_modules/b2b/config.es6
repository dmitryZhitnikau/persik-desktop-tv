export default {
  getConfig() {
    const version = 2;
    const module = 'config';
    const method = 'GET';
    const action = '';
    const params = {};
    return this.exec(method, version, module, action, params);
  },
};
