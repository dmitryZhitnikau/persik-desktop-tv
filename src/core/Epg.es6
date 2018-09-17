import moment from 'moment';
import _ from 'lodash';
import EventDispatcher from '@danehansen/event-dispatcher';

let instance;

class Epg extends EventDispatcher {

  static get DB_READY_STATE() {
    return 'DB_READY_STATE';
  }

  constructor() {
    super();
    if (instance) {
      throw new Error('The instance of Epg must be obtained by Epg.getInstance() method');
    }
    instance = this;
    this.db = null;
    this.resetCache();
  }

  static getInstance() {
    if (!instance) {
      instance = new Epg();
    }
    return instance;
  }

  static setIndexedDB(db, keyRange, options = {}) {
    Epg.indexedDB = db;
    Epg.keyRange = keyRange;
    Epg.options = Object.assign({ supportPrev: true }, options);
  }

  resetCache() {
    this.cachedPrevTvshows = {};
    this.cachedNextTvshows = {};
    this.emptyChannelsIndex = {};
  }

  openDb(dbName) {
    this.dbName = dbName;
    const final = function (dbStore) {
      const stores = dbStore.objectStoreNames;

      if (stores.length && stores.contains('person')) {
        dbStore.deleteObjectStore('person');
      }
      let objectStore;
      objectStore = dbStore.createObjectStore('person', { keyPath: 'person_id' });
      objectStore.createIndex('ts', 'ts');

      if (stores.length && stores.contains('tvshow')) {
        dbStore.deleteObjectStore('tvshow');
      }
      objectStore = dbStore.createObjectStore('tvshow', { keyPath: 'tvshow_id' });
      objectStore.createIndex('channel_id', 'channel_id');
      objectStore.createIndex('id_stop', 'id_stop');
      objectStore.createIndex('id_start', 'id_start');
      objectStore.createIndex('ts', 'ts');

      if (stores.length && stores.contains('video')) {
        dbStore.deleteObjectStore('video');
      }
      objectStore = dbStore.createObjectStore('video', { keyPath: 'video_id' });
      objectStore.createIndex('ts', 'ts');
    };

    const versionControlDb = [final, final];

    const version = 2;

    return new Promise((resolve) => {
      const request = Epg.indexedDB.open(dbName, version);
      request.onupgradeneeded = function (event) {
        const dbStore = event.target.result;
        const oldVersion = event.oldVersion;
        const newVersion = event.newVersion;
        if (oldVersion === 0 || typeof oldVersion === 'undefined') {
          console.log('Create EPG database'); //eslint-disable-line
          versionControlDb[0].call(this, dbStore);
        } else {
          //eslint-disable-next-line
          console.log(`Upgrade DB from version ${oldVersion} to ${newVersion}`);
          for (let i = oldVersion; i < newVersion; i += 1) {
            if (versionControlDb[i]) {
              //eslint-disable-next-line
              console.log(`Applying migration DB patch #${i}`);
              versionControlDb[i].call(this, dbStore);
            }
          }
        }
      };
      request.onsuccess = (event) => {
        this.db = event.target.result;
        Epg.dispatchEvent(Epg.DB_READY_STATE);
        resolve();
      };
    });
  }

  deleteDb() {
    if (Epg.indexedDB.deleteDatabase) {
      return new Promise((resolve, reject) => {
        //eslint-disable-next-line
        console.log('Delete EPG database ...');
        this.db.close();
        const request = Epg.indexedDB.deleteDatabase(this.dbName);
        request.onerror = function () {
          reject('Error deleting database');
        };

        request.onblocked = function () {
          reject('EPG database blocked');
        };

        request.onsuccess = function () {
          //eslint-disable-next-line
          console.log('EPG database deleted successfully');
          resolve();
        };
      });
    }
    return false;
  }

  clearCounter() {
    this.total = 0;
    this.currentCount = 0;
    this.percents = 0;
  }

