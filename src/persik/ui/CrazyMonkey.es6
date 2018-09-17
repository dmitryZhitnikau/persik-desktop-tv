import _ from 'lodash';
import Input from '@/persik/platform/Input';

class CrazyMonkey {

  static get UP_DELAY() {
    return 20;
  }

  static get REPEAT_DELAY() {
    return 80;
  }

  static get DEFAULT_DELAY() {
    return 250;
  }

  static get ACTION_DELAY() {
    return 1000;
  }

  constructor(keyboardManager) {
    this.km = keyboardManager;
    this.enabled = false;
    this.ignoreErrors = true;
  }

  static delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  static generateIdea() {
    let key;
    let count = 1;
    let fast = false;
    if (Math.random() < 0.25) {
      key = Input.CODE_ENTER;
    } else if (Math.random() < 0.10) {
      key = Input.CODE_BACK;
    } else {
      const keys = [
        Input.CODE_LEFT,
        Input.CODE_UP,
        Input.CODE_RIGHT,
        Input.CODE_DOWN,
      ];
      key = _.sample(keys);
      count = 1 + Math.floor(Math.random() * 10);
      fast = Math.random() < 0.3;
    }

    return { key, count, fast };
  }


  async start() {
    this.enabled = true;

    while (this.enabled) {
      const idea = CrazyMonkey.generateIdea();
      const key = idea.key;
      const count = idea.count;
      const fast = idea.fast;

      console.log('CrazyMonkey has new idea:', key, count, fast);
      try {
        const keyCode = this.km.deviceInput.getEventKeyCode(key);
        if (fast) {
          for (let i = 0; i < count; i += 1) {
            this.km.trigger('keydown', keyCode);
            await CrazyMonkey.delay(CrazyMonkey.REPEAT_DELAY); //eslint-disable-line
          }
          await CrazyMonkey.delay(CrazyMonkey.UP_DELAY); //eslint-disable-line
          this.km.trigger('keyup', keyCode);
        } else {
          for (let i = 0; i < count; i += 1) {
            this.km.trigger('keydown', keyCode);
            await CrazyMonkey.delay(CrazyMonkey.UP_DELAY); //eslint-disable-line
            this.km.trigger('keyup', keyCode);
            await CrazyMonkey.delay(CrazyMonkey.DEFAULT_DELAY); //eslint-disable-line
          }
        }
      } catch (e) {
        console.error('Crazy Monkey found bug');
        if (this.ignoreErrors) {
          console.error(e);
        } else {
          throw e;
        }
      }

      await CrazyMonkey.delay(CrazyMonkey.ACTION_DELAY); //eslint-disable-line
    }
  }

  stop() {
    this.enabled = false;
  }

  toggle() {
    if (!this.enabled) {
      this.start();
    } else {
      this.stop();
    }
  }
}

export default CrazyMonkey;
