import compareVersions from 'compare-versions';
import DeviceInfo from '@/persik/platform/DeviceInfo';

const deviceInfo = DeviceInfo.getInstance();

export default {
  init() {

  },

  reset() {
    this.storage.deleteOption('volume');
    this.storage.deleteOption('parent_control');
    this.storage.deleteOption('developer_mode');
    this.storage.deleteOption('skip_tutorial');
    this.storage.deleteOption('video_use_hls');
  },

  clear() {
  },

  getVolume() {
    const DEFAULT_VOLUME = 25;
    return this.storage.getOption('volume', DEFAULT_VOLUME);
  },

  setVolume(value) {
    this.storage.setOption('volume', parseInt(value, 10));
  },

  setParentControl(value) {
    return this.storage.setOption('parent_control', !!value);
  },

  getParentControl() {
    if (!this.authorized) {
      return false;
    }
    return this.storage.getOption('parent_control', true);
  },

  getDeveloperMode() {
    return this.storage.getOption('developer_mode', false);
  },

  setDeveloperMode(value) {
    return this.storage.setOption('developer_mode', !!value);
  },

  setSkipTutorial(value) {
    this.storage.setOption('skip_tutorial', !!value);
  },

  getSkipTutorial() {
    return this.storage.getOption('skip_tutorial', false);
  },

  setVideoUseHls(value) {
    this.storage.setOption('video_use_hls', !!value);
  },

  getVideoUseHls() {
    let defaultValue = true;
    if (deviceInfo.platform === 'android') {
      if (compareVersions(deviceInfo.version, '5.0.0') < 0) {
        defaultValue = false;
      }
    }
    return this.storage.getOption('video_use_hls', defaultValue);
  },

  hasVideoSettings() {
    return deviceInfo.platform === 'android' || deviceInfo.platform === 'pc';
  },

};
