// import DeviceInfo from '@/persik/platform/DeviceInfo';
import PersikBackend from '../persik/Backend';

const defaultLogo = require('../../assets/vector-image/logo-persik-by.svg');

class Backend extends PersikBackend {

  //eslint-disable-next-line
  get code() {
    return 'persik-by';
  }

  initApi() {
    super.initApi();
    this.api.setBaseUrl('http://api.persik.by/');
    this.api.setGlobalParam('device', 'web-by'); // this.api.setGlobalParam('device', `${DeviceInfo.getInstance().platform}-by`);
  }

  //eslint-disable-next-line
  get logo() {
    return defaultLogo;
  }

  //eslint-disable-next-line
  get metricId() {
    return 'UA-45377324-18';
  }
}

export default Backend;
