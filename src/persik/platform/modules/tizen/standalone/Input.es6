import InputGeneric from '@/persik/platform/modules/generic/InputGeneric';

class Input extends InputGeneric {

  constructor() {
    super();
    this.keyName = {};
    this.initKeyName();
    this.initKeyMap();
    this.registerDefaultButton();
  }

  initKeyMap() {
    this.map[37] = Input.CODE_LEFT;
    this.map[38] = Input.CODE_UP;
    this.map[39] = Input.CODE_RIGHT;
    this.map[40] = Input.CODE_DOWN;
    this.map[10009] = Input.CODE_BACK; // esc
    this.map[13] = Input.CODE_ENTER;

    this.map[415] = Input.CODE_PLAY; // play
    this.map[19] = Input.CODE_PAUSE; // pause
    this.map[10252] = Input.CODE_PLAY_PAUSE; // play/pause
    this.map[413] = Input.CODE_STOP;
    this.map[412] = Input.CODE_REWIND;
    this.map[417] = Input.CODE_FAST_FORVARD;

    this.map[457] = Input.CODE_INFO; // i
    this.map[10135] = Input.CODE_TOOLS; // t
    this.map[457] = Input.CODE_MENU; // `

    this.map[403] = Input.CODE_RED; // F1
    this.map[404] = Input.CODE_GREEN; // F2
    this.map[405] = Input.CODE_YELLOW; // F3
    this.map[406] = Input.CODE_BLUE; // F4

    this.map[448] = Input.CODE_VOLUME_DOWN; // F5
    this.map[447] = Input.CODE_VOLUME_UP; // F6
    this.map[449] = Input.CODE_MUTE; // F7

    this.map[427] = Input.CODE_CHANNEL_UP;
    this.map[428] = Input.CODE_CHANNEL_DOWN;

    this.map[16] = Input.CODE_SHIFT;

    // NUMBERS-------------------------
    this.map[48] = Input.CODE_DIGIT_0;
    this.map[49] = Input.CODE_DIGIT_1;
    this.map[50] = Input.CODE_DIGIT_2;
    this.map[51] = Input.CODE_DIGIT_3;
    this.map[52] = Input.CODE_DIGIT_4;
    this.map[53] = Input.CODE_DIGIT_5;
    this.map[54] = Input.CODE_DIGIT_6;
    this.map[55] = Input.CODE_DIGIT_7;
    this.map[56] = Input.CODE_DIGIT_8;
    this.map[57] = Input.CODE_DIGIT_9;

    // LETTERS ------------------------
    this.map[65] = Input.CODE_A;
    this.map[66] = Input.CODE_B;
    this.map[67] = Input.CODE_C;
    this.map[68] = Input.CODE_D;
    this.map[69] = Input.CODE_E;
    this.map[70] = Input.CODE_F;
    this.map[71] = Input.CODE_G;
    this.map[72] = Input.CODE_H;
    this.map[73] = Input.CODE_I;
    this.map[74] = Input.CODE_J;
    this.map[75] = Input.CODE_K;
    this.map[76] = Input.CODE_L;
    this.map[77] = Input.CODE_M;
    this.map[78] = Input.CODE_N;
    this.map[79] = Input.CODE_O;
    this.map[80] = Input.CODE_P;
    this.map[81] = Input.CODE_Q;
    this.map[82] = Input.CODE_R;
    this.map[83] = Input.CODE_S;
    this.map[84] = Input.CODE_T;
    this.map[85] = Input.CODE_U;
    this.map[86] = Input.CODE_V;
    this.map[87] = Input.CODE_W;
    this.map[88] = Input.CODE_X;
    this.map[89] = Input.CODE_Y;
    this.map[90] = Input.CODE_Z;

    this.map[219] = Input.CODE_BRACKET_O;    // (X)
    this.map[221] = Input.CODE_BRACKET_C;    // (Ъ)
    this.map[186] = Input.CODE_SEMI_COLON;   // (Ж)
    this.map[222] = Input.CODE_SINGLE_QUOTE; // (Э)
    this.map[188] = Input.CODE_COMMA;        // (Б)
    this.map[190] = Input.CODE_PERIOD;       // (Ю)
    this.map[191] = Input.CODE_DOT;          // (?)
  }

  initKeyName() {
    this.keyName = {
      CODE_DIGIT_1: '1',
      CODE_DIGIT_2: '2',
      CODE_DIGIT_3: '3',
      CODE_DIGIT_4: '4',
      CODE_DIGIT_5: '5',
      CODE_DIGIT_6: '6',
      CODE_DIGIT_7: '7',
      CODE_DIGIT_8: '8',
      CODE_DIGIT_9: '9',
      CODE_DIGIT_0: '0',
      CODE_PLAY: 'MediaPlay',
      CODE_PAUSE: 'MediaPause',
      CODE_PLAY_PAUSE: 'MediaPlayPause',
      CODE_STOP: 'MediaStop',
      CODE_REWIND: 'MediaRewind',
      CODE_FAST_FORVARD: 'MediaFastForward',
      CODE_RED: 'ColorF0Red',
      CODE_GREEN: 'ColorF1Green',
      CODE_YELLOW: 'ColorF2Yellow',
      CODE_BLUE: 'ColorF3Blue',
      CODE_CHANNEL_DOWN: 'ChannelDown',
      CODE_CHANNEL_UP: 'ChannelUp',
      CODE_VOLUME_DOWN: 'VolumeDown',
      CODE_VOLUME_UP: 'VolumeUp',
      CODE_MENU: 'Menu',
      CODE_INFO: 'Info',
      CODE_TOOLS: 'Tools',
    };
  }

  registerDefaultButton() {
    const names = this.keyName;
    const keys = [
      names.CODE_DIGIT_1,
      names.CODE_DIGIT_2,
      names.CODE_DIGIT_3,
      names.CODE_DIGIT_4,
      names.CODE_DIGIT_5,
      names.CODE_DIGIT_6,
      names.CODE_DIGIT_7,
      names.CODE_DIGIT_8,
      names.CODE_DIGIT_9,
      names.CODE_DIGIT_0,
      names.CODE_PLAY,
      names.CODE_PAUSE,
      names.CODE_PLAY_PAUSE,
      names.CODE_STOP,
      names.CODE_REWIND,
      names.CODE_FAST_FORVARD,
      names.CODE_RED,
      names.CODE_GREEN,
      names.CODE_YELLOW,
      names.CODE_BLUE,
      names.CODE_CHANNEL_DOWN,
      names.CODE_CHANNEL_UP,
      names.CODE_VOLUME_DOWN,
      names.CODE_VOLUME_UP,
      names.CODE_MENU,
      names.CODE_INFO,
      names.CODE_TOOLS,
    ];
    for (let i = 0; i < keys.length; i += 1) {
      // eslint-disable-next-line
      tizen.tvinputdevice.registerKey(keys[i]);
    }
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
