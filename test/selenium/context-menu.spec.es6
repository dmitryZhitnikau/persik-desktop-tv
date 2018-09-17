require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('context menu', function () {
  this.timeout(300000);
  let driver;
  let body;
  let h;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    h = new Helper(driver);
    driver.get('http://persik.by/utils/delete-test.php');
    await h.openApp();
    await h.loginToFullyPaid();
  });

  after(function () {
    driver.quit();
  });

  async function keyLongPress(keyNum) {
    await driver.executeScript(`app.$km.trigger('keydown', ${keyNum});`);
    await driver.sleep(2100);
    await driver.executeScript(`app.$km.trigger('keyup', ${keyNum});`);
  }

  async function isHaveButton(title) {
    let context = await driver.executeScript("return document.getElementsByClassName('modal-simple__group-button')");
    let isHaveButton = false;
    for (let i = 0; i < context.length; i++) {
      const text = await context[i].getText();
      if (text == title) {
        isHaveButton = true;
      }
    }
    return isHaveButton;
  }

  it('01 - tv-navigator', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO TV REVIEW PAGE AND MAKE SURE THAT CONTEXT MENU IS WORK
    await h.goLeft(2);
    await h.goAndSearch('обзор', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 5000);

    let haveButton = await isHaveButton('Перейти к просмотру');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Закрыть');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Показать информацию');
    assert(haveButton).equalTo(false);

    await h.goAndSearch('закрыть', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);
  });

  it('02 - videos', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

      // GO TO VIDEO PAGE AND MAKE SURE THAT CONTEXT MENU IS WORK
    await h.goLeft(2);
    await h.goAndSearch('видео', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 5000);

    haveButton = await isHaveButton('Перейти к просмотру');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Закрыть');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Показать информацию');
    assert(haveButton).equalTo(true);

    await h.goAndSearch('закрыть', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);
  });

  it('03 - main', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO MAIN PAGE AND MAKE SURE THAT CONTEXT MENU IS WORK
    await h.goLeft(2);
    await h.goAndSearch('главная', [-1, 10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    await h.goDown(2);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 5000);

    haveButton = await isHaveButton('Перейти к просмотру');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Закрыть');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Показать информацию');
    assert(haveButton).equalTo(true);

    await h.goAndSearch('закрыть', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);
  });

  it('04 - tv-column', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);
    // GO TO TV COLUMN PAGE
    await h.goLeft(2);
    await h.goAndSearch('программа передач', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('ссылка', [100]);
    //auto select
    await driver.sleep(config.mediumSleep);

    // CALL CONTEXT FOR CURRENT TV SHOW, MAKE SURE THAT HAVE "Go to show" BUTTON
    await h.goRight(3);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 5000);

    haveButton = await isHaveButton('Перейти к просмотру');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Закрыть');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Показать информацию');
    assert(haveButton).equalTo(true);

    await h.goAndSearch('закрыть', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // CALL CONTEXT FOR PREVIOUS TV SHOW
    await h.goUp(2);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 5000);

    haveButton = await isHaveButton('Перейти к просмотру');
    assert(haveButton).equalTo(false);

    haveButton = await isHaveButton('Закрыть');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Показать информацию');
    assert(haveButton).equalTo(true);

    await h.goAndSearch('закрыть', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // CALL CONTEXT FOR FUTURE TV SHOW, MAKE SURE THAT NO "Go to show" BUTTON
    await h.goDown(4);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 5000);

    haveButton = await isHaveButton('Перейти к просмотру');
    assert(haveButton).equalTo(false);

    haveButton = await isHaveButton('Закрыть');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Показать информацию');
    assert(haveButton).equalTo(true);

    await h.goAndSearch('закрыть', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // GO TO TVSHOW WITH RECORD
    await h.goLeft(2);
    await h.goAndSearch('кино', [100]);
    //auto select
    await driver.sleep(config.defaultSleep);
    await h.goRight(2);
    await h.goUp(3);

    // CALL CONTEXT MENU
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 5000);

    haveButton = await isHaveButton('Перейти к просмотру');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Закрыть');
    assert(haveButton).equalTo(true);

    haveButton = await isHaveButton('Показать информацию');
    assert(haveButton).equalTo(true);

    await h.goAndSearch('закрыть', [6], null, '.modal-simple__group-button_hover');
    await h.enter();

    await driver.sleep(config.defaultSleep);
  });
});