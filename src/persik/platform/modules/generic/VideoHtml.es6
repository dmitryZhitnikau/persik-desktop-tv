import IVideo from '@/persik/platform/interfaces/IVideo';


class VideoHtml extends IVideo {
  constructor() {
    super();
    // TODO: убрать после отладки
    window.videoPlayer = this;

    this.lastUrl = null;
    this.ready = false;

    this.createVideoTag();

    this.video.addEventListener('canplay', () => {
      this.dispatchEvent(IVideo.READY_STATE);
      this.ready = true;
    });
    this.video.addEventListener('loadstart', () => { this.dispatchEvent(IVideo.START_LOADING); });
    this.video.addEventListener('play', () => { this.dispatchEvent(IVideo.PLAY); });
    this.video.addEventListener('pause', () => { this.dispatchEvent(IVideo.PAUSE); });
    this.video.addEventListener('playing', () => { this.dispatchEvent(IVideo.PLAY_START); });
    this.video.addEventListener('progress', () => { this.dispatchEvent(IVideo.LOAD_PROGRESS); });
    this.video.addEventListener('seeking', () => { this.dispatchEvent(IVideo.START_SEEK); });
    this.video.addEventListener('seeked', () => { this.dispatchEvent(IVideo.STOP_SEEK); });
    this.video.addEventListener('volumechange', () => { this.dispatchEvent(IVideo.VOLUME_CHANGE); });
    this.video.addEventListener('timeupdate', () => { this.dispatchEvent(IVideo.TIME_UPDATE); });
    this.video.addEventListener('waiting', () => { this.dispatchEvent(IVideo.WAITING); });
    this.video.addEventListener('ended', () => { this.dispatchEvent(IVideo.PLAY_ENDED); });
    this.video.addEventListener('error', () => {
      const error = {
        event: 'Html video tag event',
        type: this.video.error.code,
        details: this.video.error.message,
      };
      this.dispatchEvent(IVideo.PLAY_ERROR, error);
    });
  }

  play(url) {
    this.ready = false;
    this.stop();
    this.video.setAttribute('src', url);
    this.video.load();
    this.video.play();
    this.lastUrl = url;
  }

  resume() {
    this.video.play();
  }

  stop() {
    this.lastUrl = null;
    this.video.pause();
    this.video.removeAttribute('src');
  }

  // eslint-disable-next-line
  open() {
  }

  close() {
    this.stop();
  }

  pause() {
    this.video.pause();
  }

  get volume() {
    return this.video.volume;
  }

  set volume(value) {
    this.video.volume = value;
  }

  set seek(value) {
    this.video.currentTime = value;
  }

  get currentTime() {
    return this.video.currentTime;
  }

  get duration() {
    return this.video.duration;
  }

  get buffered() {
    let maxBuffered = 0;
    for (let i = 0; i < this.video.buffered.length; i += 1) {
      if (this.video.buffered.end(i) > maxBuffered) {
        maxBuffered = this.video.buffered.end(i);
      }
    }
    return maxBuffered;
  }

  setViewPort(x, y, width, height) {
    if (width !== 0 && height !== 0 && y !== 0 && x !== 0) {
      this.video.style.width = `${width}rem`;
      this.video.style.height = `${height}rem`;
      this.video.style.top = `${y}rem`;
      this.video.style.left = `${x}rem`;
    } else if (x === 10 && y === 10) {
      this.video.style.width = '99.5%';
      this.video.style.height = '100vh';
      this.video.style.top = '0';
      this.video.style.left = '0';
    } else {
      this.video.style.width = '100%';
      this.video.style.height = '100vh';
      this.video.style.top = '0';
      this.video.style.left = '0';
    }
  }

  get state() {
    if (this.ready) {
      if (this.played) return IVideo.PLAYED;
      if (this.video.paused) return IVideo.PAUSED;
      return IVideo.READY_STATE;
    }
    const readyState = this.video.readyState;
    if (readyState === 0) return IVideo.HAVE_NOTHING;
    if (readyState === 1) return IVideo.HAVE_METADATA;
    if (readyState === 2) return IVideo.HAVE_CURRENT_DATA;
    if (readyState === 3) return IVideo.HAVE_FUTURE_DATA;
    if (readyState === 4) return IVideo.HAVE_ENOUGH_DATA;
    return IVideo.ABORT;
  }

  get played() {
    return (this.video.currentTime > 0
            && !this.video.paused
            && !this.video.ended
            && this.video.readyState > 2);
  }

  get url() {
    return this.lastUrl;
  }

  createVideoTag() {
    const video = document.createElement('video');
    video.setAttribute('id', 'player_window');
    const content = document.querySelector('.app-content');
    content.insertBefore(video, content.firstChild);
    this.video = video;
  }
}

export default VideoHtml;
