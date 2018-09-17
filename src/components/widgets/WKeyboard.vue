<template>
    <div class="w-keyboard" data-xy-focusable tabindex="-1" @focus="focusHandler" @blur="blurHandler">
        <table v-on:mouseenter="buttonFocusOff()" v-on:mouseleave="buttonFocusOn()">
            <tr v-for="(row, indx) in keyboardLayout.layout" :key="indx">
                <td v-for="(button, index) in row"
                    :key="index"
                    :colspan=button.width
                    @click="buttonClickHandler(button)"
                    class="w-keyboard__button"
                    :class="{
                      'w-keyboard__button_empty': button.isEmpty,
                      'w-keyboard__button_hover': button === currentButton
                    }"
                    v-html="button.name"
                >
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

  import _ from 'lodash';
  import Input from '@/persik/platform/Input';
  import KeyboardManager from '@/persik/ui/KeyboardManager';

  class KeyboardButton {
    constructor(name = '', symbol = null, width = 1) {
      this.name = name;
      this.symbol = symbol !== null ? symbol : name;
      this.width = width;
    }

    get isEmpty() {
      return !this.name.length;
    }
  }

  class KeyboardLayout {
    /**
     *
     * @param {KeyboardButton[][]} layout
     * @param {string|null} type
     * @param {string|null} lang
     * @param {string|null} mode
     */
    constructor(layout, type = null, lang = null, mode = null) {
      this.layout = layout;
      this.type = type;
      this.lang = lang;
      this.mode = mode;

      this.index = [];
      layout.forEach((row, y) => {
        let x = 0;
        this.index[y] = [];
        row.forEach((button) => {
          for (let i = 0; i < button.width; i += 1) {
            this.index[y][x + i] = button;
          }
          x += button.width;
        });
      });
    }

    match(type = null, lang = null, mode = null) {
      let match = 0;
      if (this.type === type) {
        match += 4;
      }
      if (!this.lang || this.lang === lang) {
        match += 2;
      }
      if (this.mode === mode) {
        match += 1;
      }
      return match;
    }
  
    get size() {
      const y = this.layout.length;
      let maxX = 0;

      this.layout.forEach((row) => {
        let x = 0;
        row.forEach((button) => {
          x += button.width;
        });
        if (x > maxX) {
          maxX = x;
        }
      });
      return { x: maxX, y };
    }

    getButton(x, y) {
      let button = null;
      if (this.index[y] && this.index[y][x]) {
        button = this.index[y][x];
      }
      return button;
    }
  }

  function b(...params) {
    return new KeyboardButton(...params);
  }
  function separator(width) {
    return new KeyboardButton('', null, width);
  }

  export default {
    name: 'w-keyboard',
    props: {
      type: {
        default: 'text',
      },
      defaultLang: {
        default: 'en',
      },
    },
    data() {
      return {
        lang: 'en',
        mode: 'lower',
        cursor: { x: 0, y: 0 },
        seamless: { x: false, y: false },
        layouts: [
          new KeyboardLayout([
            [b('1'), b('2'), b('3')],
            [b('4'), b('5'), b('6')],
            [b('7'), b('8'), b('9')],
            [b('0', '0', 2), b('<i class="far fa-caret-square-left"></i>', 'bksp', 1)],
          ], 'int'),
          new KeyboardLayout([
            [b('1'), b('2'), b('3'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
            [b('4'), b('5'), b('6')],
            [b('7'), b('8'), b('9')],
            [b('0', '0', 3)],
          ], 'tel'),
          new KeyboardLayout([
            [b('1'), b('2'), b('3'), b('4'), b('5'), b('6'), b('7'), b('8'), b('9'), b('0'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
            [b('q'), b('w'), b('e'), b('r'), b('t'), b('y'), b('u'), b('i'), b('o'), b('p'), separator(1), b('RU', 'lang:ru', 2)],
            [b('a'), b('s'), b('d'), b('f'), b('g'), b('h'), b('j'), b('k'), b('l'), b('@'), separator(1), b('ABC', 'mode:upper', 2)],
            [b('z'), b('x'), b('c'), b('v'), b('b'), b('n'), b('m'), b('-'), b('_'), b('.'), separator(1), b('#+=', 'mode:symbols', 2)],
            [b('▭', ' ', 10), separator(1), b('OK', 'ok', 2)],
          ], 'text', 'en', 'lower'),
          new KeyboardLayout([
              [b('1'), b('2'), b('3'), b('4'), b('5'), b('6'), b('7'), b('8'), b('9'), b('0'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
              [b('Q'), b('W'), b('E'), b('R'), b('T'), b('Y'), b('U'), b('I'), b('O'), b('P'), separator(1), b('RU', 'lang:ru', 2)],
              [b('A'), b('S'), b('D'), b('F'), b('G'), b('H'), b('J'), b('K'), b('L'), b('@'), separator(1), b('abc', 'mode:lower', 2)],
              [b('Z'), b('X'), b('C'), b('V'), b('B'), b('N'), b('M'), b('-'), b('_'), b('.'), separator(1), b('#+=', 'mode:symbols', 2)],
              [b('▭', ' ', 10), separator(1), b('OK', 'ok', 2)],
          ], 'text', 'en', 'upper'),
          new KeyboardLayout([
            [b('ё'), b('1'), b('2'), b('3'), b('4'), b('5'), b('6'), b('7'), b('8'), b('9'), b('0'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
            [b('й'), b('ц'), b('у'), b('к'), b('е'), b('н'), b('г'), b('ш'), b('щ'), b('з'), b('х'), separator(1), b('EN', 'lang:en', 2)],
            [b('ф'), b('ы'), b('в'), b('а'), b('п'), b('р'), b('о'), b('л'), b('д'), b('ж'), b('э'), separator(1), b('АБВ', 'mode:upper', 2)],
            [b('я'), b('ч'), b('с'), b('м'), b('и'), b('т'), b('ь'), b('б'), b('ю'), b('ъ'), b('@'), separator(1), b('#+=', 'mode:symbols', 2)],
            [b('▭', ' ', 11), separator(1), b('OK', 'ok', 2)],
          ], 'text', 'ru', 'lower'),
          new KeyboardLayout([
            [b('Ё'), b('1'), b('2'), b('3'), b('4'), b('5'), b('6'), b('7'), b('8'), b('9'), b('0'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
            [b('Й'), b('Ц'), b('У'), b('К'), b('Е'), b('Н'), b('Г'), b('Ш'), b('Щ'), b('З'), b('Х'), separator(1), b('EN', 'lang:en', 2)],
            [b('Ф'), b('Ы'), b('В'), b('А'), b('П'), b('Р'), b('О'), b('Л'), b('Д'), b('Ж'), b('Э'), separator(1), b('абв', 'mode:lower', 2)],
            [b('Я'), b('Ч'), b('С'), b('М'), b('И'), b('Т'), b('Ь'), b('Б'), b('Ю'), b('Ъ'), b('@'), separator(1), b('#+=', 'mode:symbols', 2)],
            [b('▭', ' ', 11), separator(1), b('OK', 'ok', 2)],
          ], 'text', 'ru', 'upper'),
          new KeyboardLayout([
            [b('<'), b(','), b('$'), b('-'), b('_'), b('&'), b('!'), b('#'), b('%'), b('|'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
            [b('>'), b('@'), b('~'), b(':'), b('^'), b('['), b('?'), b('*'), b('='), b('+'), separator(1), b('abc', 'mode:lower', 2)],
            [b('{'), b('}'), b('.'), b('\\', '\\', 1), b('\''), b('('), b(';'), b('/'), b(']'), b(')')],
            [b('▭', ' ', 10), separator(1), b('OK', 'ok', 2)],
          ], 'text', null, 'symbols'),

          new KeyboardLayout([
            [b('1'), b('2'), b('3'), b('4'), b('5'), b('6'), b('7'), b('8'), b('9'), b('0'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
            [b('q'), b('w'), b('e'), b('r'), b('t'), b('y'), b('u'), b('i'), b('o'), b('p'), separator(1), b('#+=', 'mode:symbols', 2)],
            [b('a'), b('s'), b('d'), b('f'), b('g'), b('h'), b('j'), b('k'), b('l'), b('@'), separator(1)],
            [b('z'), b('x'), b('c'), b('v'), b('b'), b('n'), b('m'), b('-'), b('_'), b('.')],
            [b('@mail.ru', '@mail.ru', 2), b('@gmail.com', '@gmail.com', 3), b('@yandex.ru', '@yandex.ru', 3), b('@persik.by', '@persik.by', 2), separator(1), b('OK', 'ok', 2)],
          ], 'email', null, 'lower'),
          new KeyboardLayout([
            [b('<'), b(','), b('$'), b('-'), b('_'), b('&'), b('!'), b('#'), b('%'), b('|'), separator(1), b('abc', 'mode:lower', 2)],
            [b('>'), b('@'), b('~'), b(':'), b('^'), b('['), b('?'), b('*'), b('='), b('+'), separator(1), b('<i class="far fa-caret-square-left"></i>', 'bksp', 2)],
            [b('{'), b('}'), b('.'), b('\\', '\\', 1), b('\''), b('('), b(';'), b('/'), b(']'), b(')'), separator(1), b('OK', 'ok', 2)],
          ], 'email', null, 'symbols'),
        ],
      };
    },
    created() {
      this.lang = this.defaultLang;
      this.keyboard = [
        [0, 0, 0, 0], [1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5],
        [6, 6, 6, 6], [7, 7, 7, 7], [8, 8, 8, 8], [9, 9, 9, 9], ['ф', 'a', 'Ф', 'A'],
        ['и', 'b', 'И', 'B'], ['с', 'c', 'С', 'C'], ['в', 'd', 'В', 'D'], ['у', 'e', 'У', 'E'],
        ['а', 'f', 'А', 'F'], ['п', 'g', 'П', 'G'], ['р', 'h', 'Р', 'H'], ['ш', 'i', 'Ш', 'I'],
        ['о', 'j', 'О', 'J'], ['л', 'k', 'Л', 'K'], ['д', 'l', 'Д', 'L'], ['ь', 'm', 'Ь', 'M'],
        ['т', 'n', 'Т', 'N'], ['щ', 'o', 'Щ', 'O'], ['з', 'p', 'З', 'P'], ['й', 'q', 'Й', 'Q'],
        ['к', 'r', 'К', 'R'], ['ы', 's', 'Ы', 'S'], ['е', 't', 'Е', 'T'], ['г', 'u', 'Г', 'U'],
        ['м', 'v', 'М', 'V'], ['ц', 'w', 'Ц', 'W'], ['ч', 'x', 'Ч', 'X'], ['н', 'y', 'Н', 'Y'],
        ['я', 'z', 'Я', 'Z'], ['х', '[', 'Х', '{'], ['ъ', ']', 'Ъ', '}'], ['ж', ';', 'Ж', ':'],
        ['э', '"', 'Э', '"'], ['б', ',', 'Б', '<'], ['ю', '.', 'Ю', '>'], ['.', '/', ',', '?'],
      ];
    },
    computed: {
      keyboardLayout() {
        // подбор наилучшей клавиатурной раскладки
        let bestMatch = 0;
        let bestKeyboardLayout = null;
        this.layouts.forEach((keyboardLayout) => {
          const currentMatch = keyboardLayout.match(this.type, this.lang, this.mode);
          if (currentMatch > bestMatch) {
            bestKeyboardLayout = keyboardLayout;
            bestMatch = currentMatch;
          }
        });
        return bestKeyboardLayout;
      },

      currentButton() {
        this.normalizeCursor();
        return this.keyboardLayout.getButton(this.cursor.x, this.cursor.y);
      },
    },
    methods: {
      buttonFocusOff() {
        this.cursor = { x: null, y: null };
      },
      buttonFocusOn() {
        this.cursor = { x: 0, y: 0 };
      },
      focusHandler() {
        this.subscribe();
        this.$root.$emit('focus', this.$el);
      },
      blurHandler() {
        this.unsubscribe();
      },
      buttonClickHandler(button) {
        if (button.isEmpty) {
          return;
        }
        let res = button.symbol.match(/^mode:(.*)$/);
        if (res) {
          this.mode = res[1];
        } else {
          res = button.symbol.match(/^lang:(.*)$/);
          if (res) {
            this.lang = res[1];
          } else {
            this.$emit('keypress', button.symbol);
          }
        }
      },

      subscribe() {
        const priority = this.$km.lock();
        this.$km.on(
          KeyboardManager.KEY_DOWN,
          [
            ...Input.CODES_DPAD, Input.CODE_ENTER,
            ...Input.CODES_DIGITS,
            ...Input.CODES_LETTERS,
            Input.CODE_BACK, Input.CODE_SHIFT,
          ],
          this.handleKeyEvent, priority, true,
        );
      },
      unsubscribe() {
        this.$km.off(
          KeyboardManager.KEY_DOWN,
          [
            ...Input.CODES_DPAD, Input.CODE_ENTER,
            ...Input.CODES_DIGITS,
            ...Input.CODES_LETTERS,
            Input.CODE_BACK, Input.CODE_SHIFT,
          ],
          this.handleKeyEvent,
        );
        this.$km.unlock();
      },

      normalizeCursor() {
        const size = this.keyboardLayout.size;
        if (this.cursor.x < 0) {
          this.$emit('reachBound', 'left');
          if (this.seamless.x) {
            this.cursor.x += size.x;
          } else {
            this.cursor.x = 0;
          }
        }
        if (this.cursor.x >= size.x) {
          this.$emit('reachBound', 'right');
          if (this.seamless.x) {
            this.cursor.x -= size.x;
          } else {
            this.cursor.x = size.x - 1;
          }
        }

        if (this.cursor.y < 0) {
          this.$emit('reachBound', 'top');
          if (this.seamless.y) {
            this.cursor.y += size.y;
          } else {
            this.cursor.y = 0;
          }
        }
        if (this.cursor.y >= size.y) {
          this.$emit('reachBound', 'bottom');
          if (this.seamless.y) {
            this.cursor.y -= size.y;
          } else {
            this.cursor.y = size.y - 1;
          }
        }
      },
  
      handleKeyEvent(event) {
        const keyCode = event.keyCode;
        if (keyCode === Input.CODE_ENTER) {
          this.buttonClickHandler(this.currentButton);
        } else {
          let loops = 15;
          const startButton = this.currentButton;
          const startCursor = _.cloneDeep(this.cursor);
          while (loops) {
            const prevCursor = _.cloneDeep(this.cursor);
            switch (keyCode) {
              case Input.CODE_DOWN:
                this.cursor.y += 1;
                break;
              case Input.CODE_UP:
                this.cursor.y -= 1;
                break;
              case Input.CODE_LEFT:
                this.cursor.x -= 1;
                break;
              case Input.CODE_RIGHT:
                this.cursor.x += 1;
                break;
              case Input.CODE_BACK:
                this.$emit('keypress', 'bksp');
                break;
              case Input.CODE_SHIFT:
                if (this.mode === 'lower') {
                  this.mode = 'upper';
                } else this.mode = 'lower';
                break;
              default:
                if (typeof keyCode !== 'undefined') {
                  if (this.mode === 'lower') {
                    if (this.lang === 'ru') {
                      this.$emit('keypress', this.keyboard[keyCode - 48][0]);
                    } else {
                      this.$emit('keypress', this.keyboard[keyCode - 48][1]);
                    }
                  } else if (this.lang === 'ru') {
                    this.$emit('keypress', this.keyboard[keyCode - 48][2]);
                  } else {
                    this.$emit('keypress', this.keyboard[keyCode - 48][3]);
                  }
                }
                break;
            }
            if (this.currentButton
              && startButton !== this.currentButton
              && !this.currentButton.isEmpty) {
              break;
            }
            if (this.cursor.x === prevCursor.x && this.cursor.y === prevCursor.y) {
              break;
            }
            loops -= 1;
          }
          if (this.currentButton === null) {
            this.cursor = startCursor;
          }
        }
      },
      checkCursor() {
        if (!this.currentButton || this.currentButton.isEmpty) {
          // обход ближайших ячеек по спирали пока не найдем непустую
          const path = [
            { axis: 'x', delta: -1 },
            { axis: 'y', delta: -1 },
            { axis: 'x', delta: 1 },
            { axis: 'x', delta: 1 },
            { axis: 'y', delta: 1 },
            { axis: 'y', delta: 1 },
            { axis: 'x', delta: -1 },
            { axis: 'x', delta: -1 },
            { axis: 'x', delta: -1 },
            { axis: 'y', delta: -1 },
            { axis: 'y', delta: -1 },
            { axis: 'y', delta: -1 },
          ];
          while (path.length && (!this.currentButton || this.currentButton.isEmpty)) {
            const movement = path.shift();
            this.cursor[movement.axis] += movement.delta;
          }
        }
      },
    },
    watch: {
      lang() {
        this.checkCursor();
      },
      mode() {
        this.checkCursor();
      },
      defaultLang(value) {
        this.lang = value;
      },
    },
  };
</script>

<style scoped lang="scss">
  .w-keyboard {
//    outline: none;
    position: relative;

    &__button {
      margin: 0;
      padding: 0;
      height: 3rem;
      width: 3rem;
      border-radius: 1.5rem;

      color: $color-text-simple;
      text-align: center;
      // background-color: red;

      transition: 0.1s;
      cursor: pointer;

      &_empty {
        width: 1.5rem;
        background-color: transparent;
      }
      &:not(&_empty):hover {
        background-color: $color-hover;
      }
    }
    &[data-xy-focus] {
      & .w-keyboard__button_hover {
        background-color: $color-hover;
      }
      outline: none;
    }
  }
</style>
