<template>
  <div class="player-timeline" v-on:click="changeTimePosition">
    <div class="player-timeline__line-buffer" v-bind:style="{width: (100 * buffered) + '%'}"></div>
    <div class="player-timeline__line-progress" v-bind:style="{width: (100 * played) + '%'}"></div>
    <div class="player-timeline__line-all" v-bind:style="{left: (100 * (1 - rest)) + '%', width: (100 * rest) + '%'}"></div>
    <div class="player-timeline__button" v-bind:style="{left: (100 * played) + '%'}"></div>
    <div class="player-timeline__label-current">{{ current | formatTime }}</div>
    <div class="player-timeline__label-duration">{{ duration | formatTime }}</div>
  </div>
</template>

<script>

  import datetime from '@/mixins/datetime';

  export default {
    mixins: [datetime],
    name: 'w-player-timeline',
    props: ['current', 'duration', 'buffered', 'changeCurrent'],
    computed: {
      rest() {
        return 1 - Math.max(this.played, this.buffered);
      },
      played() {
        return this.current / this.duration;
      },
    },
    methods: {
      changeTimePosition(event) {
        const lineWidth = document.getElementsByClassName('player-timeline')[0].getBoundingClientRect().width;
        const selectedTimePercent = event.clientX / lineWidth;
        this.changeCurrent(selectedTimePercent);
      },
    },
  };
</script>

<style scoped lang="scss">

.player-timeline{
  position: relative;
  width: 100%;

  &__line-all{
    position: absolute;
    height: .4rem;
    margin-top: -0.2rem;
    left: 0;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, .5);
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    cursor: pointer;
  }

  &__line-progress{
    position: absolute;
    height: .4rem;
    margin-top: -0.2rem;
    left: 0;
    background-color: $color-hover;
    cursor: pointer;
  }

  &__line-buffer{
    position: absolute;
    height: .4rem;
    margin-top: -0.2rem;
    left: 0;
    background-color: rgba(255, 255, 255, .5);
    cursor: pointer;
  }

  &__button{
    position: absolute;
    margin-top: -0.5rem;
    margin-left: -0.5rem;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: #ffffff;
  }
  &__button:after{
    content: "";
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 2rem;
    height: 2rem;
    margin-left: -.5rem;
    margin-top: -.5rem;
    border-radius: 50%;
  }

  &__label-current {
    position: absolute;
    left: 1rem;
    top: 1.5rem;
    color: $color-text-simple;
  }
  &__label-duration {
    position: absolute;
    right: 1rem;
    top: 1.5rem;
    color: $color-text-simple;
  }
}

</style>
