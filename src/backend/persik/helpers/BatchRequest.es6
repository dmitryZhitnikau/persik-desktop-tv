
class BatchRequest {

  /**
   * @param delay Задержка для накопления очереди запросов
   */
  constructor(delay = 50) {
    this.delay = delay;
    this.promises = [];
    this.queue = new Set();
    this.timer = null;
  }

  getItem(id) {
    this.queue.add(id);
    const promiseParams = { id };
    const p = new Promise((resolve, reject) => {
      promiseParams.resolve = resolve;
      promiseParams.reject = reject;
    });
    this.promises.push(promiseParams);

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.timer = null;
      this.processQueue();
    }, this.delay);

    return p;
  }

  //eslint-disable-next-line
  async getContent(ids) {
    throw new Error('Function BatchRequest.getContent must be override');
  }

  //eslint-disable-next-line
  getIdFromData(ids) {
    throw new Error('Function BatchRequest.getIdFromData must be override');
  }

  async processQueue() {
    const ids = Array.from(this.queue);
    this.queue = new Set();
    try {
      const items = await this.getContent(ids);
      items.forEach((item) => {
        this.resolveItem(item);
      });
    } catch (e) {
      ids.forEach((id) => {
        this.rejectItem(id, e);
      });
    }
  }

  findPromiseIndex(id) {
    return this.promises.findIndex((p) => p.id === id);
  }

  resolveItem(data) {
    const id = this.getIdFromData(data);
    let index = this.findPromiseIndex(id);
    while (index !== -1) {
      this.promises[index].resolve(data);
      this.promises.splice(index, 1);
      index = this.findPromiseIndex(id);
    }
  }

  rejectItem(id, e) {
    let index = this.findPromiseIndex(id);
    while (index !== -1) {
      this.promises[index].reject(`Error get item #${id}: ${e.toString()}`);
      this.promises.splice(index, 1);
      index = this.findPromiseIndex(id);
    }
  }
}

export default BatchRequest;
