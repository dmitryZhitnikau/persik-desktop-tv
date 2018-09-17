<template>
  <div class="notifications">
    <div class="notifications__item" v-if="notif !== null" v-for="(notify, index) in notif.slice().reverse()" :key="index"> <!-- .slice().reverse() -->

        <w-info-message :notify="notify" :active="notif[notif.length - 1].id" :index="index"></w-info-message>

    </div>
  </div>
</template>

<script>
  import WInfoMessage from './WInfoMessage';

  export default {
    name: 'w-info-block',
    props: ['notif'],
    components: {
      WInfoMessage,
    },
    watch: {
      notif() {
        this.lastId = this.notif.length - 1;
      },
    },
    data() {
      return {
        lastId: 0,
      };
    },
    methods: {},
  };
</script>

<style scoped lang="scss">

.notifications {
  width: 16.25rem;
  right: 1rem;
  top: 2rem;
  z-index: 999;
  position: fixed;
}
</style>
