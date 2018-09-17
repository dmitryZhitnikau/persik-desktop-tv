/* eslint-disable import/no-extraneous-dependencies, import/first */
import _ from 'lodash';
import IBackend from '../IBackend';
import Api from '@core/Api.js';
import apiModules from '@core/api_modules';
import Storage from '@core/Storage';
import DeviceInfo from '@/persik/platform/DeviceInfo';
import modules from './modules';

const logo = require('../../assets/vector-image/logo-old.svg');

class Backend extends IBackend {

  //eslint-disable-next-line
  get code() {
    return 'persik';
  }

  init() {
    this.storage = Storage.getInstance();
    this.initApi();
    this.loadModules();
  }

  initApi() {
    this.api = new Api();
    this.api.setBaseUrl('https://api.persik.tv/');
    this.api.addModules(apiModules);
    this.api.setGlobalParam('device', 'web-by'); // this.api.setGlobalParam('device', DeviceInfo.getInstance().platform);
    this.api.setGlobalParam('lang', 'ru');
    this.api.setGlobalParam('uuid', DeviceInfo.getInstance().uuid);
  }

  loadModules() {
    _.forOwn(modules, (methods, moduleName) => {
      this[moduleName] = _.mapValues(methods, (f) => f.bind(this));
    });
    _.keys(modules).forEach((moduleName) => {
      this[moduleName].init();
    });
  }

  //eslint-disable-next-line
  get support() {
    return {
      auth: true,
      vod: true,
      search: true,
      favorite: true,
      featured: true,
      epg: true,
    };
  }

  //eslint-disable-next-line
  get logo() {
    return logo;
  }

  //eslint-disable-next-line
  get metricId() {
    return 'UA-45377324-17';
  }

  // TODO: реализовать каждый модуль
  get billing() {
    return this.api.billing;
  }
  get epg() {
    return this.api.epg;
  }
  get stream() {
    return this.api.stream;
  }
  get notifications() {
    return this.api.notifications;
  }

  async reset() {
    await this.content.reset();
    await this.account.reset();
    await this.categories.reset();
    await this.favorite.reset();
    await this.featured.reset();
    await this.settings.reset();
  }

  async clear() {
    await this.content.clear();
    await this.account.clear();
    await this.categories.clear();
    await this.favorite.clear();
    await this.featured.clear();
    await this.settings.clear();
  }
}

export default Backend;
