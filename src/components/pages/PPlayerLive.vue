<template>
  <div class="player-live">

    <w-volume :visible="isVolumeBarVisible"></w-volume>

    <div class="wrapper" v-on:wheel="volumeChangeHandler" v-on:mousemove="showAllBarsWithAutohide"></div>

    <div class="player-live__throbber" v-if="throbberVisible">
      <looping-rhombuses-spinner
              :animation-duration="2500"
              :rhombus-size="15"
      />
    </div>

    <div class="player-live__adult" v-if="isNeedCheckPin">
      <span class="player-live__adult-title">Для просмотра канала введите ПИН родительского контроля</span>

      <input type="text" maxlength="4" class="player-live__adult-input" ref="pinField" v-on:keypress="keypressInputEvent">

      <div v-show="errorPinMessage" class="player-live__adult-error">{{ errorPinMessage }}</div>

      <div class="player-live__adult-buttons">
        <div class="player-live__adult-buttons-item" v-on:click="checkPin($refs.pinField.value)">OК</div>
        <div class="player-live__adult-buttons-item" v-on:click="closeParentControlDialog">Отмена</div>
      </div>

    </div>

    <!-- <div class="nav-area" v-on:mouseenter="showNav = true"> -->
      <transition name="fade-nav">
        <div v-show="showNav" class="nav" v-on:mouseenter="showAllBars" v-on:mousemove="showAllBars">
          <div class="nav__button nav__button_back" v-on:click="goBack">Назад</div>
          <div class="nav__button nav__button_fullscreen" v-if="isFullscreenSupport" v-on:click="toggleFullscreen"></div>
        </div>
      </transition>
    <!-- </div> -->

    <transition name="fade-pause">
      <div class="player-live__pause" v-if="paused" v-on:click="togglePause()">
        <i class="far fa-pause-circle"></i>
      </div>
    </transition>

    <div v-if="!isPlayable" class="player-live__guard">
      <div class="player-live__guard-group">
        <i class="player-live__guard-group-icon fa fa-lock"></i>
        <p v-if="!authorized" class="player-live__guard-group-title">
          {{ $lang.messages.auth.need_auth }}
        </p>
        <p v-else-if="!isAvailable" class="player-live__guard-group-title">
          {{ $lang.messages.messages.unavailable_channel_named }}
        </p>
        <p v-else-if="isAdultLocked" class="player-live__guard-group-title">
          {{ $lang.messages.messages.adult_locked_named }}
        </p>
      </div>
    </div>

    <!-- <div class="tvguide-container" v-on:mouseenter="showTvGuide = true"> -->
      <transition name="fade-tvguide">
        <div v-show="showTvGuide" class="player-live__channels" v-on:mouseenter="showAllBars" v-on:mousemove="showAllBars">
          <div class="player-live__channels-col" ref="channels">
            <div v-for="(id, index) in channels" class="player-live__channel" :key="index" :class="{'player-live__channel_active': id === playableChannelId}" v-on:click="changeChannel(id)">
              <div class="player-live__channel-num">{{ index + 1 }}</div>
              <div v-if="channelsLogos" class="player-live__channel-logo" v-bind:style="{ backgroundImage: 'url(' + resize(channelsLogos[index], 144, 72) + ')'}"></div>
            </div>
          </div>
        </div>
    </transition>
    <!-- </div> -->


    <!-- <div class="player-live__guide-area" v-on:mouseenter="showTvTape = true"></div> -->

    <transition name="fade-tvtape">

      <div class="player-live__guide" v-show="showTvTape" v-on:mouseenter="showAllBars" v-on:mousemove="showAllBars">

        <span class="player-live__guide-arrow" v-on:click="gotoPrevTvshow"><</span>

        <div class="player-live__guide-row">
        
          <b-guide-tvshow :tvshow="tvshow" :key="tvshow.tvshow_id" v-for="(tvshow, index) in tvshows.prev" :time="time" :index.number="index - tvshows.prev.length" :isArchive="isArchive(tvshow)" :translateX="translateX"></b-guide-tvshow>
          <b-guide-tvshow :tvshow="tvshows.current" :time="time" :selected.boolean="true" :index.number="0" :isArchive="isArchive(tvshows.current)" :translateX="translateX"></b-guide-tvshow>
          <b-guide-tvshow :tvshow="tvshow" :key="tvshow.tvshow_id" v-for="(tvshow, index) in tvshows.next" :time="time" :index.number="index + 1" :isArchive="isArchive(tvshow)" :translateX="translateX"></b-guide-tvshow>      

        </div>

        <span class="player-live__guide-arrow" v-on:click="gotoNextTvshow">></span>

      </div>
    </transition>


    <div v-if="showTracker" class="player-live__tracker">
      <div class="trackline">
        <div class="trackline__inside trackline__inside_buffer" v-bind:style="{width: 100 * buffered + '%'}"></div>
        <div class="trackline__inside trackline__inside_current" v-bind:style="{width: 100 * current + '%'}"></div>    
      </div>
    </div>
  </div>
