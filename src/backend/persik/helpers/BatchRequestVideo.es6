import BatchRequestCached from '@/backend/persik/helpers/BatchRequestCached';

class BatchRequestVideo extends BatchRequestCached {

  constructor(api) {
    super('video');
    this.api = api;
  }

  async getContent(queue) {
    const res = await this.api.content.getVideo(queue);
    return res.videos;
  }

  //eslint-disable-next-line
  getIdFromData(data) {
    return data.video_id;
  }
}

export default BatchRequestVideo;
