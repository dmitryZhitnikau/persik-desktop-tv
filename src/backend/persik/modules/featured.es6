export default {
  init() {
  },

  reset() {
  },

  clear() {
  },

  getChannels(size) {
    return this.api.featured.getChannels(size);
  },

  async getIndex() {
    const res = await this.api.featured.getIndex();
    for (let i = 0; i < res.sections.length; i += 1) {
      const section = res.sections[i];
      const source = section.source;
      //eslint-disable-next-line
      const data = await this.api.exec(
        'POST',
        source.version,
        source.module,
        source.action,
        source.params,
        true,
      );
      Object.assign(section, data);
    }
    return res.sections;
  },
};
