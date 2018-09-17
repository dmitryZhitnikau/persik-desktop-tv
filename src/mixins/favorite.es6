export default {
  methods: {
    addToFavorite(id, type) {
      switch (type) {
        case 'channel':
          this.addFavoriteChannel(id);
          break;
        case 'tvshow':
          this.addFavoriteTvshow(id);
          break;
        case 'video':
          this.addFavoriteVideo(id);
          break;
        default:
          break;
      }
    },
    removeFromFavorite(id, type) {
      switch (type) {
        case 'channel':
          this.removeFavoriteChannel(id);
          break;
        case 'tvshow':
          this.removeFavoriteTvshow(id);
          break;
        case 'video':
          this.removeFavoriteVideo(id);
          break;
        default:
          break;
      }
    },
    async addFavoriteChannel(id) {
      await this.$backend.favorite.addChannel(id);
      this.$store.commit('setFavoriteChannels', await this.$backend.favorite.getChannels());
    },
    async removeFavoriteChannel(id) {
      await this.$backend.favorite.removeChannel(id);
      this.$store.commit('setFavoriteChannels', await this.$backend.favorite.getChannels());
    },
    async addFavoriteTvshow(id) {
      await this.$backend.favorite.addTvshow(id);
      this.$store.commit('setFavoriteTvshows', await this.$backend.favorite.getTvshows());
    },
    async removeFavoriteTvshow(id) {
      await this.$backend.favorite.removeTvshow(id);
      this.$store.commit('setFavoriteTvshows', await this.$backend.favorite.getTvshows());
    },
    async addFavoriteVideo(id) {
      await this.$backend.favorite.addVideo(id);
      this.$store.commit('setFavoriteVideos', await this.$backend.favorite.getVideos());
    },
    async removeFavoriteVideo(id) {
      await this.$backend.favorite.removeVideo(id);
      this.$store.commit('setFavoriteVideos', await this.$backend.favorite.getVideos());
    },
    checkFavorite(id, type) {
      switch (type) {
        case 'channel':
          return this.$store.getters.favoriteChannels
            .some(channel => channel.channel_id === id);

        case 'tvshow':
          return this.$store.getters.favoriteTvshows
            .some(tvshow => tvshow.tvshow_id === id);

        case 'video':
          return this.$store.getters.favoriteVideos
            .some(video => video.video_id === id);

        default:
          return false;
      }
    },
  },
};
