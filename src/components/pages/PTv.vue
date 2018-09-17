<template>
  <div class="main-tv-nav" v-on:click="hideFilters">
    <h1 class="section-title">{{ pageTitle }}</h1><!-- ТВ: Обзор -->
    <w-placeholder v-if="showPlaceholder"></w-placeholder>
    <div v-else class="main-tv-nav__channels">
      <e-channel
        v-for="id in channels"
        class="main-tv-nav__channels-item"
        :id="id"
        :time="time"
        :key="id"
      ></e-channel>
    </div>
  </div>
</template>

<script>

  import moment from 'moment';
  import EChannel from '@/components/elements/EChannel';
  import WPlaceholder from '@/components/widgets/WPlaceholder';
  import Metric from '@/persik/platform/Metric';
  import utils from '@/mixins/utils';

  const SLEEP_DELAY = 200;

  export default {
    name: 'p-tv',
    props: ['channels', 'pageTitle'],
    mixins: [utils],
    components: {
      EChannel,
      WPlaceholder,
    },
    data() {
      return {
        time: null,
        unsleepFrom: -11,
        unsleepTo: 12,
        ready: false,
      };
    },
    computed: {
      showPlaceholder() {
        return !this.ready;
      },
    },
    watch: {
      channels() {
        this.time = moment().unix();
      },
    },
    created() {
      this.startTimeInterval();
    },
    mounted() {
      setTimeout(() => {
        this.ready = true;
        this.$root.$emit('focus', this.$el, true);
      }, 100);
    },
    activated() {
      Metric.getInstance().screenView('tv-navigator');
      this.startTimeInterval();
    },
    deactivated() {
      this.stopTimeInterval();
    },
    destroyed() {
      this.stopTimeInterval();
    },
    methods: {
      hideFilters() {
        this.$root.$emit('hideFilters');
      },
      focusChannelHandler(id) { //eslint-disable-line
        clearTimeout(this.refreshTimeoutId);
        this.refreshTimeoutId = setTimeout(() => {
          this.refreshTimeoutId = null;
          const index = this.channels.indexOf(id);
          const RANGE_FROM = -11;
          const RANGE_TO = 11;
          this.unsleepFrom = index + RANGE_FROM;
          this.unsleepTo = index + RANGE_TO;
        }, SLEEP_DELAY);
      },
    },
  };
</script>

<style scoped lang="scss">

  .main-tv-nav {
  background: $color-gray-dark;
  padding-top: 2rem;
  min-height: calc(100vh - 2.5rem);

  &__channels {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
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

    &-item {
      margin-bottom: 2rem;
    }
  }
}

</style>
