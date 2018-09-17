import $ from 'jquery';
import IDeviceInfo from '@/persik/platform/interfaces/IDeviceInfo';
import UAParser from 'ua-parser-js';

class DeviceInfo extends IDeviceInfo {

  constructor() {
    super();
    this.window = window;
    this.window.addEventListener('online', () => {
      this.dispatchEvent(DeviceInfo.ONLINE);
    });
    this.window.addEventListener('offline', () => {
      this.dispatchEvent(DeviceInfo.OFFLINE);
    });

    const parser = new UAParser();
    this.ua = parser.getResult();
  }

  //eslint-disable-next-line
  get platform() {
    return 'android';
  }

  get vendor() {
    return this.device.manufacturer;
  }

  get model() {
    return this.device.model;
  }

  get engine() {
    return `${this.ua.browser.name} ${this.ua.browser.version} (${this.ua.os.name} ${this.ua.os.version})`;
  }

  get version() {
    return this.device.version;
  }

  get uuid() {
    return this.device.uuid;
  }

  //eslint-disable-next-line
  get display() {
    return {
      width: $(window).width(),
      height: $(window).height(),
    };
  }

  //eslint-disable-next-line
  get online() {
    //eslint-disable-next-line
    return navigator.connection.type !== Connection.NONE;
  }


  async init() {
    if (!this.inited) {
      return new Promise((resolve) => {
        document.addEventListener('deviceready', () => {
          //eslint-disable-next-line
          this.device = device;
          this.inited = true;
          resolve();
        });
      });
    }
    return true;
  }
}

export default DeviceInfo;
