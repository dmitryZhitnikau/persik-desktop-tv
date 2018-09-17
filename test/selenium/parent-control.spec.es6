require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('parent control', function () {
  this.timeout(300000);
  let driver;
  let body;
  let h;

  async function oneTwoStep() {
    await h.enter(); // 1
    for (let i = 0; i < 2; i++) {
      await h.goRight();
      await h.enter();
    }
  }

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    h = new Helper(driver);
    driver.get('http://persik.by/utils/delete-test.php');
    // await h.suppressEpg();
    await h.openApp();
    await h.loginToFullyPaid();
  });

  after(async function () {
    driver.quit();
  });

  async function gotoAdultChannel() {
    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('обзор', [10, -10]);
    await h.enter();
    await h.waitContentLoad();
    await h.goLeft();
    await h.goAndSearch('для взрослых', [20]);
    await h.enter();
    await driver.sleep(config.shortSleep);
    await h.enter();
  }

  it('01 - open channel', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO PORN CHANNEL
    await gotoAdultChannel();

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // ENTER WRONG PIN AND MAKE SURE THAT WINDOW SHOW ALERT
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElement({css: '.w-prompt__box-message'});
    assert(await ctrl.getText()).contains('Неверный');
    await driver.sleep(config.defaultSleep);

    // ENTER TRUE PIN AND MAKE SURE THAT WINDOW CLOSE AND OPEN PLAYER
    await h.goUp();
    await h.enter(4);
    await h.goDown();
    await h.enter();
    await driver.sleep(config.defaultSleep);
    var player = await driver.findElements({id: 'player_window'});
    assert(player.length).equalTo(1);

    await driver.sleep(config.defaultSleep);
  });

  it('02 - reset and logout', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO SETTINGS
    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('настройки', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);
    await h.goRight(2);
    await h.enter();

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // ENTER WRONG PIN AND MAKE SURE THAT WINDOW SHOW ALERT
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElement({css: '.w-prompt__box-message'});
    assert(await ctrl.getText()).contains('Неверный');
    await driver.sleep(config.defaultSleep);

    // GO BACK BUTTON AND MAKE SURE THAT WINDOW WAS CLOSED
    await h.goDown();
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);
    await driver.sleep(config.defaultSleep);

    // GO TO ACCOUNT PAGE
    await h.goLeft(3);
    await h.goAndSearch('личный', [2, -10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);
    await h.goAndSearch('аккаунт', [10]);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    await h.goRight();
    await h.enter();

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // ENTER WRONG PIN AND MAKE SURE THAT WINDOW SHOW ALERT
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElement({css: '.w-prompt__box-message'});
    assert(await ctrl.getText()).contains('Неверный');
    await driver.sleep(config.defaultSleep);

    // GO BACK BUTTON AND MAKE SURE THAT WINDOW WAS CLOSED
    await h.goDown();
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);

    await driver.sleep(config.defaultSleep);
  });

  it('03 - change pin by pin', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('настройки', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('родитель', [10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goRight();
    await h.goAndSearch('сменить пин', [10]);
    await h.enter();

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // ENTER WRONG PIN AND MAKE SURE THAT WINDOW SHOW ALERT
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElement({css: '.w-prompt__box-message'});
    assert(await ctrl.getText()).contains('Неверный');
    await driver.sleep(config.defaultSleep);

    // ENTER TRUE PIN
    await h.goUp();
    await h.enter(4);
    await h.goDown();
    await h.enter();
    await driver.sleep(config.defaultSleep);

    // ENTER NEW PIN (1111) AND MAKE SURE THAT WINDOW WAS CLOSED
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);
    await driver.sleep(config.defaultSleep);

    // GO TO PORN CHANNEL AND TEST NEW PIN
    await gotoAdultChannel();

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // ENTER NEW PIN AND MAKE SURE THAT WINDOW WAS CLOSED
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);

    await driver.sleep(config.defaultSleep);
  });

  it('04 - change pin by password', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('настройки', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('родитель', [10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goRight();
    await h.goAndSearch('сменить пин', [10]);
    await h.enter();

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // GO TO FORGOT BUTTON
    await h.goDown(6);
    await h.enter();

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW WITH PASSWORD
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // ENTER WRONG PASSWORD AND MAKE SURE THAT WINDOW SHOW ALERT
    //type 1111
    await h.enter(4);
    await h.goDown(5);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElement({css: '.w-prompt__box-message'});
    assert(await ctrl.getText()).contains('Неверный пароль');
    await driver.sleep(config.defaultSleep);

    // ENTER TRUE PASSWORD
    //clear typed 1111
    await h.goUp(1);
    await h.goRight(1);
    await h.goUp(4);
    await h.enter(4);

    await h.goLeft(10);
    await oneTwoStep();
    await h.goLeft(2);
    await oneTwoStep();
    await h.goDown(5);
    await h.enter();
    await driver.sleep(config.defaultSleep);

    // ENTER NEW PIN (2222) AND MAKE SURE THAT WINDOW WAS CLOSED
    await h.goRight();
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.shortSleep);
    ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);
    await driver.sleep(config.shortSleep);

    // GO TO PORN CHANNEL AND TEST NEW PIN
    await gotoAdultChannel();
    await driver.sleep(config.defaultSleep);

    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    await driver.sleep(config.defaultSleep);
    // ENTER NEW PIN AND MAKE SURE THAT WINDOW WAS CLOSED
    await h.goRight();
    await h.enter(4);
    await h.goDown(4);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);

    await driver.sleep(config.defaultSleep);
  });

  it('05 - toggle on/off', async function () {
    await h.openApp();
    await h.resetPin();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('настройки', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('родитель', [10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goRight();
    await h.goAndSearch('выключить родительский', [10]);
    await h.enter();


    // MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // ENTER TRUE PIN AND MAKE SURE THAT SWITCH OFF POSITION
    await h.goDown(3);
    await h.enter(4);
    await h.goDown();
    await h.enter();
    await driver.sleep(config.defaultSleep);
    let ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);
    await driver.sleep(config.defaultSleep);

    ctrl = await driver.findElements({css: '.p-settings__page-parent-ctrl-item-label-switch_checked'});
    assert(ctrl.length).equalTo(0);

    // GO TO PORN CHANNEL AND MAKE SURE THAT IT WAS OPENED WITHOUT PIN REQUEST
    await gotoAdultChannel();

    await driver.sleep(config.defaultSleep);
    ctrl = await driver.findElements({css: '.w-prompt__box-message'});
    assert(ctrl.length).equalTo(0);
    await h.pressBack();
    await driver.sleep(config.defaultSleep);

    // GO TO SETTINGS PAGE AND SWITCH ON PARENT CONTROL
    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('настройки', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('родитель', [10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goRight();
    await h.goAndSearch('включить родительский', [10]);
    await h.enter();


    // GO TO PORN CHANNEL AND MAKE SURE THAT OPEN PARENT CONTROL WINDOW
    await gotoAdultChannel();
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    await driver.sleep(config.defaultSleep);
  });

  it('06 - do not ask in player', async function () {
    await h.openApp();
    await h.resetPin();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO CHANNEL BEFORE PORN CHANNEL
    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('эфир', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('18+', [100], 'age-rating');
    await h.goUp();
    await h.enter();
    await driver.sleep(config.defaultSleep);
    await h.waitClassIsNotLocated('placeholder', 5000);

    // GO DOWN TO PORN CHANNEL AND MAKE SURE THAT PIN WAS REQUEST
    await h.goDown();
    await driver.wait(until.elementLocated(By.className('w-prompt')), 5000);

    // PRESS DONT ASK BUTTON AND GO UP TO NORMAL CHANNEL
    await h.goDown(8);
    await h.enter();
    await h.goUp();
    await driver.sleep(config.mediumSleep);

    // GO DOWN TO PORN CHANNEL AND MAKE SURE THAT PIN WAS NOT REQUEST
    await h.goDown();
    await driver.sleep(config.mediumSleep);
    var ctrl = await driver.findElements({css: '.w-prompt'});
    assert(ctrl.length).equalTo(0);

    await driver.sleep(config.defaultSleep);
  });
});
