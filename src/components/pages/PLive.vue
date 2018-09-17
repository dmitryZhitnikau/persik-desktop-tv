<template>
    <div class="p-live" v-on:click="hideFilter">
      <h1 class="section-title">{{ pageTitle }}</h1><!-- {{ ТВ: Сейчас в эфире }} -->
        <w-placeholder v-if="showPlaceholder"></w-placeholder>
        <div v-else class="p-live__channels">
            <e-live-channel
              v-for="id in channels"
              :id="id"
              :key="id"
              :time="time"
            ></e-live-channel>
        </div>
    </div>
</template>

<script>

  import moment from 'moment';
  import WPlaceholder from '@/components/widgets/WPlaceholder';
  import ELiveChannel from '@/components/elements/ELiveChannel';
  import Metric from '@/persik/platform/Metric';
  import utils from '@/mixins/utils';

  export default {
    name: 'p-live',
    props: ['channels', 'pageTitle'],
    mixins: [utils],
    components: {
      WPlaceholder,
      ELiveChannel,
    },
    data() {
      return {
        time: null,
        unsleepFrom: -6,
        unsleepTo: 7,
        ready: false,
      };
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
      }, 100);
    },
    activated() {
      Metric.getInstance().screenView('tv-live');
      this.startTimeInterval();
    },
    deactivated() {
      this.stopTimeInterval();
    },
    destroyed() {
      this.stopTimeInterval();
    },
    computed: {
      showPlaceholder() {
        return !this.ready;
      },
    },
    methods: {
      hideFilter() {
        this.$root.$emit('hideFilters');
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-live {
  background: $color-gray-dark;
  padding-top: 2rem;

  &__channels {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
}

</style>
