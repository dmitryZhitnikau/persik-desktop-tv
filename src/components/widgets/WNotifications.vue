<template>
    <div>
        <w-info-block :notif="notifications" data-xy-group></w-info-block>
        <w-modal v-for="(modal, index) in modals" :key="modal.id" :modal="modal" v-bind:class="[ index !== modals.length - 1 ? 'invisible' : 'visible' ]" data-xy-group></w-modal>
    </div>
</template>
<script>

  import WModal from './WModal';
  import WInfoBlock from './WInfoBlock';

  export default {
  
    name: 'w-notifications',
    components: {
      WModal,
      WInfoBlock,
    },
    data() {
      return {
        notifications: [],
        modals: [],
      };
    },
    async created() {
      this.$nm.addEventListener('notificationEvent', (func, notif) => {
        this.notifications = notif;
      });

      this.$nm.addEventListener('modalEvent', (func, modals) => {
        this.modals = modals;
      });

      const notifications = await this.$backend.notifications.getGlobalNotifications();
      this.notificationDispatcher(notifications);
    },
    mounted() {},
    watch: {},
    methods: {
      notificationDispatcher(notifications) {
        if (notifications !== null && notifications.length > 0) {
          notifications.forEach(notice => {
            if (notice.modal) {
              this.$nm.showModal('simple', notice.message);
            } else {
              this.$nm.showMessage(notice.message, 0);
            }
          });
        }
      },
    },
  };
</script>

<style lang="scss">
  .visible {
    display: block;
  }

  .invisible {
    display: none;
  }
</style>
