<template>
  <div class="p-video" v-on:click="hideFilter">
    <h1 class="section-title">{{ title }}</h1>
    <w-placeholder v-if="showPlaceholder"></w-placeholder>
    <div class="p-video__inner">
      <div class="p-video__list">
        <e-video v-for="item in items" :key="item.id" class="p-video__list-item" :type="item.type" :id="item.id" :mode="'vertical'"></e-video>
      </div>
      <div v-if="connected && showLoadMoreButton" class="p-video__btn-load-more" v-on:click="loadVideo()">
        {{ $lang.messages.buttons.load_more }}
      </div>
    </div>
  </div>
</template>

<script>

  import WPlaceholder from '@/components/widgets/WPlaceholder';
  import EVideo from '@/components/elements/EVideo';
  import Metric from '@/persik/platform/Metric';
  import utils from '@/mixins/utils';

  export default {
    name: 'p-video-films',
    props: {
      genreId: {
        default: null,
      },
      pageTitle: {
        default: 'Фильмы',
      },
    },
    mixins: [utils],
    components: {
      WPlaceholder,
      EVideo,
    },
    data() {
      return {
        items: [],
        sort: 'last',
        order: 'desc',
        pageSize: 40,
        categoryId: 1,
        showPlaceholder: true,
        showLoadMoreButton: false,
        isHaveData: false,
        isNeedWatchUpdater: true,
        title: 'Фильмы',
      };
    },
    watch: {
      connected() {
        if (!this.isHaveData && this.connected) {
          this.loadData();
        }
      },
      genreId() {
        this.loadData();
      },
      pageTitle(value) {
        if (value.split(') ')[1]) {
          this.title = value.split(') ')[1];
        } else {
          this.title = value;
        }
      },
    },
    computed: {
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
    },
    created() {
      this.$root.$on('bottomIsClose', this.loadVideo);
    },
    activated() {
      Metric.getInstance().screenView('videos');
      if (this.connected && !this.isHaveData) {
        this.loadData();
      }
    },
    methods: {
      hideFilter() {
        this.$root.$emit('hideFilters');
      },
      async loadData() {
        if (this.isNeedWatchUpdater) {
          this.isNeedWatchUpdater = false;
          this.items = [];
          await this.loadVideo();
          this.contentReady();
          this.isHaveData = true;
          this.isNeedWatchUpdater = true;
        }
      },
      contentReady() {
        this.showPlaceholder = false;
      },
      async loadVideo() {
        const count = this.items.length;
        const result = await this.$backend.content.getVideos(
          { category_id: this.categoryId, genre_id: +this.$route.query.tag },
          this.sort, this.order, count, this.pageSize,
        );
        if (result.videos.length) {
          this.items = [...this.items, ...this.arrayToItems(result.videos)];
        }
        this.showLoadMoreButton = (result.videos.length + count) < result.total;
      },
    },
  };
</script>

<style scoped lang="scss">

.p-video {
  background-color: $color-gray-dark;
  padding-top: 2rem;
  min-height: calc(100vh - 2.5rem);

  &__inner {
    padding-bottom: 2rem;
  }
  &__list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    &-item {
      margin-bottom: 2rem;
    }
  }

  &__btn-load-more {
    width: 10rem;
    height: 3rem;
    border: 1px solid $color-gray-light;
    color: $color-text-simple;
    margin: 0 auto;
    text-align: center;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    line-height: 3rem;
    cursor: pointer;

    &:hover {
      background-color: $color-hover;
    }
  }
}

</style>
