<template>
  <div class="p-diagnostic" data-xy-group-horizontal data-xy-open-left>
    <img class="p-diagnostic__logo" :src="$backend.logo">
    <table class="p-diagnostic__table">
      <thead>
      <td class="p-diagnostic__table-param-col">{{ $lang.messages.device.param }}</td>
      <td class="p-diagnostic__table-value-col">{{ $lang.messages.device.value }}</td>
      </thead>
      <tbody>
      <tr v-for="(line, key, index) in info" :key="index" v-if="line !== null && line !== undefined">
        <td class="p-diagnostic__table-param-col_name">{{ $lang.messages.device[key] }}</td>
        <td>{{ line }}</td>
      </tr>
      </tbody>
    </table>
    <div class="p-diagnostic__button-group">
      <w-button class="p-diagnostic__button-group-button" v-if="connected" @click="sync" :caption="$lang.messages.buttons.sync"></w-button>
      <w-button class="p-diagnostic__button-group-button" @click="resetAll" :caption="$lang.messages.buttons.reset"></w-button>
      <w-button class="p-diagnostic__button-group-button" @click="reloadApp" :caption="$lang.messages.buttons.reload"></w-button>
    </div>
  </div>
</template>

<script>
  import DeviceInfo from '@/persik/platform/DeviceInfo';
  import Metric from '@/persik/platform/Metric';
  import EpgManager from '@/persik/service/EpgManager';
  import WButton from '@/components/widgets/WButton';
  import dialogs from '@/mixins/dialogs';

  const epgManager = EpgManager.getInstance();

  export default {
    name: 'p-diagnostic',
    props: [],
    mixins: [dialogs],
    components: { WButton },
    data() {
      return {
        info: {
          vendor: null,
          model: null,
          target: null,
          resolution: null,
          uuid: null,
          build: null,
        },
      };
    },
    computed: {
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
      authorized() {
        return this.$store.getters.getAuthorized;
      },
    },
    methods: {
      async resetAll() {
        if (this.authorized) {
          const isValid = await this.checkPin('parentCtrl.action');
          if (isValid) {
            this.reset();
          }
        } else {
          this.reset();
        }
      },
      async reset() {
        if (!this.$crazyMonkey.enabled) {
          await epgManager.deleteEpg();
          this.$backend.reset();
          this.$root.$emit('afterReset');
        }
      },
      async sync() {
        const title = this.$lang.messages.parentCtrl.action;
        const isValid = await this.checkPin(title);
        if (isValid) {
          epgManager.updateEpg();
          this.$backend.clear();
          this.syncVuexWithBackend();
        }
      },
      async reloadApp() {
        if (!this.$crazyMonkey.enabled) {
          this.$router.push('/');
          window.location.reload();
        }
      },
      getInfo() {
        this.getDeviceInfo();
        this.getUuid();
        const env = process.env;
        const buildNumber = env.BUILD_NUMBER ? `#${env.BUILD_NUMBER}` : 'N/A';
        this.info.build = `${buildNumber} (${env.BUILD_DATE})`;
        this.info.resolution = `${this.device.display.width}x${this.device.display.height}`;
      },
      getDeviceInfo() {
        const di = this.device;
        this.info.vendor = di.vendor;
        this.info.model = di.model;
        this.info.target = di.engine;
      },
      getUuid() {
        let uuid = this.device.uuid;
        if (uuid === null) {
          uuid = this.device.getUuid();
        }
        this.info.uuid = uuid;
      },
    },
    created() {
      this.device = DeviceInfo.getInstance();
      this.getInfo();
    },
    mounted() {
      Metric.getInstance().screenView('settings/diagnostic');
    },
  };
</script>

<style scoped lang="scss">

  .p-diagnostic {
  color: $color-text-simple;
  &__logo {
    display: block;
    padding-top: 1.5rem;
    margin: 0 auto;
    margin-bottom: 2rem;
    max-width: 7rem;
    max-height: 2rem;
  }

  &__table {
    width: 40rem;
    margin: 0 auto;
    border: 1px solid $color-text-muted;
    border-collapse: collapse;
    text-align: center;

    &-param-col {
      width: 30%;
      text-transform: uppercase;
      font-weight: bold;

      &_name {
        text-transform: capitalize;
      }
    }

    &-value-col {
      text-transform: uppercase;
      font-weight: bold;
    }

    td {
      border: 1px solid $color-text-muted;
      padding: 1rem;
    }
  }

  &__button-group {
    margin: 0 auto;
    width: 40rem;
    margin-top: 3rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
  }
}


</style>
