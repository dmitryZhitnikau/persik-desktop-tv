<template>
    <div class="test" data-xy-group>
      <div scrollable-y style="height: 100%; overflow: hidden">
        <div class="test__nav-block">
          <p>VoD:</p>
          <w-button width="15" data-xy-focusable tabindex="-1" scroll-threshold="0 10 0 0" @click="playVod()">Play Video</w-button>
          <w-button width="15" data-xy-focusable tabindex="-1" @click="playVod('error')">Server not work</w-button>
        </div>

        <div class="test__nav-block">
          <p>Live:</p>
          <w-button width="15" data-xy-focusable tabindex="-1" @click="playLive()">Обычный поток</w-button>
          <w-button width="15" data-xy-focusable tabindex="-1" @click="playLive('error')">Несуществующий сервер</w-button>
          <w-button width="15" data-xy-focusable tabindex="-1" @click="playLive(-1)">"Протухшая" ссылка</w-button>
          <w-button width="15" data-xy-focusable tabindex="-1" @click="playLive(60)">Действующая 1 минуту</w-button>
        </div>
        <div class="test__nav-block">
          <w-button width="15" data-xy-focusable tabindex="-1" @click="refresh()">Сброс</w-button>
          <w-button width="15" data-xy-focusable tabindex="-1" @click="clearEvents()">Очистить лог</w-button>
        </div>

        <div class="test__nav-block">
          <w-button width="15" data-xy-focusable tabindex="-1" @click="$router.push({ name: 'Start' })">На главную</w-button>
        </div>

        <div class="test__controls">
          <w-button width="5" data-xy-focusable tabindex="-1" class="test__player-navigation-btn" @click="pause()">Pause</w-button>
          <w-button width="5" data-xy-focusable tabindex="-1" class="test__player-navigation-btn" @click="resume()">Resume</w-button>
          <w-button width="5" data-xy-focusable tabindex="-1" class="test__player-navigation-btn" @click="stop()">Stop</w-button>
          <w-button width="5" data-xy-focusable tabindex="-1" class="test__player-navigation-btn" @click="seekLeft()">Seek <-</w-button>
          <w-button width="5" data-xy-focusable tabindex="-1" class="test__player-navigation-btn" @click="seekRight()">Seek -></w-button>
        </div>

        <table class="test__status">
          <tr v-for="(value, name) in mediaInfo">
            <td>{{ name }}:</td>
            <td>{{ value }}</td>
          </tr>
        </table>

        <div class="test__log">
          <div v-for="(info, index) in infoBlock" :key="index">{{ info }}</div>
        </div>
      </div>
    </div>
</template>

<script>

import moment from 'moment';
import Video from '@/persik/platform/Video';
import WButton from '@/components/widgets/WButton';

