require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('video', function () {
  this.timeout(300000);
  let driver;
  let body;
  let h;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    h = new Helper(driver, 50);
    await h.suppressEpg();
    await driver.sleep(config.shortSleep);
  });

  after(function () {
    driver.quit();
  });

  it('01 - catchup video page', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO VIDEO PAGE
    await h.goLeft(2);
    await h.goAndSearch('Видео', [-2, 10]);
    await h.enter();

    // GO TO VIDEO INFO AND MAKE SURE THAT DATA WAS LOADED
    await driver.sleep(config.mediumSleep);
    await h.enter();
    await driver.sleep(config.mediumSleep);

    const infos = await driver.findElements({css: '.detail-video__header-details-list-item'});
    await driver.sleep(100);
    assert(infos.length).greaterThan(2); // actors and directors

    const buttons = await driver.findElements({css: '.detail-video__header-buttons li'});
    await driver.sleep(100);
    assert(buttons.length).greaterThan(0); // buttons

    const infoTable = await driver.findElements({css: '.detail-video__info-more-line_right'});
    await driver.sleep(100);
    assert(infoTable.length).equalTo(8); // info block

    await driver.sleep(config.defaultSleep);
  });


  it('02 - tv series and vod page', async function () {
    await h.openApp('main' , '/test#/main/video?type=video&id=701027');
    await h.waitContentLoad();
    await h.closePopups();

    const infos = await driver.findElements({css: '.detail-video__header-details-list-item'});
    await driver.sleep(100);
    assert(infos.length).greaterThan(2); // actors and directors

    const buttons = await driver.findElements({css: '.detail-video__header-buttons li'});
    await driver.sleep(100);
    assert(buttons.length).greaterThan(0); // buttons

    const infoTable = await driver.findElements({css: '.detail-video__info-more-line_right'});
    await driver.sleep(100);
    assert(infoTable.length).greaterThan(5); // info block
    await driver.sleep(config.shortSleep);
    // GO TO SEASONS
    let firstSeasonText = await driver.executeScript("return document.getElementsByClassName('e-video__title-text')[0].innerText");
    await h.goDown();
    await h.goRight();
    await h.enter();

    await driver.sleep(config.shortSleep);
    let secondSeasonText = await driver.executeScript("return document.getElementsByClassName('e-video__title-text')[0].innerText");
    assert(firstSeasonText).notEqualTo(secondSeasonText);

    await h.goUp();
    // var button = await driver.findElement({ css: ':focus' });
    // TODO: get button hover*/

    await driver.sleep(config.defaultSleep);
  });


});