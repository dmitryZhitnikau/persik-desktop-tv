/* eslint-disable class-methods-use-this,no-unused-vars */

/**
 * @interface
 */
class IInput {

  static get CODE_UNKNOWN() {
    return 0;
  }

  static get CODE_LEFT() {
    return 1;
  }

  static get CODE_UP() {
    return 2;
  }

  static get CODE_RIGHT() {
    return 3;
  }

  static get CODE_DOWN() {
    return 4;
  }

  static get CODE_PLAY() {
    return 15;
  }

  static get CODE_PAUSE() {
    return 46;
  }

  static get CODE_STOP() {
    return 17;
  }

  static get CODE_FWD() {
    return 18;
  }

  static get CODE_REW() {
    return 19;
  }

  static get CODE_BACK() {
    return 20;
  }

  static get CODE_ENTER() {
    return 21;
  }

  static get CODE_MENU() {
    return 22;
  }

  static get CODE_INFO() {
    return 23;
  }

  static get CODE_PAGE_UP() {
    return 24;
  }

  static get CODE_PAGE_DOWN() {
    return 25;
  }

  static get CODE_NEXT_CHAPTER() {
    return 26;
  }

  static get CODE_PREV_CHAPTER() {
    return 27;
  }

  static get CODE_VOLUME_DOWN() {
    return 28;
  }

  static get CODE_VOLUME_UP() {
    return 29;
  }

  static get CODE_RED() {
    return 30;
  }

  static get CODE_GREEN() {
    return 31;
  }

  static get CODE_BLUE() {
    return 32;
  }

  static get CODE_YELLOW() {
    return 33;
  }

  static get CODE_EXIT() {
    return 34;
  }

  static get CODE_POWER() {
    return 35;
  }

  static get CODE_REFRESH() {
    return 36;
  }

  static get CODE_MUTE() {
    return 37;
  }

  static get CODE_BACKSPACE() {
    return 38;
  }

  static get CODE_PLAY_PAUSE() {
    return 39;
  }

  static get CODE_TOOLS() {
    return 40;
  }

  static get CODE_ASPECT_RATIO() {
    return 41;
  }

  static get CODE_MOUSE_WHEEL_UP() {
    return 42;
  }

  static get CODE_MOUSE_WHEEL_DOWN() {
    return 43;
  }

  static get CODE_MOUSE_WHEEL_LEFT() {
    return 44;
  }

  static get CODE_MOUSE_WHEEL_RIGHT() {
    return 45;
  }

  static get CODE_SHIFT() {
    return 47;
  }

  static get CODE_DIGIT_0() {
    return 48;
  }

  static get CODE_DIGIT_1() {
    return 49;
  }

  static get CODE_DIGIT_2() {
    return 50;
  }

  static get CODE_DIGIT_3() {
    return 51;
  }

  static get CODE_DIGIT_4() {
    return 52;
  }

  static get CODE_DIGIT_5() {
    return 53;
  }

  static get CODE_DIGIT_6() {
    return 54;
  }

  static get CODE_DIGIT_7() {
    return 55;
  }

  static get CODE_DIGIT_8() {
    return 56;
  }

  static get CODE_DIGIT_9() {
    return 57;
  }

  static get CODE_A() {
    return 58;
  }

  static get CODE_B() {
    return 59;
  }

  static get CODE_C() {
    return 60;
  }

  static get CODE_D() {
    return 61;
  }

  static get CODE_E() {
    return 62;
  }

  static get CODE_F() {
    return 63;
  }

  static get CODE_G() {
    return 64;
  }

  static get CODE_H() {
    return 65;
  }

  static get CODE_I() {
    return 66;
  }

  static get CODE_J() {
    return 67;
  }

  static get CODE_K() {
    return 68;
  }

  static get CODE_L() {
    return 69;
  }

  static get CODE_M() {
    return 70;
  }

  static get CODE_N() {
    return 71;
  }

  static get CODE_O() {
    return 72;
  }

  static get CODE_P() {
    return 73;
  }

  static get CODE_Q() {
    return 74;
  }

  static get CODE_R() {
    return 75;
  }

  static get CODE_S() {
    return 76;
  }

  static get CODE_T() {
    return 77;
  }

  static get CODE_U() {
    return 78;
  }

  static get CODE_V() {
    return 79;
  }

  static get CODE_W() {
    return 80;
  }

  static get CODE_X() {
    return 81;
  }

  static get CODE_Y() {
    return 82;
  }

  static get CODE_Z() {
    return 83;
  }

  static get CODE_BRACKET_O() {
    return 84;
  }

  static get CODE_BRACKET_C() {
    return 85;
  }

  static get CODE_SEMI_COLON() {
    return 86;
  }

  static get CODE_SINGLE_QUOTE() {
    return 87;
  }

  static get CODE_COMMA() {
    return 88;
  }

  static get CODE_PERIOD() {
    return 89;
  }

  static get CODE_DOT() {
    return 90;
  }

  static get CODES_DPAD() {
    return [
      IInput.CODE_LEFT, IInput.CODE_RIGHT, IInput.CODE_UP, IInput.CODE_DOWN,
    ];
  }

  static get CODES_DIGITS() {
    return [
      IInput.CODE_DIGIT_0, IInput.CODE_DIGIT_1, IInput.CODE_DIGIT_2, IInput.CODE_DIGIT_3,
      IInput.CODE_DIGIT_4, IInput.CODE_DIGIT_5, IInput.CODE_DIGIT_6, IInput.CODE_DIGIT_7,
      IInput.CODE_DIGIT_8, IInput.CODE_DIGIT_9,
    ];
  }

  static get CODES_LETTERS() {
    return [
      IInput.CODE_A, IInput.CODE_B, IInput.CODE_C, IInput.CODE_D, IInput.CODE_E, IInput.CODE_F,
      IInput.CODE_G, IInput.CODE_H, IInput.CODE_I, IInput.CODE_J, IInput.CODE_K, IInput.CODE_L,
      IInput.CODE_M, IInput.CODE_N, IInput.CODE_O, IInput.CODE_P, IInput.CODE_Q, IInput.CODE_R,
      IInput.CODE_S, IInput.CODE_T, IInput.CODE_U, IInput.CODE_V, IInput.CODE_W, IInput.CODE_X,
      IInput.CODE_Y, IInput.CODE_Z, IInput.CODE_BRACKET_O, IInput.CODE_BRACKET_C,
      IInput.CODE_SEMI_COLON, IInput.CODE_SINGLE_QUOTE, IInput.CODE_COMMA, IInput.CODE_PERIOD,
      IInput.CODE_DOT,
    ];
  }

  eventToKeyCode(e) {
    throw new Error('IInput.eventToKeyCode() method not implemented');
  }

  getEventKeyCode(inputCode) {
    throw new Error('IInput.getEventKeyCode() method not implemented');
  }
}

export default IInput;
