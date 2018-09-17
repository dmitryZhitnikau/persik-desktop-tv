<template>
  <div :class="b()">
    <div :class="b('user-info')">{{ $lang.messages.account.you_login }}: {{ userInfo.email }}</div>
    <w-button @click="toggleModal" :caption="$lang.messages.account.logout"></w-button>

    <div class="confirm-modal" v-show="isShowConfirmModal">
      <div class="confirm-modal__content">
        <span class="confirm-modal__content-text">Вы уверены, что хотите выйти из аккаунта?</span>
        <div class="confirm-modal__content-buttons">
          <div class="confirm-modal__content-buttons-item" v-on:click="logout">Выйти</div>
          <div class="confirm-modal__content-buttons-item" v-on:click="toggleModal">Отмена</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Metric from '@/persik/platform/Metric';
  import dialogs from '@/mixins/dialogs';
  import WButton from '@/components/widgets/WButton';

  export default {
    name: 'p-profile',
    components: { WButton },
    mixins: [dialogs],
    data() {
      return {
        userInfo: {},
        isShowConfirmModal: false,
      };
    },
    async created() {
      this.userInfo = await this.$backend.account.getInfo();
    },
    mounted() {
      Metric.getInstance().screenView('account/profile');
    },
    methods: {
      toggleModal() {
        this.isShowConfirmModal = !this.isShowConfirmModal;
      },
      async logout() {
        this.$backend.account.logout();
        this.$store.commit('authorized', false);
        this.$router.push({ name: 'Main', params: { page: 'home' } });
        this.$nm.showMessage(this.$lang.messages.account.afterLogout, 5000);
        this.$backend.clear();
        this.toggleModal();
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-profile {
  padding-top: 5rem;
  padding-left: 5rem;
  float: left;
  &__user-info {
    color: $color-text-simple;
    padding: 2rem 0;
  }

  .confirm-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;

    &__content {
      width: 25rem;
      height: 15rem;
      background-color: #111111;;
      display: -webkit-box;;
      display: -ms-flexbox;;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      color: white;
      -webkit-box-shadow: 5px 5px 10px 0 rgba(0,0,0,.5);
              box-shadow: 5px 5px 10px 0 rgba(0,0,0,.5);

      &-text {
        max-width: 100%;
        text-align: center;
      }

      &-buttons {
        width: 20rem;
        height: 2.5rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: distribute;
            justify-content: space-around;
        margin-top: 2rem;

        &-item {
          height: 100%;
          width: 8rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          border: 1px solid #393939;
          cursor: pointer;

          &:hover {
            background-color: $color-hover;
          }
        }
      }
    }
  }
}
</style>
