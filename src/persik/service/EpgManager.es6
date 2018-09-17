import EventDispatcher from '@danehansen/event-dispatcher';
import moment from 'moment';
import Backend from '@/backend/Backend';
// eslint-disable-next-line
import Storage from '@core/Storage';
// eslint-disable-next-line
import Epg from '@core/Epg';
import EpgReader from '@/persik/service/epg/EpgReader';
import Metric from '@/persik/platform/Metric';

let instance;

class EpgManager extends EventDispatcher {

  static get ONE_UNIX_DAY() {
    return 86400;
  }

  static get PROGRESS_CHANGE() {
    return 'PROGRESS_CHANGE';
  }

  static get COMPLETE() {
    return 'COMPLETE';
  }

  constructor() {
    super();
    if (instance) {
      throw new Error('The instance of EpgManager must be obtained by EpgManager.getInstance() method');
    }
    instance = this;
    this.epg = Epg.getInstance();
    this.epgReader = EpgReader.getInstance();
    this.backend = Backend.getInstance();
    this.storage = Storage.getInstance();

    this.UPDATE_INTERVAL = 0.5;// days
    this.dayRangeFrom = 3;
    this.dayRangeTo = 8;

    window.epgm = this;
  }

  static getInstance() {
    if (!instance) {
      instance = new EpgManager();
    }
    return instance;
  }

  resetLoaded() {
    this.loaded = {
      tvshow: 0.0,
      newTvshow: 0.0,
      video: 0.0,
      person: 0.0,
      deletion: 0.0,
    };
  }

  get percents() {
    return Math.round(
      (this.loaded.tvshow * 45)
      + (this.loaded.newTvshow * 10)
      + (this.loaded.video * 20)
      + (this.loaded.person * 15)
      + (this.loaded.deletion * 10));
  }

  get validRange() {
    const currentUnixDate = Math.round((new Date().getTime() / 1000));
    return {
      from: currentUnixDate - (EpgManager.ONE_UNIX_DAY * this.dayRangeFrom),
      to: currentUnixDate + (EpgManager.ONE_UNIX_DAY * this.dayRangeTo),
    };
  }

  async openDb() {
    await this.epg.openDb('EPG');
    await this.epgReader.openDb('EPG');
  }

  async init() {
    await this.openDb();
    setInterval(this.lazyUpdate.bind(this), 3600000);
    return this.lazyUpdate();
  }

  async lazyUpdate() {
    if (this.isUpdateNeeded()) {
      const mode = this.isFirstUpdate() ? 'init' : 'update';
      const startTime = moment().valueOf();
      await this.updateEpg();
      const loadTime = moment().valueOf() - startTime;
      Metric.getInstance().timing('epg', mode, loadTime);
    }
    return null;
  }

  isUpdateNeeded() {
    const date = Math.round((new Date().getTime() / 1000));
    const lastUpdate = this.storage.getOption('last_update_epg');
    return lastUpdate === undefined
      || (date - lastUpdate) > (this.UPDATE_INTERVAL * EpgManager.ONE_UNIX_DAY);
  }

  isFirstUpdate() {
    return !this.storage.getOption('last_update_epg');
  }

  async updateEpg() {
    this.resetLoaded();
    this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

    await this.fetchTvshows();
    this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

    await this.fetchVideos();
    this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

    await this.fetchPersons();
    this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

    this.epg.deleteFullData('tvshow', this.validRange.from);
    this.loaded.deletion = 0.33;
    this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);
    this.epg.deleteFullData('video');
    this.loaded.deletion = 0.66;
    this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);
    this.epg.deleteFullData('person');
    this.loaded.deletion = 1;
    this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

    this.storage.setOption('last_update_epg', moment().unix());
    this.dispatchEvent(EpgManager.COMPLETE);
  }

  async fetchTvshows() {
    const channelsIds = await this.getChannelsIds();
    const lastTs = await this.epg.getLastTs('tvshow');
    await this.fetchTvshowsForChannels(channelsIds, lastTs, 'tvshow');

    // проверка новых каналов, если база уже не пустая
    if (lastTs > 0) {
      const emptyChannelsIds = this.getEmptyChannelsIds();
      if (emptyChannelsIds.length) {
        await this.fetchTvshowsForChannels(emptyChannelsIds, 0, 'newTvshow');
      }
    } else {
      this.loaded.newTvshow = 1;
      this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);
    }
  }

  async getChannelsIds() {
    const channels = await this.backend.content.getChannels();
    return channels.map(x => x.channel_id);
  }

  async getEmptyChannelsIds() {
    const channelsIds = await this.getChannelsIds();
    const filteredChannelsIds = [];
    for (let i = 0; i < channelsIds.length; i += 1) {
      const channelId = channelsIds[i];
      const channelExists = await this.epg.hasChannel(channelId); //eslint-disable-line
      if (!channelExists) {
        filteredChannelsIds.push(channelId);
      }
    }
    return filteredChannelsIds;
  }

  async fetchTvshowsForChannels(channelsIds, lastTs, counterName) {
    let loaded = 0;
    let skip = 0;
    const limit = 3000;
    while (true) { //eslint-disable-line
      //eslint-disable-next-line
      console.log(`Fetch EPG tvshows ${skip} ... ${skip + limit}`);
      const result = await this.backend.epg.getTvshows( //eslint-disable-line
        channelsIds,
        lastTs,
        skip,
        limit,
        moment.unix(this.validRange.from).format('YYYY-MM-DD'),
        moment.unix(this.validRange.to).format('YYYY-MM-DD'),
      );
      await this.epg.importDataTvshows(result);//eslint-disable-line
      // items.length может быть фактически больше total из-за возможности клонирования каналов
      loaded = skip + result.tvshows.items.length;
      const total = result.tvshows.total;

      this.loaded[counterName] = (total > 0) ? loaded / total : 1;

      this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

      if (result.tvshows.items.length < limit) {
        break;
      }
      skip += limit;
    }
  }


  async fetchVideos() {
    let loaded = 0;
    let skip = 0;
    const limit = 3000;
    const lastTs = await this.epg.getLastTs('video');
    while (true) { //eslint-disable-line
      //eslint-disable-next-line
      console.log(`Fetch EPG videos ${skip} ... ${skip + limit}`);
      const result = await this.backend.epg.getVideos(lastTs, skip, limit);//eslint-disable-line
      await this.epg.importDataVideos(result);//eslint-disable-line
      loaded += result.videos.items.length;
      const total = result.videos.total;

      this.loaded.video = (total > 0) ? loaded / total : 1;
      this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

      if (result.videos.items.length < limit) {
        break;
      }
      skip += limit;
    }
  }

  async fetchPersons() {
    let loaded = 0;
    let skip = 0;
    const limit = 3000;
    const lastTs = await this.epg.getLastTs('person');
    while (true) { //eslint-disable-line
      //eslint-disable-next-line
      console.log(`Fetch EPG persons ${skip} ... ${skip + limit}`);
      const result = await this.backend.epg.getPersons(lastTs, skip, limit);//eslint-disable-line
      await this.epg.importDataPersons(result);//eslint-disable-line
      loaded += result.persons.items.length;
      const total = result.persons.total;

      this.loaded.person = (total > 0) ? loaded / total : 1;

      this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

      if (result.persons.items.length < limit) {
        break;
      }
      skip += limit;
    }
  }

  deleteEpg() {
    this.storage.deleteOption('last_update_epg');
    this.epgReader.close();
    return this.epg.deleteDb();
  }
}

export default EpgManager;
