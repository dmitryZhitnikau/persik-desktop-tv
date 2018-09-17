
import moment from 'moment';

export default {
  methods: {
    arrayToItems(array) {
      return array.map((x) => {
        if (x.tvshow_id) {
          return {
            type: 'tvshow',
            id: x.tvshow_id,
          };
        } else if (x.video_id) {
          return {
            type: 'video',
            id: x.video_id,
          };
        }
        return {};
      });
    },

    startTimeInterval() {
      this.time = moment().unix();
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.time = moment().unix();
      }, 5000);
    },

    stopTimeInterval() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },

    isChannelAdultLocked(channel) {
      return channel.age_rating === '18+' && this.$backend.settings.getParentControl();
    },
  },
};
