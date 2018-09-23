<template>
  <div class="player">

    <w-volume :visible="isVolumeBarVisible"></w-volume>

    <transition name="nav-controls">
      <div class="player__navbar" v-show="showNavbar">
        <div class="player__navbar-button player__navbar-button_back" v-on:click="goBack">Назад</div>
        <div class="player__navbar-button player__navbar-button_fullscreen" v-if="isFullscreenSupport" v-on:click="toggleFullscreen"></div>
      </div>
    </transition>

    <!--<div class="player__navarea" v-on:mouseenter="showNavbar=true">

    </div>-->

    <div class="player__throbber" v-if="throbberVisible">
      <looping-rhombuses-spinner
              :animation-duration="2500"
              :rhombus-size="15"
      />
    </div>

    <transition name="fade-pause">
      <div class="player__pause" v-if="paused" v-on:click="togglePause()" v-on:mousemove="showAllBarsWithAutohide">
        <i class="far fa-pause-circle"></i>
      </div>
    </transition>

    <div class="player__area player__area_video" v-on:click="togglePause()" v-on:wheel="changeVolumeHandler" v-on:mousemove="showAllBarsWithAutohide"></div>

    <!--<div class="player__area player__area_track" v-on:mouseenter="showTracker()" v-on:mouseleave="hideTracker()"></div>-->

    <transition name="fade-controls">
      <div class="player__controls" v-show="showControls" v-on:mouseenter="showTracker()">
        <w-player-timeline :current="time" :duration="duration" :buffered="buffered" :changeCurrent="changeCurrentTime"></w-player-timeline>
        <w-player-thumbs v-if="trackingMode" :thumbs="thumbnails"></w-player-thumbs>
        <w-player-tracker v-if="trackingMode" :position="trackerPosition" :time="trackerTime" :thumbnail="thumbnail"></w-player-tracker>
      </div>
    </transition>

  </div>
</template>

