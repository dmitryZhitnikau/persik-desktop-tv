<template>
  <div class="progress">
    <div class="progress__line" :style="{ transform: 'scaleX(' + progress + ')' }"></div>
  </div>
</template>

<script>
  export default {
    name: 'w-progress-bar-line',
    props: ['passed', 'focused'],
    data() {
      return {
        allWay: 100,
      };
    },
    computed: {
      progress() {
        return this.passed / this.allWay;
      },
    },
  };
</script>

<style scoped lang="scss">
.progress{
  position: relative;
  overflow: hidden;
  height: .25rem;
  z-index: 1;
  &__line {
    position: absolute;
    left: 0;
    top:0;
    height: 100%;
    width: 100%;
    background-color: $color-hover;
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
  }
}
</style>
