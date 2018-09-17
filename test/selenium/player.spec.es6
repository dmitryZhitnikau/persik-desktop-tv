require('chromedriver');
const assert = require('./libs/assert');
const Helper = require('./libs/helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const config = require('./config.es6');

describe('player', function () {
  this.timeout(300000);
  let driver;
  let body;
  let h;

  function hmsToSeconds(timeStr) {
    const [h, m, s] = timeStr.split(':').map((x) => parseInt(x, 10));
    return h * 3600 + m * 60 + s;
  }

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

  async function oneTwoStep() {
    await h.enter(); // 1
    for (let i = 0; i < 2; i++) {
      await h.goRight();
      await h.enter();
    }
  }

  it('01 - ways to open live player', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO TVREVIEW PAGE
    await h.goLeft(2);
    await h.goAndSearch('обзор', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    // OPEN-CLOSE CHANNEL AND MAKE SURE THAT PLAYER WAS OPENED-CLOSED
    await h.enter();
    await driver.sleep(config.defaultSleep);
    await driver.wait(until.elementLocated(By.id('player_window')), 10000);
    await driver.sleep(config.shortSleep);
    await h.pressBack();
    await driver.sleep(config.defaultSleep);
    await driver.wait(until.elementLocated(By.className('main-tv-nav')), 5000);
    await driver.sleep(config.defaultSleep);

    // GO TO TVLIVE PAGE
    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('эфир', [-2, 10]);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    await h.waitContentLoad();
    await driver.sleep(config.defaultSleep);

    // OPEN-CLOSE CHANNEL AND MAKE SURE THAT PLAYER WAS OPENED-CLOSED
    await h.enter();
    await driver.sleep(config.defaultSleep);
    await driver.wait(until.elementLocated(By.id('player_window')), 10000);
    await driver.sleep(config.shortSleep);
    await h.pressBack();
    await driver.sleep(config.defaultSleep);
    await driver.wait(until.elementLocated(By.className('p-live')), 5000);
    await driver.sleep(config.shortSleep);

    // GO TO TVCOLUMN PAGE
    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('программа передач', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();

    // MAKE SURE THAT VIDEO PLAYED IN THUMBNAIL WINDOW
    await driver.sleep(config.defaultSleep);
    player = await driver.executeScript('return JSON.stringify(document.getElementById("player_window").getBoundingClientRect())');
    let box = JSON.parse(player);
    assert(box.width).lessThan(config.shortSleep);
    assert(box.height).lessThan(300);

    // OPEN CHANNEL AND MAKE SURE THAT PLAYER LIVE WAS OPENED
    await h.goRight(2);
    await h.enter();
    await driver.wait(until.elementLocated(By.className('player-live')), 2000);
    await driver.sleep(config.defaultSleep);
    player = await driver.executeScript('return JSON.stringify(document.getElementById("player_window").getBoundingClientRect())');
    box = JSON.parse(player);
    assert(box.width).greaterThan(config.shortSleep);
    assert(box.height).greaterThan(300);

    // GO BACK AND MAKE SURE THAT VIDEO PLAYED IN THUMBNAIL WINDOW
    await h.pressBack();
    await driver.wait(until.elementLocated(By.className('tv-column')), 2000);
    await driver.sleep(config.mediumSleep);
    player = await driver.executeScript('return JSON.stringify(document.getElementById("player_window").getBoundingClientRect())');
    box = JSON.parse(player);
    assert(box.width).lessThan(config.shortSleep);
    assert(box.height).lessThan(300);

    // OPEN CHANNEL BY CONTEXT MENU
    await h.longPressOk();
    await h.enter();
    await driver.wait(until.elementLocated(By.className('player-live')), 2000);
    await driver.sleep(config.defaultSleep);
    player = await driver.executeScript('return JSON.stringify(document.getElementById("player_window").getBoundingClientRect())');
    box = JSON.parse(player);
    assert(box.width).greaterThan(config.shortSleep);
    assert(box.height).greaterThan(300);

    await driver.sleep(config.defaultSleep);
  });

  it('02 - ways to open catchup player', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO VIDEO PAGE
    await h.goLeft(2);
    await h.goAndSearch('видео', [10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    // OPEN VIDEO DETAIL PAGE, PLAY VIDEO AND MAKE SURE THAT PLAYER WAS OPENED
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    await h.enter();
    await driver.sleep(config.shortSleep);

    var tvshow = await driver.executeScript("return document.getElementById('player_window').getAttribute('src')");
    assert(tvshow.length).greaterThan(0);

    // BACK TO VIDEO DETAIL PAGE
    await h.pressBack();
    await driver.sleep(config.shortSleep);
    var tvshows = await driver.findElements({css: '.detail-video'});
    assert(tvshows.length).greaterThan(0);

    // BACK TO VIDEO PAGE
    await h.pressBack();
    await driver.sleep(config.shortSleep);
    var tvshows = await driver.findElements({css: '.p-video'});
    assert(tvshows.length).greaterThan(0);

    // OPEN VIDEO BY CONTEXT MENU
    await h.longPressOk();
    await h.goDown();
    await h.enter();
    await driver.sleep(config.shortSleep);
    var tvshows = await driver.findElements({css: '.player'});
    assert(tvshows.length).greaterThan(0);

    // BACK TO VIDEO PAGE
    await h.pressBack();
    await driver.sleep(config.shortSleep);
    var tvshows = await driver.findElements({css: '.p-video'});
    assert(tvshows.length).greaterThan(0);

    await driver.sleep(config.defaultSleep);
  });

  it('03 - ways to open VoD player', async function () {
    await h.openApp('main', '/test#/main/video?type=video&id=701027');
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // PLAY VIDEO AND MAKE SURE THAT PLAYER WAS OPENED
    await h.enter();
    await driver.wait(until.elementLocated(By.className('player')), 3000);
    var tvshows = await driver.findElements(By.className('player'));
    assert(tvshows.length).greaterThan(0);

    // BACK TO VIDEO DETAIL PAGE
    await h.pressBack();
    await driver.sleep(config.defaultSleep);
    tvshows = await driver.findElements({css: '.detail-video'});
    assert(tvshows.length).greaterThan(0);

    // GO TO SECOND SEASON AND PLAY
    await h.goDown();
    await h.goRight();
    await h.enter();
    await h.goDown();
    await h.enter();
    await driver.sleep(1500);
    tvshows = await driver.findElements({css: '.player'});
    assert(tvshows.length).greaterThan(0);

    // BACK TO VIDEO DETAIL PAGE
    await h.pressBack();
    await driver.sleep(config.shortSleep);
    tvshows = await driver.findElements({css: '.detail-video'});
    assert(tvshows.length).greaterThan(0);

    await driver.sleep(config.defaultSleep);
  });

  it('04 - player live features', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO TVREVIEW PAGE
    await h.goLeft(2);
    await h.goAndSearch('обзор', [-2, 10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);

    // OPEN CHANNEL AND MAKE SURE THAT PLAYER WAS OPENED
    await h.enter();
    await driver.wait(until.elementLocated(By.className('player-live')), 2000);

    // GO UP AND MAKE SURE THAT NOTHING HAPPENED
    let startSrc = await driver.executeScript("return document.getElementById('player_window').getAttribute('src')");
    await h.goUp();
    await driver.sleep(config.defaultSleep);
    let nextSrc = await driver.executeScript("return document.getElementById('player_window').getAttribute('src')");
    assert(startSrc).equalTo(nextSrc);

    // MAKE SURE THAT NAVIGATION BAR WAS HIDE
    await driver.sleep(12000);
    let navigator = await driver.executeScript('return JSON.stringify(document.querySelector(".player-live__guide").getBoundingClientRect())');
    var navPosStop = JSON.parse(navigator);
    assert(navPosStop.height).equalTo(0);

    // GO DOWN AND MAKE SURE THAT CHANNEL CHANGE
    await h.goDown();
    await driver.sleep(config.defaultSleep);
    nextSrc = await driver.executeScript("return document.getElementById('player_window').getAttribute('src')");
    assert(startSrc === nextSrc).equalTo(false);

    // GO RIGHT AND MAKE SURE THAT SHOWS WAS MOVED
    let element = await driver.findElement({css: '.guide-tvshow_current .guide-tvshow__time'});
    let time1 = await element.getText();
    await h.goRight();
    await driver.sleep(config.defaultSleep);
    element = await driver.findElement({css: '.guide-tvshow_current .guide-tvshow__time'});
    let time2 = await element.getText();
    assert(time1).notEqualTo(time2);

    await driver.sleep(config.mediumSleep);

    // GO LEFT AND MAKE SURE THAT SHOWS WAS MOVED
    element = await driver.findElement({css: '.guide-tvshow_current .guide-tvshow__time'});
    time1 = await element.getText();
    await h.goLeft();
    await driver.sleep(config.defaultSleep);
    element = await driver.findElement({css: '.guide-tvshow_current .guide-tvshow__time'});
    time2 = await element.getText();
    assert(time1).notEqualTo(time2);

    await driver.sleep(config.defaultSleep);
  });

  it('05 - catchup player: seek, pause, end', async function () {
    await h.openApp();
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // GO TO VIDEO PAGE
    await h.goLeft(2);
    await driver.sleep(config.defaultSleep);
    await h.goAndSearch('видео', [10]);
    await h.enter();
    await h.waitContentLoad();
    await driver.sleep(config.shortSleep);


    // PLAY VIDEO
    await driver.wait(until.elementLocated(By.className('p-video')), 2000);
    await driver.wait(until.elementLocated(By.className('e-video')), 2000);
    await driver.sleep(config.shortSleep);
    await h.enter();

    await driver.wait(until.elementLocated(By.className('detail-video')), 2000);
    await driver.sleep(config.shortSleep);
    await h.enter();
    await h.waitContentLoad(20000);

    // GET VIDEO DURATION AND MAKE SURE THAT IT MORE THAN 30 min
    let duration = await driver.executeScript("return document.querySelector('.player-timeline__label-duration').innerText");
    assert(hmsToSeconds(duration)).greaterThan(30 * 60);

    // GO RIGHT 30 time AND PLAY, MAKE SURE THAT PLAY TIME ABOUT 5 minutes
    await driver.sleep(config.shortSleep);
    await h.goRight(30);
    await driver.sleep(200);
    await h.enter();
    await driver.sleep(config.shortSleep);
    await h.waitContentLoad(20000);
    let curTime = await driver.executeScript("return document.querySelector('.player-timeline__label-current').innerText");
    assert(hmsToSeconds(curTime)).closeTo(5 * 60, 60);

    // GO LEFT 17 time AND PLAY, MAKE SURE THAT PLAY TIME ABOUT 3 minutes
    await driver.sleep(config.shortSleep);
    await h.goLeft(17);
    await driver.sleep(200);
    await h.enter();
    await driver.sleep(config.shortSleep);
    await h.waitContentLoad(20000);
    curTime = await driver.executeScript("return document.querySelector('.player-timeline__label-current').innerText");
    assert(hmsToSeconds(curTime)).closeTo(3 * 60, 60);

    // PRESS ENTER AND MAKE SURE THAT PLAYER WAS PAUSED
    await driver.sleep(200);
    await h.enter();
    await driver.sleep(config.shortSleep);
    let pause = await driver.findElements({css: '.fa-pause-circle'});
    assert(pause.length).equalTo(1);
    await driver.sleep(200);

    // PRESS PLAY AND MAKE SURE THAT PLAYER WAS PLAYED
    await h.enter();
    await driver.sleep(config.shortSleep);
    pause = await driver.findElements({css: '.fa-pause-circle'});
    assert(pause.length).equalTo(0);

    // GO TO THE END OF VIDEO AND LITTLE BIT BACK, MAKE SURE THAT PLAYER WAS CLOSED
    await driver.sleep(config.shortSleep);
    await h.goRight(170);
    await driver.sleep(250);
    await h.goLeft();
    await h.enter();
    await driver.sleep(config.mediumSleep);
    await driver.wait(until.elementLocated(By.className('detail-video')), 20000);

    await driver.sleep(config.defaultSleep);
  });

  it('06 - video player: seek, pause, end', async function () {
    await h.openApp('main', '/test#/main/video?type=video&id=701027');
    await h.waitContentLoad();
    await h.closePopups();
    await driver.sleep(config.shortSleep);

    // PLAY VIDEO AND MAKE SURE THAT PLAYER WAS OPENED
    await h.enter();
    await driver.wait(until.elementLocated(By.className('player')), 10000);

    // GET VIDEO DURATION AND MAKE SURE THAT IT MORE THAN 30 min
    await h.waitContentLoad(20000);
    await driver.sleep(config.defaultSleep);
    let duration = await driver.executeScript("return document.querySelector('.player-timeline__label-duration').innerText");
    assert(hmsToSeconds(duration)).greaterThan(30 * 60);

    // GO RIGHT 30 time AND PLAY, MAKE SURE THAT PLAY TIME ABOUT 5 minutes
    await driver.sleep(config.defaultSleep);
    await h.goRight(30);
    await driver.sleep(200);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    await h.waitContentLoad(20000);
    let curTime = await driver.executeScript("return document.querySelector('.player-timeline__label-current').innerText");
    assert(hmsToSeconds(curTime)).closeTo(5 * 60, 30);

    // GO LEFT 17 time AND PLAY, MAKE SURE THAT PLAY TIME ABOUT 3 minutes
    await driver.sleep(config.defaultSleep);
    await h.goLeft(17);
    await driver.sleep(200);
    await h.enter();
    await driver.sleep(config.defaultSleep);
    await h.waitContentLoad(20000);
    await driver.sleep(config.defaultSleep);
    curTime = await driver.executeScript("return document.querySelector('.player-timeline__label-current').innerText");
    assert(hmsToSeconds(curTime)).closeTo(3 * 60, 30);

    // PRESS ENTER AND MAKE SURE THAT PLAYER WAS PAUSED
    await driver.sleep(200);
    await h.enter();
    await driver.sleep(config.shortSleep);
    let pause = await driver.findElements({css: '.fa-pause-circle'});
    assert(pause.length).equalTo(1);
    await driver.sleep(200);

    // PRESS PLAY AND MAKE SURE THAT PLAYER WAS PLAYED
    await h.enter();
    await driver.sleep(config.shortSleep);
    pause = await driver.findElements({css: '.fa-pause-circle'});
    assert(pause.length).equalTo(0);

    // GO TO THE END OF VIDEO AND LITTLE BIT BACK, MAKE SURE THAT PLAYER WAS CLOSED
    await driver.sleep(config.shortSleep);
    await h.goRight(175);
    await driver.sleep(250);
    await h.goLeft();
    await h.enter();
    await driver.wait(until.elementLocated(By.className('detail-video')), 20000);

    await driver.sleep(config.defaultSleep);
  });
});