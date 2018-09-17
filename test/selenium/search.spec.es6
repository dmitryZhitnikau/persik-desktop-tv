require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('search', function () {
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

  it('01 - search', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO SEARCH PAGE
    await h.goLeft(2);
    await h.goAndSearch('Поиск', [-2, 10]);
    await h.enter();

    await driver.wait(until.elementLocated(By.className('p-search__input')), 1000);

    // ENTER "фут"
    await h.goDown(2);
    await h.enter();
    await h.goRight(2);
    await h.goUp();
    await h.enter();
    await h.goRight(3);
    await h.goDown(2);
    await h.enter();
    await h.goRight(6);
    await h.goDown(2);
    await h.enter();
    await driver.wait(until.elementLocated(By.className('b-channels')), 10000);
    // MAKE SURE THAT FOUND 3 BLOCKS
    await h.goDown(2);
    await driver.sleep(config.defaultSleep);
    let channels = await driver.findElements({css: '.b-channels'});
    assert(channels.length).equalTo(1);
    const videos = await driver.findElements({css: '.b-videos'});
    assert(videos.length).equalTo(2);

    // ENTER "ёёёёё"
    await h.goUp(7);
    await h.goRight(11);
    await h.enter(3);
    await h.goLeft(11);
    await h.enter(5);
    await h.goDown(4);
    await h.goRight();
    await h.enter();
    await driver.wait(until.elementLocated(By.className('p-search__message')), 10000);
    // MAKE SURE NO FOUND
    let elements = await driver.findElement({css: '.p-search__message'});
    assert((await elements.getText()).toLowerCase()).contains('ничего не найдено');

    await driver.sleep(config.defaultSleep);
  })

});
