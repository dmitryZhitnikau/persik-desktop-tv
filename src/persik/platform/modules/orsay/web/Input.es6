import InputGeneric from '@/persik/platform/modules/generic/InputGeneric';

class Input extends InputGeneric {

  constructor() {
    super();
    this.init();
  }

  async init() {
    const tvKeys = await window.launcher.getTvKeys();
    this.map[tvKeys.KEY_LEFT] = Input.CODE_LEFT;
    this.map[tvKeys.KEY_RIGHT] = Input.CODE_RIGHT;
    this.map[tvKeys.KEY_DOWN] = Input.CODE_DOWN;
    this.map[tvKeys.KEY_UP] = Input.CODE_UP;

    this.map[tvKeys.KEY_0] = Input.CODE_DIGIT_0;
    this.map[tvKeys.KEY_1] = Input.CODE_DIGIT_1;
    this.map[tvKeys.KEY_2] = Input.CODE_DIGIT_2;
    this.map[tvKeys.KEY_3] = Input.CODE_DIGIT_3;
    this.map[tvKeys.KEY_4] = Input.CODE_DIGIT_4;
    this.map[tvKeys.KEY_5] = Input.CODE_DIGIT_5;
    this.map[tvKeys.KEY_6] = Input.CODE_DIGIT_6;
    this.map[tvKeys.KEY_7] = Input.CODE_DIGIT_7;
    this.map[tvKeys.KEY_8] = Input.CODE_DIGIT_8;
    this.map[tvKeys.KEY_9] = Input.CODE_DIGIT_9;

    this.map[tvKeys.KEY_PAUSE] = Input.CODE_PAUSE; // pause

    this.map[tvKeys.KEY_ENTER] = Input.CODE_ENTER;
    this.map[tvKeys.KEY_RETURN] = Input.CODE_BACK;
    this.map[tvKeys.KEY_MENU] = Input.CODE_MENU;
    this.map[tvKeys.KEY_INFO] = Input.CODE_INFO;

    this.map[tvKeys.KEY_TOOLS] = Input.CODE_TOOLS;
    this.map[tvKeys.KEY_PRECH] = Input.CODE_BACKSPACE;

    this.map[tvKeys.KEY_RED] = Input.CODE_RED;
    this.map[tvKeys.KEY_GREEN] = Input.CODE_GREEN;
    this.map[tvKeys.KEY_YELLOW] = Input.CODE_YELLOW;
    this.map[tvKeys.KEY_BLUE] = Input.CODE_BLUE;
    this.map[tvKeys.KEY_VOL_DOWN] = Input.CODE_VOLUME_DOWN;
    this.map[tvKeys.KEY_VOL_UP] = Input.CODE_VOLUME_UP;
    this.map[tvKeys.KEY_MUTE] = Input.CODE_MUTE;

    this.map[tvKeys.KEY_CH_UP] = Input.CODE_PAGE_UP;
    this.map[tvKeys.KEY_CH_DOWN] = Input.CODE_PAGE_DOWN;

    this.map[tvKeys.KEY_PAUSE] = Input.CODE_PAUSE;
    this.map[tvKeys.KEY_PLAY] = Input.CODE_PLAY;
    this.map[tvKeys.KEY_STOP] = Input.CODE_STOP;
    this.map[tvKeys.KEY_RW] = Input.CODE_REW;
    this.map[tvKeys.KEY_REWIND_] = Input.CODE_REW; //eslint-disable-line
    this.map[tvKeys.KEY_FF] = Input.CODE_FWD;
    this.map[tvKeys.KEY_FF_] = Input.CODE_FWD; //eslint-disable-line

    this.map[tvKeys.KEY_EXIT] = Input.CODE_EXIT;
  }

  /**
   * @override
   */
  eventToKeyCode(e) {
    e.preventDefault();
    return super.eventToKeyCode(e);
  }

}

export default Input;