<script>
  import moment from 'moment';
  import WPlayerTimeline from '@/components/widgets/player/WPlayerTimeline';
  import WPlayerTracker from '@/components/widgets/player/WPlayerTracker';
  import WPlayerThumbs from '@/components/widgets/player/WPlayerThumbs';
  import WVolume from '@/components/widgets/WVolume';
  import { LoopingRhombusesSpinner } from 'epic-spinners';
  import Video from '@/persik/platform/Video';
  import Metric from '@/persik/platform/Metric';
  import frames from '@/mixins/frames';
  import fullscreen from '@/mixins/fullscreen';

  export default {
    name: 'p-player-video',
    props: ['id', 'type'],
    mixins: [frames, fullscreen],
    components: {
      WPlayerTimeline,
      WPlayerTracker,
      WPlayerThumbs,
      LoopingRhombusesSpinner,
      WVolume,
    },
    data() {
      return {
        keyCounter: 0,
        throbberVisible: true,
        showControls: false,
        buffered: 0,
        isVolumeBarVisible: false,
        trackingMode: false,
        volumeTimer: null,
        trackerTime: 0,
        duration: null,
        time: 0,
        showNavbar: false,
        paused: false,
        name: '-',
        hideTimer: null,
      };
    },
    computed: {
      seekStep() {
        const index = Math.min(Math.floor(this.keyCounter / this.modeCounter), this.steps.length - 1);
        return this.steps[index];
      },
      trackerPosition() {
        return this.duration ? this.trackerTime / this.duration : 0;
      },
      position() {
        return this.duration ? this.time / this.duration : 0;
      },
      volume() {
        return this.$store.getters.volume;
      },
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
    },
    asyncComputed: {
      thumbnail() {
        if (this.trackingMode) {
          if (this.type === 'video') {
            return this.getVideoFrame(this.id, this.trackerTime, 'resize', 384);
          } else if (this.type === 'tvshow' && this.tvshow) {
            return this.getChannelFrame(this.tvshow.channel_id, this.tvshow.start + this.trackerTime, 'resize', 384);
          }
        }
        return '';
      },
      async thumbnails() {
        const result = [];
        const step = this.duration / this.thumbnailsCount;
        for (let i = 0; i < this.thumbnailsCount; i += 1) {
          const t = (i + 0.5) * step;
          if (this.type === 'video') {
            result.push(this.getVideoFrame(this.id, t, 'resize', 160));
          } else if (this.type === 'tvshow' && this.tvshow) {
            //eslint-disable-next-line
            result.push(await this.getChannelFrame(this.tvshow.channel_id, this.tvshow.start + t, 'resize', 160));
          }
        }
        return result;
      },
    },
    watch: {
      showControls(value) {
        if (value) {
          this.autoHideControls();
        }
      },
      volume(value) {
        if (this.video) {
          this.video.volume = value / 100;
        }
      },
      connected(value) {
        if (!value) {
          this.throbberVisible = true;
          this.video.pause();
        } else {
          this.throbberVisible = false;
          if (!this.paused) { this.video.resume(); }
        }
      },
    },
    methods: {
      checkCode(e) {
        switch (+e.keyCode) {
          case 32:
            this.togglePause();
            break;
          case 27:
            this.pageCloseFullscreen();
            this.goBack();
            break;
          default:
            break;
        }
      },
      pageCloseFullscreen() {
        if (this.isFullscreenActive()) {
          this.closeFullscreen();
        }
      },
      showAllBars() {
        this.showNavbar = true;
        this.showControls = true;
      },
      hideAllBars() {
        this.showNavbar = false;
        this.showControls = false;
      },
      showAllBarsWithAutohide() {
        clearTimeout(this.hideTimer);
        this.showAllBars();
        this.hideTimer = setTimeout(() => {
          this.hideAllBars();
        }, 4000);
      },
      changeVolumeHandler(e) {
        if (e.deltaY < 0) {
          this.$store.commit('volume', this.volume + 1);
        } else {
          this.$store.commit('volume', this.volume - 1);
        }
        clearTimeout(this.volumeTimer);
        this.isVolumeBarVisible = true;
        this.volumeTimer = setTimeout(() => {
          this.isVolumeBarVisible = false;
        }, 1000);
      },
      changeCurrentTime(timePercent) {
        this.video.seek = this.video.duration * timePercent;
        this.trackingMode = false;
        Metric.getInstance().event(this.type, 'seek', `${this.name} (#${this.id})`);
      },
      togglePause() {
        if (this.video.played) {
          this.video.pause();
          this.showAllBars();
          this.paused = true;
          Metric.getInstance().event(this.type, 'pause', `${this.name} (#${this.id})`);
          this.showAllBars();
        } else {
          this.video.resume();
          this.paused = false;
          Metric.getInstance().event(this.type, 'resume', `${this.name} (#${this.id})`);
          this.showAllBarsWithAutohide();
        }
      },
      showTracker() {
        this.showControls = true;
      },
      hideTracker() {
        this.showControls = false;
      },
      toggleControls() {
        this.showControls = !this.showControls;
      },
      enterEvent() {
        if (!this.autoSeek && this.trackingMode) {
          this.video.seek = this.trackerTime;
          this.trackingMode = false;
          Metric.getInstance().event(this.type, 'seek', `${this.name} (#${this.id})`);
        } else if (this.video.played) {
          this.video.pause();
          this.paused = true;
          Metric.getInstance().event(this.type, 'pause', `${this.name} (#${this.id})`);
        } else {
          this.video.resume();
          this.paused = false;
          Metric.getInstance().event(this.type, 'resume', `${this.name} (#${this.id})`);
        }
      },
      async loadVideo() {
        if (this.id === null || typeof this.id === 'undefined') {
          this.throbberVisible = false;
          this.$nm.showMessage('Null reference!', 0, '');
          this.showAllBars();
        } else {
          let streamData;
          try {
            if (this.type === 'video') {
              streamData = await this.$backend.stream.getVideo(this.id);
            } else if (this.type === 'tvshow') {
              streamData = await this.$backend.stream.getTvshow(this.id);
            }
            if (streamData.stream_url) {
              const url = streamData.stream_url;
              this.paused = false;
              this.startPlayTime = moment().valueOf();
              this.video.play(url);
              Metric.getInstance().event(this.type, 'play', `${this.name} (#${this.id})`);
              /* const videoTag = document.getElementById('player_window');
              const containerTag = document.getElementsByClassName('app-content')[0];
               console.log('tags: ', videoTag, containerTag);
              // eslint-disable-next-line
              ya.videoAd.loadModule('AdSDK').then((module) => {
                module.initForVideoNode(
                  {
                    partnerId: 290692,
                    category: 0,
                  },
                  videoTag,
                  containerTag,
                  (publicController) => {
                    console.log('playerInited: ', publicController);
                  },
                  (error) => {
                    console.error('playerError: ', error.message);
                  },
                );
              }); */
            } else {
              this.showAllBars();
              this.$nm.showError(this.$lang.messages.messages.server_ask_error, 5000);
            }
          } catch (e) {
            if (e.status === 401) {
              this.showAllBars();
              this.$nm.showError(e.message, 0, this.$lang.messages.auth.auth, () => {
                this.$router.push({ name: 'Main', params: { page: 'login' } });
              });
            } else {
              this.showAllBars();
              this.$nm.showError(e.message, 5000);
            }
          }
        }
      },
      refreshStreamData() {
        const currentTime = this.video.currentTime;
        this.time = currentTime;
        if (!this.trackingMode) {
          this.trackerTime = currentTime;
        }
      },
      /**
       *
       * @param {Number} direction (1 or -1)
       */
      trackStep(direction) {
        this.showControls = true;
        let trackerTime = this.trackerTime + (direction * this.seekStep);
        trackerTime = Math.max(0, Math.min(this.duration, trackerTime));
        if (this.trackerTime !== trackerTime) {
          this.trackerTime = trackerTime;
          this.trackingMode = true;
        }
        this.incrementKeyCounter();
        this.autoHideControls();
      },
      autoHideControls() {
        clearTimeout(this.autohideControlsTimeoutId);
        if (this.showControls) {
          this.autohideControlsTimeoutId = setTimeout(() => {
            this.showControls = false;
          }, 10000);
        }
      },
      incrementKeyCounter() {
        clearTimeout(this.keyCounterTimerId);
        this.keyCounter += 1;
        this.keyCounterTimerId = setTimeout(() => {
          this.keyCounter = 0;
        }, 200);
      },
      goBack() {
        this.$root.$emit('navigateBack');
      },
      timeUpdateControl() {
        this.throbberVisible = false;
        clearTimeout(this.updateTimer);
        if (this.notifId) {
          this.$nm.deleteNotif(this.notifId);
          this.notifId = null;
        }
        if (!this.paused) {
          this.updateTimer = setTimeout(() => {
            this.throbberVisible = true;
            this.notifId = this.$nm.showMessage(this.$lang.messages.messages.server_dontask, 0);
            Metric.getInstance().event(this.type, 'play error', `${this.name} (#${this.id})`);
          }, 20000);
        }
        if (this.startPlayTime) {
          const loadTime = moment().valueOf() - this.startPlayTime;
          this.startPlayTime = null;
          Metric.getInstance().timing(`play ${this.type}`, this.id, loadTime, { timingLabel: this.name });
        }
        if (!this.keepPlayTimer) {
          this.keepPlayTimer = setTimeout(() => {
            Metric.getInstance().event(this.type, 'playing', `${this.name} (#${this.id})`);
            this.keepPlayTimer = null;
          }, 20 * 60 * 1000);
        }
      },
      videoErrorHandler(func, error) {
        this.showAllBars();
        this.$nm.showMessage(error, 2000);
      },
      videoReadyHandler() {
        setTimeout(() => {
          this.throbberVisible = false;
          if (this.video) {
            this.duration = this.video.duration;
            this.video.setViewPort(0, 0, 0, 0);
          }
        }, 500);
      },
      videoWaitingHandler() {
        this.throbberVisible = true;
      },
      videoTimeUpdateHandler() {
        if (!isFinite(this.duration)) {
          this.duration = this.video.duration;
        }
        this.refreshStreamData();
        this.timeUpdateControl();
      },
      videoLoadProgressHandler() {
        this.buffered = this.video.buffered / this.video.duration;
      },
      videoStartSeekHandler() {
        this.throbberVisible = true;
      },
      videoStopSeekHandler() {
        this.throbberVisible = false;
        this.trackingMode = false;
      },
      videoPlayEndedHandler() {
        this.goBack();
      },
    },
    created() {
      this.tvshow = null;
      this.video = null;
      this.thumbnailsCount = 12;
      this.autohideControlsTimeoutId = null;
      this.modeCounter = 10;
      this.steps = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60];
      this.keyCounterTimerId = null;
      this.notifId = null;
      this.updateTimer = null;
      this.handlers = {};
      this.handlers.videoReadyHandler = this.videoReadyHandler.bind(this);
      this.handlers.videoErrorHandler = this.videoErrorHandler.bind(this);
      this.handlers.videoWaitingHandler = this.videoWaitingHandler.bind(this);
      this.handlers.videoTimeUpdateHandler = this.videoTimeUpdateHandler.bind(this);
      this.handlers.videoLoadProgressHandler = this.videoLoadProgressHandler.bind(this);
      this.handlers.videoStartSeekHandler = this.videoStartSeekHandler.bind(this);
      this.handlers.videoStopSeekHandler = this.videoStopSeekHandler.bind(this);
      this.handlers.videoPlayEndedHandler = this.videoPlayEndedHandler.bind(this);
      document.addEventListener('keydown', this.checkCode);
    },
    async mounted() {
      Metric.getInstance().screenView('player-video');
      if (this.type === 'tvshow') {
        this.tvshow = await this.$backend.content.getTvshow(this.id);
        this.name = this.tvshow.title;
      } else if (this.type === 'video') {
        const video = await this.$backend.content.getVideo(this.id);
        this.name = video.name;
      }

      this.video = Video.getInstance();
      this.video.open();
      this.video.useHls = this.$backend.settings.getVideoUseHls();
      this.video.volume = this.volume / 100;

      this.video.addEventListener(Video.PLAY_ERROR, this.handlers.videoErrorHandler);
      this.video.addEventListener(Video.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
      this.video.addEventListener(Video.READY_STATE, this.handlers.videoReadyHandler);
      this.video.addEventListener(Video.WAITING, this.handlers.videoWaitingHandler);
      this.video.addEventListener(Video.LOAD_PROGRESS, this.handlers.videoLoadProgressHandler);
      this.video.addEventListener(Video.START_SEEK, this.handlers.videoStartSeekHandler);
      this.video.addEventListener(Video.STOP_SEEK, this.handlers.videoStopSeekHandler);
      this.video.addEventListener(Video.PLAY_ENDED, this.handlers.videoPlayEndedHandler);
      this.loadVideo();
    },
    destroyed() {
      clearTimeout(this.updateTimer);
      clearTimeout(this.keepPlayTimer);
      this.video.setViewPort(10, 10, 0, 0);
      this.video.close();
      this.video.removeEventListener(Video.PLAY_ERROR, this.handlers.videoErrorHandler);
      this.video.removeEventListener(Video.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
      this.video.removeEventListener(Video.READY_STATE, this.handlers.videoReadyHandler);
      this.video.removeEventListener(Video.WAITING, this.handlers.videoWaitingHandler);
      this.video.removeEventListener(Video.LOAD_PROGRESS, this.handlers.videoLoadProgressHandler);
      this.video.removeEventListener(Video.START_SEEK, this.handlers.videoStartSeekHandler);
      this.video.removeEventListener(Video.STOP_SEEK, this.handlers.videoStopSeekHandler);
      this.video.removeEventListener(Video.PLAY_ENDED, this.handlers.videoPlayEndedHandler);
      Metric.getInstance().event(this.type, 'end', `${this.name} (#${this.id})`);
      document.removeEventListener('keydown', this.checkCode);
      this.pageCloseFullscreen();
    },
  };
</script>

<style scoped lang="scss">

  .player {
  &__throbber{
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba($color-black, .3);
    z-index: 2;
    text-align: center;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    font-size: 3rem;
  }

  &__area {
    width: 100vw;
    position: absolute;
    left: 0;
    z-index: 3;

    &_video {
      height: 100vh;
      top: 0;
    }
  }

  &__navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 3rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    padding-left: 2rem;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background: -webkit-gradient(linear, left top, right top, color-stop(20%, transparent), to(black));
    background: linear-gradient(to right, transparent 20%, black 100%);
    z-index: 11;

    &-button {
      margin-right: 2rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      height: 2rem;
      color: white;
      cursor: pointer;
      -webkit-transition: .3s;
      transition: .3s;

      &_back {
        background-color: $color-hover;
        padding: 0 1.5rem;
      }

      &_fullscreen {
        width: 1.5rem;
        height: 1.5rem;
        background-color: black;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
        background-image: url('../../assets/pixel-full-screen.png');
        background-size: cover;

        &:hover {
            -webkit-box-shadow: 0 0 10px 0 rgba(224, 95, 32, .5);
            box-shadow: 0 0 10px 0 rgba(224, 95, 32, .5);
        }
      }
    }
  }

  &__navarea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    z-index: 10;
  }

  &__pause{
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    text-align: center;
    font-size: 5rem;
    color: $color-text-simple;
  }

  &__controls {
    -webkit-transition: .5s;
    transition: .5s;
    position: absolute;
    bottom: 4rem;
    width: 100%;
    height: 0;
    z-index: 3;
  }
}

.fade-controls-enter-active {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.fade-controls-leave-active {
  -webkit-transition: all 1.0s;
  transition: all 1.0s;
}
.fade-controls-enter, .fade-controls-leave-to {
  opacity: 0;
}
.fade-controls-enter {
  -webkit-transform: translateY(10rem);
          transform: translateY(10rem);
}

.fade-pause-enter-active {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.fade-pause-leave-active {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.fade-pause-enter {
  opacity: 0;
  -webkit-transform: scale(0);
          transform: scale(0);
}

.fade-pause-leave-to {
  opacity: 0;
  -webkit-transform: scale(2);
          transform: scale(2);
}

.nav-controls-enter-active {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.nav-controls-leave-active {
  -webkit-transition: all 1.0s;
  transition: all 1.0s;
}
.nav-controls-enter, .nav-controls-leave-to {
  opacity: 0;
}
.nav-controls-enter {
  -webkit-transform: translateY(-10rem);
          transform: translateY(-10rem);
}


</style>
