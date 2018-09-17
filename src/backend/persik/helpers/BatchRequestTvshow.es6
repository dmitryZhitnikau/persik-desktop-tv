import BatchRequestCached from '@/backend/persik/helpers/BatchRequestCached';

class BatchRequestTvshow extends BatchRequestCached {

  constructor(api) {
    super('tvshow');
    this.api = api;
  }

  async getContent(queue) {
    const res = await this.api.content.getTvshow(queue);
    return res.tvshows;
  }

  //eslint-disable-next-line
  getIdFromData(data) {
    return data.tvshow_id;
  }
}

export default BatchRequestTvshow;
