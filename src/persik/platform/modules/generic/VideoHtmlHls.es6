import Hls from 'hls.js';

import VideoHtml from './VideoHtml';

class VideoHtmlHls extends VideoHtml {

  constructor() {
    super();
    this.useHls = true;
  }

  setupHls() {
    this.hls = new Hls();
    this.recoverAttemptsRemaining = 5;

    this.hls.on(Hls.Events.MANIFEST_PARSED, async () => {
      try {
        await this.video.play();
      } catch (e) {} //eslint-disable-line
    });

    this.hls.on(Hls.Events.ERROR, (event, data) => {
      const error = {
        event,
        type: data.type,
        details: data.details,
      };
      // подавление нефатальных ошибок
      if (!data.fatal) {
        console.log(data);
      } else if (this.recoverAttemptsRemaining > 0) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
            console.log('Hls: fatal network error encountered, try to recover');
            this.hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('Hls: fatal media error encountered, try to recover');
            this.hls.recoverMediaError();
            break;
          default:
              // cannot recover
            this.stop();
            break;
        }
        this.recoverAttemptsRemaining -= 1;
      } else {
        console.error(data);
        this.stop();
        this.dispatchEvent(VideoHtmlHls.PLAY_ERROR, error);
      }
    });
  }

  play(url) {
    if (this.useHls && Hls.isSupported()) {
      if (!this.hls) {
        this.setupHls();
      }
      this.hls.loadSource(url);
      this.hls.attachMedia(this.video);
      this.lastUrl = url;
    } else {
      super.play(url);
    }
  }

  stop() {
    if (this.useHls && Hls.isSupported()) {
      this.lastUrl = null;
      if (this.hls) {
        this.hls.stopLoad();
        this.hls.detachMedia();
        this.destroyHls();
      }
    } else {
      super.stop();
    }
  }

  destroyHls() {
    this.hls.destroy();
    const tmpHls = this.hls;
    setTimeout(() => {
      // улучшенная очистка памяти hls
      // таймаут нужен для завершения таймаутов самого HLS
      //eslint-disable-next-line
      if (tmpHls.abrController && tmpHls.abrController._bwEstimator) {
        //eslint-disable-next-line
        tmpHls.abrController._bwEstimator.hls = null;
      }

      if (tmpHls.coreComponents && tmpHls.coreComponents.length) {
        tmpHls.coreComponents.forEach((component) => {
          component.hls = null;
          component.media = null;
          component.cea608Parser = null;
        });
      }
      if (tmpHls.networkControllers && tmpHls.networkControllers.length) {
        tmpHls.networkControllers.forEach((component) => {
          component.hls = null;
        });
      }
      tmpHls.coreComponents = null;
      tmpHls.networkControllers = null;
    }, 5000);
    this.hls = null;
  }

}

export default VideoHtmlHls;
