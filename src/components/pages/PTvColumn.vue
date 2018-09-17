<template>
  <div class="tv-column" v-on:click="hideFilter">
    <w-placeholder v-if="showPlaceholder"></w-placeholder>
    <template v-else>
      <div class="tv-column__channels">
        <div class="tv-column__scrollable tv-column__scrollable_smooth">
          <e-column-channel
              v-for="(id, index) in channels"
              :key="id"
              :id="id"
              :num="index + 1"
              :active="id === activeChannelId"
              :ref="id === activeChannelId ? 'channel-active' : ''"
              @click="selectChannel(id)"
          ></e-column-channel>
        </div>
      </div>
      <div class="tv-column__dates">
        <div
                v-for="(date, index) in dates"
                class="tv-column__dates-item"
                :key="index"
                :class="{'tv-column__dates-item_active': activeDate === date}"
                v-on:click="selectDate(date)"
        >
          <strong>{{ date | momentFormat('DD')}} {{ $lang.messages.monthShort[momentFormat(date, 'M')] }}</strong> &ndash; {{ $lang.messages.days[momentFormat(date, 'd')]}}
        </div>
        <div v-if="!dates.length" class="tv-column__dates-empty">{{ $lang.messages.messages.no_tvguide }}</div>
      </div>
      <div class="tv-column__tvshows-list">
        <div v-if="!tvshows.length" class="tv-column__tvshows-list-empty">{{ $lang.messages.messages.no_tvguide }}</div>
        <div class="tv-column__scrollable" :class="{'tv-column__scrollable_smooth': smoothScroll}">
          <e-column-tvshow
                  v-for="tvshow in tvshows"
                  :tvshow="tvshow"
                  :id="tvshow.tvshow_id"
                  :time="time"
                  :active="activeTvshow === tvshow.tvshow_id"
                  :key="tvshow.tvshow_id"
                  :ref="activeTvshow === tvshow.tvshow_id? 'tvshow-active' : ''"
          ></e-column-tvshow>
        </div>
      </div>

        <div v-if="!isPlayable" class="tv-column__lock">
          <i class="tv-column__lock-icon fa fa-lock"></i>
          <div v-if="!authorized" class="tv-column__lock-info">
            {{ $lang.messages.auth.need_auth }}
          </div>
          <div v-else-if="!isAvailable" class="tv-column__lock-info">
            {{ $lang.messages.messages.unavailable_channel }}
          </div>
          <div v-else-if="isAdultLocked" class="tv-column__lock-info">
            {{ $lang.messages.messages.adult_locked }}
          </div>
        </div>

      <div class="tv-column__preview" v-bind:class="{ 'tv-column__preview_holey': isPlayable }">

        <img v-on:click="fullScreen()" class="tv-column__preview-fullscreen" src="../../assets/pixel-full-screen.png" alt="" title="На весь экран">

        <div class="tv-column__preview-title">
          {{ title }}
        </div>
        <div class="tv-column__preview-description" v-html="description">
        </div>

      </div>

    </template>
  </div>
</template>

