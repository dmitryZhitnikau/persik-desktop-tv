class Launcher {
  constructor() {
    window.addEventListener('message', this.messageHandler.bind(this));
    this.launcher = window.parent;
    this.queue = {};
    this.eventHandlers = {};
  }

  execAction(action, args = [], returnResponse = true) {
    const message = { action, args };
    let p;
    if (returnResponse) {
      message.queryId = Math.ceil(Math.random() * 10000000);
      const queue = {};
      p = new Promise((resolve, reject) => {
        queue.resolve = resolve;
        queue.reject = reject;
      });
      this.queue[message.queryId] = queue;
    }
    this.launcher.postMessage(message, '*');
    return returnResponse ? p : null;
  }

  addEventHandler(eventType, callback) {
    this.eventHandlers[eventType] = callback;
    this.execAction('addEventHandler', [eventType], false);
  }

  getTvKeys() {
    return this.execAction('getTvKeys');
  }

  videoPlay(url) {
    return this.execAction('videoPlay', [url]);
  }

  videoResume() {
    return this.execAction('videoResume');
  }

  videoPause() {
    return this.execAction('videoPause');
  }

  videoStop() {
    return this.execAction('videoStop');
  }

  getDuration() {
    return this.execAction('getDuration');
  }

  getVolume() {
    return this.execAction('getVolume');
  }

  setVolume(value) {
    return this.execAction('setVolume', [value]);
  }

  setSeek(value) {
    return this.execAction('setSeek', [value]);
  }

  getCurrentTime() {
    return this.execAction('getCurrentTime');
  }

  getDeviceInfo() {
    return this.execAction('getDeviceInfo');
  }


  seek(position) {
    return this.execAction('setPosition', [position]);
  }

  isOnline() {
    return this.execAction('checkNetworkConnection');
  }

  messageHandler(event) {
    const data = event.data;
    if (typeof data.queryId !== 'undefined') {
      const queryId = data.queryId;
      if (typeof this.queue[queryId] !== 'undefined') {
        const queue = this.queue[queryId];
        queue.resolve(data.response);
        delete this.queue[queryId];
      }
    }
    if (typeof data.eventType !== 'undefined') {
      const payload = data.payload;
      this.eventHandlers[data.eventType].call(this, payload);
    }
  }
}

window.launcher = new Launcher();

require('../../../../main'); //eslint-disable-line

