require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('reset', function () {
  this.timeout(300000);
  let driver;
  let body;
  let h;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    h = new Helper(driver);
    driver.get('http://persik.by/utils/delete-test.php');
  });

  after(function () {
    driver.quit();
  });

  it('01 - authorized user', async function () {
    await h.openApp();
    await h.loginToFree();

    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO SETTINGS AND DO RESET
    await h.goLeft(2);
    await h.goAndSearch('настройки', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('диагностика', [10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goRight(2);
    await h.enter();
    await driver.wait(until.elementLocated(By.className('w-prompt')), 1000);

    await h.goDown(3);
    await h.enter(4);
    await h.goDown();
    await h.enter();
    await driver.sleep(config.shortSleep);

    await driver.wait(until.elementLocated(By.className('notifications__item')), 15000);
    await driver.sleep(config.shortSleep);
    await h.goDown();
    await h.enter();

    await driver.wait(until.elementLocated(By.className('modal-progress')), 15000);
    assert(await h.getAuthToken()).isNull();

    await driver.sleep(config.defaultSleep);
  });

  it('02 - unauthorized user', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.defaultSleep);

    // GO TO SETTINGS AND DO RESET
    await h.goLeft(2);
    await h.goAndSearch('настройки', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goAndSearch('диагностика', [10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goRight(2);
    await h.enter();

    await driver.wait(until.elementLocated(By.className('notifications__item')), 15000);
    await driver.sleep(config.defaultSleep);

    await h.goDown();
    await h.enter();
    await driver.wait(until.elementLocated(By.className('modal-progress')), 15000);

    await driver.sleep(config.defaultSleep);
  });
});