import analytics from 'universal-ga';
import IMetric from '@/persik/platform/interfaces/IMetric';
import uuidv4 from 'uuid/v4';
import md5 from 'js-md5';
import validate from 'uuid-validate';

class MetricHtml extends IMetric {

  static get DEVICE_TYPE() {
    return 'dimension1';
  }
  static get DEVICE_VENDOR() {
    return 'dimension2';
  }
  static get DEVICE_MODEL() {
    return 'dimension3';
  }

  constructor() {
    super();
    this.analytics = analytics;
  }

  init(id) {
    const params = {
      storage: 'none',
    };
    if (this.clientId) {
      params.clientId = this.clientId;
    }
    this.analytics.initialize(id, params);
    this.analytics.set('checkProtocolTask', null);
    this.analytics.set('checkStorageTask', null);
    this.analytics.set('historyImportTask', null);
    this.options = {};
  }

  /**
   *
   * Устанавливать параметр нужно до выполнения init()
   *
   * @param value UUID v4 or any string (with auto convert to uuid v4)
   */
  setClientId(value) {
    if (validate(value, 4)) {
      this.clientId = value;
    } else {
      this.clientId = uuidv4({ random: md5.array(value) });
    }
  }

  setUserId(value) {
    if (value) {
      this.analytics.set('userId', value);
    }
  }

  setDeviceType(value) {
    this.analytics.custom(this.constructor.DEVICE_TYPE, value);
  }

  setDeviceVendor(value) {
    this.analytics.custom(this.constructor.DEVICE_VENDOR, value);
  }

  setDeviceModel(value) {
    this.analytics.custom(this.constructor.DEVICE_MODEL, value);
  }

  setAppName(value) {
    this.options.appName = value;
  }

  setAppVersion(value) {
    this.options.appVersion = value;
  }

  screenView(screenName) {
    this.analytics.screenview(screenName, this.options);
  }

  event(category, action, label = null, value = null, nonInteraction = false) {
    const params = { nonInteraction };
    if (label !== null) {
      params.eventLabel = label;
    }
    if (value !== null) {
      params.eventValue = value;
    }
    this.analytics.event(
      category, action,
      params,
    );
  }

  timing(category, timingVar, value, options) {
    this.analytics.timing(category, timingVar, value, options);
  }
}

export default MetricHtml;