</template>

<script>

  import moment from 'moment';
  import Slick from 'vue-slick';
  // eslint-disable-next-line
  import EpgReader from '@/persik/service/epg/EpgReader';
  import Video from '@/persik/platform/Video';
  import TWEEN from '@tweenjs/tween.js';
  import { LoopingRhombusesSpinner } from 'epic-spinners';
  import BGuideTvshow from '@/components/blocks/BGuideTvshow';
  import WVolume from '@/components/widgets/WVolume';
  import Metric from '@/persik/platform/Metric';
  import dialogs from '@/mixins/dialogs';
  import frames from '@/mixins/frames';
  import images from '@/mixins/images';
  import utils from '@/mixins/utils';
  import fullscreen from '@/mixins/fullscreen';

  export default {
    name: 'p-player-live',
    props: {
      channelId: {},
    },
    mixins: [dialogs, frames, images, utils, fullscreen],
    components: {
      BGuideTvshow,
      LoopingRhombusesSpinner,
      Slick,
      WVolume,
    },
    data() {
      return {
        infoBlock: false,
        channel: null,
        paused: false,
        hideTimer: null,
        volumeTimer: null,
        isVolumeBarVisible: false,
        tvshows: {
          current: null,
          next: null,
          prev: null,
          animateDirection: 0,
        },
        time: null,
        trackTime: null,
        translateX: null,
        showTvGuide: false,
        showTvTape: true,
        showNav: false,
        playableChannelId: 0,
        buttons: [
          { name: 'Close' },
          { name: 'Menu' },
          { name: 'Test' },
          { name: 'Test' },
          { name: 'Test' },
        ],
        title: '',
        description: '',
        throbberVisible: false,
        dontAskPin: false,
        authorizeAlertEmitted: false,
        purchaseAlertEmitted: false,
        isAdultLocked: false,
        targetChannelId: null,
        pausedTime: null,
        showTracker: false,
        isNeedCheckPin: false,
        errorPinMessage: null,
      };
    },
    computed: {
      genreId() {
        return this.$store.getters.getFilter;
      },
      intChannelId() {
        return parseInt(this.channelId, 0);
      },
      channelIndex() {
        return this.channels.indexOf(this.intChannelId);
      },
      targetChannelIndex() {
        return this.channels.indexOf(this.targetChannelId);
      },
      currentChannelId() {
        return this.channel ? this.channel.channel_id : null;
      },
      volume() {
        return this.$store.getters.volume;
      },
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
      channels() {
        return this.$store.state.filteredChannels;
      },
      authorized() {
        return this.$store.getters.getAuthorized;
      },
      isAvailable() {
        return this.channel ? this.channel.available : null;
      },
      isPlayable() {
        return this.channel && this.isAvailable && !this.isAdultLocked;
      },
      channelName() {
        return this.channel ? this.channel.name : '';
      },
      dvrStart() {
        return this.time - this.channel.dvr_sec;
      },
      duration() {
        return this.tvshows.current.stop - this.tvshows.current.start;
      },
      buffered() {
        return (this.time - this.tvshows.current.start) / this.duration;
      },
      current() {
        return (this.pausedTime - this.tvshows.current.start) / this.duration;
      },
    },
    asyncComputed: {
      channelsLogos: {
        async get() {
          const logos = [];
          for (let i = 0; i < this.channels.length; i += 1) {
            // eslint-disable-next-line
            logos.push(await this.getChannelLogo(this.channels[i]));
          }
          return logos;
        },
        watch() {
          return this.channels;
        },
      },
    },
    watch: {
      intChannelId(value) {
        clearTimeout(this.loadDelay);
        this.loadDelay = setTimeout(async () => {
          this.channel = await this.$backend.content.getChannel(this.intChannelId);
          this.updateTvshows(this.time);
        }, 0);
        this.trackTime = null;
        this.targetChannelId = value;
      },
      trackTime(value) {
        if (value > 0) {
          this.updateTvshows(value);
        }
      },
      tvshows(value) {
        if (value.animateDirection < 0) {
          this.animateRight();
        }
        if (value.animateDirection > 0) {
          this.animateLeft();
        }
        //eslint-disable-next-line
        value.animateDirection = 0;
      },
      volume(value) {
        this.video.volume = value / 100;
      },
      connected(value) {
        if (!value) {
          this.throbberVisible = true;
          this.video.pause();
        } else if (this.video.url) {
          this.video.resume();
        } else {
          this.video.stop();
          this.loadVideo();
        }
      },
      targetChannelId(value) {
        clearTimeout(this.switchChannelDelay);
        this.switchChannelDelay = setTimeout(() => {
          this.routeChannel(value);
        }, 500);
      },
    },
    created() {
      this.targetChannelId = this.intChannelId;
      this.playableChannelId = this.intChannelId;
      this.handlers = {};
      this.intervalId = null;
      this.tween = null;
      this.time = moment().unix();
      this.intervalId = setInterval(() => {
        this.time = moment().unix();
      }, 1000);
      this.handlers.videoReadyHandler = this.videoReadyHandler.bind(this);
      this.handlers.videoErrorHandler = this.videoErrorHandler.bind(this);
      this.handlers.videoWaitingHandler = this.videoWaitingHandler.bind(this);
      this.handlers.videoTimeUpdateHandler = this.videoTimeUpdateHandler.bind(this);
      document.addEventListener('keydown', this.keypressHandler);
    },
    mounted() {
      this.playableChannelId = this.intChannelId;
      Metric.getInstance().screenView('player-live');
      this.video = Video.getInstance();
      this.video.open();
      this.video.useHls = this.$backend.settings.getVideoUseHls();
      this.video.volume = this.volume / 100;
      this.video.addEventListener(Video.PLAY_ERROR, this.handlers.videoErrorHandler);
      this.video.addEventListener(Video.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
      this.video.addEventListener(Video.READY_STATE, this.handlers.videoReadyHandler);
      this.video.addEventListener(Video.WAITING, this.handlers.videoWaitingHandler);
      this.updateTvshows(this.time);
      this.loadVideo();
      this.video.setViewPort(0, 0, 0, 0);
      this.$root.$emit('focus', this.$el, true);
      this.showAllBarsWithAutohide();
    },
    destroyed() {
      clearInterval(this.intervalId);
      clearTimeout(this.stateTimeout);
      clearTimeout(this.loadDelay);
      clearTimeout(this.keepPlayTimer);
      this.video.removeEventListener(Video.PLAY_ERROR, this.handlers.videoErrorHandler);
      this.video.removeEventListener(Video.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
      this.video.removeEventListener(Video.READY_STATE, this.handlers.videoReadyHandler);
      this.video.removeEventListener(Video.WAITING, this.handlers.videoWaitingHandler);
      this.video.setViewPort(10, 10, 0, 0);
      this.video.close(true);
      this.video = null;
      document.removeEventListener('keydown', this.keypressHandler);
      this.pageCloseFullscreen();
    },
    methods: {
      volumeChangeHandler(e) {
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
      togglePause() {
        if (this.paused) {
          this.video.stop();
          this.paused = false;
          const deltaTime = this.time - this.pausedTime;
          this.pausedTime = null;
          const deltaUrl = this.channel.stream_url.replace(/playlist/, 'timeshift').concat(`&s=${deltaTime}`);
          this.video.play(deltaUrl);
          this.showAllBarsWithAutohide();
        } else {
          this.video.pause();
          this.paused = true;
          this.pausedTime = this.time;
          this.showAllBars();
        }
      },
      next() {
        this.$refs.slick.next();
      },
      prev() {
        this.$refs.slick.prev();
      },
      reInit() {
        this.$nextTick(() => {
          this.$refs.slick.reSlick();
        });
      },
      stateController() {
        if (this.connected) {
          clearTimeout(this.stateTimeout);
          this.stateTimeout = setTimeout(async () => {
            this.showAllBars();
            if (!this.isAdultLocked) {
              this.$nm.showError('Сервер не отвечает.', 5000);
            }
            this.channel = await this.$backend.content.getChannel(this.intChannelId);
            if (this.channel.stream_url && this.channel.available && !this.isAdultLocked) {
              this.video.stop();
              this.playVideo(this.channel.stream_url);
            }
            this.stateController();
            Metric.getInstance().event('tv', 'play error', `${this.channel.name} (#${this.channel.channel_id})`);
          }, 60000);
        }
      },
      pageCloseFullscreen() {
        if (this.isFullscreenActive()) {
          this.closeFullscreen();
        }
      },
      goBack() {
        this.pageCloseFullscreen();
        this.$root.$emit('navigateBack');
      },
      async loadVideo(id = this.intChannelId) {
        this.channel = await this.$backend.content.getChannel(id);
        this.playableChannelId = id;
        this.targetChannelId = id;
        if (this.channel.available) {
          try {
            this.isAdultLocked = this.isChannelAdultLocked(this.channel);
            if (this.isAdultLocked && !this.dontAskPin) {
              this.isNeedCheckPin = true;
            }
            if (!this.isAdultLocked) {
              this.playVideo(this.channel.stream_url);
            }
          } catch (e) {
            this.showAllBars();
            this.$nm.showMessage(e.message, 0);
            this.showTvGuide = true;
            this.showTvTape = true;
          }
        } else if (!this.authorized) {
          if (!this.authorizeAlertEmitted) {
            this.showAllBars();
            this.$nm.showError(
              this.$lang.messages.auth.need_auth,
              0,
              this.$lang.messages.auth.auth, () => {
                this.$router.push({ name: 'Main', params: { page: 'login' } });
              });
            this.authorizeAlertEmitted = true;
          }
        } else if (!this.purchaseAlertEmitted) {
          this.showAllBars();
          this.$nm.showError(
            this.$lang.messages.messages.unavailable_channel,
            0,
            this.$lang.messages.buttons.purchase, () => {
              this.$router.push({
                name: 'Main',
                params: { page: 'account' },
                query: { tab: 'purchases' },
              });
            });
          this.purchaseAlertEmitted = true;
        }
      },
      async checkPin(pin) {
        const currentPin = await this.$backend.account.getPin();
        if (currentPin === pin) {
          this.playVideo(this.channel.stream_url);
          this.closeParentControlDialog();
        } else {
          this.errorPinMessage = 'Неверный ПИН';
        }
      },
      closeParentControlDialog() {
        this.isNeedCheckPin = false;
      },
      keypressInputEvent(key) {
        this.errorPinMessage = null;
        if (key.which === 13) {
          this.checkPin(this.$refs.pinField.value);
        }
      },
      keypressHandler(e) {
        if (e.keyCode === 27) {
          this.goBack();
        }
      },
      showAllBarsWithAutohide() {
        clearInterval(this.hideTimer);
        this.showAllBars();
        this.hideTimer = setTimeout(() => {
          this.hideAllBars();
        }, 5000);
      },
      showAllBars() {
        this.showNav = true;
        this.showTvGuide = true;
        this.showTvTape = true;
        clearInterval(this.hideTimer);
      },
      hideAllBars() {
        this.showNav = false;
        this.showTvGuide = false;
        this.showTvTape = false;
      },
      playVideo(url) {
        if (this.video.played && this.video.url === url) {
          return;
        }
        this.throbberVisible = true;
        this.video.stop();
        this.startPlayTime = moment().valueOf();
        this.video.play(url);
        Metric.getInstance().event('tv', 'play', `${this.channel.name} (#${this.channel.channel_id})`);
      },
      animateRight() {
        this.translateX -= 1;
        this.tweenTranslateX();
      },
      animateLeft() {
        this.translateX += 1;
        this.tweenTranslateX();
      },
      tweenTranslateX() {
        if (this.tween) {
          TWEEN.remove(this.tween);
        }
        this.tween = new TWEEN.Tween(this)
          .easing(TWEEN.Easing.Sinusoidal.Out)
          .to({ translateX: 0 }, 300)
          .onComplete(() => {
            TWEEN.remove(this.tween);
            this.tween = null;
          })
          .start();
        requestAnimationFrame(this.animate.bind(this));
      },
      animate(time) {
        TWEEN.update(time);
        if (this.tween) {
          requestAnimationFrame(this.animate.bind(this));
        }
      },
      async gotoNextTvshow() {
        if (this.tvshows.next && this.tvshows.next.length) {
          const nextTvshow = this.tvshows.next[0];
          this.trackTime = nextTvshow.start;
          this.tvshows.animateDirection = 1;
        }
      },
      async gotoPrevTvshow() {
        if (this.tvshows.prev && this.tvshows.prev.length) {
          const prevTvshow = this.tvshows.prev[this.tvshows.prev.length - 1];
          this.trackTime = prevTvshow.start;
          this.tvshows.animateDirection = -1;
        }
      },
      async updateTvshows(time) {
        const epg = EpgReader.getInstance();
        const trackTvshows = {};
        const nextTvshows = await epg.getNextTvshows(
          this.intChannelId, moment.unix(time), 3,
        );
        trackTvshows.current = nextTvshows.shift();
        trackTvshows.next = nextTvshows;
        trackTvshows.prev = await epg.getPrevTvshows(
          this.intChannelId, moment.unix(time), 2,
        );
        trackTvshows.animateDirection = this.tvshows.animateDirection;
        this.tvshows = trackTvshows;
      },
      routeChannel(channelId) {
        this.$router.push({
          name: 'PlayerLive',
          params: { channelId },
        });
      },
      isCurrent() {
        return (this.tvshows.current.start < this.time) && (this.tvshows.current.stop > this.time);
      },
      isOtherChannel() {
        return this.channel.channel_id !== this.playableChannelId;
      },
      changeChannel(id) {
        this.video.stop();
        this.closeParentControlDialog();
        this.loadVideo(id);
      },
      videoReadyHandler() {
        setTimeout(() => {
          if (this.video) {
            this.video.setViewPort(0, 0, 0, 0);
          }
        }, 500);
      },
      videoTimeUpdateHandler() {
        this.throbberVisible = false;
        this.stateController();
        if (this.startPlayTime) {
          const loadTime = moment().valueOf() - this.startPlayTime;
          this.startPlayTime = null;
          Metric.getInstance().timing('play live', this.channel.channel_id, loadTime, { timingLabel: this.channel.name });
        }
        if (!this.keepPlayTimer) {
          this.keepPlayTimer = setTimeout(() => {
            Metric.getInstance().event('tv', 'playing', `${this.channel.name} (#${this.channel.channel_id})`);
            this.keepPlayTimer = null;
          }, 20 * 60 * 1000);
        }
      },
      videoWaitingHandler() {
        this.throbberVisible = true;
      },
      videoErrorHandler(func, error) {
        this.showAllBars();
        this.$nm.showError(error, 2000);
      },
      isArchive(tvshow) {
        if (tvshow) {
          return (tvshow.start > this.dvrStart && tvshow.stop < this.time);
        }
        return false;
      },
    },
  };
</script>
 
<style scoped lang="scss">

  .player-live {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: inherit;
  z-index: 3;

  .wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }

&__adult {
  position: absolute;
  width: 25rem;
  height: 20rem;
  background-color: #111111;
  z-index: 100;
  left: calc(50% - 12.5rem);
  top: calc(50% - 10rem);
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
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;

  &-title {
    color: white;
    text-align: center;
    margin-bottom: 3rem;
  }

  &-input {
    width: 50%;
    font-size: 1.5rem;
    text-align: center;
    letter-spacing: 1rem;
    margin-bottom: .5rem;
  }

  &-error {
    color: red;
    text-align: center;
    font-size: .8rem;
  }

  &-buttons {
    margin-top: 2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 50%;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    color: white;

    &-item {
      height: 2.5rem;
      width: 5rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      cursor: pointer;
      border: 1px solid #393939;

      &:hover {
        background-color: $color-hover;
      }
    }
  }
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
    background-color: rgba(0, 0, 0, .3);
    z-index: 98;
    text-align: center;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    font-size: 3rem;
  }

  &__tracker {
    width: 100%;
    height: 7rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;

    .trackline {
      width: 95%;
      height: .5rem;
      border: 1px solid white;
      position: relative;

      &__inside {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;

        &_buffer {
          background-color: rgba(255, 255, 255, .6);
        }

        &_current {
          background-color: orange;
        }
      }
    }
  }

  &__guard {
    width: 100%;
    height: 100%;
    background-color: $color-black;
    color: $color-text-simple;
    font-size: 5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

    &-group {
      text-align: center;

      &-title {
        font-size: 1rem;
      }
    }
  }

  &__channels {
    position: absolute;
    width: 10rem;
    overflow-y: auto;
    overflow-x: hidden;
    background: -webkit-gradient(linear, left top, right top, from(rgba($color-black, .75)),to(rgba(0,0,0,0)));
    background: linear-gradient(to right, rgba($color-black, .75) 0%,rgba(0,0,0,0) 100%);
    bottom: 0;
    height: 100%;
    z-index: 5;

    &-col {
      cursor: pointer;
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
      -webkit-transition-duration: 500ms;
              transition-duration: 500ms;
      -webkit-transition-timing-function: ease-out;
              transition-timing-function: ease-out;
    }
  }

  &__channel {
    height: 5rem;
    margin-bottom: 1rem;
    white-space: nowrap;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;

    &_active {
      background: -webkit-gradient(linear, left top, right top, from(rgba(224, 95, 32, .8)), to(transparent));
      background: linear-gradient(to right, rgba(224, 95, 32, .8), transparent);
    }

    &-num {
      font-size: 1.5rem;
      color: #ffffff;
      padding: 0 1rem;
    }
              
    &-logo {
      display: block;
      float: left;
      margin: 1rem 0;
      height: 3rem;
      width: 6rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      -webkit-filter: grayscale(95%);
              filter: grayscale(95%);
    }
  }

  &__guide {
    position: absolute;
    bottom: 0rem;
    height: 13rem;
    width: 70rem;
    left: 0rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 3rem;
    overflow: hidden;
    background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, 0.95)));
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.95) 100%);
    padding-left: 11rem;
    z-index: 4;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

    &-row {
      white-space: nowrap;
      height: 9rem;
      width: 63rem;
      padding-top: 2rem;
      font-size: 0;
      position: relative;
      overflow: hidden;
    }

    &-arrow {
        position: relative;
        z-index: 100;
        cursor: pointer;
        color:rgba(255,255,255, .5);
        font-size: 5rem;
        -webkit-transform: scaleX(.3) scaleY(2);
                transform: scaleX(.3) scaleY(2);

        &:hover {
          color: $color-hover;
        }
    }
  }

  &__guide-area {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 70rem;
    height: 14rem;
    z-index: 2;
  }

  &__tracker {
    position: absolute;
    bottom: 0rem;
    height: 13rem;
    width: 100%;
    left: 0rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

    .trackline {
      width: 90%;
      height: .5rem;
      border: 1px solid white;
      position: relative;

      &__inside {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;

        &_buffer {          
          background-color: lightgray;          
        }

        &_current {
          background-color: orange;
        }
      }
    }
  }

  &__info-block {
    color: $color-text-simple;
    position: absolute;
    overflow: hidden;
    display: block;
    margin: 0 18%;
    border:1px solid $color-text-simple;
    width: 50rem;
    height: 10rem;
    z-index: 10;
    background: $color-gray-medium;
    opacity: 0.5;

    &-live {
      position: absolute;
      margin: 1rem;
      width: 10rem;
      height: 8rem;
      border:1px solid $color-text-simple;
      background-image: url(http://qrcoder.ru/code/?test&8&0);
      background-size: 100%
    }

    &-description {
      border:1px solid $color-text-simple;
      position: absolute;
      margin: 1rem 1rem 1rem 11rem;
      width: 30rem;
      height: 8rem;
      overflow: hidden;

      &-title {
        margin: 0.2rem 0 0.2rem 0.2rem;
      }

      &-text {
       margin: 0 0.2rem;
      }
    }

    &-buttons {
      border:1px solid $color-text-simple;
      position: absolute;
      height: 8rem;
      width: 8rem;
      margin: 1rem 1rem 1rem 41rem;

      &-but {
        color: $color-text-simple;
        position: relative;
        width: 90%;
        height: 1rem;
        margin: 0.2rem 0.4rem;
        border:1px solid $color-text-simple;
        background: $color-gray-dark;
      }
    }
  }
}

.tvguide-container {
  width: 10rem;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
}

  .nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 3rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    background: -webkit-gradient(linear, left top, right top, color-stop(20%, transparent), to(black));
    background: linear-gradient(to right, transparent 20%, black 100%);

    &__button {
      margin-right: 2rem;
      color: white;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      height: 2rem;
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
      }

      &:hover {
        -webkit-box-shadow: 0 0 10px 0 rgba(224, 95, 32, .5);
          box-shadow: 0 0 10px 0 rgba(224, 95, 32, .5);
      }
    }
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


.fade-tvtape-enter-active {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.fade-tvtape-leave-active {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.fade-tvtape-enter {
  opacity: 0;
  -webkit-transform: translateY(50px);
          transform: translateY(50px);
}

.fade-tvtape-leave-to {
  opacity: 0;
  -webkit-transform: translateY(70px);
          transform: translateY(70px);
}


.fade-tvguide-enter-active {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.fade-tvguide-leave-active {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.fade-tvguide-enter {
  opacity: 0;
  -webkit-transform: translateX(-40px);
          transform: translateX(-40px);
}

.fade-tvguide-leave-to {
  opacity: 0;
  -webkit-transform: translateX(20px);
          transform: translateX(20px);
}

</style>