<script>

  import moment from 'moment';
  import datetime from '@/mixins/datetime';
  // eslint-disable-next-line
  import EpgReader from '@/persik/service/epg/EpgReader';
  import WPlaceholder from '@/components/widgets/WPlaceholder';
  import EColumnChannel from '@/components/elements/EColumnChannel';
  import EColumnTvshow from '@/components/elements/EColumnTvshow';
  import Video from '@/persik/platform/Video';
  import Metric from '@/persik/platform/Metric';
  import utils from '@/mixins/utils';
  import fullscreen from '@/mixins/fullscreen';

  const epg = EpgReader.getInstance();
  
  export default {
    name: 'p-tv-column',
    props: ['channels'],
    mixins: [datetime, utils, fullscreen],
    components: {
      WPlaceholder,
      EColumnChannel,
      EColumnTvshow,
    },
    data() {
      return {
        isActive: false,
        dates: [],
        tvshows: [],
        time: null,
        activeChannelId: null,
        activeDate: null,
        activeTvshow: null,
        title: '',
        description: '',
        ready: false,
        smoothScroll: true,
      };
    },
    computed: {
      authorized() {
        return this.$store.getters.getAuthorized;
      },
      volume() {
        return this.$store.getters.volume;
      },
      isAdultLocked() {
        return this.isChannelAdultLocked(this.activeChannel);
      },
      isAvailable() {
        return this.activeChannel ? this.activeChannel.available : null;
      },
      isPlayable() {
        return this.isActive && this.isAvailable && !this.isAdultLocked;
      },
      showPlaceholder() {
        return !this.ready;
      },
    },
    asyncComputed: {
      activeChannel: {
        async get() {
          if (!this.activeChannelId) {
            return null;
          }
          return this.$backend.content.getChannel(this.activeChannelId);
        },
        watch() {
          return this.activeChannelId;
        },
      },
    },
    watch: {
      async channels() {
        await this.autoSelectChannel();
        this.time = moment().unix();
      },
      activeTvshow() {
        clearTimeout(this.activeTvshowTimerId);
        if (this.activeTvshow) {
          this.activeTvshowTimerId = setTimeout(async () => {
            const tvshow = await this.$backend.content.getTvshow(this.activeTvshow);
            this.title = tvshow.title;
            const video = await epg.getVideoById(tvshow.video_id);
            this.description = video.description;
          }, 500);
        } else {
          this.title = '';
          this.description = '';
        }
      },
      volume(value) {
        if (this.video) {
          this.video.volume = value / 100;
        }
      },
      isActive(value) {
        if (value && this.activeChannel && this.isPlayable) {
          this.loadVideo();
        }
      },
      activeChannel() {
        if (this.isActive) {
          if (this.isPlayable) {
            this.loadVideo();
          } else {
            this.video.stop();
          }
        }
      },
    },
    created() {
      this.isHaveData = false;
      this.video = Video.getInstance();
      this.video.open();
      this.video.useHls = this.$backend.settings.getVideoUseHls();
      this.setViewPort();
      this.startTimeInterval();
      this.isActive = true;
      this.selectChannel(this.channels[0]);
    },
    mounted() {
      setTimeout(() => {
        this.ready = true;
      }, 100);
    },
    async activated() {
      this.autoSelectChannel();
      Metric.getInstance().screenView('tv-column');
      this.video = Video.getInstance();
      this.video.open();
      this.video.useHls = this.$backend.settings.getVideoUseHls();
      this.setViewPort();
      this.video.volume = this.volume / 100;
      this.isActive = true;
      this.startTimeInterval();
    },
    deactivated() {
      // this.restoreViewPort();
      this.video.close(true);
      this.video.setViewPort(10, 10, 0, 0);
      this.video = null;
      this.stopTimeInterval();
      this.isActive = false;
    },
    destroyed() {
      this.stopTimeInterval();
      this.isActive = false;
      this.video.setViewPort(10, 10, 0, 0);
    },
    methods: {
      fullScreen() {
        this.$router.push({
          name: 'PlayerLive',
          params: {
            load: false,
            channelId: this.activeChannelId,
          },
        });
        this.openFullscreen();
      },
      hideFilter() {
        this.$root.$emit('hideFilters');
      },
      async autoSelectChannel() {
        if (this.ready) {
          if (!this.activeChannelId || !this.channels.includes(this.activeChannelId)) {
            this.selectChannel(this.channels[0]);
          }
          setTimeout(() => {
            this.$root.$emit('focus', this.$refs['channel-active'][0].$el);
          }, 0);
        }
      },
      restoreViewPort() {
        if (this.video) {
          this.video.setViewPort(0, 0, 0, 0); // (w, h, top, left) for video player window
        }
      },
      setViewPort() {
        if (this.video) {
          this.video.setViewPort(59, 4, 18, 10.125); // (w, h, top, left) for video player window
        }
      },
      async selectChannel(id) {
        if (this.activeChannelId === id) {
          this.$router.push({ name: 'PlayerLive', params: { load: false, channelId: id } });
        } else {
          this.activeChannelId = id;
          await this.loadDates(id);

          const [currentTvshow] = await epg.getNextTvshows(this.activeChannelId, this.time, 1);
          if (currentTvshow) {
            const currentDate = currentTvshow.date;
            await this.selectDate(currentDate);
            this.activeTvshow = currentTvshow.tvshow_id;
          } else {
            this.tvshows = [];
            this.activeTvshow = null;
          }
        }
        this.scrollToActiveShow();
      },
      scrollToActiveShow() {
        setTimeout(() => {
          const element = document.getElementsByClassName('e-column-tvshow_active')[0];
          const container = document.getElementsByClassName('tv-column__scrollable')[1];
          container.scrollTo(0, 0);
          const elPos = element.getBoundingClientRect().top;
          const contHeight = container.getBoundingClientRect().height;
          container.scrollTo(0, elPos - (contHeight / 2));
        }, 0);
      },
      async loadDates() {
        this.dates = await epg.getDatesByChannelId(this.activeChannelId);
      },
      async selectDate(date) {
        const tvshows = await epg.getTvshowsByDate(this.activeChannelId, date);
        this.activeDate = date;
        this.tvshows = tvshows;
        if (this.tvshows.length) {
          this.smoothScroll = false;
        }
      },
      async loadVideo() {
        if (!this.isActive) {
          return;
        }
        const url = await this.getStreamUrl();
        if (this.video.played && this.video.url === url) {
          return;
        }
        this.video.play(url);
        Metric.getInstance().event('tv-window', 'play', `${this.activeChannel.name} (#${this.activeChannel.channel_id})`);
      },
      async getStreamUrl() {
        let streamUrl = this.activeChannel.stream_url;
        if (!streamUrl) {
          try {
            const stream = await this.$backend.stream.getChannel(this.activeChannel.channel_id);
            streamUrl = stream.stream_url;
          } catch (e) {
            console.error(e);
            this.$nm.showMessage(e.message);
          }
        }
        return streamUrl;
      },
    },
  };
