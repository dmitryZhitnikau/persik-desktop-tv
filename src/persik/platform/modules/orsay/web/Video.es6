import Video from '../../Video';

class OrsayVideo extends Video {

  constructor() {
    super();
    this.launcher = window.launcher;
    this.cacheVolume = 0;
    this.currenPlayTime = 0;
    this.playReady = false;
    this.videoInfo = {
      duration: 0,
      buffering: false,
    };
    window.launcher.getVolume().then((volume) => {
      this.cacheVolume = volume / 100;
    });
    window.launcher.addEventHandler('VIDEO_ON_PLAY_READY', (videoInfo) => {
      this.playReady = true;
      this.videoInfo.duration = videoInfo.duration;
    });
    window.launcher.addEventHandler('VIDEO_ON_CURRENT_TIME', (payload) => {
      this.currenPlayTime = payload;
    });
    window.launcher.addEventHandler('VIDEO_ON_BUFFERING_START', () => {
      this.videoInfo.buffering = true;
    });
    window.launcher.addEventHandler('VIDEO_ON_BUFFERING_STOP', () => {
      this.videoInfo.buffering = false;
    });
  }

  play(url) {
    this.launcher.videoPlay(url);
  }

  resume() {
    this.launcher.videoResume();
  }

  pause() {
    this.launcher.videoPause();
  }

  stop() {
    this.launcher.videoStop();
  }

  close() {
    this.launcher.videoStop();
  }

  get volume() {
    return this.cacheVolume;
  }

  set volume(value) {
    if (value >= 0 && value <= 1) {
      this.launcher.setVolume(value * 100);
      this.cacheVolume = value;
    }
    if (value < 0) {
      this.launcher.setVolume(0);
      this.cacheVolume = 0;
    }
  }

  getCurrentTime() {
    return this.currenPlayTime.currentTime;
  }

  get duration() {
    return this.videoInfo.duration;
  }

  seek(position) {
    return this.launcher.seek(position);
  }

}

export default OrsayVideo;
