let instance;

class Storage {

  constructor() {
    if (instance) {
      throw new Error('The instance of Storage must be obtained by Storage.getInstance() method');
    }
    instance = this;
    // eslint-disable-next-line
    this.localStorage = window.localStorage;
  }

  static getInstance() {
    if (!instance) {
      instance = new Storage();
    }
    return instance;
  }

  deleteAll() {
    this.localStorage.clear();
  }

  getOption(param, defaultValue = null) {
    const data = this.localStorage.getItem(param);
    if (data === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      //eslint-disable-next-line
      console.warn(e);
      return defaultValue;
    }
  }

  setOption(param, value) {
    const option = JSON.stringify(value);
    this.localStorage.setItem(param, option);
  }

  deleteOption(param) {
    this.localStorage.removeItem(param);
  }
}

export default Storage;
