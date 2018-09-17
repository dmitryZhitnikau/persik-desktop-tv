<template>
  <div class="w-player-thumbs" :style="{height: thumbHeight}">
    <div class="w-player-thumbs__item" v-for="(url, index) in thumbs" :key="index" :style="{backgroundImage: 'url(' + url + ')', width: thumbWidth, height: thumbHeight}"></div>
  </div>
</template>

<script>
  export default {
    name: 'w-player-thumbs',
    props: ['thumbs'],
    computed: {
      thumbWidth() {
        return `${80 / this.thumbs.length}rem`;
      },
      thumbHeight() {
        return `${(9 / 16) * (80 / this.thumbs.length)}rem`;
      },
    },
  };
</script>

<style scoped lang="scss">
.w-player-thumbs {
  position: absolute;
  background-color: #444444;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  width: 100%;
  bottom: 2rem;

  &__item {
    opacity: 0.75;
    background-color: $color-gray-medium;
    background-size: cover;
  }
}
</style>
