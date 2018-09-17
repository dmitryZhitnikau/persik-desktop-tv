let widgetAPI;
if (typeof Common !== 'undefined') { //eslint-disable-line
  widgetAPI = new Common.API.Widget(); //eslint-disable-line
}

class Main {

  static onLoad() {
    window.addEventListener('message', Main.messageHandler);
    document.getElementById('webapp').src = window.config.APP_URL;
    document.getElementById('webapp').focus();
    widgetAPI.sendReadyEvent();
    Main.player = Main.getPlugin('PLAYER');
    Main.audio = Main.getPlugin('AUDIO');
    Main.device = Main.getPlugin('NNAVI');
    Main.network = Main.getPlugin('NETWORK');
    Main.sef = Main.getPlugin('SEF');
    Main.eventHandlers = {};
    this.deviceInfo = {
      uuid: Main.getUuid(),
      model: Main.getModel(),
    };
  }

  static getPlugin(name) {
    const idPrefix = 'pluginObject';
    let plugin = document.getElementById(idPrefix + name);
    if (!plugin) {
      plugin = document.createElement('object');
      plugin.setAttribute('classid', `clsid:SAMSUNG-INFOLINK-${name}`);
      plugin.setAttribute('id', idPrefix + name);
      const pluginContainer = document.getElementById('pluginContainer');
      pluginContainer.appendChild(plugin);
    }
    return plugin;
  }

  static onUnload() {}

  static addEventHandler(eventType, source) {
    Main.eventHandlers[eventType] = { source };
  }

  static getTvKeys() {
    return new Common.API.TVKeyValue(); //eslint-disable-line
  }

  // Methods for Video -------

  static videoPlay(url) {
    let urlInput = url;
    if (url.indexOf('m3u8') !== -1 && url.indexOf('|COMPONENT=HLS') === -1) {
      urlInput += '|COMPONENT=HLS';
    }
    Main.player.Stop();
    Main.player.Play(urlInput);
    Main.currentPlayTime = 0;
    Main.player.OnCurrentPlayTime = function (time) {
      Main.currentPlayTime = time / 1000;
      Main.dispatchEvent('VIDEO_ON_CURRENT_TIME', { currentTime: Main.currentPlayTime });
    };
    Main.player.OnStreamInfoReady = function () {
      Main.dispatchEvent('VIDEO_ON_PLAY_READY', { duration: Main.getDuration() });
    };
    Main.player.OnBufferingStart = function () {
      Main.dispatchEvent('VIDEO_ON_BUFFERING_START', {});
    };
    Main.player.OnBufferingComplete = function () {
      Main.dispatchEvent('VIDEO_ON_BUFFERING_STOP', {});
    };
  }

  static videoResume() {
    Main.player.Resume();
  }

  static videoPause() {
    Main.player.Pause();
  }

  static videoStop() {
    Main.player.Stop();
  }

  static getDuration() {
    return Main.player.GetDuration();
  }

  static getCurrentTime() {
    return Main.currentPlayTime;
  }

  setPosition(position) {
    const currentPosition = Main.getCurrentTime();
    const delta = currentPosition - position;
    if (delta < 0) {
      this.player.JumpForward(-delta);
    } else if (delta > 0) {
      this.player.JumpBackward(delta);
    }
  }

  // Methods for Audio -------

  static getVolume() {
    return Main.audio.GetVolume();
  }

  static setVolume(value) {
    Main.audio.SetVolume(value);
  }

  // Methods for device info ------

  static getDeviceInfo() {
    return {
      uuid: Main.getUuid(),
      model: Main.getModel(),
    };
  }

  static getUuid() {
    const uuid = Main.device.GetDUID(Main.getMac(0));
    return uuid;
  }

  static getMac(id) {
    return Main.network.GetMAC(id);
  }

  static getModel() {
    Main.sef.Open('TV', '1.001', 'TV');
    return Main.sef.Execute('GetProductCode');
  }

  static checkNetworkConnection() {
    Main.sef.Open('Network', '1.001', 'Network');
    const wireless = Main.sef.Execute('CheckPhysicalConnection', 0);
    const wired = Main.sef.Execute('CheckPhysicalConnection', 1);
    if (wireless !== -1 || wired !== -1) {
      return true;
    }
    return false;
  }

  static dispatchEvent(eventType, payload) {
    if (typeof Main.eventHandlers[eventType] !== 'undefined') {
      const source = Main.eventHandlers[eventType].source;
      const data = { payload, eventType };
      source.postMessage(data, '*');
    }
  }

  static messageHandler(event) {
    const data = event.data;
    const action = data.action;
    const args = typeof data.args !== 'undefined' ? data.args : [];
    if (action === 'addEventHandler') {
      Main.addEventHandler(args[0], event.source);
    } else {
      if (typeof Main[action] !== 'function') {
        throw new Error(`Unknown launcher action "${action}"`);
      }

      const result = {
        response: Main[action].apply(this, args),
      };

      if (typeof data.queryId !== 'undefined') {
        result.queryId = data.queryId;
        event.source.postMessage(result, '*');
      }
    }
  }

}

window.Main = Main;