</script>

<style lang="scss">

  $clipX: 60rem;
  $clipY: 4rem;
  $clipWidth: 18rem;
  $clipHeight: 10.125rem;
  $clipOffsetX: 58.29rem;

  .tv-column {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;

  &__scrollable {
    position: relative;
    height: calc(100vh - 2.5rem);
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;

    &_smooth {
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
      -webkit-transition-duration: 200ms;
              transition-duration: 200ms;
      -webkit-transition-timing-function: ease-out;
              transition-timing-function: ease-out;
    }
  }

  &__channels {
    width: 18rem;
    height: 100%;
    text-align: left;
    background-color: $color-gray-medium;
    -webkit-box-shadow: $shadow-dark;
            box-shadow: $shadow-dark;
    z-index: 2;
    text-transform: uppercase;
  }

  &__dates {
    width: 13rem;
    height: calc(100vh - 2.5rem);
    background-color: $color-gray-dark;
    text-align: left;
    text-transform: uppercase;
    position: relative;
    -webkit-box-shadow: $shadow-dark;
            box-shadow: $shadow-dark;
    z-index: 2;

    &-item {
      height: 3.5rem;
      line-height: 3.5rem;
      padding-left: 1rem;
      color: $color-text-simple;
      cursor: pointer;

      &_active {
        color: $color-hover;
        font-weight: bold;
      }

      &:hover {
        background: $color-hover;
        color: white;
      }

      &:hover .tv-column__dates-item_active {
        color: $color-text-simple !important;
      }
    }

    &-empty {
      line-height: 2rem;
      color: $color-text-simple;
      padding: 0 2rem;
      text-align: center;
      margin-top: 18rem;
      text-transform: uppercase;
    }
  }

  &__tvshows-list {
    width: 21rem;
    height: 100%;
    background: $color-gray-medium;
    -webkit-box-shadow: $shadow-dark;
            box-shadow: $shadow-dark;
    z-index: 1;

    &-empty {
      line-height: 2rem;
      color: $color-text-simple;
      padding: 0 5rem;
      text-align: center;
      margin-top: 18rem;
      text-transform: uppercase;
    }
  }

  &__lock {
      color: $color-text-simple;
      position: absolute;
      top: 1.5rem;
      right: 6.3rem;
      background-color: $color-black;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      width: 18rem;
      height: 10rem;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-flow: column;
              flex-flow: column;

      &-icon {
        font-size: 3rem;
      }
      &-info {
        padding: 1rem 1rem 0;
        font-size: 1rem;
        text-align: center;
      }
    }

  &__preview {
    height: calc(100vh - 2.5rem);
    z-index: 2;
    width: 25.5rem;
    position: relative;
    text-align: center;
    margin: auto 0;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
    -ms-flex-line-pack: stretch;
        align-content: stretch;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;


    &-video {
      height: 14rem;
      -ms-flex-negative: 0;
          flex-shrink: 0;
    }

    &-title {
      width: 100%;
      font-size: 1.2rem;
      line-height: 1.8rem;
      margin-top: 15rem;
      color: $color-text-simple;
      overflow: hidden;
      text-overflow: ellipsis;
      -ms-flex-negative: 0;
          flex-shrink: 0;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      font-weight: bold;
    }

    &-description {
      width: 100%;
      padding: 1.5rem;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      text-align: justify;
      color: $color-text-simple;
      overflow: hidden;
      height: 19rem;
    }

    &-fullscreen {
      position: absolute;
      left: 20.5rem;
      top: 10.4rem;
      width: 1rem;
      cursor: pointer;
    }
  }
}


</style>
