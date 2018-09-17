<template>
  <transition name="fade">
    <div class="volume" v-if="visible">
      <img src="../../assets/vector-image/sound.svg" class="volume__picture">
      <span class="volume__text">{{ volume }}</span>
      <div class="volume__scale">
        <div class="volume__scale-level" v-bind:style="{height: volume + '%'}"></div>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'w-volume',
    props: ['visible'],
    data() {
      return {
        showTimer: null,
      };
    },
    computed: {
      volume() {
        return this.$store.getters.volume;
      },
    },
    watch: {
      volume(value) {
        this.$backend.settings.setVolume(value);
      },
    },
    created() {
      this.$store.commit('volume', this.$backend.settings.getVolume());
    },
    destroyed() {},
    methods: {},
  };
</script>

<style lang="scss">

  .volume {
    position: fixed;
    top: 14rem;
    right: 4rem;
    color: #ffffff;
    z-index: 300;
    width: 6rem;
    height: 15rem;

    &__picture {
      -webkit-filter: invert(100%);
              filter: invert(100%);
      width: 1rem;
      height: 1rem;
      margin-right: .8rem;
    }

    &__text {
      line-height: 15rem;
      font-size: 1.83rem;
      font-weight: bold;
    }

    &__scale {
      float: right;
      height: 100%;
      width: .25rem;
      position: relative;
      background-color: rgba($color-text-simple, .4);

      &-level {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: $color-glow;
        -webkit-box-shadow: $shadow-glow;
                box-shadow: $shadow-glow;
      }
    }
  }

  .fade-enter-active {
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
  }
  .fade-leave-active {
    -webkit-transition: opacity 1.0s;
    transition: opacity 1.0s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
