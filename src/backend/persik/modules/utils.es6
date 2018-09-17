import moment from 'moment';

export default {
  init() {
  },

  reset() {
  },

  clear() {
  },

  async checkTime() {
    const serverTime = (await this.api.utils.getTime()).unix;
    const localTime = moment().unix();
    const delta = Math.abs(localTime - serverTime);
    const MAX_DELTA = 300;
    return delta <= MAX_DELTA;
  },

  getCountryCodeByIP() {
    return this.api.utils.getCountryCodeByIP();
  },

};
