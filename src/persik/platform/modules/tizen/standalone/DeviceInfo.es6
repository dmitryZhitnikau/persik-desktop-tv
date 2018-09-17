import $ from 'jquery';
import UAParser from 'ua-parser-js';
import IDeviceInfo from '@/persik/platform/interfaces/IDeviceInfo';

class DeviceInfo extends IDeviceInfo {

  constructor() {
    super();
    // eslint-disable-next-line
    this.webapis = webapis;

    this.listener = this.webapis.network.addNetworkStateChangeListener(() => {
      this.dispatchEvent(this.online ? DeviceInfo.ONLINE : DeviceInfo.OFFLINE);
    });

    const parser = new UAParser();
    this.ua = parser.getResult();
  }

  //eslint-disable-next-line
  init() {
  }

  //eslint-disable-next-line
  get platform() {
    return 'samsung';
  }

  //eslint-disable-next-line
  get vendor() {
    return 'Samsung';
  }

  get model() {
    return this.webapis.productinfo.getModel();
  }

  get engine() {
    return `${this.ua.browser.name} ${this.ua.browser.version} (${this.ua.os.name} ${this.ua.os.version})`;
  }

  get uuid() {
    return this.webapis.productinfo.getDuid();
  }

  get online() {
    return this.webapis.network.getActiveConnectionType() > 0;
  }

  //eslint-disable-next-line
  get display() {
    return {
      width: $(window).width(),
      height: $(window).height(),
    };
  }
}

export default DeviceInfo;
