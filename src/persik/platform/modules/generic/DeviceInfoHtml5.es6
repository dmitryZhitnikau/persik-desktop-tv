import UAParser from 'ua-parser-js';
import Cookies from 'js-cookie';
import $ from 'jquery';
import IDeviceInfo from '@/persik/platform/interfaces/IDeviceInfo';
import Storage from '@core/Storage'; //eslint-disable-line

/**
 * @interface IDeviceInfo
 */
class DeviceInfoHtml5 extends IDeviceInfo {

  constructor() {
    super();
    this.storage = Storage.getInstance();
    this.window = window;
    this.window.addEventListener('online', () => {
      this.dispatchEvent(DeviceInfoHtml5.ONLINE);
    });
    this.window.addEventListener('offline', () => {
      this.dispatchEvent(DeviceInfoHtml5.OFFLINE);
    });

    const parser = new UAParser();
    this.ua = parser.getResult();
  }

  static generateUuid() {
    let uuid = '';
    const words = '23456789ABCDEFGHKLMNPRSTUVWXYZ';
    const maxPosition = words.length - 1;
    for (let i = 0; i < 16; i += 1) {
      const position = Math.floor(Math.random() * maxPosition);
      uuid += words.substring(position, position + 1);
    }
    return uuid;
  }

  //eslint-disable-next-line
  get platform() {
    return 'pc';
  }

  get vendor() {
    if (this.ua.device.vendor !== undefined) {
      return this.ua.device.vendor;
    }
    return this.ua.os.name;
  }

  get model() {
    if (this.ua.device.model !== undefined) {
      return this.ua.device.model;
    }
    return this.ua.browser.name;
  }

  get engine() {
    return `${this.ua.browser.name} ${this.ua.browser.version} (${this.ua.os.name} ${this.ua.os.version})`;
  }

  get uuid() {
    let storageUuid;
    try {
      storageUuid = this.storage.getOption('uuid');
    } catch (e) {
      console.error(e);
    }
    const cookieUuid = Cookies.get('uuid');
    if (!storageUuid && !cookieUuid) {
      const uuid = this.constructor.generateUuid();
      this.storage.setOption('uuid', uuid);
      Cookies.set('uuid', uuid);
    } else if (!storageUuid) {
      this.storage.setOption('uuid', cookieUuid);
    } else if (!cookieUuid) {
      Cookies.set('uuid', storageUuid);
    }
    return this.storage.getOption('uuid');
  }

  get display() {
    return {
      width: $(this.window).width(),
      height: $(this.window).height(),
    };
  }

  get online() {
    return this.window.navigator.onLine;
  }

  // eslint-disable-next-line
  async init() {
  }

}

export default DeviceInfoHtml5;
