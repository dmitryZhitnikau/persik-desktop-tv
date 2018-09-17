<template>
  <div class="p-account">
    <div class="p-account__menu">
      <div class="p-account__menu-item"
           v-for="tabItem in tabs"
           v-on:click="gotoTab(tabItem.id)"
           :key="tabItem.id"
           v-bind:class="[tabItem.id === activeTab? 'p-account__menu-item_active': null]"
      >
        <span>{{ tabItem.name }}</span>
      </div>
    </div>
    <div class="p-account__page">
      <p-subscriptions v-if="activeTab === 'subscriptions'"
                       @purchase="gotoTab('purchases')"></p-subscriptions>
      <p-purchases v-if="activeTab === 'purchases'"></p-purchases>
      <p-profile v-if="activeTab === 'profile'"></p-profile>
    </div>
  </div>
</template>

<script>

  import Metric from '@/persik/platform/Metric';
  import PSubscriptions from '@/components/pages/account/PSubscriptions';
  import PPurchases from '@/components/pages/account/PPurchases';
  import PProfile from '@/components/pages/account/PProfile';

  export default {
    components: {
      PProfile,
      PPurchases,
      PSubscriptions,
    },
    name: 'p-account',
    props: ['tab'],
    data() {
      return {
        tabs: [
          { name: this.$lang.messages.account.subscriptions, id: 'subscriptions' },
          { name: this.$lang.messages.account.purchases, id: 'purchases' },
          { name: this.$lang.messages.account.profile, id: 'profile' },
        ],
      };
    },
    computed: {
      activeTab() {
        return this.tab ? this.tab : 'subscriptions';
      },
    },
    watch: {
      tab() {
        this.$root.$emit('focus', this.$refs.tab, true);
      },
    },
    async created() {
      this.userInfo = await this.$backend.account.getInfo();
    },
    mounted() {
      Metric.getInstance().screenView('account');
      this.$root.$emit('focus', this.$el);
    },
    methods: {
      gotoTab(tab) {
        this.$router.push({
          name: 'Main',
          params: { page: 'account' },
          query: { tab },
        });
      },
      async logout() {
        const title = this.$lang.messages.parentCtrl.action;
        const isValid = await this.checkPin(title);
        if (isValid) {
          if (!this.$crazyMonkey.enabled) {
            this.$backend.account.logout();
            this.$store.commit('authorized', false);
            this.$router.push({ name: 'Main', params: { page: 'home' } });
            this.$nm.showMessage(this.$lang.messages.account.afterLogout, 5000);
            this.$backend.clear();
          }
        }
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-account {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: calc(100vh - 2.5rem);

  &__menu {
    width: 12rem;
    background-color: $color-gray-dark;
    text-align: center;
    color: $color-text-simple;
    height: 100%;
    -webkit-box-shadow: $shadow-dark;
            box-shadow: $shadow-dark;
    position: relative;

    &-item {
      height: 3rem;
      line-height: 3rem;
      cursor: pointer;

      &:hover {
        color: $color-text-simple;
        background-color: $color-hover;
      }

      &_active {
        color: $color-hover;
      }
    }
  }

  &__page {
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    flex-grow: 1;
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: 3rem;
    -webkit-transition: .5s;
    transition: .5s;
    background-color: #1b1b1b;
  }

}
</style>
