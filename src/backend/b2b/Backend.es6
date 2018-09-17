//eslint-disable-next-line
import b2bApiModules from '@core/api_modules/b2b';
import PersikBackend from '../persik/Backend';

const defaultLogo = require('../../assets/vector-image/more-tv.svg');

class Backend extends PersikBackend {

  //eslint-disable-next-line
  get code() {
    return `b2b:${this.networkId}`;
  }

  async init() {
    super.init();
    this.account.getPin = () => '0000';

    let colorHover = '#EF5224';
    let colorGlow = '#749ff1';
    this.api.addModules(b2bApiModules);
    this.networkId = await this.getNetworkId();
    this.api.setGlobalParam('net', this.networkId);
    try {
      const config = await this.api.config.getConfig();
      console.log(config);
      if (config.logo) {
        this.netLogo = config.logo;
      }
      if (config.colors) {
        colorHover = config.colors.hover;
        colorGlow = config.colors.glow;
      }
    } catch (e) {
      console.error(e);
    }

    this.colorize(colorHover, colorGlow);
  }

  initApi() {
    super.initApi();
    this.api.setBaseUrl('http://n.persik.by:800/b2b/');
  }

  //eslint-disable-next-line
  get support() {
    return {
      auth: false,
      vod: false,
      search: false,
      favorite: false,
      featured: false,
      epg: true,
    };
  }

  async getNetworkId() {
    let networkId = this.storage.getOption('network_id');
    if (networkId === null) {
      const res = await this.api.app.getNetworkId();
      networkId = res.network_id;
      this.storage.setOption('network_id', networkId);
    }
    return networkId;
  }

  //eslint-disable-next-line
  get logo() {
    return this.netLogo ? this.netLogo : defaultLogo;
  }

  // eslint-disable-next-line
  colorize(colorHover, colorGlow) {
    const originColorHover = 'rgb(224, 95, 32)';
    const originColorGlow = 'rgb(163, 199, 24)';

    const colorProps = [
      'color',
      'backgroundColor',
      'outlineColor',
      'borderTopColor',
      'borderRightColor',
      'borderLeftColor',
      'borderColor',
      'borderBottomColor',
      'boxShadow',
    ];
    for (let i = 0; i < document.styleSheets.length; i += 1) {
      const styleSheet = document.styleSheets[i];
      for (let j = 0; j < styleSheet.cssRules.length; j += 1) {
        const rule = styleSheet.cssRules[j];
        if (rule.style) {
          colorProps.forEach((prop) => {
            if (rule.style[prop].includes(originColorHover)) {
              rule.style[prop] = rule.style[prop].replace(originColorHover, colorHover);
            }
            if (rule.style[prop].includes(originColorGlow)) {
              rule.style[prop] = rule.style[prop].replace(originColorGlow, colorGlow);
            }
          });
        }
      }
    }
  }

  async reset() {
    await super.reset();
    this.storage.deleteOption('network_id');
  }
}

export default Backend;
