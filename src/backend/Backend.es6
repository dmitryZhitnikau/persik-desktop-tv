import TargetBackend from './APP_BACKEND/Backend';

let instance;

class Backend extends TargetBackend {
  constructor() {
    super();
    if (instance) {
      throw new Error('The instance of Backend must be obtained by Backend.getInstance() method');
    }
    instance = this;
  }

  static getInstance() {
    if (!instance) {
      instance = new Backend();
    }
    return instance;
  }
}

export default Backend;
