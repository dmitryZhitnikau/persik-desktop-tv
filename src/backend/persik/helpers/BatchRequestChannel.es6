import BatchRequestCached from '@/backend/persik/helpers/BatchRequestCached';

class BatchRequestChannel extends BatchRequestCached {

  constructor(api) {
    super('channel');
    this.api = api;
  }

  async getContent(queue) {
    const res = await this.api.content.getChannel(queue);
    return res.channels;
  }

  //eslint-disable-next-line
  getIdFromData(data) {
    return data.channel_id;
  }
}

export default BatchRequestChannel;
