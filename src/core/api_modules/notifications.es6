export default {
  getGlobalNotifications() {
    const version = 2;
    const module = 'notice';
    const method = 'GET';
    const action = '';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },
};
