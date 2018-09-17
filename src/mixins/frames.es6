export default {
  methods: {
    async getChannelFrame(channelId, time, transform = 'none', width = 0, height = 0) {
      const t = Math.round(time / 60) * 60;
      const channel = await this.$backend.content.getChannel(channelId);
      if (channel.frame_url) {
        let url = channel.frame_url;
        if (channel.frame_url.length) {
          /* eslint-disable no-template-curly-in-string */
          url = url.replace('${channelId}', channelId)
            .replace('${t}', time)
            .replace('${transform}', transform)
            .replace('${width}', width)
            .replace('${height}', height);
        }
        return url;
      }
      return `https://persik.by/utils/show-frame.php?c=${channelId}&t=${t}&tr=${transform}&w=${width}&h=${height}`;
    },
    getTvshowFrame(tvshow, transform = 'none', width = 0, height = 0) {
      const l = tvshow.stop - tvshow.start;
      const time = tvshow.start + ((3 / 7) * l);
      return this.getChannelFrame(tvshow.channel_id, time, transform, width, height);
    },
    getVideoFrame(videoId, time, transform = 'none', width = 0, height = 0) {
      const t = Math.round(time / 60) * 60;
      return `https://persik.by/utils/show-frame-video.php?v=${videoId}&t=${t}&tr=${transform}&w=${width}&h=${height}`;
    },
    async getChannelLogo(channelId) {
      const channel = await this.$backend.content.getChannel(channelId);
      return channel.logo;
    },
  },
};
