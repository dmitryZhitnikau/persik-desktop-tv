<template>
  <div class="p-video" data-xy-group data-xy-open-left >
    <w-placeholder v-if="showPlaceholder"></w-placeholder>
    <div class="p-video__inner" scrollable-y>
      <div class="p-video__list">
        <e-video v-for="item in items" :key="item.id" class="p-video__list-item" :type="item.type" :id="item.id" :mode="'vertical'"></e-video>
      </div>
      <div v-if="connected && showLoadMoreButton" class="p-video__btn-load-more" data-xy-focusable tabindex="-1" v-on:click="loadVideo()">
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
    name: 'p-videos',
    props: {
      categoryId: {
        default: 1,
      },
      genreId: {
        default: null,
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
        pageSize: 20,
        showPlaceholder: true,
        showLoadMoreButton: false,
        isHaveData: false,
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
    methods: {
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
  position: absolute;
  top: 0;
  left: 6rem;
  height: 100%;
  width: 77rem;
  &__inner {
    position: absolute;
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
    padding-top: 2rem;
    &-item {
      margin-bottom: 2rem;
    }
  }

  &__btn-load-more {
    width: 10rem;
    height: 3rem;
    border: 1px solid $color-gray-light;
    color: $color-text-simple;
    margin: 0 auto 2rem;
    text-align: center;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    line-height: 3rem;

    &:hover {
      background-color: $color-hover;
    }
  }
}

</style>
