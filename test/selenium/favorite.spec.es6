require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('favorites', function () {
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

  it('01 - add, check, delete', async function () {
    await h.openApp();
    await h.loginToFree();
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    await h.goLeft(2);
    await h.goAndSearch('избранное', [-2, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);

    var title = await driver.findElement({css: '.p-favorites__block-nocontent-button'});
    assert(await title.getText()).contains('На главную');
    await h.enter();
    await driver.sleep(config.shortSleep);

    var title = await driver.findElement({css: '.b-channels__title-text'});
    await driver.sleep(100);
    assert((await title.getText()).toLowerCase()).contains('сейчас в эфире');

    // GO TO TV REVIEW
    await h.goLeft(2);
    await h.goAndSearch('обзор', [-10, 10]);
    await h.enter();
    await driver.sleep(config.shortSleep);
    await h.waitContentLoad();

    // ADD CHANEL TO FAVORITE
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 1000);
    await h.goAndSearch('избранное', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // MAKE SURE THAT FOVORITE ICON VISIBLE
    var icons = await driver.findElements({css: '.main__content .fa-bookmark'});
    await driver.sleep(100);
    assert(icons.length).equalTo(1);

    // GO TO TVCOLUMN
    await h.goLeft(2);
    await h.goAndSearch('программа передач', [10, -10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    await h.goDown(8);
    // ADD CHANEL TO FAVORITE
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 1000);
    await h.goAndSearch('избранное', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);


    // ADD CURRENT TVSHOW TO FAVORITE
    await h.goRight(2);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 1000);
    await h.goAndSearch('избранное', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // MAKE SURE THAT FAVORITE ICON VISIBLE
    var icons = await driver.findElements({css: '.main__content .fa-bookmark'});
    await driver.sleep(100);
    assert(icons.length).equalTo(3);
    await driver.sleep(100);


    // ADD ARCHIVE TVSHOW TO FAVORITE
    await h.goLeft();
    await h.goUp();
    await h.enter();
    await driver.sleep(200);
    await h.goRight();
    await h.goUp(2);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 1000);

    await h.goAndSearch('избранное', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // MAKE SURE THAT FAVORITE ICON VISIBLE
    var icons = await driver.findElements({css: '.main__content .fa-bookmark'});
    await driver.sleep(100);
    assert(icons.length).equalTo(3);
    await driver.sleep(100);

    // ADD FUTURE TVSHOW TO FAVORITE
    await h.goLeft();
    await h.goDown(2);
    await h.enter();
    await driver.sleep(200);
    await h.goRight();
    await h.goDown(2);
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 1000);
    await h.goAndSearch('избранное', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // MAKE SURE THAT FAVORITE ICON VISIBLE
    var icons = await driver.findElements({css: '.main__content .fa-bookmark'});
    await driver.sleep(100);
    assert(icons.length).equalTo(3); // 3 on tv column page
    await driver.sleep(100);

    // GO TO VIDEO
    await h.goLeft(4);
    await h.goAndSearch('видео', [10, -10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);
    await h.goRight();

    // ADD VIDEO TO FAVORITE
    await h.longPressOk();
    await driver.wait(until.elementLocated(By.className('modal-simple__group')), 1000);
    await h.goAndSearch('избранное', [6], null, '.modal-simple__group-button_hover');
    await h.enter();
    await driver.sleep(config.shortSleep);

    // GO TO FAVORITE
    await h.goLeft(5);
    await h.goAndSearch('избранное', [-2, 10]);
    await h.enter();
    await driver.sleep(config.defaultSleep);

    // MAKE SURE THAT WE HAVE 2 CHANNELS AND 4 VIDEO ELEMENTS
    var channels = await driver.findElements({css: '.e-channel'});
    await driver.sleep(100);
    assert(channels.length).equalTo(2);
    var videos = await driver.findElements({css: '.e-video'});
    await driver.sleep(100);
    assert(videos.length).equalTo(4);

    // DELETE ALL FROM FAVORITE
    await h.goDown(3);
    await h.goRight(5);
    for (var i = 0; i < 4; i++) {
      await h.longPressOk();
      await h.goDown(2);
      await h.enter();
    }
    await h.goRight(5);
    for (var i = 0; i < 2; i++) {
      await h.longPressOk();
      await h.goDown();
      await h.enter();
    }
    // MAKE SURE THAT FAVORITE IS EMPTY
    var title = await driver.findElement({css: '.p-favorites__block-nocontent-button'});
    text = await title.getText();
    assert(text).contains('На главную');
    await driver.sleep(100);

    // GO TO TVREVIEW PAGE
    await h.goUp(3);
    await h.enter();

    // MAKE SURE THAT ELEMENTS HASN'T BOOKMARK ICON
    icons = await driver.findElements({css: '.main__content .fa-bookmark'});
    await driver.sleep(100);
    assert(icons.length).equalTo(0);

    // GO TO TVCOLUMN PAGE
    await h.goLeft(2);
    await h.goDown();
    await h.enter();

    // MAKE SURE THAT ELEMENTS HASN'T BOOKMARK ICON
    icons = await driver.findElements({css: '.main__content .fa-bookmark'});
    await driver.sleep(100);
    assert(icons.length).equalTo(0);

    await driver.sleep(config.defaultSleep);
  });

});
