import BoomerangCache from 'boomerang-cache';
import BatchRequest from '@/backend/persik/helpers/BatchRequest';

class BatchRequestCached extends BatchRequest {

  constructor(cacheBucket, ttl = 43200) {
    super();
    this.ttl = ttl;
    this.cache = BoomerangCache.create(cacheBucket, { storage: 'local', encrypt: false });

    setInterval(this.clearOld.bind(this), 3600000);
    this.clearOld();
  }

  async getItem(id) {
    let item = this.cache.get(id);
    if (!item) {
      item = await super.getItem(id);
      this.cache.set(id, item, this.ttl);
    }
    return item;
  }

  clearOld() {
    Object.keys(this.cache.getAll())
      .forEach((key) => {
        this.cache.get(key);
      });
  }
  clear() {
    this.cache.clear();
  }
}

export default BatchRequestCached;