export default {
  components: { WButton },
  name: 'p-player-test',
  props: [],
  data() {
    return {
      infoBlock: [],
      mediaInfo: {},
    };
  },
  computed: {
    connected() {
      return this.$store.getters.getConnectionStatus;
    },
    volume() {
      return this.$store.getters.volume;
    },
  },
  watch: {
    connected(value) {
      let er;
      if (!value) {
        er = `${this.getCurrentTime()}: no connection`;
      } else {
        er = `${this.getCurrentTime()}: connected`;
      }
      this.infoBlock.push(er);
    },
    volume(value) {
      this.video.volume = value / 100;
    },
  },
  created() {
    this.handlers = {};
    this.eventHandlerBinded = this.eventHandler.bind(this);
    this.timeUpdateHandler = () => {
      this.mediaInfo = this.getMediaInfo();
    };
    this.video = Video.getInstance();
    this.video.open();
    this.video.useHls = this.$backend.settings.getVideoUseHls();
    this.video.volume = this.volume / 100;
    this.video.addEventListener(Video.PLAY_ERROR, this.eventHandlerBinded);
    this.video.addEventListener(Video.READY_STATE, this.eventHandlerBinded);
    this.video.addEventListener(Video.PLAY_ENDED, this.eventHandlerBinded);
    this.video.addEventListener(Video.START_LOADING, this.eventHandlerBinded);
    this.video.addEventListener(Video.PLAY_START, this.eventHandlerBinded);
    this.video.addEventListener(Video.LOAD_PROGRESS, this.eventHandlerBinded);
    this.video.addEventListener(Video.START_SEEK, this.eventHandlerBinded);
    this.video.addEventListener(Video.STOP_SEEK, this.eventHandlerBinded);
    this.video.addEventListener(Video.VOLUME_CHANGE, this.eventHandlerBinded);
    this.video.addEventListener(Video.STOPPED, this.eventHandlerBinded);
    this.video.addEventListener(Video.WAITING, this.eventHandlerBinded);
    this.video.addEventListener(Video.TIME_UPDATE, this.timeUpdateHandler);
    this.refreshInterval = null;
  },
  destroyed() {
    this.video.removeEventListener(Video.PLAY_ERROR, this.eventHandlerBinded);
    this.video.removeEventListener(Video.READY_STATE, this.eventHandlerBinded);
    this.video.removeEventListener(Video.PLAY_ENDED, this.eventHandlerBinded);
    this.video.removeEventListener(Video.START_LOADING, this.eventHandlerBinded);
    this.video.removeEventListener(Video.PLAY_START, this.eventHandlerBinded);
    this.video.removeEventListener(Video.LOAD_PROGRESS, this.eventHandlerBinded);
    this.video.removeEventListener(Video.START_SEEK, this.eventHandlerBinded);
    this.video.removeEventListener(Video.STOP_SEEK, this.eventHandlerBinded);
    this.video.removeEventListener(Video.VOLUME_CHANGE, this.eventHandlerBinded);
    this.video.removeEventListener(Video.STOPPED, this.eventHandlerBinded);
    this.video.removeEventListener(Video.WAITING, this.eventHandlerBinded);
    this.video.removeEventListener(Video.TIME_UPDATE, this.timeUpdateHandler);
    this.video.close();
    clearInterval(this.refreshInterval);
  },
  methods: {
    getCurrentTime() {
      return moment().format('HH:mm:ss');
    },
    async playVod(mode = 'normal') {
      let url = null;
      let stream = null;
      if (mode !== 'normal') {
        stream = 'https://play.m3u8';
      } else {
        url = 'https://persik.by/test-vod.php';
        stream = await this.getStream(url);
      }
      this.playStream(stream);
    },

    async playLive(lifetime = 3000) {
      let url = null;
      let stream = null;
      if (lifetime !== 'error') {
        url = `https://persik.by/test-live.php?t=${lifetime}`;
        stream = await this.getStream(url);
      } else {
        stream = 'http://play.m3u8';
      }
      this.playStream(stream);
    },

    playStream(url) {
      this.infoBlock.push(`${this.getCurrentTime()}: play stream ${url}`);
      clearInterval(this.refreshInterval);
      this.video.setViewPort(59, 2, 20, 11.25);
      this.video.play(url);
      this.refreshInterval = setInterval(() => {
        this.mediaInfo = this.getMediaInfo();
      }, 1000);
    },

    eventHandler(e) {
      console.log(e);
      const error = `${this.getCurrentTime()}: Event ${e.type}`;
      this.infoBlock.push(error);
    },

    getStream(url) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
          if (xhr.status === 200 && xhr.readyState === 4) {
            resolve((JSON.parse(xhr.responseText)).stream_url);
          }
        };
        xhr.send();
      });
    },
    getMediaInfo() {
      return {
        state: this.video.state,
        duration: Math.round(this.video.duration * 100) / 100,
        currentTime: Math.round(this.video.currentTime * 100) / 100,
        buffered: Math.round(this.video.buffered * 100) / 100,
        played: this.video.played,
      };
    },
    videoErrorHandler(func, er) {
      const error = `${this.getCurrentTime()}: error
      ${er.event}, type="${er.type}", details="${er.details}"`;
      this.infoBlock.push(error);
    },
    refresh() {
      this.video.close();
      clearInterval(this.refreshInterval);
      this.infoBlock = [];
      this.mediaInfo = null;
    },
    clearEvents() {
      this.infoBlock = [];
    },
    pause() {
      this.video.pause();
      const mes = `${this.getCurrentTime()}: pause`;
      this.infoBlock.push(mes);
    },
    resume() {
      this.video.resume();
      const mes = `${this.getCurrentTime()}: resume`;
      this.infoBlock.push(mes);
    },
    stop() {
      this.video.stop();
      const mes = `${this.getCurrentTime()}: stop`;
      this.infoBlock.push(mes);
    },
    seekLeft() {
      const seekValue = this.video.currentTime - 20;
      this.video.seek = seekValue;
      const mes = `${this.getCurrentTime()}: seek -20s`;
      this.infoBlock.push(mes);
    },
    seekRight() {
      const seekValue = this.video.currentTime + 20;
      this.video.seek = seekValue;
      const mes = `${this.getCurrentTime()}: seek +20s`;
      this.infoBlock.push(mes);
    },
  },
};
</script>

<style scoped lang="scss">

  .test {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: $color-gray-dark;
    color: $color-text-simple;
    $clipX: 59rem;
    $clipY: 2rem;
    $clipWidth: 20rem;
    $clipHeight: 11.125rem;
    $clipOffsetX: 0rem;

    clip-path: polygon(0% 0%, 0% 100%, ($clipX - $clipOffsetX) 100%, ($clipX - $clipOffsetX) $clipY, ($clipX + $clipWidth - $clipOffsetX) $clipY, ($clipX + $clipWidth - $clipOffsetX) ($clipY + $clipHeight), ($clipX - $clipOffsetX) ($clipY + $clipHeight), ($clipX - $clipOffsetX) 100%, 100% 100%, 100% 0%);


    &__controls {
      position: absolute;
      right: 1rem;
      top: 15rem;
    }

    &__nav-block {
      margin-left: 1rem;
      width: 15rem;
      margin-top: 2rem;
    }

    &__status {
      border-collapse: collapse;
      border: 1px solid $color-gray-light;
      color: $color-text-simple;
      background-color: $color-gray-medium;
      position: absolute;
      top: 15rem;
      right: 10rem;
      width: 10rem;
      height: 4rem;
      line-height: 2rem;
      padding-left: .25rem;
      td {
        padding: 0.5rem;
        border: 1px solid $color-gray-light;
      }
    }

    &__log {
      padding: .3rem 0 0 .3rem;
      border: 1px solid $color-gray-light;
      color: $color-text-simple;
      background-color: $color-gray-medium;
      position: absolute;
      top: 2rem;
      left: 17rem;
      width: 40rem;
      height: 34rem;
      overflow: auto;
      font-size: .75rem;
    }
  }
</style>
