/* eslint-disable class-methods-use-this */
import EventDispatcher from '@danehansen/event-dispatcher';

/**
 * @interface
 */
class IDeviceInfo extends EventDispatcher {

  static get ONLINE() {
    return 'ONLINE';
  }

  static get OFFLINE() {
    return 'OFFLINE';
  }

  get platform() {
    throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
  }

  get vendor() {
    throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
  }

  get model() {
    throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
  }

  get engine() {
    throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
  }

  get uuid() {
    throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
  }

  get display() {
    throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
  }

  get online() {
    throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
  }

  async init() {
    throw new Error('IDeviceInfo.init() method not implemented');
  }
}

export default IDeviceInfo;