  deleteFullData(table, minStart) {
    return new Promise((resolve) => {
      const transaction = this.db.transaction([table], 'readwrite');
      const objectStore = transaction.objectStore(table);
      objectStore.openCursor().onsuccess = function (eventCursor) {
        const cursor = eventCursor.target.result;
        if (cursor) {
          if (cursor.value.deleted || (table === 'tvshow' && cursor.value.start < minStart)) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
    });
  }

  deleteDeletedData(table) {
    return new Promise((resolve) => {
      const transaction = this.db.transaction([table], 'readwrite');
      const objectStore = transaction.objectStore(table);
      objectStore.openCursor().onsuccess = function (eventCursor) {
        const cursor = eventCursor.target.result;
        if (cursor) {
          if (cursor.value.deleted) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
    });
  }

  deleteOldData(table, minStart) {
    return new Promise((resolve) => {
      const transaction = this.db.transaction([table], 'readwrite');
      const objectStore = transaction.objectStore(table);
      console.log(`Deleting old data from ${table}`); //eslint-disable-line
      // let deleted = 0;
      objectStore.openCursor().onsuccess = function (eventCursor) {
        const cursor = eventCursor.target.result;
        if (cursor) {
          if (table === 'tvshow' && cursor.value.start < minStart) {
            cursor.delete();
            // deleted += 1;
          }
          cursor.continue();
        } else {
          // console.log(`Deleted ${deleted} rows from ${table}`); //eslint-disable-line
          resolve();
        }
      };
    });
  }

  importDataTvshows(data) {
    let count = 0;
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['tvshow'], 'readwrite');
      const objectStore = transaction.objectStore('tvshow');
      data.tvshows.items.forEach((row) => {
        objectStore.put({
          id_stop: `${row.channel_id}_${row.stop}`,
          id_start: `${row.channel_id}_${row.start}`,
          tvshow_id: row.tvshow_id,
          channel_id: parseInt(row.channel_id, 10),
          title: row.title,
          date: row.date,
          start: parseInt(row.start, 10),
          stop: parseInt(row.stop, 10),
          video_id: parseInt(row.video_id, 10),
          deleted: !!parseInt(row.deleted, 10),
          ts: parseInt(row.ts, 10),
        });
        count += 1;
      });
      this.resetCache();
      console.log(`Imported ${count} tvshows`); //eslint-disable-line
      resolve();
    });
  }

  importDataVideos(data) {
    let count = 0;
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['video'], 'readwrite');
      const objectStore = transaction.objectStore('video');
      data.videos.items.forEach((row) => {
        const deleted = !!parseInt(row.deleted, 10);
        if (!deleted) {
          let participants = null;
          try {
            participants = row.participants ? JSON.parse(row.participants) : null;
          } catch (e) {
            console.error(e); //eslint-disable-line
          }
          objectStore.put({
            video_id: parseInt(row.video_id, 10),
            name: row.name,
            international_name: row.international_name,
            year: row.year,
            description: row.description,
            participants,
            age_rating: row.age_rating,
            cover: row.cover,
            deleted,
            ts: parseInt(row.ts, 10),
          });
          count += 1;
        }
      });
      this.resetCache();
      console.log(`Imported ${count} videos`); //eslint-disable-line
      resolve();
    });
  }

  importDataPersons(data) {
    let count = 0;
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['person'], 'readwrite');
      const objectStore = transaction.objectStore('person');
      data.persons.items.forEach((row) => {
        const deleted = !!parseInt(row.deleted, 10);
        if (!deleted) {
          objectStore.put({
            person_id: parseInt(row.person_id, 10),
            name: row.name,
            international_name: row.international_name,
            info: row.info,
            photo: row.photo,
            deleted: !!parseInt(row.deleted, 10),
            ts: parseInt(row.ts, 10),
          });
          count += 1;
        }
      });
      this.resetCache();
      console.log(`Imported ${count} persons`); //eslint-disable-line
      resolve();
    });
  }

  getLastTs(table) {
    return new Promise((resolve) => {
      let maxTs = 0;
      const transaction = this.db.transaction(table, 'readonly');
      const objectStore = transaction.objectStore(table);
      const cursor = objectStore.index('ts').openCursor(null, 'prev');
      cursor.onsuccess = function (event) {
        if (event.target.result) {
          maxTs = event.target.result.value.ts;
        }
      };
      transaction.oncomplete = function () {
        resolve(maxTs);
      };
    });
  }

  hasChannel(channelId) {
    if (_.has(this.emptyChannelsIndex, channelId)) {
      return this.emptyChannelsIndex[channelId];
    }
    return new Promise((resolve) => {
      const transaction = this.db.transaction('tvshow', 'readonly');
      const objectStore = transaction.objectStore('tvshow');
      const key = Epg.keyRange.only(channelId);
      const cursor = objectStore.index('channel_id').openCursor(key);
      cursor.onsuccess = (event) => {
        const result = !!event.target.result;
        this.emptyChannelsIndex[channelId] = result;
        resolve(result);
      };
    });
  }

  getDatesByChannelId(channelId) {
    return new Promise((resolve) => {
      const dates = [];
      const transaction = this.db.transaction('tvshow', 'readonly');
      const objectStore = transaction.objectStore('tvshow');
      const key = Epg.keyRange.only(channelId);
      const cursor = objectStore.index('channel_id').openCursor(key);
      cursor.onsuccess = function (event) {
        const cur = event.target.result;
        if (cur) {
          const date = event.target.result.value.date;
          if (!dates.includes(date)) {
            dates.push(date);
          }
          cur.continue();
        } else {
          dates.sort();
          resolve(dates);
        }
      };
    });
  }

  getActualTvshowsNext(channelId, dt, limit) {
    return new Promise((resolve) => {
      let tvshows = [];
      const tvshowObjectStore = this.db.transaction('tvshow').objectStore('tvshow', 'readonly');
      const key = `${channelId}_${dt}`;
      const request = tvshowObjectStore.index('id_stop').openCursor(Epg.keyRange.lowerBound(key, true));
      request.onsuccess = (eventTv) => {
        const tvshowCursor = eventTv.target.result;
        if (tvshowCursor) {
          if (parseInt(channelId, 10) === tvshowCursor.value.channel_id) {
            tvshows.push(tvshowCursor.value);
            if (tvshows.length >= limit) {
              tvshows.sort((a, b) => a.stop - b.stop);
              tvshows = tvshows.slice(0, limit);
              resolve(tvshows);
            } else {
              tvshowCursor.continue();
            }
          } else {
            resolve(tvshows);
          }
        } else {
          tvshows.sort((a, b) => a.stop - b.stop);
          tvshows = tvshows.slice(0, limit);
          resolve(tvshows);
        }
      };
    });
  }

  getActualTvshowsPrev(channelId, dt, limit) {
    return new Promise((resolve) => {
      let tvshows = [];
      const tvshowObjectStore = this.db.transaction('tvshow').objectStore('tvshow', 'readonly');
      const param = Epg.options.supportPrev ? 'prev' : 'next';
      tvshowObjectStore.index('id_start').openCursor(Epg.keyRange.upperBound(`${channelId}_${dt}`), param).onsuccess = (eventTv) => {
        const tvshowCursor = eventTv.target.result;
        if (tvshowCursor) {
          if (parseInt(channelId, 10) === tvshowCursor.value.channel_id) {
            tvshows.push(tvshowCursor.value);
            if (tvshows.length >= limit && Epg.options.supportPrev) {
              tvshows.sort((a, b) => b.start - a.start);
              tvshows = tvshows.slice(0, limit);
              resolve(tvshows);
            } else {
              tvshowCursor.continue();
            }
          } else {
            resolve([]);
          }
        } else {
          tvshows.sort((a, b) => a.stop - b.stop);
          tvshows = tvshows.slice(0, limit);
          resolve(tvshows);
        }
      };
    });
  }

  getObjectStoreItemById(table, id) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db.transaction(table, 'readonly').objectStore(table);
      objectStore.get(id).onsuccess = (eventStore) => {
        const value = eventStore.target.result;
        if (typeof value !== 'undefined') {
          resolve(Epg.removeServiceProps(value));
        } else {
          reject(`${table} #${id} not found`);
        }
      };
    });
  }

  static removeServiceProps(value) {
    const newValue = _.clone(value);
    delete newValue.deleted;
    if (newValue.id_start) {
      delete newValue.id_start;
    }
    if (newValue.id_stop) {
      delete newValue.id_stop;
    }
    delete newValue.ts;
    return newValue;
  }

  getTvshowById(id) {
    return this.getObjectStoreItemById('tvshow', id);
  }

  getVideoById(id) {
    return this.getObjectStoreItemById('video', id);
  }

  async attachVideo(tvshow) {
    try {
      const video = await this.getVideoById(tvshow.video_id);
      return Object.assign({}, video, tvshow);
    } catch (er) {
      // eslint-disable-next-line
      console.error(er);
      return tvshow;
    }
  }

  getTvshowsRange(channelId, start, stop) {
    return new Promise((resolve) => {
      const tvshows = [];
      const tvshowObjectStore = this.db.transaction('tvshow').objectStore('tvshow', 'readonly');
      tvshowObjectStore.index('channel_id').openCursor(channelId).onsuccess = (eventTv) => {
        const tvshowCursor = eventTv.target.result;
        if (tvshowCursor) {
          if (tvshowCursor.value.start >= start && tvshowCursor.value.stop <= stop) {
            tvshows.push(tvshowCursor.value);
          }
          tvshowCursor.continue();
        } else {
          tvshows.sort((a, b) => a.start - b.start);
          resolve(tvshows);
        }
      };
    });
  }

  /**
   *
   * @param {Number} channelId
   * @param {String} date as yyyy-mm-dd
   * @return {Promise<any>}
   */
  getTvshowsByDate(channelId, date) {
    return new Promise((resolve) => {
      const tvshows = [];
      const tvshowObjectStore = this.db.transaction('tvshow').objectStore('tvshow', 'readonly');
      tvshowObjectStore.index('channel_id').openCursor(channelId).onsuccess = (eventTv) => {
        const tvshowCursor = eventTv.target.result;
        if (tvshowCursor) {
          if (tvshowCursor.value.date === date) {
            tvshows.push(tvshowCursor.value);
          }
          tvshowCursor.continue();
        } else {
          tvshows.sort((a, b) => a.start - b.start);
          resolve(tvshows);
        }
      };
    });
  }

  async getNextTvshows(channelId, time, limit) {
    if (!channelId) {
      return [];
    }
    const res = await this.hasChannel(channelId);
    if (!res) {
      return [];
    }
    const intChannelId = parseInt(channelId, 10);
    const dt = Number.isInteger(time) ? time : moment(time).unix();

    if (this.cachedNextTvshows[intChannelId]
          && this.cachedNextTvshows[intChannelId].tvshows.length
        ) {
      const cache = this.cachedNextTvshows[intChannelId];
      if (cache.tvshows.length
            && cache.range
            && cache.range.start < dt
            && cache.range.stop > dt
            && cache.limit >= limit
          ) {
        return cache.tvshows.slice(0, limit);
      }
    }
    const tvshows = await this.getActualTvshowsNext(intChannelId, dt, limit);
    for (let i = 0; i < tvshows.length; i += 1) {
      // eslint-disable-next-line
      tvshows[i] = await this.attachVideo(tvshows[i]);
    }

    if (tvshows.length) {
      const firstTvshow = tvshows[0];
      this.cachedNextTvshows[intChannelId] = {
        range: {
          start: firstTvshow.start,
          stop: firstTvshow.stop,
        },
        limit,
        tvshows,
      };
    }
    return tvshows.slice(0, limit);
  }

  async getPrevTvshows(channelId, time, limit) {
    const intChannelId = channelId * 1;
    const dt = Number.isInteger(time) ? time : moment(time).unix();

    if (this.cachedPrevTvshows[intChannelId]
          && this.cachedPrevTvshows[intChannelId].tvshows.length
        ) {
      const cache = this.cachedPrevTvshows[intChannelId];
      if (cache.tvshows.length
            && cache.range.start <= dt
            && cache.range.stop > dt
            && cache.limit >= limit
          ) {
        return cache.tvshows.slice(0, limit);
      }
    }
    let tvshows = await this.getActualTvshowsPrev(channelId, dt, limit + 1);
    const p = [];
    tvshows.forEach((element) => {
      p.push(this.attachVideo(element));
    });

    tvshows = await Promise.all(p);
    if (tvshows.length) {
      const firstTvshow = tvshows.shift();
      tvshows.reverse();
      this.cachedPrevTvshows[intChannelId] = {
        range: {
          start: firstTvshow.start,
          stop: firstTvshow.stop,
        },
        limit,
        tvshows,
      };
    }
    return tvshows.slice(0, limit);
  }

  getPersonById(id) {
    return this.getObjectStoreItemById('person', id);
  }

  /**
   *
   * @return {Promise}
   */
  loadParticipants(object) {
    return new Promise((resolve) => {
      let allPersons = [];
      if (object.participants) {
        if (object.participants.director) {
          allPersons = _.concat(allPersons, object.participants.director);
        }
        if (object.participants.cast) {
          allPersons = _.concat(allPersons, object.participants.cast);
        }
      }
      if (!allPersons.length) {
        resolve(object);
      } else {
        const persons = {};
        allPersons.forEach(async (id, index) => {
          const person = await this.getPersonById(id);
          const personId = person.person_id;
          persons[personId] = {
            person_id: person.person_id,
            name: person.name,
            international_name: person.international_name,
            info: person.info,
            photo: person.photo,
          };
          if (index === (allPersons.length - 1)) {
            const itemize = function (pid) {
              return persons[pid];
            };
            const newObject = _.cloneDeep(object);
            if (newObject.participants.director) {
              newObject.participants.director = newObject.participants.director.map(itemize);
            }
            if (newObject.participants.cast) {
              newObject.participants.cast = newObject.participants.cast.map(itemize);
            }
            resolve(newObject);
          }
        });
      }
    });
  }

  /**
   *
   * @return {Promise}
   */
  async loadVideo(videoId) {
    let video = this.getVideoById(videoId);
    video = await this.loadParticipants(video);
    return video;
  }

  close() {
    this.db.close();
  }
}

export default Epg;
