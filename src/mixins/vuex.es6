import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadingCounter: {
      search: 0,
      login: 0,
      check: 0,
    },
    authorized: false,
    utcOffset: 180,
    filter: null,
    connected: false,
    volume: 0,

    favoriteChannels: [],
    favoriteTvshows: [],
    favoriteVideos: [],

    filteredChannels: [],
    specialChannels: [],
  },
  getters: {
    getAuthorized(state) {
      return state.authorized;
    },
    // eslint-disable-next-line
    getLoadingCount: (state) => (param) => {
      return state.loadingCounter[param];
    },
    getLoadingCounter(state) {
      return state.loadingCounter;
    },
    utcOffset(state) {
      return state.utcOffset;
    },
    getFilter(state) {
      return state.filter;
    },
    getConnectionStatus(state) {
      return state.connected;
    },
    volume(state) {
      return state.volume;
    },

    countFavoriteChannels(state) {
      return state.favoriteChannels.length;
    },
    favoriteChannels(state) {
      return state.favoriteChannels;
    },
    favoriteTvshows(state) {
      return state.favoriteTvshows;
    },
    favoriteVideos(state) {
      return state.favoriteVideos;
    },
  },
  mutations: {
    loadingCounterAdd(state, param) {
      if (param === '') {
        state.loadingCounter.search += 1;
      } else {
        state.loadingCounter[param] += 1;
      }
    },
    loadingCounterPop(state, param) {
      if (param === '') {
        state.loadingCounter.search -= 1;
      } else {
        state.loadingCounter[param] -= 1;
      }
    },
    authorized(state, n) {
      state.authorized = n;
    },
    changeFilter(state, value) {
      state.filter = value;
    },
    connected(state, isConn) {
      state.connected = isConn;
    },
    volume(state, value) {
      state.volume = Math.max(0, Math.min(100, parseFloat(value)));
    },

    setFavoriteChannels(state, value) {
      state.favoriteChannels = value || [];
    },
    setFavoriteTvshows(state, value) {
      state.favoriteTvshows = value || [];
    },
    setFavoriteVideos(state, value) {
      state.favoriteVideos = value || [];
    },

    setCurrentChannels(state, value) {
      state.currentChannels = value || [];
    },

    setFilteredChannels(state, value) {
      state.filteredChannels = value || [];
    },
    setSpecialChannels(state, value) {
      state.specialChannels = value || [];
    },
  },
});

Vue.mixin({
  methods: {
    async syncVuexWithBackend() {
      store.commit('setFavoriteChannels', await this.$backend.favorite.getChannels());
      store.commit('setFavoriteTvshows', await this.$backend.favorite.getTvshows());
      store.commit('setFavoriteVideos', await this.$backend.favorite.getVideos());
    },
  },
});

export default store;
