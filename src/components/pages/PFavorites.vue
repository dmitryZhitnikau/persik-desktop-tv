<template>
  <div class="p-favorites">

    <w-placeholder v-if="showPlaceholder"></w-placeholder>

    <div v-else class="p-favorites__block">
      <div v-if="!hasContent" class="p-favorites__block-nocontent">
        <span class="p-favorites__block-nocontent-title">{{ $lang.messages.favorite.no_favorites }}</span>
        <w-button @click="goMain()" class="p-favorites__block-nocontent-button" :caption="$lang.messages.buttons.to_main"></w-button>
      </div>
      <b-channels v-if="channels.length" class="p-favorites__channels" :title="$lang.messages.favorite.channels" :channels="channels" :isStub="false" :isHaveRedirect="false"></b-channels>
      <b-videos v-if="tvshows.length" class="p-favorites__videos" :isStub="false" :title="$lang.messages.favorite.shows" :items="tvshows" mode="'horizontal'" :isHaveRedirect="false"></b-videos>
      <b-videos v-if="videos.length" class="p-favorites__videos" :isStub="false" :title="$lang.messages.favorite.videos" :items="videos" mode="'vertical'" :isHaveRedirect="false"></b-videos>
    </div>
  </div>
</template>

<script>
import BChannels from '@/components/blocks/BChannels';
import BVideos from '@/components/blocks/BVideos';
import WPlaceholder from '@/components/widgets/WPlaceholder';
import WButton from '@/components/widgets/WButton';
import Metric from '@/persik/platform/Metric';
import utils from '@/mixins/utils';

export default {
  name: 'p-favorites',
  mixins: [utils],
  components: {
    BChannels,
    BVideos,
    WPlaceholder,
    WButton,
  },
  data() {
    return {
      showPlaceholder: false,
    };
  },
  activated() {
    Metric.getInstance().screenView('favorites');
    setTimeout(() => {
      this.$root.$emit('focus', this.$el);
    }, 0);
    this.$store.commit('setSpecialChannels', this.channels);
  },
  computed: {
    hasContent() {
      return !!(this.channels.length +
        this.videos.length +
        this.tvshows.length);
    },
    channels() {
      const channels = this.$store.getters.favoriteChannels || [];
      return channels.map(x => x.channel_id);
    },
    tvshows() {
      const tvshows = this.$store.getters.favoriteTvshows || [];
      return this.arrayToItems(tvshows);
    },
    videos() {
      const videos = this.$store.getters.favoriteVideos || [];
      return this.arrayToItems(videos);
    },
  },
  watch: {
    channels() {
      this.$store.commit('setSpecialChannels', this.channels);
      this.$root.$emit('focus', this.$el, true);
    },
    tvshows() {
      this.$store.commit('setSpecialChannels', this.channels);
      this.$root.$emit('focus', this.$el, true);
    },
    videos() {
      this.$store.commit('setSpecialChannels', this.channels);
      this.$root.$emit('focus', this.$el, true);
    },
  },
  methods: {
    goMain() {
      this.$router.push({ name: 'Main', params: { page: 'home' } });
    },
  },
};
</script>

<style scoped lang="scss">
.p-favorites {
  background: $color-gray-dark;
  color: $color-text-muted;
  width: calc(100% - 3.42rem);
  min-height: calc(100vh - 2.5rem);

  &__block {
    padding: 2rem 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 500ms;
            transition-duration: 500ms;
    -webkit-transition-timing-function: ease-out;
            transition-timing-function: ease-out;

    &-nocontent {
      color: $color-text-simple;
      text-align: center;
      margin: 10rem auto;

      &-title {
        display: block;
        width: inherit;
      }

      &-button {
        display: inline-block;
        margin-top: 1rem;
      }

    }
  }
}
</style>
