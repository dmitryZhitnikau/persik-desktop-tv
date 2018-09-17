require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('auth', function () {
  this.timeout(300000);
  let driver;
  let body;
  let h;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    h = new Helper(driver);
    driver.get('http://persik.by/utils/delete-test.php');
    await h.suppressEpg();
  });

  after(async function () {
    driver.quit();
  });

  async function deleteWrongData(body) {
    await h.goUp(5);
    await h.goRight(10);
    await h.enter(12);
  }

  async function pressOK(body) {
    await h.goDown(6);
    await h.goRight(6);
    await h.enter();
  }

  it('01 - registration', async function () {
    await h.openApp();
    h.deleteAuthToken();

    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO LOGIN PAGE
    await h.goLeft(2);
    await h.goAndSearch('вход', [-10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    var title = await driver.findElement({css: '.p-login__input-text'});
    await driver.sleep(config.shortSleep);
    assert(await title.getText()).contains('Введите Ваш e-mail');
    // ENTER TRUE LOGIN
    await h.goRight(2);
    await h.goDown(2);
    await h.enter(); // letter 'd'
    await h.goUp();
    await h.enter(); // letter 'e'
    await h.goRight(6);
    await h.goDown();
    await h.enter(); // letter 'l'
    await h.goDown(2);
    await h.enter(); // text '@persik.by'
    await driver.sleep(config.shortSleep);
    title = await driver.findElement({css: '.p-login__input-text'});
    await driver.sleep(config.shortSleep);
    assert(await title.getText()).contains('Придумайте пароль');
    // ENTER NOT VALID PASSWORD
    await h.goUp(2);
    await driver.sleep(200);
    await h.enter(3); // letter 'l' * 3
    await pressOK(body);
    await driver.sleep(200);

    title = await driver.findElement({css: '.p-login__notification'});
    assert(await title.getText()).contains('Пароль должен содержать не менее 6 символов');
    // ENTER VALID PASSWORD
    await h.goUp(3);
    await h.enter(5); // letter 'l' * 5
    await pressOK(body);
    await driver.sleep(200);
    title = await driver.findElement({css: '.p-login__input-text'});
    assert(await title.getText()).contains('Повторите пароль');
    // CONFIRM PASSWORD - ENTER WRONG PASSWORD
    await h.goUp(3);
    await h.enter(5); // letter 'l' * 5
    await pressOK(body);
    title = await driver.findElement({css: '.p-login__notification'});
    await driver.sleep(config.shortSleep);
    assert(await title.getText()).contains('Пароли не совпадают');
    // CONFIRM PASSWORD - ENTER TRUE PASWORD
    await h.goUp(3);
    await h.enter(3); // letter 'l' * 3
    await driver.sleep(config.mediumSleep);
    var token = await h.getAuthToken();
    assert(token.length).greaterThan(10);

    await driver.sleep(config.defaultSleep);
  });

  it('02 - logout', async function () {
    await h.openApp();
    await h.loginToFree();
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO ACCOUNT PAGE
    await h.goLeft(2);
    await h.goAndSearch('личный', [10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);


    // GO TO ACCOUNT BOOKMARK AND PRESS LOGOUT
    await h.goDown(3);
    await h.enter();
    await h.goRight();
    await h.enter();

    // ENTER PIN
    await h.goDown(3);
    await h.enter(4);
    await h.goDown();
    await h.enter();
    await driver.wait(until.elementLocated(By.className('notify__message')), 5000);
    const notify = await driver.findElement(By.className('notify__message'));
    assert((await notify.getText()).toLowerCase()).contains('вы вышли из аккаунта');

    await driver.sleep(config.defaultSleep);
  });

  it('03 - authorization', async function () {
    await h.openApp();
    let token = await h.getAuthToken();
    if (token && token.length) {
      await h.deleteAuthToken();
      await h.openApp();
    }
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO LOGIN PAGE
    await h.goLeft(2);
    await h.goAndSearch('вход', [-10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    // ENTER WRONG EMAIL
    await h.enter(2);
    await pressOK(body);
    await driver.sleep(config.shortSleep);
    title = await driver.findElement({css: '.p-login__notification'});
    await driver.sleep(config.shortSleep);
    assert(await title.getText()).contains('Проверьте правильность ввода e-mail');
    await driver.sleep(config.shortSleep);
    // DELETE WRONG EMAIL
    await deleteWrongData(body);
    // ENTER TRUE EMAIL
    await h.goLeft(8);
    await h.goDown(2);
    await h.enter();
    await h.goUp();
    await h.enter();
    await h.goRight(6);
    await h.goDown();
    await h.enter();
    await h.goDown(2);
    await h.enter();
    await driver.sleep(config.shortSleep);
    title = await driver.findElement({css: '.p-login__input-text'});
    assert(await title.getText()).contains('Введите Ваш пароль');
    // ENTER WRONG PASSWORD
    await h.goUp(2);
    await h.enter(2);
    await pressOK(body);
    await driver.sleep(config.shortSleep);
    title = await driver.findElement({css: '.p-login__notification'});
    assert(await title.getText()).contains('Неверный пароль');
    // DELETE WRONG PASSWORD
    await deleteWrongData(body);
    // ENTER TRUE PASSWORD
    await h.goLeft(2);
    await h.goDown(2);
    await h.enter(8);
    await pressOK(body);
    await driver.sleep(config.mediumSleep);
    token = await h.getAuthToken();
    assert(token.length).greaterThan(10);

    await driver.sleep(config.defaultSleep);
  });
});