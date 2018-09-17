<template>
  <div class="p-search">
    <div class="p-search__block">
      <!-- <img class="p-search__logo" :src="$backend.logo"> -->

      <div class="p-search__block-search">
        <div class="p-search__block-search-input">
          <input type="text" class="p-search__block-search-input-field" v-on:keyup="keyPressHandler" ref="searchInput">
          <div class="p-search__block-search-input-clear" v-on:click="clearSearch" v-show="isHaveValue">
            <i class="fa fa-times"></i>
          </div>
        </div>
          
          <div class="p-search__block-search-button" v-on:click="findContent($refs.searchInput.value)">Искать</div>
          <div class="p-search__block-search-button" v-on:click="closeSearchPage">Назад</div>
      </div>      

      <div v-if="message" class="p-search__message">{{ message }}</div>

      <div class="p-search__results" ref="searchResults">
        <b-channels v-if="notEmptyChannels" :title="$lang.messages.search.found_channels" :channels="channels" :isStub="false" :isHaveRedirect="false"></b-channels>
        <b-videos v-if="notEmptyTvshows" :title="$lang.messages.search.found_tvshows" :items="tvshows" :isStub="false" :mode="'horizontal'" :isHaveRedirect="false"></b-videos>
        <b-videos v-if="notEmptyVideos" :title="$lang.messages.search.found_videos" :items="videos" :isStub="false" :mode="'vertical'" :isHaveRedirect="false"></b-videos>
      </div>
    </div>
  </div>
</template>

<script>
import BVideos from '@/components/blocks/BVideos';
import BChannels from '@/components/blocks/BChannels';
import WProgressBarThrobber from '@/components/widgets/WProgressBarThrobber';
import Metric from '@/persik/platform/Metric';
import utils from '@/mixins/utils';

export default {
  name: 'p-search',
  mixins: [utils],
  components: {
    BChannels,
    BVideos,
    WProgressBarThrobber,
  },
  data() {
    return {
      channels: null,
      tvshows: null,
      videos: null,
      message: null,
      defaultLang: 'en',
      isHaveValue: false,
    };
  },
  computed: {
    showSearchTrobber() {
      return this.$store.getters.getLoadingCount('search') > 0;
    },
    notEmptyChannels() {
      return this.channels !== null && this.channels.length !== 0;
    },
    notEmptyTvshows() {
      return this.tvshows !== null && this.tvshows.length !== 0;
    },
    notEmptyVideos() {
      return this.videos !== null && this.videos.length !== 0;
    },
    hasContent() {
      return this.notEmptyChannels || this.notEmptyTvshows || this.notEmptyVideos;
    },
    connected() {
      return this.$store.getters.getConnectionStatus;
    },
  },
  activated() {
    Metric.getInstance().screenView('search');
    this.$root.$emit('focus', this.$el);
    this.$store.commit('setSpecialChannels', this.channels);
    this.defaultLang = this.$lang.getLang();
  },
  methods: {
    clearSearch() {
      this.$refs.searchInput.value = '';
      this.isHaveValue = false;
      this.tvshows = null;
      this.videos = null;
      this.channels = null;
    },
    async keyPressHandler(key) {
      if (key.code === 'Enter') {
        const searchInput = this.$refs.searchInput.value;
        if (searchInput.length > 2) {
          this.findContent(searchInput);
        } else if (searchInput.length <= 2 && searchInput.length > 0) {
          this.message = this.$lang.messages.search.more_letters;
        } else {
          this.message = this.$lang.messages.search.empty_field;
        }
      } else {
        this.message = null;
      }
      this.isHaveValue = this.$refs.searchInput.value.length > 0;
    },
    closeSearchPage() {
      this.$root.$emit('closeSearch');
    },
    keyboardReachBound(bound) {
      if (bound === 'left') {
        this.$root.$emit('focusMenu');
      }
      if (bound === 'bottom' && this.hasContent) {
        this.$root.$emit('focus', this.$refs.searchResults);
      }
    },
    async findContent(text) {
      this.channels = null;
      this.videos = null;
      this.tvshows = null;
      const content = await this.$backend.search.search(text);
      this.channels = content.channels.map((x) => x.channel_id);
      this.$store.commit('setSpecialChannels', this.channels);

      this.tvshows = this.arrayToItems(content.tvshows);
      this.videos = this.arrayToItems(content.videos);
      if (!this.hasContent) {
        this.message = this.$lang.messages.search.not_found;
      }
    },
  },
};
</script>

<style scoped lang="scss">

  .p-search {
  background-color: rgba($color-gray-medium, 0.99);
  padding-top: 2rem;
  min-height: calc(100vh - 2.5rem);
  position: fixed;
  top: 0;
  right: 0;
  width: 96%;
  height: calc(100vh - 2rem);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 2;

  &__block {
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 500ms;
            transition-duration: 500ms;
    -webkit-transition-timing-function: ease-out;
            transition-timing-function: ease-out;

    &-search {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-left: 5rem;
      margin-top: 3rem;

      &-input {
        position: relative;

        &-field {
          color: $color-text-simple;
          width: 55.5rem;
          height: 3.3rem;
          background-color: $color-gray-medium;
          overflow: hidden;
          -webkit-box-shadow: $shadow-dark;
                  box-shadow: $shadow-dark;
          font-size: 1.54rem;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          padding: .8rem 1rem;
          border: none;
        }

        &-clear {
          position: absolute;
          right: 1rem;
          top: 1.1rem;
          color: white;
          cursor: pointer;
          font-size: 1.4rem;
        }
      }

      &-button {
        height: 3.22rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        padding: 0 1.5rem;
        color: white;
        cursor: pointer;
        margin-left: 1.5rem;
        border: 1px solid #393939;

        &:hover {
          background-color: $color-hover;
        }
      }

    }
  }

  &__logo{          
    display: block;
    margin: 0 auto;
    margin-top: 1.67rem;
    max-width: 7rem;
    max-height: 2rem;
  }

  &__keyboard{
    margin-left: 4.29rem;
    margin-top: 1.33rem;
    width: 69rem;
    -webkit-transition: .6s;
    transition: .6s;
  }

  &__results {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  &__message {
    margin-top: .63rem;
    margin-left: 7.29rem;
    height: .92rem;
    border-radius: 20px;
    color: $color-hover;
    text-transform: uppercase;
    font-size: .92rem;
  }

}  

</style>
