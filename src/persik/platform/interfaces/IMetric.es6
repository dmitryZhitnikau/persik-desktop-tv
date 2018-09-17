/* eslint-disable class-methods-use-this */
/**
 * @interface
 */
class IMetric {

  async init() {
    throw new Error('IMetric.init() method not implemented');
  }

  setDeviceType() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }
  setDeviceVendor() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }
  setDeviceModel() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }

  setClientId() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }
  setUserId() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }

  screenView() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }

  event() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }

  timing() {
    throw new Error('IMetric method not implemented (see details in stack trace)');
  }

}

export default IMetric;
