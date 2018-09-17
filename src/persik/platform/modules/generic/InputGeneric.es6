import _ from 'lodash';
import IInput from '../../interfaces/IInput';

class InputGeneric extends IInput {

  constructor() {
    super();
    this.map = {};
  }

  eventToKeyCode(e) {
    const keyCode = e.keyCode;
    return this.mapKeyCode(keyCode);
  }

  mapKeyCode(keyCode) {
    if (Object.prototype.hasOwnProperty.call(this.map, String(keyCode))) {
      return this.map[keyCode];
    }
    return InputGeneric.CODE_UNKNOWN;
  }

  getEventKeyCode(inputCode) {
    return _.findKey(this.map, (value) => value === inputCode);
  }
}

export default InputGeneric;
