<template>
  <div class="w-memory-usage" :style="{backgroundColor: backgroundColor}">Mem: {{ used | humanizeSize }} | {{ total | humanizeSize }} | {{ limit | humanizeSize }} |</div>
</template>

<script>
  export default {
    name: 'w-memory-usage',
    data() {
      return {
        total: 0,
        used: 0,
        limit: 0,
        danger: 100 * 1024 * 1024,
      };
    },
    filters: {
      humanizeSize(value) {
        if (!value) {
          return '-';
        }
        return `${Math.round(value / (1024 * 1024))}MB`;
      },
    },
    computed: {
      backgroundColor() {
        const p = Math.min(1, this.total / this.danger);
        const r = p > 0.5 ? 255 : Math.floor(255 * (p * 2));
        const g = p < 0.5 ? 255 : Math.floor(255 * 2 * (1 - p));
        const b = 0;
        return `rgba(${r}, ${g}, ${b}, 0.5)`;
      },
    },
    mounted() {
      this.timer = setInterval(this.update, 2000);
    },
    destroyed() {
      clearInterval(this.timer);
    },
    methods: {
      update() {
        this.total = window.performance.memory.totalJSHeapSize;
        this.used = window.performance.memory.usedJSHeapSize;
        this.limit = window.performance.memory.jsHeapSizeLimit;
      },
    },
  };
</script>

<style scoped lang="scss">
  .w-memory-usage {
    background-color: rgba(0, 0, 0, 0.5);
    color: black;
  }
</style>

