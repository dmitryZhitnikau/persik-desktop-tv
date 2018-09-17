/* eslint-disable class-methods-use-this,no-unused-vars */

import EventDispatcher from '@danehansen/event-dispatcher';

/**
 * @interface
 */
class IVideo extends EventDispatcher {

  static get ABORT() {
    return 'ABORT';
  }

  static get HAVE_NOTHING() {
    return 'HAVE_NOTHING';
  }

  static get HAVE_METADATA() {
    return 'HAVE_METADATA';
  }

  static get HAVE_CURRENT_DATA() {
    return 'HAVE_CURRENT_DATA';
  }

  static get HAVE_FUTURE_DATA() {
    return 'HAVE_FUTURE_DATA';
  }

  static get HAVE_ENOUGH_DATA() {
    return 'HAVE_ENOUGH_DATA';
  }

  static get READY_STATE() {
    return 'READY_STATE';
  }

  static get PLAY_ENDED() {
    return 'PLAY_ENDED';
  }

  static get START_LOADING() {
    return 'START_LOADING';
  }
    // Воспроизведение после паузы
  static get PLAYED() {
    return 'PLAYED';
  }

  static get PAUSED() {
    return 'PAUSED';
  }
    // Стартовое воспроизведение воспроизведение
  static get PLAY_START() {
    return 'PLAY_START';
  }

  static get LOAD_PROGRESS() {
    return 'LOAD_PROGRESS';
  }

  static get START_SEEK() {
    return 'START_SEEK';
  }

  static get STOP_SEEK() {
    return 'STOP_SEEK';
  }

  static get VOLUME_CHANGE() {
    return 'VOLUME_CHANGE';
  }

  static get STOPPED() {
    return 'STOPPED';
  }

  static get TIME_UPDATE() {
    return 'TIME_UPDATE';
  }

  static get WAITING() {
    return 'WAITING';
  }

  static get PLAY_ERROR() {
    return 'PLAY_ERROR';
  }

  /**
   * Open video and play, params: url
   * @param {String} url
   */
  play(url) {
    throw new Error('IVideo method not implemented (see details in stack trace)');
  }

  resume() {
    throw new Error('IVideo method not implemented (see details in stack trace)');
  } // method, resume playback video, no params

  stop() {
    throw new Error('IVideo method not implemented (see details in stack trace)');
  } // method, stop video, no params

  pause() {
    throw new Error('IVideo method not implemented (see details in stack trace)');
  } // method, pause video, no params

  close() {
    throw new Error('IVideo method not implemented (see details in stack trace)');
  } // method, stop and close video streaming, no params

  /**
   * Cancels the pending method close
   */
  open() {
    throw new Error('IVideo method not implemented (see details in stack trace)');
  }

  setViewPort() {
    throw new Error('IVideo method not implemented (see details in stack trace)');
  } // property, for set window's player size

  set seek(value) {
    throw new Error('IVideo setter not implemented (see details in stack trace)');
  } // property, set concrete time in video, params: time

  get volume() {
    throw new Error('IVideo getter not implemented (see details in stack trace)');
  } // property, get/set volume, for set option need parameter from 0 to 1
  set volume(value) {
    throw new Error('IVideo setter not implemented (see details in stack trace)');
  } // property, get/set volume, for set option need parameter from 0 to 1

  get currentTime() {
    throw new Error('IVideo getter not implemented (see details in stack trace)');
  } // property, get current time from video track

  get duration() {
    throw new Error('IVideo getter not implemented (see details in stack trace)');
  } // property, get video duration

  get buffered() {
    throw new Error('IVideo getter not implemented (see details in stack trace)');
  } // property, get buffered time

  get played() {
    throw new Error('IVideo getter not implemented (see details in stack trace)');
  } // property, get true if video played

  get state() {
    throw new Error('IVideo getter not implemented (see details in stack trace)');
  } // property, return player state

  /**
   * Текущий проигрываемый url
   */
  get url() {
    throw new Error('IVideo getter not implemented (see details in stack trace)');
  }

}

export default IVideo;
