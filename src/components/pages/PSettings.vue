<template>
  <div class="p-settings" data-xy-group data-xy-open-left>

    <div class="p-settings__menu" data-xy-group-vertical data-xy-open-left>
      <!-- <div class="p-settings__menu-item"
           v-for="tabItem in tabs"
           v-on:click="gotoTab(tabItem.id)"
           :key="tabItem.id"
           v-bind:class="[tabItem.id === activeTab? 'p-settings__menu-item_active': null]"
           data-xy-focusable tabindex="-1"
      >
        <span>{{ tabItem.name }}</span>
      </div> -->

      <div class="p-settings__menu-item"
        v-on:click="gotoTab('diagnostic')"
        v-bind:class="[activeTab === 'diagnostic' ? 'p-settings__menu-item_active': null]"
        data-xy-focusable tabindex="-1"
      >
        {{ $lang.messages.settings.diagnostic }}
      </div>

      <div class="p-settings__menu-item"
        v-if="hasVideoSettings"
        v-on:click="gotoTab('video')"
        v-bind:class="[activeTab === 'video' ? 'p-settings__menu-item_active': null]"
        data-xy-focusable tabindex="-1"
      >
        {{ $lang.messages.settings.video }}
      </div>

<!-- 
      <div class="p-settings__menu-item"
        v-on:click="gotoTab('location')"
        v-bind:class="[activeTab === 'location' ? 'p-settings__menu-item_active': null]"
        data-xy-focusable tabindex="-1"
      >
        {{ $lang.messages.settings.language }}
      </div>
-->

      <div class="p-settings__menu-item"
        v-if="authorized"
        v-on:click="gotoTab('parent-control')"
        v-bind:class="[activeTab === 'parent-control' ? 'p-settings__menu-item_active': null]"
        data-xy-focusable tabindex="-1"
      >
        {{ $lang.messages.settings.parent_control }}
      </div>

      <div class="p-settings__menu-item"
        v-if="connected"
        v-on:click="gotoTab('speed-test')"
        v-bind:class="[activeTab === 'speed-test' ? 'p-settings__menu-item_active': null]"
        data-xy-focusable tabindex="-1"
      >
        {{ $lang.messages.settings.speed_test }}
      </div>

    </div>

    <div class="p-settings__page">
      <p-settings-video v-if="activeTab === 'video'"></p-settings-video>
      <p-diagnostic v-if="activeTab === 'diagnostic'"></p-diagnostic>
      <p-parent-control v-if="activeTab === 'parent-control'"></p-parent-control>
      <p-settings-location v-if="activeTab === 'location'"></p-settings-location>
      <p-speed-test v-if="activeTab === 'speed-test'"></p-speed-test>
    </div>
  </div>

</template>

<script>
  import Metric from '@/persik/platform/Metric';
  import PParentControl from '@/components/pages/settings/PParentControl';
  import PDiagnostic from '@/components/pages/settings/PDiagnostic';
  import PSettingsVideo from '@/components/pages/settings/PSettingsVideo';
  import PSettingsLocation from '@/components/pages/settings/PSettingsLocation';
  import PSpeedTest from '@/components/pages/settings/PSpeedTest';

  export default {
    components: {
      PDiagnostic,
      PParentControl,
      PSettingsVideo,
      PSettingsLocation,
      PSpeedTest,
    },
    name: 'p-settings',
    props: ['tab'],
    computed: {
      authorized() {
        return this.$store.getters.getAuthorized;
      },
      activeTab() {
        return this.tab ? this.tab : 'diagnostic';
      },
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
      hasVideoSettings() {
        return this.$backend.settings.hasVideoSettings();
      },
    },
    methods: {
      gotoTab(tab) {
        this.$router.push({
          name: 'Main',
          params: { page: 'settings' },
          query: { tab },
        });
      },
      /* createMenu() {
        this.tabs = [];
        this.tabs.push({ name: this.diagnostic, id: 'diagnostic' });
        if (this.$backend.settings.hasVideoSettings()) {
          this.tabs.push({ name: this.$lang.messages.settings.video, id: 'video' });
        }
        this.tabs.push({ name: this.$lang.messages.settings.language, id: 'location' });
        if (this.authorized) {
          this.tabs.push({ name: this.$lang.messages.settings.parent_control, id: 'parent-control' });
        }
      }, */
    },
    created() {},
    mounted() {
      Metric.getInstance().screenView('settings');
      this.$root.$emit('focus', this.$el);
    },
  };
</script>

<style scoped lang="scss">

.p-settings {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: $color-gray-medium;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  &__menu {
    margin-left: 3rem;
    padding-top: 2rem;
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
    height: 100%;
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
  }
}
  

</style>
