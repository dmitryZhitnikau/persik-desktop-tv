
export default {
  methods: {
    toggleFullscreen() {
      if (this.isFullscreenActive()) {
        this.closeFullscreen();
      } else {
        this.openFullscreen();
      }
    },
    isFullscreenSupport() {
      console.log('FULL SCREEN SUPPORT CHECK');
      return (document.fullscreenEnabled || document.mozFullscreenEnabled ||
      document.webkitFullscreenEnabled);
    },
    isFullscreenActive() {
      if ((document.fullScreenElement && document.fullScreenElement
        !== null) || document.mozFullScreen || document.webkitIsFullScreen) return true;
      return false;
    },
    openFullscreen() {
      const app = document.getElementById('app');
      const elem = app.querySelector('.app-content');
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    },
    closeFullscreen() {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    },
  },
};
