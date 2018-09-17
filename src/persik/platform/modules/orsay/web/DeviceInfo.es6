import $ from 'jquery';
import IDeviceInfo from '../../IDeviceInfo';

class DeviceInfo extends IDeviceInfo {

  constructor() {
    super();
    this.onlineStatus = true;
    this.deviceInfo = {};
    window.launcher.addEventHandler('DEVICE_ON_NETWORK_STATUS', (status) => {
      this.onlineStatus = status;
    });
    window.launcher.getDeviceInfo().then((deviceInfo) => {
      this.deviceInfo = {
        vendor: 'Samsung',
        model: deviceInfo.model,
        uuid: deviceInfo.uuid,
      };
    });
  }

  get vendor() {
    return this.deviceInfo.vendor;
  }

  get model() {
    return this.deviceInfo.model;
  }

  get uuid() {
    return this.deviceInfo.uuid;
  }

  get online() {
    return this.onlineStatus;
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
