export default {
  getTime() {
    const version = 2;
    const module = 'utils';
    const method = 'GET';
    const action = 'time';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },

  getCountryCodeByIP() {
    const version = 1;
    const module = 'utils';
    const method = 'GET';
    const action = 'geo';
    return this.exec(method, version, module, action);
  },

};
