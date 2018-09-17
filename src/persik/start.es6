import Vue from 'vue';
import { JL } from 'jsnlog';
import App from '@/App.vue';
import router from '@/router';
// import KeyboardManager from '@/persik/ui/KeyboardManager.es6';
import NotificationsManager from '@/persik/ui/NotificationsManager.es6';
import DeviceInfo from '@/persik/platform/DeviceInfo';
import Metric from '@/persik/platform/Metric';
import EpgManager from '@/persik/service/EpgManager';
// import CrazyMonkey from '@/persik/ui/CrazyMonkey';
import Backend from '@/backend/Backend';
import store from '@/mixins/vuex';
import vueBemCn from 'vue-bem-cn';
// eslint-disable-next-line
import Epg from '@core/Epg';
// eslint-disable-next-line
import Storage from '@core/Storage';


export default async function () {
  const deviceInfo = DeviceInfo.getInstance();
  await deviceInfo.init();
  JL.setOptions({
    defaultAjaxUrl: `http://api.persik.by:8080/v2/utils/report-error?uuid=${encodeURIComponent(deviceInfo.uuid)}&device=${deviceInfo.platform}`,
  });


  Epg.setIndexedDB(window.indexedDB, window.IDBKeyRange);

  const backend = Backend.getInstance();
  console.log('Backend init:');
  await backend.init();
  console.log('Backend', backend.code, 'inited');

  const env = process.env;
  const appVersion = env.BUILD_NUMBER ? `#${env.BUILD_NUMBER} (${env.BUILD_DATE})` : 'N/A';

  const metric = Metric.getInstance();
  metric.setClientId(deviceInfo.uuid);

  await metric.init(backend.metricId);
  metric.setDeviceType('tv');
  metric.setDeviceVendor(deviceInfo.vendor);
  metric.setDeviceModel(deviceInfo.model);
  if (backend.authorized) {
    try {
      const userId = await backend.account.getUserId();
      metric.setUserId(userId);
    } catch (e) {
      console.log(e);
    }
  }
  metric.setAppName(backend.code);
  metric.setAppVersion(appVersion);
  metric.screenView('splash');

  const epgm = EpgManager.getInstance();
  // полный сброс всего, если бекэнд изменился
  const currentBackend = Storage.getInstance().getOption('backend', backend.code) || backend.code;
  if (currentBackend !== backend.code) {
    console.log('Backend will change from', currentBackend, 'to', backend.code);
    await backend.reset();
    await epgm.openDb();
    await epgm.deleteEpg();
  }
  Storage.getInstance().setOption('backend', backend.code);


  const nm = new NotificationsManager();
  // const km = KeyboardManager.getInstance();
  // km.init();

  Object.defineProperty(Vue.prototype, '$backend', { value: backend });
  // Object.defineProperty(Vue.prototype, '$km', { value: km });
  Object.defineProperty(Vue.prototype, '$nm', { value: nm });
  // Object.defineProperty(Vue.prototype, '$crazyMonkey', { value: new CrazyMonkey(km) });

  Vue.use(vueBemCn, { delimiters: {
    ns: '', // namespace
    el: '__', // element delimeter
    mod: '_', // modifier delimeter
    modVal: '-', // value delimeter for modifier
  } });

  // eslint-disable no-new
  window.vm = new Vue({
    el: '#app',
    router,
    store,
    data: {
      username: 'user name',
    },
    template: '<App v-bind:username="username" />',
    components: { App },
  });
}
