<template>
  <div class="p-video" v-on:click="hideFilter">
    <h1 class="section-title">{{ title }}</h1>
    <w-placeholder v-if="showPlaceholder"></w-placeholder>
    <div class="p-video__inner">
      <div class="p-video__list">
        <e-video v-for="item in items" :key="item.id" class="p-video__list-item" :type="item.type" :id="item.id" :mode="'horizontal'"></e-video>
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
    name: 'p-video-shows',
    props: {
      genreId: {
        default: null,
      },
      pageTitle: {
        default: 'Передачи',
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
        categoryId: 4,
        pageSize: 40,
        showPlaceholder: true,
        showLoadMoreButton: false,
        isHaveData: false,
        title: 'Передачи',
      };
    },
    watch: {
      connected() {
        if (!this.isHaveData && this.connected) {
          this.loadData();
        }
      },
      categoryId() {
        this.items = [];
        this.loadVideo();
      },
      genreId() {
        this.items = [];
        this.loadVideo();
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
    async activated() {
      Metric.getInstance().screenView('videos');
      this.$root.$emit('focus', this.$el);
      if (this.connected && !this.isHaveData) {
        this.loadData();
      }
    },
    created() {
      this.$root.$on('bottomIsClose', this.loadVideo);
    },
    methods: {
      hideFilter() {
        this.$root.$emit('hideFilters');
      },
      async loadData() {
        await this.loadVideo();
        this.contentReady();
        this.$root.$emit('focus', this.$el);
        this.isHaveData = true;
      },
      contentReady() {
        this.showPlaceholder = false;
        setTimeout(() => {
          this.$root.$emit('focus', this.$el);
        }, 0);
      },
      async loadVideo() {
        const count = this.items.length;
        const result = await this.$backend.content.getVideos(
          { category_id: this.categoryId, genre_id: this.genreId },
          this.sort, this.order, count, this.pageSize,
        );
        if (result.videos.length) {
          this.items = [...this.items, ...this.arrayToItems(result.videos)];
          setTimeout(() => {
            this.$root.$emit('focus', this.$el.querySelectorAll('.p-video__list-item')[count]);
          }, 0);
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
