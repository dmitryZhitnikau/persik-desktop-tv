const {By, until} = require('selenium-webdriver');
const moment = require('moment');
const fs = require('fs');
const fse = require('fs-extra');
const config = require('../config.es6');

class Helper {
  
  constructor(driver) {
    this.driver = driver;
    if (config.screenshots) {
      this.screenshotsDir = 'tv/test/selenium/ss/' + moment().format('YYYY-MM-DD_HH-mm-ss');
      fs.mkdirSync(this.screenshotsDir);
    }
  }
  
  keyDown(keyNum) {
    return this.driver.executeScript(`app.$km.trigger('keydown', ${keyNum});`);
  }
  keyUp(keyNum) {
    return this.driver.executeScript(`app.$km.trigger('keyup', ${keyNum});`);
  }
  async keyPress(keyNum) {
    await this.keyDown(keyNum);
    await this.keyUp(keyNum);
  }

  async keyLongPress(keyNum) {
    await this.keyDown(keyNum);
    await this.driver.sleep(2100);
    await this.keyUp(keyNum);
  }

  async pressBack() {
    await this.keyPress(27);
    await this.driver.sleep(config.keyInterval);
    await this.saveScreenshot();
  }

  async serie(keyNum, step = 1) {
    for (let i = 0; i < step; i++) {
      await this.keyPress(keyNum);
      await this.driver.sleep(config.keyInterval);
    }
    await this.saveScreenshot();
  }

  async goUp(step = 1) {
    await this.serie(38, step);
  }

  async goDown(step = 1) {
    await this.serie(40, step);
  }

  async goLeft(step = 1) {
    await this.serie(37, step);
  }

  async goRight(step = 1) {
    await this.serie(39, step);
  }

  async enter(step = 1) {
    await this.serie(13, step);
  }
  async longPressOk() {
    await this.keyLongPress(13);
    await this.saveScreenshot();
  }

  async getClassNameFocusElement() {
    let element = await this.driver.findElement({css: ':focus'});
    return element.getAttribute('class');
  }

  async openApp(waitForClass = 'main', path = '/') {
    await this.driver.get(`http://localhost:8080${path}`);
    await this.driver.sleep(config.shortSleep);
    await this.driver.wait(until.elementLocated(By.className('app-content')));
    await this.waitClassIsNotLocated('modal-progress', 120000);
    await this.driver.sleep(config.shortSleep);
    await this.closePopups();
    await this.driver.wait(until.elementLocated(By.className(waitForClass)));
    await this.driver.sleep(config.shortSleep);
    await this.saveScreenshot();
  }

  async suppressEpg() {
    await this.driver.get('http://localhost:8080/');
    await this.driver.executeScript("window.localStorage.setItem('last_update_epg', 1900000000)");
    await this.driver.sleep(config.shortSleep);
  }

  async deleteAuthToken() {
    await this.driver.executeScript("window.localStorage.removeItem('token')");
  }

  getAuthToken() {
    return this.driver.executeScript("return window.localStorage.getItem('token')");
  }

  async loginToFree() {
    await this.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      app.$backend.account.login('1234@persik.by', '12341234').then(function() {
        app.$backend.clear().then(callback);
      });
    });
    await this.driver.sleep(config.shortSleep);
  }

  async loginToPartialPaid() {
    await this.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      app.$backend.account.login('12345@persik.by', '1234512345').then(function() {
        app.$backend.clear().then(callback);
      });
    });
    await this.driver.sleep(config.shortSleep);
  }

  async loginToFullyPaid() {
    await this.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      app.$backend.account.login('test@persik.by', '123123').then(function() {
        app.$backend.clear().then(callback);
      });
    });
    await this.driver.sleep(config.shortSleep);
  }

  async resetPin() {
    await this.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      app.$backend.account.setPin('0000').then(callback);
    });
    await this.driver.sleep(config.shortSleep);
  }

  async waitClassIsNotLocated(className, timeout) {
    const startTime = moment().valueOf();
    while (true) {
      const elements = await this.driver.findElements(By.className(className));
      if (!elements.length) {
        await this.saveScreenshot();
        return;
      }
      await this.driver.sleep(250);
      if ((moment().valueOf() - startTime) > timeout) {
        throw new Error(`Helper.waitClassIsNotLocated: "${className}" still located after ${timeout} ms`);
      }
    }
  }

  async waitContentLoad(timeout = 10000) {
    await this.waitClassIsNotLocated('placeholder', timeout);
    await this.waitClassIsNotLocated('player__throbber', timeout);
    await this.driver.sleep(config.defaultSleep);
    await this.saveScreenshot();
  }

  async getTextFocusedElement(focusSelector) {
    let element = await this.driver.findElement({css: focusSelector});
    return element.getText();
  }

  async getAttributeFocusedElement(name) {
    let element = await this.driver.findElement({css:':focus'});
    return element.getAttribute(name);
  }
  /**
   * Поиск пункта по названию
   * Пример h.navigateMenu('Видео', [8, -10]) - вначале идем 8 шагов вниз, затем 10 шагов вверх
   *
   * @param name
   * @param steps Массив движений: <0 - вверх, >0 - вниз, 0 - пропуск
   * @param byAttribute Искать в этом атрибуте
   * @param focusSelector
   * @return {Promise<void>}
   */
  async goAndSearch(name, steps = [], byAttribute = null, focusSelector = ':focus') {
    const text = await this.getTextFocusedElement(focusSelector);
    if (text.toLowerCase().includes(name.toLowerCase())) {
      return;
    }
    for (let j = 0; j < steps.length; j += 1) {
      const step = steps[j];
      for (let i = 0; i < Math.abs(step); i += 1) {
        if (step > 0) {
          await this.goDown();
        } else {
          await this.goUp();
        }
        let text;
        if (byAttribute) {
          text = await this.getAttributeFocusedElement(byAttribute);
        } else {
          text = await this.getTextFocusedElement(focusSelector);
        }
        if (text.toLowerCase().includes(name.toLowerCase())) {
          return;
        }
      }
    }
  }

  async closePopups() {
    while (true) {
      const elements1 = await this.driver.findElements(By.className('modal-simple'));
      const elements2 = await this.driver.findElements(By.className('p-tutorial'));
      const elements = [...elements1, ...elements2];
      if (!elements.length) {
        return;
      }
      const element = elements.pop();
      if (element) {
        await this.pressBack();
        await this.driver.sleep(config.shortSleep);
      }
    }
  }

  async saveScreenshot() {
    if (config.screenshots) {
      const ss = await this.driver.takeScreenshot();
      fse.outputFile(this.screenshotsDir + '/' + moment().format('HH-mm-ss_SSS') + '.png', ss, 'base64');
    }
  }
}

module.exports = Helper;