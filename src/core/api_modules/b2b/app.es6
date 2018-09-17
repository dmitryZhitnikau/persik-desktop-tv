export default {
  getNetworkId() {
    const version = 2;
    const module = 'app';
    const method = 'GET';
    const action = 'network-id';
    const params = {};
    return this.exec(method, version, module, action, params);
  },
};
