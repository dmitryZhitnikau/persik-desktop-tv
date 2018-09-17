<template>
  <div class="w-crazy-monkey">
    <button v-if="!crazyMonkeyEnabled" v-on:click="$crazyMonkey.start(); crazyMonkeyEnabled = true"><img src="../../assets/monkey.png" style="height: 0.75rem"></button>
    <button v-if="crazyMonkeyEnabled" v-on:click="$crazyMonkey.stop();  crazyMonkeyEnabled = false"><i class="fa fa-power-off"></i></button>
    <transition name="blink">
      <div v-if="crazyMonkeyEnabled" class="w-crazy-monkey__abu" :style="{ backgroundImage: 'url(' + getMonkeyOnImage() +')' }"></div>
    </transition>
    <transition name="blink">
      <div v-if="!crazyMonkeyEnabled" class="w-crazy-monkey__abu" :style="{ backgroundImage: 'url(' + getMonkeyOffImage() +')' }"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'w-crazy-monkey',
    data() {
      return {
        crazyMonkeyEnabled: false,
      };
    },
    methods: {
      getMonkeyOffImage() {
        const n = Math.floor(Math.random() * 3) + 1;
        return `http://media.persik.by/app/abu-off-${n}.gif`;
      },
      getMonkeyOnImage() {
        const n = Math.floor(Math.random() * 3) + 1;
        return `http://media.persik.by/app/abu-on-${n}.gif`;
      },
    },
  };
</script>

<style scoped lang="scss">
  .w-crazy-monkey {
    display: inline-block;
    &__abu {
      display: none;
      width: 10rem;
      height: 10rem;
      position: fixed;
      bottom: 0;
      right: 1rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position-x: center;
    }
  }

  .blink-enter-active {
    animation: blink 2s;
    animation-direction: alternate;
    display: block !important;
  }
  @keyframes blink {
    0% {
      transform: translateY(10rem);
    }
    20% {
      transform: translateY(-2rem);
    }
    40% {
      transform: translateY(0rem);
    }
    65% {
      transform: translateY(0rem);
    }
    80% {
      transform: translateY(-2rem);
    }
    100% {
      transform: translateY(10rem);
    }
  }
</style>

