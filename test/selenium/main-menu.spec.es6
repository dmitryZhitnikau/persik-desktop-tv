require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('menu navigation', function () {
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

  async function getFocusElementCoords() {
    let box = await driver.executeScript('return JSON.stringify(document.querySelector(":focus").getBoundingClientRect())');
    return JSON.parse(box);
  }

  it('01 - home', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await h.goUp();
    await h.enter();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await h.goAndSearch('главная', [10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    // GET FOCUS ELEMENT
    let fe = await h.getClassNameFocusElement();
    assert(fe).equalTo('e-channel');
    // MAKE SURE THAT WE HAVE 2 SECTIONS WITH MORE THAN 5 ELEMENTS
    let channels = await driver.findElements({css: '.e-channel'});
    assert(channels.length).greaterThan(5);
    var tvshows = await driver.findElements({css: '.e-video'});
    assert(tvshows.length).greaterThan(5);
    // GO TO 1pos DOWN AND 1pos RIGHT
    await h.goDown();
    await h.goRight();
    // TODO: check hover position and scroll content is work
    let hoverElem = await getFocusElementCoords();

    await driver.sleep(config.defaultSleep);
  });

  it('02 - tv live', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();

    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await h.goAndSearch('эфир', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();

    let cl = await h.getClassNameFocusElement();
    assert(cl).equalTo('e-live-channel');
    // GO TO 10 ELEMENT
    await h.goDown(9);
    let element = await driver.findElement({css: ':focus'});
    // TODO: make sure scrolling is work
    await getFocusElementCoords();
    let elems = await driver.findElements({css: '.e-live-channel'});
    // GO TO FILTER AND CHOSE OTHER SECTION
    await h.goLeft();
    await h.goDown(3);
    await h.enter();
    await driver.sleep(config.shortSleep);

    // MAKE SURE THAT NEW CONTENT WAS LOADED
    let elemsWithFilter = await driver.findElements({css: '.e-live-channel'});
    assert(elems.length).notEqualTo(elemsWithFilter.length);

    await driver.sleep(config.defaultSleep);
  });

  it('03 - tv navigator', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await h.goAndSearch('обзор', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();

    let cl = await h.getClassNameFocusElement();
    assert(cl).equalTo('e-channel main-tv-nav__channels-item');
    await driver.sleep(200);
    await h.goDown(4);
    let elems = await driver.findElements({css: '.e-channel'});
    // TODO: make shure that scroll is work

    // CHANGE FILTER
    await h.goLeft();
    await h.goDown(2);
    await h.enter();
    let elemsWithFilter = await driver.findElements({css: '.e-channel'});
    let isEqual = null;
    if (elems.length == elemsWithFilter.length) {
      isEqual = true;
    } else {
      isEqual = false;
    }
    assert(isEqual).equalTo(false);

    await driver.sleep(config.defaultSleep);
  });

  it('04 - tv epg', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await h.goAndSearch('программа передач', [-2, 10]);
    await h.enter();
    await driver.sleep(config.defaultSleep);

    let cl = await h.getClassNameFocusElement();
    assert(cl).contains('e-column-channel');
    // GO TO 25 ELEMENT
    await h.goDown(24);
    await driver.sleep(config.mediumSleep);
    // TODO: make shure that scroll is work

    // CHECK CHANGE DAY
    await h.goRight();
    await h.goUp(1);
    await h.enter();

    await h.waitClassIsNotLocated('e-column-tvshow__progress', config.mediumSleep);

    // CHANGE FILTER
    let channels = await driver.findElements({css: '.e-column-channel'});
    await h.goLeft(2);
    await h.goDown(6);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    let channelsWithFilter = await driver.findElements({css: '.e-column-channel'});
    assert(channelsWithFilter).notEqualTo(channels);

    cl = await h.getClassNameFocusElement();
    assert(cl).contains('e-column-channel');

    await driver.sleep(config.defaultSleep);
  });

  it('05 - video', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await h.goAndSearch('видео', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);


    let cl = await h.getClassNameFocusElement();
    assert(cl).equalTo('e-video');
    // GET e-video ELEMENTS COUNT, IT WILL BE 20
    await driver.sleep(config.defaultSleep);
    let videos = await driver.findElements({css: '.e-video'});
    assert(videos.length).equalTo(20);
    // LOAD +20 elements
    await h.goDown(5);
    await h.enter();
    await driver.sleep(config.shortSleep);
    videos = await driver.findElements({css: '.e-video'});
    assert(videos.length).equalTo(40);

    await driver.sleep(config.defaultSleep);
  });

});
