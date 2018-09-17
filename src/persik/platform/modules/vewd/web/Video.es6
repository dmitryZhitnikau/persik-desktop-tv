import Video from '../../Video';

class VewdVideo extends Video {
  constructor() {
    super();

    VewdVideo.createVideoTag();

    this.videoEl = document.getElementById('player_window');

    this.videoEl.addEventListener('abort', () => { this.dispatchEvent(Video.ABORT); });
    this.videoEl.addEventListener('canplay', () => { this.dispatchEvent(Video.READY_STATE); });
    this.videoEl.addEventListener('ended', () => { this.dispatchEvent(Video.PLAY_ENDED); });
    this.videoEl.addEventListener('error', () => { this.dispatchEvent(Video.ERROR); });
    this.videoEl.addEventListener('loadstart', () => { this.dispatchEvent(Video.START_LOADING); });
    this.videoEl.addEventListener('play', () => { this.dispatchEvent(Video.PLAY); });
    this.videoEl.addEventListener('pause', () => { this.dispatchEvent(Video.PAUSE); });
    this.videoEl.addEventListener('playing', () => { this.dispatchEvent(Video.PLAY_START); });
    this.videoEl.addEventListener('progress', () => { this.dispatchEvent(Video.LOAD_PROGRESS); });
    this.videoEl.addEventListener('seeking', () => { this.dispatchEvent(Video.START_SEEK); });
    this.videoEl.addEventListener('seeked', () => { this.dispatchEvent(Video.STOP_SEEK); });
    this.videoEl.addEventListener('volumechange', () => { this.dispatchEvent(Video.VOLUME_CHANGE); });
    this.videoEl.addEventListener('timeupdate', () => { this.dispatchEvent(Video.TIME_UPDATE); });
  }

  play(url) {
    this.videoEl.src = url;
    this.videoEl.play();
  }

  resume() {
    this.videoEl.play();
  }

  stop() {
    this.hls.stop();
    this.videoEl.stop();
  }

  pause() {
    this.hls.pause();
    this.videoEl.pause();
  }

  close() {
    this.hls.destroy();
    VewdVideo.deleteVideoTag();
  }

  get volume() {
    return this.videoEl.volume;
  }

  set volume(value) {
    this.videoEl.volume = value;
  }

  set seek(value) {
    this.videoEl.currentTime = value;
  }

  get currentTime() {
    return this.videoEl.currentTime;
  }

  get duration() {
    return this.videoEl.duration;
  }

  get buffered() {
    return this.videoEl.buffered.end(0);
  }

  static deleteVideoTag() {
    const video = document.getElementsByTagName('video')[0];
    const content = document.getElementsByClassName('app-content')[0];
    content.parentNode.removeChild(video);
  }

  static createVideoTag() {
    const video = document.createElement('video');
    video.setAttribute('id', 'player_window');
    video.setAttribute('src', '');
    const content = document.getElementsByClassName('app-content')[0];
    content.parentNode.insertBefore(video, content);
  }
}

export default VewdVideo;
