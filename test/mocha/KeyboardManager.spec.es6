import KeyboardManager from '../../src/persik/ui/KeyboardManager';
import Input from '../../src/persik/platform/Input';
import assert from 'assert';

describe('KeyboardManager', () => {

  const km = new KeyboardManager();
  km.longPressTime = 1000;

  it('test on method', () => {
    km.reset();
    let result = '';
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += e.keyCode;
    });

    km.trigger('keydown', 49);
    km.trigger('keydown', 48);

    km.trigger('keyup', 49);
    km.trigger('keyup', 48);

    assert.equal(result, Input.CODE_DIGIT_0);
  });

  it('test off method', () => {
    km.reset();
    let result = '';
    const f = function (e) {
      result += e.keyCode;
    };
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0, Input.CODE_DIGIT_1], f);

    km.trigger('keydown', 48);
    km.trigger('keydown', 49);
    km.trigger('keydown', 50);

    km.off(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_2], f);

    km.trigger('keydown', 48);

    km.off(KeyboardManager.KEY_DOWN, [], f);

    km.trigger('keydown', 48);
    km.trigger('keydown', 49);
    km.trigger('keydown', 50);

    assert.equal(result, '' + Input.CODE_DIGIT_0 + Input.CODE_DIGIT_1 + Input.CODE_DIGIT_0);
  });

  it('test stack order (LIFO)', () => {
    km.reset();
    let result = '';
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '1';
    }, 0);
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '2';
    }, 0);
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '3';
    }, 0);

    km.trigger('keydown', 48);

    assert.equal(result, '321');
  });

  it('test priority', () => {
    km.reset();
    let result = '';
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '1';
    }, 9);
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '0';
    }, 10);

    km.trigger('keydown', 48);

    assert.equal(result, '01');
  });

  it('test stopping', () => {
    km.reset();
    let result = '';
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '1';
    }, 1, true);
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '0';
    }, 0);

    km.trigger('keydown', 48);

    assert.equal(result, '1');
  });

  it('test locking', () => {
    km.reset();
    let result = '';
    const f1 = function (e) {
      result += `1:${e.keyCode} `;
    };
    const f2 = function (e) {
      result += `2:${e.keyCode} `;
    };
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], f1, 9);
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_1], f1, 9);

    const priority = km.lock();
    assert.equal(priority, 10);

    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], f2, priority, true);

    km.trigger('keydown', 48);
    km.trigger('keydown', 49);
    assert.equal(result, `2:${Input.CODE_DIGIT_0} `);

    result = '';
    km.unlock();
    km.trigger('keydown', 48);
    km.trigger('keydown', 49);
    assert.equal(result, `2:${Input.CODE_DIGIT_0} 1:${Input.CODE_DIGIT_1} `);

    km.off(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], f2);

    result = '';
    km.trigger('keydown', 48);
    km.trigger('keydown', 49);
    assert.equal(result, `1:${Input.CODE_DIGIT_0} 1:${Input.CODE_DIGIT_1} `);

  });

  it('test key press', (done) => {
    km.reset();
    let result = '';
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '1';
    }, 1);
    km.on(KeyboardManager.KEY_UP, [Input.CODE_DIGIT_0], (e) => {
      result += '2';
    }, 1);
    km.on(KeyboardManager.KEY_PRESS, [Input.CODE_DIGIT_0], (e) => {
      result += '3';
    }, 1);

    km.trigger('keydown', 48);
    assert.equal(result, '1');

    setTimeout(() => {
      km.trigger('keyup', 48);
      assert.equal(result, '123');
      done();
    }, 500);
  });

  it('test long press', (done) => {
    km.reset();
    let result = '';
    let progress = 0;
    km.on(KeyboardManager.KEY_DOWN, [Input.CODE_DIGIT_0], (e) => {
      result += '1';
    }, 1);
    km.on(KeyboardManager.KEY_PRESS, [Input.CODE_DIGIT_0], (e) => {
      result += '2';
    }, 1);
    km.on(KeyboardManager.KEY_LONG_PRESS, [Input.CODE_DIGIT_0], (e) => {
      result += '3';
    }, 1);

    km.on(KeyboardManager.KEY_LONG_PRESS_PROGRESS, [Input.CODE_DIGIT_0], (e) => {
      progress += e.progress;
    }, 1);

    km.trigger('keydown', 48);
    assert.equal(result, '1');

    km.trigger('keyup', 48);
    assert.equal(result, '12');

    km.trigger('keydown', 48);
    assert.equal(result, '121');

    setTimeout(() => {
      assert.equal(result, '1213');
      assert.ok(progress > 1);
      done();
    }, 1500);
  });

  it('test short press vs. long press', (done) => {
    km.reset();
    let result = '';
    km.on(KeyboardManager.KEY_PRESS, [Input.CODE_DIGIT_0], (e) => {
      result += '1';
    }, 1);

    km.trigger('keydown', 48);
    assert.equal(result, '');

    setTimeout(() => {
      km.trigger('keyup', 48);
      assert.equal(result, '1');
      done();
    }, 500);
  });


});
