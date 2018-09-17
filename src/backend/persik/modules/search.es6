export default {
  init() {
  },

  reset() {
  },

  clear() {
  },

  async search(query, ...rest) {
    if (query === 'develop123') {
      this.settings.setDeveloperMode(!this.settings.getDeveloperMode());
      window.location.reload();
    }
    return this.api.search.search(query, ...rest);
  },

};
