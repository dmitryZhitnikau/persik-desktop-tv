import _ from 'lodash';
import EventDispatcher from '@danehansen/event-dispatcher';


class ConnectionError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ConnectionError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class RequestError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'RequestError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


class Api extends EventDispatcher {

  constructor() {
    super();
    this.baseUrl = 'https://api.persik.tv/';
    this.timeout = 20000;
    this.repeatCounter = 5;
    this.globalParams = {};
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  setGlobalParam(key, value) {
    this.globalParams[key] = value;
  }
  removeGlobalParam(key) {
    delete this.globalParams[key];
  }
  resetGlobalParams() {
    this.globalParams = {};
  }

  static jsonParseSafe(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  async exec(method, version, module, action, params, repeat = false) {
    let repeatCounter = repeat ? this.repeatCounter : 1;
    let result;
    let error;
    let timeInterval = 5000;
    // this.eventProcessor.dispatchEvent('startLoading', module, action);

    while (repeatCounter > 0) {
      repeatCounter -= 1;
      timeInterval *= 2;
      try {
        // eslint-disable-next-line
        result = await this.execOnce(method, version, module, action, params);
        return result;
      } catch (e) {
        if (e.name === 'ConnectionError') {
          if (repeatCounter > 0) {
            // eslint-disable-next-line
            await Api.timeDelay(timeInterval);
          }
          error = e;
        } else {
          throw e;
        }
      }
    }
    // this.eventProcessor.dispatchEvent('stopLoading', module, action);
    throw error;
  }

  static timeDelay(timeInterval) {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(); }, timeInterval);
    });
  }

  execOnce(method, version, module, action, params) {
    return new Promise((resolve, reject) => {
      const fullUrl = this.baseUrl.concat('v', version, '/', module, '/', action);
      const myParams = _.merge({}, this.globalParams, params);
      const body = this.constructor.serialize(myParams);
      // eslint-disable-next-line
      const xhr = new XMLHttpRequest();

      xhr.timeout = this.timeout;

      if (method === 'POST') {
        xhr.open(method, fullUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
      } else if (method === 'GET' || method === 'DELETE') {
        xhr.open(method, fullUrl.concat('?', body), true);
        xhr.send();
      }

      xhr.ontimeout = () => {
        reject(new ConnectionError('Запрос на сервер не был выполнен по истечении заданного времени'));
      };
      xhr.onabort = () => {
        reject(new ConnectionError('Запрос на сервер был сброшен'));
      };
      xhr.onerror = () => {
        reject(new ConnectionError('Ошибка соединения с сервером'));
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
          // this.eventProcessor.dispatchEvent('stopLoading', module, action);
          resolve(Api.jsonParseSafe(xhr.responseText));
        } else if (xhr.status >= 400 && xhr.status < 500) {
          const data = Api.jsonParseSafe(xhr.responseText);
          reject(new RequestError((data && data.error) ? data.error : 'Неизвестная ошибка API', xhr.status));
        } else if (xhr.status >= 500 && xhr.status < 527) {
          const data = Api.jsonParseSafe(xhr.responseText);
          reject(new ConnectionError((data && data.error) ? data.error : 'Неизвестная ошибка API', xhr.status));
        }
      };
    });
  }

  static serialize(obj, prefix) {
    const str = [];
    _.forIn(obj, (value, key) => {
      if (_.hasIn(obj, key)) {
        const k = prefix ? `${prefix}[${key}]` : key;
        const v = obj[key];
        if (_.isArray(v)) {
          for (let i = 0; i < v.length; i += 1) {
            const keyArray = `${k}[]`;
            str.push(`${encodeURIComponent(keyArray)}=${encodeURIComponent(v[i])}`);
          }
        } else if (typeof v === 'object') {
          str.push(this.serialize(v, k));
        } else {
          str.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
        }
      }
    });
    return str.join("&"); // eslint-disable-line
  }

  addModule(moduleName, methods) {
    this[moduleName] = {};
    _.forOwn(methods, (method, methodName) => {
      this[moduleName][methodName] = method.bind(this);
    });
  }

  addModules(modulesObject) {
    _.forOwn(modulesObject, (methods, moduleName) => {
      this.addModule(moduleName, methods);
    });
  }
}

export default Api;
