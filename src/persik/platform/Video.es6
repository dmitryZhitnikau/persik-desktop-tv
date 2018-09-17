import TargetVideo from './modules/APP_TARGET_TYPE/Video';

let instance;

class Video extends TargetVideo {
  constructor() {
    super();
    if (instance) {
      throw new Error('The instance of Video must be obtained by Video.getInstance() method');
    }
    instance = this;
  }

  static getInstance() {
    if (!instance) {
      instance = new Video();
    }
    return instance;
  }

  open() {
    clearTimeout(this.closeTimer);
    super.open();
  }

  close(deffer = false) {
    clearTimeout(this.closeTimer);
    if (deffer) {
      this.closeTimer = setTimeout(() => {
        super.close();
      }, 10);
    } else {
      super.close();
    }
  }
}

export default Video;
