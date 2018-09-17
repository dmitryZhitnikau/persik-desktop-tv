import TargetInput from './modules/APP_TARGET_TYPE/Input';

let instance;

class Input extends TargetInput {
  constructor() {
    super();
    if (instance) {
      throw new Error('The instance of Input must be obtained by Input.getInstance() method');
    }
    instance = this;
  }

  static getInstance() {
    if (!instance) {
      instance = new Input();
    }
    return instance;
  }
}

export default Input;
