import moment from 'moment';

function formatTime(time, hours = true, seconds = true) {
  function pad(num) {
    return num.toString().padStart(2, '0');
  }
  const parts = [];
  let m = Math.floor(time / 60);

  if (hours) {
    const h = Math.floor(m / 60);
    m %= 60;
    parts.push(h);
  }
  parts.push(m);
  if (seconds) {
    const s = Math.floor(time % 60);
    parts.push(s);
  }

  return parts.map(pad).join(':');
}

function momentFormat(time, format) {
  return moment(time).format(format);
}

export default {
  methods: {
    getMoment(unixtime) {
      return moment.unix(unixtime).utcOffset(this.$store.getters.utcOffset);
    },
    formatTime,
    momentFormat,
    getTime() {
      return moment().valueOf();
    },
  },
  filters: {
    formatTime,
    momentFormat,
  },
};
