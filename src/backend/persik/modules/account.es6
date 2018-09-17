import sha1 from 'sha1';
import Metric from '@/persik/platform/Metric';


export default {
  init() {
    if (this.storage.getOption('token')) {
      this.api.setGlobalParam('auth_token', this.storage.getOption('token'));
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  },

  reset() {
    this.storage.deleteOption('token');
    this.storage.deleteOption('user_id');
  },

  clear() {
  },

  async login(...args) {
    const res = await this.api.account.login(...args);
    this.api.setGlobalParam('auth_token', res.auth_token);
    this.storage.setOption('token', res.auth_token);
    this.storage.setOption('user_id', res.user_id);
    this.authorized = true;
    this.clear();
    Metric.getInstance().setUserId(res.user_id);
    return res;
  },

  logout() {
    this.storage.deleteOption('token');
    this.storage.deleteOption('user_id');
    this.api.removeGlobalParam('auth_token');
    this.authorized = false;
    this.clear();
  },

  checkEmail(email) {
    return this.api.account.checkEmail(email);
  },

  async checkPassword(password) {
    const res = await this.api.account.checkPassword(sha1(password));
    return res.valid;
  },

  register(email, password) {
    return this.api.account.register(email, password);
  },

  getInfo() {
    return this.api.account.getInfo();
  },

  setInfo(info) {
    return this.api.account.setInfo(info);
  },

  async getPin() {
    const info = await this.api.account.getInfo();
    return info.pass_code;
  },

  setPin(pin) {
    return this.api.account.setInfo({ pass_code: pin });
  },

  isTestPeriodAvailable(uuid) {
    return this.api.account.isTestPeriodAvailable(uuid);
  },

  activateTrial(uuid) {
    return this.api.account.activateTrial(uuid);
  },

  async getUserId() {
    let userId = this.storage.getOption('user_id');
    if (!userId) {
      const info = await this.api.account.getInfo();
      userId = info.user_id;
      this.storage.setOption('user_id', userId);
    }
    return userId;
  },

};
