<template>
  <div class="p-parent-control" data-xy-group-vertical data-xy-open-left>
    <w-settings-item :label="(parentControl ? $lang.messages.settings.on : $lang.messages.settings.off) + ' ' + $lang.messages.settings.parent_ctrl" @click="toggleParentControl()">
      <w-form-checkbox :checked="parentControl"></w-form-checkbox>
    </w-settings-item>
    <w-settings-item v-if="parentControl" :label="$lang.messages.settings.change_pin" @click="changePin"></w-settings-item>
  </div>
</template>

<script>
  import Metric from '@/persik/platform/Metric';
  import WSettingsItem from '@/components/widgets/settings/WSettingsItem';
  import WFormCheckbox from '@/components/widgets/settings/WFormCheckbox';
  import dialogs from '@/mixins/dialogs';

  export default {
    name: 'p-parent-control',
    mixins: [dialogs],
    components: {
      WFormCheckbox,
      WSettingsItem,
    },
    data() {
      return {
        parentControl: this.$backend.settings.getParentControl(),
      };
    },
    methods: {
      async toggleParentControl() {
        if (!this.$crazyMonkey.enabled) {
          if (!this.parentControl) {
            this.parentControl = true;
            this.$backend.settings.setParentControl(this.parentControl);
          } else {
            const valid = await this.checkPinOrPassword('parentCtrl.action');
            if (valid) {
              this.parentControl = false;
              this.$backend.settings.setParentControl(this.parentControl);
            }
          }
        }
      },
      async changePin() {
        if (!this.$crazyMonkey.enabled) {
          const isValid = await this.checkPinOrPassword('parentCtrl.enter_old_pin');
          if (isValid) {
            const newPin = await this.prompt('parentCtrl.enter_new_pin', 'pin', 4);
            if (newPin) {
              await this.$backend.account.setPin(newPin);
            }
          }
        }
      },
    },
    mounted() {
      Metric.getInstance().screenView('settings/parent-control');
    },
  };
</script>

<style scoped lang="scss">

</style>
