import TargetDeviceInfo from './modules/APP_TARGET_TYPE/DeviceInfo';

let instance;

/**
 * @interface IDeviceInfo
 */
class DeviceInfo extends TargetDeviceInfo {
  constructor() {
    super();
    if (instance) {
      throw new Error('The instance of DeviceInfo must be obtained by DeviceInfo.getInstance() method');
    }
    instance = this;
  }

  static getInstance() {
    if (!instance) {
      instance = new DeviceInfo();
    }
    return instance;
  }
}

export default DeviceInfo;
