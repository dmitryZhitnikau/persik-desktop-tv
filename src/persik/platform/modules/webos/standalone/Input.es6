import InputGeneric from '@/persik/platform/modules/generic/InputGeneric';

class Input extends InputGeneric {
  constructor() {
    super();

    this.map[37] = Input.CODE_LEFT;
    this.map[38] = Input.CODE_UP;
    this.map[39] = Input.CODE_RIGHT;
    this.map[40] = Input.CODE_DOWN;

    this.map[19] = Input.CODE_PAUSE; // pause

    this.map[461] = Input.CODE_BACK; // esc
    this.map[13] = Input.CODE_ENTER;
    this.map[457] = Input.CODE_INFO; // i
    this.map[1003] = Input.CODE_MENU; // `

    this.map[403] = Input.CODE_RED; // F1
    this.map[404] = Input.CODE_GREEN; // F2
    this.map[405] = Input.CODE_YELLOW; // F3
    this.map[406] = Input.CODE_BLUE; // F4

    this.map[33] = Input.CODE_PAGE_UP;
    this.map[34] = Input.CODE_PAGE_DOWN;

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

      /**
       * @override
       */
  eventToKeyCode(e) {
    e.preventDefault();
    return super.eventToKeyCode(e);
  }

}

export default Input;
