import $ from 'jquery';
import IVideo from '@/persik/platform/interfaces/IVideo';

class Video extends IVideo {

  constructor() {
    super();
    // eslint-disable-next-line
    this.player = webapis.avplay;
    // eslint-disable-next-line
    this.audio = tizen.tvaudiocontrol;

    this.lastUrl = null;
    this.curTime = null;
    this.viewPort = { x: 0, y: 0, width: 0, height: 0 };

    const self = this;
    this.listener = {
      oncurrentplaytime(time) {
        if (self.curTime !== time) {
          self.dispatchEvent(Video.TIME_UPDATE);
          if ((self.duration * 1000) - time < 1000) {
            self.dispatchEvent(Video.PLAY_ENDED);
          }
        }
        self.curTime = time;
      },
      onerror(error) {
        self.dispatchEvent(Video.PLAY_ERROR, error);
      },
      onbufferingprogress() {
        self.dispatchEvent(Video.START_LOADING);
      },
    };
    this.player.setListener(this.listener);
  }

  play(url) {
    this.player.stop();
    this.player.open(url);
    this.player.prepareAsync(() => {
      this.applyViewPort();
      this.player.play();
      this.dispatchEvent(Video.READY_STATE);
    }, () => {
      const error = {
        event: 'Tizen video error',
        type: '0',
        details: 'error preparing',
      };
      this.dispatchEvent(Video.PLAY_ERROR, error);
    });
    this.lastUrl = url;
  }

  resume() {
    this.player.play();
    this.dispatchEvent(Video.PLAYED);
  }

  stop() {
    this.lastUrl = null;
    this.player.stop();
    this.dispatchEvent(Video.STOPPED);
  }

  pause() {
    this.player.pause();
    this.dispatchEvent(Video.PAUSED);
  }

  close() {
    this.player.close();
  }

  // eslint-disable-next-line
  open() {
  }

  applyViewPort() {
    const { x, y, width, height } = this.viewPort;
    if (width !== 0 && height !== 0 && y !== 0 && x !== 0) {
      const baseFontSize = parseFloat($('html').css('font-size'));
      const w = width * baseFontSize;
      const h = height * baseFontSize;
      const l = x * baseFontSize;
      const t = y * baseFontSize;
      this.player.setDisplayRect(l, t, w, h);
    } else {
      this.player.setDisplayRect(0, 0, window.screen.width, window.screen.height);
      this.player.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');
    }
  }

  setViewPort(x, y, width, height) {
    this.viewPort = { x, y, width, height };
    if (this.played) {
      this.applyViewPort();
    }
  }

  set seek(value) {
    const v = value * 1000;
    this.dispatchEvent(Video.START_SEEK);
    this.player.seekTo(v, () => { this.dispatchEvent(Video.STOP_SEEK); });
  }

  get volume() {
    return (this.audio.getVolume() / 100);
  }

  set volume(value) {
    let volume = 0;
    if (value >= 0 && value <= 1) {
      volume = Math.round(value * 100, 0);
      this.audio.setVolume(volume);
      this.dispatchEvent(Video.VOLUME_CHANGE);
    }
  }

  get currentTime() {
    return this.player.getCurrentTime() / 1000;
  }

  get duration() {
    return this.player.getDuration() / 1000;
  }

  get buffered() {
    if (this.played || this.paused) {
      // 10 секунд буфера - дефолтная настройка avplay
      return this.currentTime + 10;
    }
    return 0;
  }

  get played() {
    return this.player.getState() === 'PLAYING';
  }

  get state() {
    return this.player.getState();
  }

  get url() {
    return this.lastUrl;
  }

  get paused() {
    return this.player.getState() === 'PAUSED';
  }

}

export default Video;
