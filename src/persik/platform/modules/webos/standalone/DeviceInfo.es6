import $ from 'jquery';
import UAParser from 'ua-parser-js';
import IDeviceInfo from '@/persik/platform/interfaces/IDeviceInfo';
import DeviceInfoHtml5 from '@/persik/platform/modules/generic/DeviceInfoHtml5';

class DeviceInfo extends IDeviceInfo {

  constructor() {
    super();
    this.info = {
      uuid: '',
      vendor: 'LG',
      model: '',
    };
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

  // eslint-disable-next-line
  async init() {
    console.log('init');
    await this.detectModel();
    console.log('inited detectModel');
    try {
      await this.detectUuid();
    } catch (e) {
      console.warn(e);
    }
    console.log('inited detectUuid');
  }


  detectModel() {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      webOS.service.request('luna://com.webos.service.tv.systemproperty', {
        method: 'getSystemInfo',
        parameters: {
          keys: ['modelName'],
        },
        onComplete: (inResponse) => {
          const isSucceeded = inResponse.returnValue;
          if (typeof (inResponse.subscribed) !== 'undefined') {
            if (!inResponse.subscribed) {
              reject('Failed to subscribe TV device information');
            }
          }
          if (isSucceeded) {
            this.info.model = inResponse.modelName;
            resolve();
          } else {
            reject('Failed to get TV device information');
          }
        },
        onFailure(inError) {
          reject(inError);
        },
      });
    });
  }

  detectUuid() {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      webOS.service.request("luna://com.webos.service.sm", {
        method: 'deviceid/getIDs',
        parameters: {
          idType: ['LGUDID'],
        },
        onSuccess: (inResponse) => {
          resolve();
          this.info.uuid = inResponse.idList[0].idValue;
        },
        onFailure(inError) {
          reject(inError);
        },
      });
    });
  }

  //eslint-disable-next-line
  get platform() {
    return 'lg';
  }

  get online() {
    return this.window.navigator.onLine;
  }

  get vendor() {
    return this.info.vendor;
  }

  get model() {
    return this.info.model;
  }

  get engine() {
    return `${this.ua.browser.name} ${this.ua.browser.version} (${this.ua.os.name} ${this.ua.os.version ? this.ua.os.version : ''})`;
  }

  get uuid() {
    return this.info.uuid;
  }

  //eslint-disable-next-line
  get display() {
    return {
      width: $(this.window).width(),
      height: $(this.window).height(),
    };
  }

}

export default DeviceInfo;
