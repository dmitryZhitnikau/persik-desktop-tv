<template>
  <transition name="slide" :duration="2000">
    <div v-show="!connected"
         class="w-connection-status"
         :class="{'w-connection-status_offline': !connected}"
    >{{ text }}</div>
  </transition>
</template>

<script>

  import DeviceInfo from '@/persik/platform/DeviceInfo';

  export default {
    name: 'w-connection-status',
    data() {
      return {
        text: this.$lang.messages.connection.online,
      };
    },
    computed: {
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
    },
    watch: {
      connected(value) {
        if (value) {
          this.text = this.$lang.messages.connection.online;
        } else {
          this.text = this.$lang.messages.connection.offline;
        }
      },
    },
    created() {
      const deviceInfo = DeviceInfo.getInstance();
      this.$store.commit('connected', deviceInfo.online);
      deviceInfo.addEventListener(DeviceInfo.ONLINE, () => {
        this.$store.commit('connected', true);
      });
      deviceInfo.addEventListener(DeviceInfo.OFFLINE, () => {
        this.$store.commit('connected', false);
      });
    },
  };
</script>

<style scoped lang="scss">
  .w-connection-status {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  color: $color-black;
  text-align: center;
  font-size: 1rem;
  z-index: 500;
  background-color: rgb(82, 255, 113);

  &_offline {
    background-color: rgb(255, 82, 82);
    color: $color-text-simple;
  }
}

.slide-enter-active {
  -webkit-transition: -webkit-transform 0.5s;
  transition: -webkit-transform 0.5s;
  transition: transform 0.5s;
  transition: transform 0.5s, -webkit-transform 0.5s;
}
.slide-leave-active {
  -webkit-transition:
    background-color 1s,
    color 1s,
    -webkit-transform 0.5s 1s;
  transition:
    background-color 1s,
    color 1s,
    -webkit-transform 0.5s 1s;
  transition:
    background-color 1s,
    color 1s,
    transform 0.5s 1s;
  transition:
    background-color 1s,
    color 1s,
    transform 0.5s 1s,
    -webkit-transform 0.5s 1s;
}

.slide-enter {
  -webkit-transform: translateY(-2rem);
          transform: translateY(-2rem);
}
.slide-enter-to {
  -webkit-transform: translateY(0);
          transform: translateY(0);
}

.slide-leave {
  -webkit-transform: translateY(0);
          transform: translateY(0);
}
.slide-leave-to {
  -webkit-transform: translateY(-2rem);
          transform: translateY(-2rem);
}
</style>

