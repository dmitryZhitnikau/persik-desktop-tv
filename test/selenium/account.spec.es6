require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('account', function () {
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

  it('01 - no subscriptions', async function () {
    await h.openApp();
    await h.loginToFree();
    await h.openApp();
    await h.closePopups();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO SUBSCRIPTIONS
    await h.goLeft(2);
    await h.goAndSearch('личный', [10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    // MAKE SURE THAT HAS NO SUBSCRIPTION
    var row = await driver.executeScript("return document.getElementsByClassName('p-account__subscr-table-row').length");
    assert(row).equalTo(0);

    await driver.sleep(config.defaultSleep);
  });

  it('02 - some subscriptions', async function () {
    await h.openApp();
    await h.loginToPartialPaid();
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO SUBSCRIPTIONS
    await h.goLeft(2);
    await h.goAndSearch('личный', [10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    // MAKE SURE THAT HAS SOME SUBSCRIPTIONS
    var row = await driver.executeScript("return document.getElementsByClassName('p-account__subscr-table-row').length");
    assert(row).greaterThan(0);

    await driver.sleep(config.defaultSleep);
  });

  it('03 - make purchase', async function () {
    await h.openApp();
    await h.loginToFree();

    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO PURCHASES
    await h.goLeft(2);
    await h.goAndSearch('личный', [10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    await h.goDown();
    await h.enter();

    // MAKE SURE THAT VISIBLE ONLY PACKAGE PART
    await driver.wait(until.elementLocated(By.className('p-account__purchases-block-package-item')), 10000);
    var item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-package-item').length");
    assert(item).equalTo(4);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-tariffs-option').length");
    assert(item).equalTo(0);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-payway-item').length");
    assert(item).equalTo(0);
    await driver.sleep(config.shortSleep);

    // CHOSE PACKAGE AND MAKE SURE: TARIFFS PERIOD BLOCK VISIBLE AND HAVE FOCUS
    await h.goRight();
    await h.enter();
    await driver.wait(until.elementLocated(By.className('p-account__purchases-block-tariffs-option')), 10000);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-package-item').length");
    assert(item).equalTo(4);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-tariffs-option').length");
    assert(item).greaterThan(0);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-payway-item').length");
    assert(item).equalTo(0);
    let element = await driver.findElement({css: ':focus'});
    let cl = await element.getAttribute('class');
    assert(cl).equalTo('p-account__purchases-block-tariffs-option');
    await driver.sleep(config.shortSleep);

    // CHOOSE PERIOD AND MAKE SURE: PAY WAY BLOCK VISIBLE AND HAVE FOCUS
    await h.enter();
    await driver.wait(until.elementLocated(By.className('p-account__purchases-block-payway-item')), 10000);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-package-item').length");
    assert(item).equalTo(4);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-tariffs-option').length");
    assert(item).greaterThan(0);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-payway-item').length");
    assert(item).greaterThan(0);
    element = await driver.findElement({css: ':focus'});
    cl = await element.getAttribute('class');
    assert(cl).equalTo('p-account__purchases-block-payway-item');
    await driver.sleep(config.shortSleep);

    // CHOOSE OTHER TARIFF
    await h.goUp(10);
    await h.goRight();
    await h.enter();
    h.waitClassIsNotLocated('p-account__purchases-block-payway-item', 10000);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-package-item').length");
    assert(item).equalTo(4);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-tariffs-option').length");
    assert(item).greaterThan(0);
    item = await driver.executeScript("return document.getElementsByClassName('p-account__purchases-block-payway-item').length");
    assert(item).equalTo(0);
    element = await driver.findElement({css: ':focus'});
    cl = await element.getAttribute('class');
    assert(cl).equalTo('p-account__purchases-block-tariffs-option');
    await driver.sleep(config.shortSleep);

    // CHOSE PERIOD AND SELECT ERIP OPTION, MAKE SURE THAT SHOW WINDOW FOR PAY
    await h.enter();
    await driver.wait(until.elementLocated(By.className('p-account__purchases-block-payway-item')), 10000);
    await h.goRight(2);
    await h.enter();
    await driver.wait(until.elementLocated(By.className('modal-simple')), 10000);

    await driver.sleep(config.defaultSleep);
  });
});