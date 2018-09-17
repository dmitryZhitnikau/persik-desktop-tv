<template>
  <div v-bind:style="{left: (100 * position) + '%'}" class="w-player-tracker">
    <div class="w-player-tracker__thumbnail" :style="{backgroundImage: 'url(' + thumbnail + ')', left: positionThumbnail}">
      <span class="w-player-tracker__time">{{ time | formatTime }}</span>
    </div>
    <div class="w-player-tracker__button" v-bind:style="{left: position + '%'}"></div>
  </div>
</template>

<script>
  import datetime from '@/mixins/datetime';

  export default {
    mixins: [datetime],
    name: 'w-player-tracker',
    props: ['position', 'time', 'thumbnail'],
    computed: {
      positionThumbnail() {
        const width = 16;
        const margin = (width / 2) / 80;
        if (this.position < 0.1) {
          const offset = (margin - this.position) / margin;
          return `calc(${offset * (width / 2)}rem + 1px)`;
        }
        if (this.position > 0.9) {
          const offset = (this.position - (1 - margin)) / margin;
          return `calc(-${offset * (width / 2)}rem - 1px)`;
        }
        return '0';
      },
    },
  };
</script>

<style scoped lang="scss">
    .w-player-tracker {

  position: absolute;

  &__button{
    position: absolute;
    margin-top: -.5rem;
    margin-left: -.25rem;
    height: 1rem;
    width: .5rem;
    background-color: #ffffff;
  }

  &__time {
    position: absolute;
    font-size: 1rem;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    width: 4rem;
    bottom: 0;
    background: #000000;
    color: $color-text-simple;
    padding: 0.25rem;
    margin-left: -2rem;
    text-align: center;
    left: 50%;
  }

  &__thumbnail {
    position: absolute;
    width: 16rem;
    height: 9rem;
    margin-left: -8rem;
    background-color: $color-gray-light;
    outline: 1px solid #ffffff;
    bottom: 2rem;
    background-size: cover;
  }
}
            
</style>

